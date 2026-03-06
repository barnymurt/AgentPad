#!/usr/bin/env python3
"""
Notion MCP Connector

Provides integration with Notion for creating pages, databases, and content
from skill outputs. Used by BobAI tier for actual deliverable creation.

Usage:
    from notion_mcp import NotionMCP
    
    notion = NotionMCP()
    result = notion.create_page(
        title="Validation Pack: My SaaS",
        content="# Validation Results\n\n...",
        parent_id=None  # Uses default workspace
    )
"""

import os
import json
from typing import Optional, Dict, Any, List
from pathlib import Path

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass


class NotionMCPError(Exception):
    """Custom exception for Notion MCP errors"""
    pass


class NotionMCP:
    """Notion MCP connector for creating pages and databases"""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.environ.get('NOTION_API_KEY', '')
        self.base_url = 'https://api.notion.com/v1'
        self.version = '2022-06-28'
        
        if not self.api_key:
            raise NotionMCPError("NOTION_API_KEY not configured")
    
    def _headers(self) -> Dict[str, str]:
        return {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json',
            'Notion-Version': self.version
        }
    
    def _make_request(self, method: str, endpoint: str, data: dict = None) -> Dict[str, Any]:
        import requests
        
        url = f"{self.base_url}/{endpoint}"
        headers = self._headers()
        
        try:
            response = requests.request(method, url, headers=headers, json=data, timeout=30)
            
            if response.status_code == 200:
                return {'success': True, 'data': response.json()}
            elif response.status_code == 401:
                return {'success': False, 'error': 'auth_failure', 'message': 'Invalid or expired Notion API key'}
            elif response.status_code == 429:
                return {'success': False, 'error': 'rate_limit', 'message': 'Notion API rate limit exceeded'}
            else:
                return {'success': False, 'error': 'api_error', 'message': f'Notion API error: {response.status_code}'}
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'timeout', 'message': 'Request to Notion timed out'}
        except Exception as e:
            return {'success': False, 'error': 'unknown', 'message': str(e)}
    
    def create_page(self, title: str, content: str, parent_id: str = None, 
                    properties: Dict = None, icon: str = None) -> Dict[str, Any]:
        """Create a new Notion page with content
        
        Args:
            title: Page title
            content: Markdown content for the page
            parent_id: Parent page ID (optional, uses workspace if None)
            properties: Additional properties for the page
            icon: Emoji icon for the page
            
        Returns:
            Dict with success status, page URL, and page ID
        """
        # Convert to Notion blocks markdown content
        blocks = self._markdown_to_blocks(content)
        
        # Build page creation payload
        payload = {
            'children': blocks
        }
        
        if parent_id:
            payload['parent'] = {'page_id': parent_id}
        else:
            # Use workspace as parent
            payload['parent'] = {'type': 'workspace'}
        
        if title:
            payload['properties'] = {
                'title': {
                    'title': [{'text': {'content': title}}]
                }
            }
        
        if properties:
            if 'properties' not in payload:
                payload['properties'] = {}
            payload['properties'].update(properties)
        
        if icon:
            payload['icon'] = {'emoji': icon}
        
        result = self._make_request('POST', 'pages', payload)
        
        if result['success']:
            page_data = result['data']
            page_id = page_data.get('id', '')
            return {
                'success': True,
                'page_id': page_id,
                'url': page_data.get('url', ''),
                'message': 'Page created successfully'
            }
        else:
            return result
    
    def create_database(self, title: str, properties: Dict[str, Any], 
                       parent_page_id: str = None) -> Dict[str, Any]:
        """Create a new Notion database
        
        Args:
            title: Database title
            properties: Schema properties for the database
            parent_page_id: Parent page ID for the database
            
        Returns:
            Dict with success status and database info
        """
        # Build database schema
        schema = {}
        for prop_name, prop_config in properties.items():
            schema[prop_name] = prop_config
        
        payload = {
            'title': [{'text': {'content': title}}],
            'properties': schema
        }
        
        if parent_page_id:
            payload['parent'] = {'page_id': parent_page_id}
        else:
            payload['parent'] = {'type': 'workspace'}
        
        result = self._make_request('POST', 'databases', payload)
        
        if result['success']:
            db_data = result['data']
            return {
                'success': True,
                'database_id': db_data.get('id', ''),
                'url': db_data.get('url', ''),
                'message': 'Database created successfully'
            }
        else:
            return result
    
    def add_page_to_database(self, database_id: str, properties: Dict[str, Any],
                            content: str = None) -> Dict[str, Any]:
        """Add a new page to an existing database
        
        Args:
            database_id: Database ID
            properties: Properties for the new row
            content: Optional content for the page
            
        Returns:
            Dict with success status and page info
        """
        blocks = []
        if content:
            blocks = self._markdown_to_blocks(content)
        
        payload = {
            'parent': {'database_id': database_id},
            'properties': properties,
            'children': blocks
        }
        
        result = self._make_request('POST', 'pages', payload)
        
        if result['success']:
            page_data = result['data']
            return {
                'success': True,
                'page_id': page_data.get('id', ''),
                'url': page_data.get('url', ''),
                'message': 'Page added to database'
            }
        else:
            return result
    
    def append_blocks(self, page_id: str, content: str) -> Dict[str, Any]:
        """Append content blocks to an existing page
        
        Args:
            page_id: Page ID to append to
            content: Markdown content to append
            
        Returns:
            Dict with success status
        """
        blocks = self._markdown_to_blocks(content)
        
        result = self._make_request('PATCH', f'blocks/{page_id}/children', {'children': blocks})
        
        if result['success']:
            return {'success': True, 'message': 'Content appended'}
        else:
            return result
    
    def _markdown_to_blocks(self, markdown: str) -> List[Dict[str, Any]]:
        """Convert markdown content to Notion blocks
        
        Handles: headings, paragraphs, lists, code blocks, dividers, quotes
        """
        import re
        
        blocks = []
        lines = markdown.split('\n')
        
        i = 0
        while i < len(lines):
            line = lines[i]
            
            # Heading 1
            if line.startswith('# '):
                blocks.append({
                    'object': 'block',
                    'type': 'heading_1',
                    'heading_1': {
                        'rich_text': [{'text': {'content': line[2:]}}]
                    }
                })
            
            # Heading 2
            elif line.startswith('## '):
                blocks.append({
                    'object': 'block',
                    'type': 'heading_2',
                    'heading_2': {
                        'rich_text': [{'text': {'content': line[3:]}}]
                    }
                })
            
            # Heading 3
            elif line.startswith('### '):
                blocks.append({
                    'object': 'block',
                    'type': 'heading_3',
                    'heading_3': {
                        'rich_text': [{'text': {'content': line[4:]}}]
                    }
                })
            
            # Unordered list
            elif line.startswith('- ') or line.startswith('* '):
                blocks.append({
                    'object': 'block',
                    'type': 'bulleted_list_item',
                    'bulleted_list_item': {
                        'rich_text': [{'text': {'content': line[2:]}}]
                    }
                })
            
            # Numbered list
            elif re.match(r'^\d+\. ', line):
                number = re.match(r'^(\d+)\. ', line).group(1)
                blocks.append({
                    'object': 'block',
                    'type': 'numbered_list_item',
                    'numbered_list_item': {
                        'rich_text': [{'text': {'content': line[len(number)+2:]}}]
                    }
                })
            
            # Code block (multi-line)
            elif line.startswith('```'):
                code_content = []
                i += 1
                while i < len(lines) and not lines[i].startswith('```'):
                    code_content.append(lines[i])
                    i += 1
                blocks.append({
                    'object': 'block',
                    'type': 'code',
                    'code': {
                        'rich_text': [{'text': {'content': '\n'.join(code_content)}}],
                        'language': 'markdown'
                    }
                })
            
            # Divider
            elif line.strip() == '---':
                blocks.append({
                    'object': 'block',
                    'type': 'divider',
                    'divider': {}
                })
            
            # Quote
            elif line.startswith('> '):
                blocks.append({
                    'object': 'block',
                    'type': 'quote',
                    'quote': {
                        'rich_text': [{'text': {'content': line[2:]}}]
                    }
                })
            
            # Table
            elif '|' in line and line.strip().startswith('|'):
                # Collect table rows
                table_rows = []
                header_row = [cell.strip() for cell in line.split('|')[1:-1]]
                
                # Skip separator row
                i += 1
                while i < len(lines) and '|' in lines[i]:
                    row = [cell.strip() for cell in lines[i].split('|')[1:-1]]
                    table_rows.append(row)
                    i += 1
                
                if header_row and table_rows:
                    blocks.append({
                        'object': 'block',
                        'type': 'table',
                        'table': {
                            'table_width': len(header_row),
                            'has_column_header': True,
                            'has_row_header': False,
                            'children': [
                                {
                                    'object': 'block',
                                    'type': 'table_row',
                                    'table_row': {
                                        'cells': [{'rich_text': [{'text': {'content': cell}}]} for cell in header_row]
                                    }
                                },
                                *[
                                    {
                                        'object': 'block',
                                        'type': 'table_row',
                                        'table_row': {
                                            'cells': [{'rich_text': [{'text': {'content': cell}}]} for cell in row]
                                        }
                                    }
                                    for row in table_rows
                                ]
                            ]
                        }
                    })
                continue  # Don't increment i again
            
            # Checkbox/task list
            elif line.startswith('- [ ] '):
                blocks.append({
                    'object': 'block',
                    'type': 'to_do',
                    'to_do': {
                        'rich_text': [{'text': {'content': line[6:]}}],
                        'checked': False
                    }
                })
            elif line.startswith('- [x] '):
                blocks.append({
                    'object': 'block',
                    'type': 'to_do',
                    'to_do': {
                        'rich_text': [{'text': {'content': line[6:]}}],
                        'checked': True
                    }
                })
            
            # Regular paragraph
            elif line.strip():
                # Combine consecutive non-special lines into one paragraph
                paragraph_lines = [line]
                while i + 1 < len(lines) and lines[i + 1].strip() and not lines[i + 1].startswith(('#', '-', '>', '|', '```', '- [')):
                    paragraph_lines.append(lines[i + 1])
                    i += 1
                
                if paragraph_lines:
                    blocks.append({
                        'object': 'block',
                        'type': 'paragraph',
                        'paragraph': {
                            'rich_text': [{'text': {'content': ' '.join(paragraph_lines)}}]
                        }
                    })
            
            i += 1
        
        # Ensure we have at least one block
        if not blocks:
            blocks.append({
                'object': 'block',
                'type': 'paragraph',
                'paragraph': {
                    'rich_text': [{'text': {'content': markdown[:2000]}}]
                }
            })
        
        return blocks[:100]  # Notion limit
    
    def search(self, query: str = None, filter_type: str = None) -> Dict[str, Any]:
        """Search Notion for pages and databases
        
        Args:
            query: Search query
            filter_type: Filter by 'page' or 'database'
            
        Returns:
            Dict with search results
        """
        payload = {}
        if query:
            payload['query'] = query
        if filter_type:
            payload['filter'] = {'property': 'object', 'value': filter_type}
        
        return self._make_request('POST', 'search', payload)


