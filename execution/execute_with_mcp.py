#!/usr/bin/env python3
"""
MCP Integration for Skill Execution

Adds MCP deliverable creation to skill outputs.
Used by BobAI tier to create actual Notion pages, Sheets, etc.

Usage:
    from execute_with_mcp import execute_skill_with_deliverable
    
    result = execute_skill_with_deliverable(
        skill_name='validation-pack',
        user_input='My SaaS idea',
        create_deliverable=True
    )
"""

import json
from typing import Dict, Any, Optional

# Import the skill executor
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from run_skill import execute_single_skill
from mcp_orchestrator import create_deliverable, get_mcp_for_skill


def execute_skill_with_deliverable(
    skill_name: str,
    user_input: str,
    answers: Dict[str, str] = None,
    data_source_ids: list = None,
    create_deliverable: bool = True,
    deliverable_options: Dict = None
) -> Dict[str, Any]:
    """Execute a skill and optionally create an MCP deliverable
    
    Args:
        skill_name: Name of the skill to execute
        user_input: User's idea/problem
        answers: Answers to skill's clarifying questions
        data_source_ids: Optional data sources to use
        create_deliverable: Whether to create an MCP deliverable
        deliverable_options: Options for deliverable creation
        
    Returns:
        Dict with skill output and deliverable info
    """
    answers = answers or {}
    deliverable_options = deliverable_options or {}
    
    # Execute the skill
    skill_result = execute_single_skill(skill_name, user_input, answers)
    
    # Check if skill executed successfully
    if not skill_result.get('success'):
        return {
            'success': False,
            'skill_output': skill_result.get('output', 'Skill execution failed'),
            'deliverable': None,
            'error': skill_result.get('output')
        }
    
    skill_output = skill_result.get('output', '')
    
    # If deliverable creation is requested
    deliverable_result = None
    if create_deliverable:
        # Generate title from skill and user input
        title = generate_deliverable_title(skill_name, user_input)
        
        # Create deliverable via MCP
        deliverable_result = create_deliverable(
            skill_name=skill_name,
            title=title,
            content=skill_output,
            options=deliverable_options
        )
    
    return {
        'success': True,
        'skill_name': skill_name,
        'skill_output': skill_output,
        'deliverable': deliverable_result,
        'has_deliverable': deliverable_result and deliverable_result.get('success') if deliverable_result else False
    }


def generate_deliverable_title(skill_name: str, user_input: str) -> str:
    """Generate an appropriate title for the deliverable"""
    # Get skill display name
    skill_names = {
        'validation-pack': 'Validation Pack',
        'requirements-elicitation': 'Requirements',
        'user-persona-creation': 'User Personas',
        'competitor-research': 'Competitive Analysis',
        'business-case-modeling': 'Financial Model',
        'devils-advocate': 'Risk Analysis',
        'feature-prioritization': 'Feature Backlog',
        'user-journey-mapping': 'User Journey Map',
        'roadmap-planning': 'Product Roadmap',
        'architecture-design': 'System Architecture',
        'schema-design': 'Database Schema',
        'api-design': 'API Specification',
        'data-visualization': 'Data Dashboard',
        'launch-planning': 'Launch Plan',
        'pricing-strategy': 'Pricing Strategy',
        'content-strategy': 'Content Strategy',
        'seo-foundation': 'SEO Strategy',
    }
    
    display_name = skill_names.get(skill_name, skill_name.replace('-', ' ').title())
    
    # Truncate user input if too long
    input_preview = user_input[:50] + '...' if len(user_input) > 50 else user_input
    
    return f"{display_name}: {input_preview}"


def execute_squad_with_deliverables(
    squad_name: str,
    user_input: str,
    answers: Dict[str, str] = None,
    create_deliverables: bool = True
) -> Dict[str, Any]:
    """Execute all skills in a squad and create deliverables for each
    
    Args:
        squad_name: Name of the squad (e.g., 'discovery', 'design')
        user_input: User's idea/problem
        answers: Answers to questions
        create_deliverables: Whether to create MCP deliverables
        
    Returns:
        Dict with all skill outputs and deliverables
    """
    # Get skills for squad
    from run_skill import VALIDATION_PACK_SKILLS, CORE_VALIDATION_SKILLS
    
    # For now, use validation pack skills as the discovery squad
    skill_lists = {
        'discovery': VALIDATION_PACK_SKILLS,
        'validation': VALIDATION_PACK_SKILLS,
        'core': CORE_VALIDATION_SKILLS
    }
    
    skills = skill_lists.get(squad_name, VALIDATION_PACK_SKILLS)
    
    results = {
        'squad': squad_name,
        'skills': [],
        'deliverables': [],
        'summary': {
            'total': len(skills),
            'successful': 0,
            'deliverables_created': 0
        }
    }
    
    for skill_name in skills:
        result = execute_skill_with_deliverable(
            skill_name=skill_name,
            user_input=user_input,
            answers=answers,
            create_deliverable=create_deliverables
        )
        
        results['skills'].append({
            'skill': skill_name,
            'success': result['success'],
            'output_preview': result['skill_output'][:200] + '...' if len(result.get('skill_output', '')) > 200 else result.get('skill_output', '')
        })
        
        if result['success']:
            results['summary']['successful'] += 1
            
            if result.get('has_deliverable') and result.get('deliverable'):
                results['deliverables'].append(result['deliverable'])
                results['summary']['deliverables_created'] += 1
    
    return results


# Example usage when run directly
if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser(description='Execute skill with MCP deliverable')
    parser.add_argument('skill', help='Skill name')
    parser.add_argument('input', help='User input/idea')
    parser.add_argument('--no-deliverable', action='store_true', help='Skip deliverable creation')
    
    args = parser.parse_args()
    
    result = execute_skill_with_deliverable(
        skill_name=args.skill,
        user_input=args.input,
        create_deliverable=not args.no_deliverable
    )
    
    print(json.dumps(result, indent=2))
