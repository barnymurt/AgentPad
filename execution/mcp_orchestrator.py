#!/usr/bin/env python3
"""
MCP Orchestrator

Routes skill outputs to appropriate MCP connectors for deliverable creation.
This is the integration layer between skill execution and MCP creation.

Usage:
    from mcp_orchestrator import create_deliverable
    
    result = create_deliverable(
        skill_name='validation-pack',
        title='Validation Pack: My SaaS',
        content=skill_output,
        user_id='user_123'
    )
"""

import json
from typing import Dict, Any, Optional
from pathlib import Path


# Load skill-to-MCP mapping
RESEARCH_DIR = Path(__file__).parent.parent / 'docs' / 'mcp-research'
MAPPING_FILE = RESEARCH_DIR / 'full_research_v2.json'

# Load mapping if available
SKILL_MCP_MAP = {}
if MAPPING_FILE.exists():
    try:
        with open(MAPPING_FILE, 'r') as f:
            data = json.load(f)
            for skill_id, skill_data in data.get('all_skills', {}).items():
                SKILL_MCP_MAP[skill_id] = {
                    'primary_mcp': skill_data['mcp_mapping'][0]['id'] if skill_data.get('mcp_mapping') else None,
                    'all_mcps': [m['id'] for m in skill_data.get('mcp_mapping', [])],
                    'output_type': skill_data.get('output_type', 'document'),
                    'templates': skill_data.get('templates_needed', [])
                }
    except Exception as e:
        print(f"Warning: Could not load skill mapping: {e}")

