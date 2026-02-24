#!/usr/bin/env python3
"""
Skill Execution Bridge
Executes skills from the skills/ directory and returns results.
"""

import sys
import os
import json
import subprocess
from pathlib import Path

SKILLS_DIR = Path(__file__).parent.parent / "skills"
DIRECTIVES_DIR = Path(__file__).parent.parent / "directives"


def load_skill(skill_id: str) -> dict:
    """Load skill metadata from SKILL.md"""
    skill_path = SKILLS_DIR / skill_id / "SKILL.md"
    
    if not skill_path.exists():
        raise FileNotFoundError(f"Skill not found: {skill_id}")
    
    with open(skill_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    metadata = {}
    in_frontmatter = False
    frontmatter_lines = []
    
    for line in content.split('\n'):
        if line.strip() == '---':
            if not in_frontmatter:
                in_frontmatter = True
                continue
            else:
                break
        if in_frontmatter:
            frontmatter_lines.append(line)
    
    for line in frontmatter_lines:
        if ':' in line:
            key, value = line.split(':', 1)
            metadata[key.strip()] = value.strip()
    
    return {
        'id': skill_id,
        'name': metadata.get('name', skill_id),
        'description': metadata.get('description', ''),
        'content': content,
    }


def find_directive(skill_id: str) -> Path | None:
    """Find the directive file for a skill"""
    possible_directives = [
        DIRECTIVES_DIR / f"run_{skill_id}.md",
        DIRECTIVES_DIR / f"{skill_id}.md",
    ]
    
    for directive_path in possible_directives:
        if directive_path.exists():
            return directive_path
    
    return None


def execute_skill(skill_id: str, user_input: str) -> dict:
    """Execute a skill and return results"""
    
    try:
        skill = load_skill(skill_id)
    except FileNotFoundError as e:
        return {
            'success': False,
            'error': str(e),
            'skillId': skill_id,
        }
    
    directive_path = find_directive(skill_id)
    
    if directive_path:
        with open(directive_path, 'r', encoding='utf-8') as f:
            directive_content = f.read()
        
        prompt = f"""You are executing the skill: {skill['name']}

Skill Description:
{skill['description']}

Directive:
{directive_content}

User Input:
{user_input}

Please provide a comprehensive response based on this skill."""
        
        try:
            result = subprocess.run(
                ['python', '-c', f'print("Skill execution placeholder - implement LLM call here")'],
                capture_output=True,
                text=True,
                timeout=25,
            )
            
            output = f"""# {skill['name']} Results

## Skill Description
{skill['description']}

## User Input
{user_input}

## Output
This is a placeholder output. In production, this would call an LLM API with the directive and user input to generate the actual skill output.

## Next Steps
To complete implementation:
1. Add LLM API integration (OpenAI, Anthropic, etc.)
2. Configure API key in environment variables
3. Implement the directive execution logic

---
*Skill ID: {skill_id}*
*Directive: {directive_path.name}*
"""
            
            return {
                'success': True,
                'output': output,
                'skillId': skill_id,
                'skillName': skill['name'],
            }
            
        except subprocess.TimeoutExpired:
            return {
                'success': False,
                'error': 'Execution timed out',
                'skillId': skill_id,
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'skillId': skill_id,
            }
    else:
        return {
            'success': True,
            'output': f"""# {skill['name']}

## Description
{skill['description']}

## User Input
{user_input}

## Note
No directive found for this skill. This is a skill definition without execution logic.

---
*Skill ID: {skill_id}*
""",
            'skillId': skill_id,
            'skillName': skill['name'],
        }


def main():
    if len(sys.argv) < 3:
        print(json.dumps({
            'success': False,
            'error': 'Usage: run_skill.py <skill_id> <user_input>'
        }))
        sys.exit(1)
    
    skill_id = sys.argv[1]
    user_input = sys.argv[2]
    
    result = execute_skill(skill_id, user_input)
    
    print(json.dumps(result))


if __name__ == '__main__':
    main()
