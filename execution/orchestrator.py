#!/usr/bin/env python3
"""
AI Builder Orchestrator
Manages execution of each phase in the AI Builder journey.
"""

import sys
import json
import os
import requests
from pathlib import Path
from datetime import datetime

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

MINIMAX_API_KEY = os.environ.get('MINIMAX_API_KEY', '')
MINIMAX_API_URL = 'https://api.minimax.io/v1/text/chatcompletion_v2'

SKILLS_DIR = Path(__file__).parent.parent / 'skills'

# Phase configurations for MVP
PHASE_CONFIGS = {
    'validation': {
        'skills': ['validation-pack'],
        'description': 'Validate your idea',
    },
    'discovery': {
        'skills': ['product-vision', 'stakeholder-analysis'],
        'description': 'Define your product vision and stakeholders',
    },
    'research': {
        'skills': [
            'user-persona-creation',
            'competitor-research', 
            'requirements-elicitation',
            'user-journey-mapping'
        ],
        'description': 'Research your market and users',
    },
}

DEFAULT_QUALITY_THRESHOLD = 75
MAX_RETRIES = 2


def call_minimax(prompt: str, system_prompt: str = None, max_tokens: int = 4000) -> str:
    """Call MiniMax API for skill execution"""
    if not MINIMAX_API_KEY:
        return json.dumps({'success': False, 'error': 'No API key'})
    
    headers = {
        'Authorization': f'Bearer {MINIMAX_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    messages = []
    if system_prompt:
        messages.append({'role': 'system', 'content': system_prompt})
    messages.append({'role': 'user', 'content': prompt})
    
    payload = {
        'model': 'MiniMax-M2.5',
        'messages': messages,
        'temperature': 0.7,
        'max_tokens': max_tokens,
    }
    
    try:
        response = requests.post(MINIMAX_API_URL, headers=headers, json=payload, timeout=120)
        if response.status_code == 200:
            result = response.json()
            return result['choices'][0]['message']['content']
        else:
            return json.dumps({'success': False, 'error': f'API error: {response.status_code}'})
    except Exception as e:
        return json.dumps({'success': False, 'error': str(e)})


def load_skill_prompt(skill_id: str) -> tuple[str, str]:
    """Load skill prompt from SKILL.md"""
    skill_path = SKILLS_DIR / skill_id / 'SKILL.md'
    
    if not skill_path.exists():
        return f"You are a {skill_id} expert.", f"Execute the {skill_id} skill."
    
    content = skill_path.read_text(encoding='utf-8')
    
    # Extract description from frontmatter or first paragraph
    lines = content.split('\n')
    system_prompt = f"You are a {skill_id.replace('-', ' ')} expert. "
    user_prompt = ""
    
    in_frontmatter = False
    for i, line in enumerate(lines):
        if line.strip() == '---':
            if not in_frontmatter:
                in_frontmatter = True
            else:
                # End of frontmatter, rest is content
                user_prompt = '\n'.join(lines[i+1:]).strip()
                break
        elif in_frontmatter and line.startswith('description:'):
            system_prompt += line.replace('description:', '').strip()
    
    if not user_prompt:
        user_prompt = content
    
    return system_prompt, user_prompt


def validate_output_quality(output: str, skill_id: str) -> dict:
    """Validate output quality using simple heuristics"""
    issues = []
    score = 100
    
    # Check length
    if len(output) < 200:
        issues.append("Output too short")
        score -= 20
    
    # Check for required elements
    if skill_id == 'validation-pack':
        if 'recommendation' not in output.lower() and 'go' not in output.lower():
            issues.append("Missing recommendation")
            score -= 15
        if 'score' not in output.lower():
            issues.append("Missing score")
            score -= 10
    
    if skill_id == 'product-vision':
        if 'vision' not in output.lower() and 'mission' not in output.lower():
            issues.append("Missing vision/mission statement")
            score -= 20
    
    if skill_id == 'user-persona-creation':
        if 'persona' not in output.lower():
            issues.append("Missing persona")
            score -= 20
    
    if skill_id == 'competitor-research':
        if 'competitor' not in output.lower():
            issues.append("Missing competitor analysis")
            score -= 20
    
    return {
        'score': max(0, score),
        'passed': score >= DEFAULT_QUALITY_THRESHOLD,
        'issues': issues
    }


def run_devil_advocate(phase_outputs: dict, phase: str) -> dict:
    """Run Devil's Advocate to review phase outputs"""
    system_prompt = """You are a Devil's Advocate for product development.
Your role is to critically review outputs and identify gaps, risks, and blind spots.
Be constructive but thorough. Focus on what's missing or could go wrong."""

    prompt = f"""Review the following {phase} phase outputs and provide critical feedback:

{json.dumps(phase_outputs, indent=2)}

For each output, identify:
1. Critical gaps or missing information
2. Potential risks or blind spots
3. Recommendations for improvement

Provide a quality score from 0-100 and whether you recommend proceeding to the next phase."""

    result = call_minimax(prompt, system_prompt)
    
    try:
        # Try to extract score
        import re
        score_match = re.search(r'(\d{1,3})/100', result)
        if score_match:
            return {
                'score': int(score_match.group(1)),
                'review': result
            }
    except:
        pass
    
    return {
        'score': 75,  # Default
        'review': result
    }


def execute_phase(project_id: str, phase: str, idea: str) -> dict:
    """Execute a single phase"""
    print(f"Executing phase: {phase} for project: {project_id}")
    
    config = PHASE_CONFIGS.get(phase)
    if not config:
        return {'success': False, 'error': f'Unknown phase: {phase}'}
    
    skills = config['skills']
    results = {}
    all_outputs = {}
    
    for skill_id in skills:
        print(f"Running skill: {skill_id}")
        
        retry_count = 0
        success = False
        output = ""
        
        while retry_count < MAX_RETRIES and not success:
            try:
                system_prompt, user_prompt = load_skill_prompt(skill_id)
                
                # Build the full prompt
                full_prompt = f"""Context: The user is building a product with the following initial idea:
{idea}

Please execute the {skill_id} skill by analyzing the above and providing your expert output.

{user_prompt[:2000]}"""
                
                result = call_minimax(full_prompt, system_prompt)
                
                # Validate quality
                quality = validate_output_quality(result, skill_id)
                
                if quality['passed'] or retry_count >= MAX_RETRIES - 1:
                    output = result
                    success = quality['passed']
                    break
                else:
                    retry_count += 1
                    print(f"Retrying {skill_id}, attempt {retry_count + 1}")
                    
            except Exception as e:
                print(f"Error running {skill_id}: {e}")
                retry_count += 1
        
        if output:
            quality = validate_output_quality(output, skill_id)
            results[skill_id] = {
                'output': output,
                'quality': quality,
                'retryCount': retry_count
            }
            all_outputs[skill_id] = output
    
    # Calculate aggregate quality score
    if results:
        scores = [r['quality']['score'] for r in results.values()]
        avg_score = sum(scores) / len(scores)
    else:
        avg_score = 0
    
    # Run Devil's Advocate review
    print(f"Running Devil's Advocate review for {phase}")
    da_review = run_devil_advocate(all_outputs, phase)
    
    # Determine final quality score (average of skill scores and DA review)
    final_score = int((avg_score + da_review['score']) / 2)
    
    # Generate summary
    summary = f"{phase.title()} phase completed. "
    summary += f"Ran {len(results)} skill(s). "
    summary += f"Quality score: {final_score}/100. "
    
    if da_review.get('review'):
        # Extract first 200 chars of DA review
        summary += f"DA Review: {da_review['review'][:200]}..."
    
    return {
        'success': len(results) > 0,
        'phase': phase,
        'skillId': ','.join(results.keys()),
        'output': json.dumps(all_outputs),
        'summary': summary,
        'qualityScore': final_score,
        'issues': [issue for r in results.values() for issue in r['quality'].get('issues', [])],
        'retryCount': max([r.get('retryCount', 0) for r in results.values()] or [0]),
        'daReview': da_review.get('review', '')
    }


def main():
    if len(sys.argv) < 3:
        print(json.dumps({'success': False, 'error': 'Usage: orchestrator.py <project_id> <phase> [--context <context>]'}))
        sys.exit(1)
    
    project_id = sys.argv[1]
    phase = sys.argv[2]
    
    # Parse optional --context argument
    idea = "User's product idea from project"
    if '--context' in sys.argv:
        idx = sys.argv.index('--context')
        if idx + 1 < len(sys.argv):
            idea = sys.argv[idx + 1]
    
    result = execute_phase(project_id, phase, idea)
    
    print(json.dumps(result))


if __name__ == '__main__':
    main()