# Default mapping for common skills
DEFAULT_MCP_MAP = {
    'validation-pack': {'primary': 'notion', 'fallback': 'google_docs'},
    'requirements-elicitation': {'primary': 'notion', 'fallback': 'linear'},
    'user-persona-creation': {'primary': 'notion', 'fallback': 'figma'},
    'competitor-research': {'primary': 'notion', 'fallback': 'google_sheets'},
    'business-case-modeling': {'primary': 'google_sheets', 'fallback': 'notion'},
    'devils-advocate': {'primary': 'notion', 'fallback': 'miro'},
    'devils-advocate-gtm': {'primary': 'notion', 'fallback': 'google_docs'},
    'feature-prioritization': {'primary': 'linear', 'fallback': 'notion'},
    'user-journey-mapping': {'primary': 'miro', 'fallback': 'figma'},
    'gap-analysis': {'primary': 'notion', 'fallback': 'google_sheets'},
    'survey-design': {'primary': 'google_forms', 'fallback': 'notion'},
    'interview-guide-creation': {'primary': 'notion', 'fallback': 'google_docs'},
    'feedback-synthesis': {'primary': 'notion', 'fallback': 'google_sheets'},
    'stakeholder-analysis': {'primary': 'notion', 'fallback': 'miro'},
    'roadmap-planning': {'primary': 'linear', 'fallback': 'notion'},
    'wireframing': {'primary': 'figma', 'fallback': 'miro'},
    'ui-patterns': {'primary': 'figma', 'fallback': 'notion'},
    'information-architecture': {'primary': 'miro', 'fallback': 'figma'},
    'design-system': {'primary': 'figma', 'fallback': 'notion'},
    'heuristic-evaluation': {'primary': 'notion', 'fallback': 'google_sheets'},
    'usability-test-planning': {'primary': 'notion', 'fallback': 'google_docs'},
    'accessibility-review': {'primary': 'figma', 'fallback': 'notion'},
    'animation-motion': {'primary': 'figma', 'fallback': None},
    'responsive-patterns': {'primary': 'figma', 'fallback': None},
    'component-architecture': {'primary': 'figma', 'fallback': 'github'},
    'data-visualization': {'primary': 'google_sheets', 'fallback': 'metabase'},
    'cohort-analysis': {'primary': 'google_sheets', 'fallback': 'metabase'},
    'funnel-analysis': {'primary': 'google_sheets', 'fallback': 'metabase'},
    'data-modeling': {'primary': 'drawsql', 'fallback': 'notion'},
    'ab-test-design': {'primary': 'notion', 'fallback': 'google_sheets'},
    'saas-metrics-analysis': {'primary': 'google_sheets', 'fallback': 'metabase'},
    'metrics-dashboard-creation': {'primary': 'google_sheets', 'fallback': 'metabase'},
    'kpi-tracking': {'primary': 'google_sheets', 'fallback': 'notion'},
    'security-requirements-baseline': {'primary': 'notion', 'fallback': 'google_sheets'},
    'security-compliance-roadmap': {'primary': 'notion', 'fallback': 'google_sheets'},
    'security-architecture-review': {'primary': 'notion', 'fallback': 'miro'},
    'threat-modeling': {'primary': 'miro', 'fallback': 'notion'},
    'data-security': {'primary': 'notion', 'fallback': 'google_sheets'},
    'data-protection-assessment': {'primary': 'notion', 'fallback': 'google_sheets'},
    'privacy-regulation-assessment': {'primary': 'notion', 'fallback': 'google_sheets'},
    'backup-recovery': {'primary': 'notion', 'fallback': 'aws'},
    'architecture-design': {'primary': 'notion', 'fallback': 'miro'},
    'schema-design': {'primary': 'drawsql', 'fallback': 'dbdiagram'},
    'api-design': {'primary': 'notion', 'fallback': 'stoplight'},
    'user-story-generation': {'primary': 'linear', 'fallback': 'notion'},
    'technical-readiness-pack': {'primary': 'notion', 'fallback': 'github'},
    'ticket-refinement': {'primary': 'linear', 'fallback': 'jira'},
    'state-management': {'primary': 'notion', 'fallback': 'github'},
    'frontend-performance': {'primary': 'notion', 'fallback': 'lighthouse'},
    'monitoring-observability': {'primary': 'datadog', 'fallback': 'newrelic'},
    'ci-cd-pipeline': {'primary': 'github', 'fallback': 'vercel'},
    'infrastructure-as-code': {'primary': 'github', 'fallback': 'terraform'},
    'cloud-platforms': {'primary': 'aws', 'fallback': 'digitalocean'},
    'serverless-development': {'primary': 'vercel', 'fallback': 'aws'},
    'mobile-ios': {'primary': 'figma', 'fallback': None},
    'mobile-android': {'primary': 'figma', 'fallback': None},
    'ml-llm-integration': {'primary': 'openai', 'fallback': 'anthropic'},
    'automation-framework': {'primary': 'notion', 'fallback': 'github'},
    'migration-planning': {'primary': 'notion', 'fallback': 'google_sheets'},
    'performance-tuning': {'primary': 'notion', 'fallback': 'lighthouse'},
    'edge-computing': {'primary': 'cloudflare', 'fallback': 'vercel'},
    'test-strategy': {'primary': 'notion', 'fallback': 'jira'},
    'tdd': {'primary': 'github', 'fallback': None},
    'launch-planning': {'primary': 'notion', 'fallback': 'miro'},
    'launch-analytics': {'primary': 'google_analytics', 'fallback': 'google_sheets'},
    'pricing-strategy': {'primary': 'notion', 'fallback': 'google_sheets'},
    'pricing-launch': {'primary': 'stripe', 'fallback': 'notion'},
    'channel-strategy': {'primary': 'notion', 'fallback': 'google_sheets'},
    'paid-acquisition': {'primary': 'google_ads', 'fallback': 'facebook_ads'},
    'partner-strategy': {'primary': 'notion', 'fallback': 'hubspot'},
    'content-strategy': {'primary': 'notion', 'fallback': 'google_docs'},
    'community-building': {'primary': 'discord', 'fallback': 'slack'},
    'referral-program': {'primary': 'stripe', 'fallback': 'notion'},
    'seo-foundation': {'primary': 'notion', 'fallback': 'google_search_console'},
    'analyst-relations': {'primary': 'notion', 'fallback': 'google_docs'},
    'sales-enablement': {'primary': 'hubspot', 'fallback': 'notion'},
    'messaging-framework': {'primary': 'notion', 'fallback': 'miro'},
    'iteration-planning': {'primary': 'linear', 'fallback': 'notion'},
    'product-health-check': {'primary': 'notion', 'fallback': 'google_sheets'},
    'scale-readiness': {'primary': 'notion', 'fallback': 'google_sheets'},
    'release-management': {'primary': 'github', 'fallback': 'linear'},
    'product-vision': {'primary': 'notion', 'fallback': 'miro'},
    'product-okrs': {'primary': 'notion', 'fallback': 'google_sheets'},
}


def get_mcp_for_skill(skill_name: str) -> Dict[str, Any]:
    """Get MCP configuration for a skill"""
    # Try loaded mapping first
    if skill_name in SKILL_MCP_MAP:
        data = SKILL_MCP_MAP[skill_name]
        return {
            'primary': data.get('primary_mcp'),
            'fallback': data['all_mcps'][1] if len(data.get('all_mcps', [])) > 1 else None,
            'output_type': data.get('output_type'),
            'templates': data.get('templates', [])
        }
    
    # Fall back to default mapping
    return DEFAULT_MCP_MAP.get(skill_name, {'primary': 'notion', 'fallback': None})