def create_notion_deliverable(skill_name: str, title: str, content: str, 
                              user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a Notion deliverable from skill output
    
    This is the main entry point for skill execution to create Notion pages.
    
    Args:
        skill_name: Name of the skill (e.g., 'validation-pack', 'user-persona-creation')
        title: Title for the Notion page
        content: Skill output in markdown format
        user_id: Optional user ID for personal pages
        
    Returns:
        Dict with success status, URL, and any error info
    """
    try:
        notion = NotionMCP()
        
        # Get icon based on skill
        icon = get_skill_icon(skill_name)
        
        # Create the page
        result = notion.create_page(
            title=title,
            content=content,
            icon=icon
        )
        
        if result['success']:
            return {
                'success': True,
                'deliverable_type': 'notion_page',
                'url': result['url'],
                'id': result.get('page_id', ''),
                'message': f'{skill_name} delivered to Notion'
            }
        else:
            # Return error with fallback info
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed to create Notion page'),
                'fallback': 'markdown_document',
                'content': content
            }
    
    except NotionMCPError as e:
        return {
            'success': False,
            'error': 'not_configured',
            'message': str(e),
            'fallback': 'markdown_document',
            'content': content
        }
    except Exception as e:
        return {
            'success': False,
            'error': 'unknown',
            'message': str(e),
            'fallback': 'markdown_document',
            'content': content
        }


def get_skill_icon(skill_name: str) -> str:
    """Get appropriate icon for skill type"""
    icons = {
        'validation-pack': '📋',
        'requirements-elicitation': '📝',
        'user-persona-creation': '👤',
        'competitor-research': '🔍',
        'business-case-modeling': '💰',
        'devils-advocate': '😈',
        'feature-prioritization': '🎯',
        'user-journey-mapping': '🗺️',
        'wireframing': '✏️',
        'design-system': '🎨',
        'information-architecture': '🏗️',
        'architecture-design': '🏛️',
        'schema-design': '🗃️',
        'api-design': '🔌',
        'launch-planning': '🚀',
        'pricing-strategy': '💵',
        'content-strategy': '📰',
        'seo-foundation': '🔎',
        'messaging-framework': '💬',
        'data-visualization': '📊',
        'cohort-analysis': '👥',
        'funnel-analysis': '📉',
        'metrics-dashboard-creation': '📈',
        'roadmap-planning': '🛤️',
        'security-requirements-baseline': '🔒',
        'threat-modeling': '⚠️',
    }
    return icons.get(skill_name, '📄')


if __name__ == '__main__':
    # Test the connector
    import sys
    
    if len(sys.argv) > 1:
        # Test mode: create a sample page
        test_title = sys.argv[1] if len(sys.argv) > 1 else "Test Page"
        test_content = sys.argv[2] if len(sys.argv) > 2 else "# Test\n\nThis is a test page."
        
        result = create_notion_deliverable('test', test_title, test_content)
        print(json.dumps(result, indent=2))
    else:
        print("Notion MCP Connector")
        print("Usage: python notion_mcp.py <title> <content>")