def create_deliverable(skill_name: str, title: str, content: Any,
                       user_id: str = None, options: Dict = None) -> Dict[str, Any]:
    """Create a deliverable using the appropriate MCP
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output (string or structured data)
        user_id: Optional user ID
        options: Additional options (e.g., force_mcp='notion')
        
    Returns:
        Dict with success status, deliverable URL, and fallback content
    """
    options = options or {}
    mcp_config = get_mcp_for_skill(skill_name)
    
    # Force specific MCP if requested
    primary_mcp = options.get('force_mcp', mcp_config.get('primary', 'notion'))
    fallback_mcp = mcp_config.get('fallback')
    
    # Try primary MCP first
    result = _create_with_mcp(primary_mcp, skill_name, title, content, user_id)
    
    if result['success']:
        return {
            'success': True,
            'mcp_used': primary_mcp,
            'deliverable_type': result['deliverable_type'],
            'url': result.get('url', ''),
            'id': result.get('id', ''),
            'message': f"Created {result['deliverable_type']} via {primary_mcp}"
        }
    
    # Try fallback MCP
    if fallback_mcp:
        result = _create_with_mcp(fallback_mcp, skill_name, title, content, user_id)
        
        if result['success']:
            return {
                'success': True,
                'mcp_used': fallback_mcp,
                'deliverable_type': result['deliverable_type'],
                'url': result.get('url', ''),
                'id': result.get('id', ''),
                'message': f"Created {result['deliverable_type']} via {fallback_mcp}"
            }
    
    # All MCPs failed - return markdown fallback
    return {
        'success': False,
        'error': result.get('error', 'mcp_unavailable'),
        'message': result.get('message', 'No MCP available'),
        'mcp_used': None,
        'deliverable_type': 'markdown_document',
        'fallback': 'markdown_document',
        'content': _format_as_markdown(skill_name, title, content),
        'suggestion': f'Configure {primary_mcp} MCP to enable deliverable creation'
    }


def _create_with_mcp(mcp_name: str, skill_name: str, title: str, 
                     content: Any, user_id: str) -> Dict[str, Any]:
    """Try to create deliverable with specific MCP"""
    
    if mcp_name == 'notion':
        return _create_notion(skill_name, title, content)
    elif mcp_name == 'google_sheets':
        return _create_sheets(skill_name, title, content)
    elif mcp_name == 'google_docs':
        return _create_google_doc(skill_name, title, content)
    elif mcp_name == 'figma':
        return _create_figma(skill_name, title, content)
    elif mcp_name == 'miro':
        return _create_miro(skill_name, title, content)
    elif mcp_name == 'linear':
        return _create_linear(skill_name, title, content)
    elif mcp_name == 'github':
        return _create_github(skill_name, title, content)
    elif mcp_name == 'vercel':
        return _create_vercel(skill_name, title, content)
    elif mcp_name == 'jira':
        return _create_jira(skill_name, title, content)
    elif mcp_name == 'hubspot':
        return _create_hubspot(skill_name, title, content)
    elif mcp_name == 'stripe':
        return _create_stripe(skill_name, title, content)
    elif mcp_name == 'google_analytics':
        return _create_google_analytics(skill_name, title, content)
    elif mcp_name == 'google_docs':
        return _create_google_docs(skill_name, title, content)
    elif mcp_name == 'discord':
        return _create_discord(skill_name, title, content)
    else:
        return {
            'success': False, 
            'error': 'not_implemented',
            'message': f'{mcp_name} MCP not yet implemented'
        }


def _create_notion(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Notion deliverable"""
    try:
        from notion_mcp import create_notion_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_notion_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e)
        }


def _create_sheets(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Google Sheets deliverable"""
    try:
        from sheets_mcp import create_sheets_deliverable
        
        # Parse content if it's a string
        data = content
        if isinstance(content, str):
            # Try to parse as JSON, otherwise create simple data
            try:
                import json
                data = json.loads(content)
            except:
                data = {'content': content}
        
        return create_sheets_deliverable(skill_name, title, data)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e)
        }


def _create_google_doc(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Google Doc deliverable (placeholder)"""
    return {
        'success': False,
        'error': 'not_implemented',
        'message': 'Google Docs MCP coming soon'
    }


def _create_figma(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Figma deliverable"""
    try:
        from figma_mcp import create_figma_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_figma_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'notion_document'
        }


def _create_miro(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Miro deliverable"""
    try:
        from miro_mcp import create_miro_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_miro_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'notion_document'
        }


def _create_linear(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Linear deliverable"""
    try:
        from linear_mcp import create_linear_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_linear_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'notion_document'
        }


def _create_github(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create GitHub deliverable"""
    try:
        from github_mcp import create_github_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_github_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'notion_document'
        }


def _create_vercel(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Vercel deliverable"""
    try:
        from vercel_mcp import create_vercel_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_vercel_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'notion_document'
        }


def _create_jira(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Jira deliverable"""
    try:
        from jira_mcp import create_jira_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_jira_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'notion_document'
        }


def _create_hubspot(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create HubSpot deliverable"""
    try:
        from hubspot_mcp import create_hubspot_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_hubspot_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'notion_document'
        }


def _create_stripe(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Stripe deliverable"""
    try:
        from stripe_mcp import create_stripe_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_stripe_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'notion_document'
        }


def _create_google_analytics(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Google Analytics deliverable"""
    try:
        from analytics_mcp import create_analytics_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_analytics_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'notion_document'
        }


def _create_google_docs(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Google Docs deliverable"""
    try:
        from docs_mcp import create_docs_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_docs_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'markdown_document'
        }


def _create_discord(skill_name: str, title: str, content: Any) -> Dict[str, Any]:
    """Create Discord deliverable"""
    try:
        from discord_mcp import create_discord_deliverable
        content_str = str(content) if not isinstance(content, str) else content
        return create_discord_deliverable(skill_name, title, content_str)
    except Exception as e:
        return {
            'success': False,
            'error': 'mcp_error',
            'message': str(e),
            'fallback': 'notion_document'
        }


def _format_as_markdown(skill_name: str, title: str, content: Any) -> str:
    """Format content as markdown fallback"""
    if isinstance(content, str):
        return f"# {title}\n\n{content}"
    else:
        import json
        return f"# {title}\n\n```json\n{json.dumps(content, indent=2)}\n```"


def get_available_mcps() -> Dict[str, bool]:
    """Check which MCPs are available/configured"""
    status = {}
    
    # Check Notion
    try:
        from notion_mcp import NotionMCP
        NotionMCP()
        status['notion'] = True
    except:
        status['notion'] = False
    
    # Check Google Sheets
    try:
        from sheets_mcp import SheetsMCP
        SheetsMCP()
        status['google_sheets'] = True
    except:
        status['google_sheets'] = False
    
    # Check Figma
    try:
        from figma_mcp import FigmaMCP
        FigmaMCP()
        status['figma'] = True
    except:
        status['figma'] = False
    
    # Check Miro
    try:
        from miro_mcp import MiroMCP
        MiroMCP()
        status['miro'] = True
    except:
        status['miro'] = False
    
    # Check Linear
    try:
        from linear_mcp import LinearMCP
        LinearMCP()
        status['linear'] = True
    except:
        status['linear'] = False
    
    # Check GitHub
    try:
        from github_mcp import GitHubMCP
        GitHubMCP()
        status['github'] = True
    except:
        status['github'] = False
    
    # Check Vercel
    try:
        from vercel_mcp import VercelMCP
        VercelMCP()
        status['vercel'] = True
    except:
        status['vercel'] = False
    
    # Check Jira
    try:
        from jira_mcp import JiraMCP
        JiraMCP()
        status['jira'] = True
    except:
        status['jira'] = False
    
    # Check HubSpot
    try:
        from hubspot_mcp import HubSpotMCP
        HubSpotMCP()
        status['hubspot'] = True
    except:
        status['hubspot'] = False
    
    # Check Stripe
    try:
        from stripe_mcp import StripeMCP
        StripeMCP()
        status['stripe'] = True
    except:
        status['stripe'] = False
    
    # Check Google Analytics
    try:
        from analytics_mcp import AnalyticsMCP
        AnalyticsMCP()
        status['google_analytics'] = True
    except:
        status['google_analytics'] = False
    
    # Check Google Docs
    try:
        from docs_mcp import DocsMCP
        DocsMCP()
        status['google_docs'] = True
    except:
        status['google_docs'] = False
    
    # Check Discord
    try:
        from discord_mcp import DiscordMCP
        DiscordMCP()
        status['discord'] = True
    except:
        status['discord'] = False
    
    return status


if __name__ == '__main__':
    # Test
    print("MCP Orchestrator")
    print(f"Available MCPs: {get_available_mcps()}")
    
    # Test deliverable creation
    result = create_deliverable(
        skill_name='validation-pack',
        title='Test Validation Pack',
        content='# Test\n\nThis is a test validation pack.'
    )
    print(json.dumps(result, indent=2))
