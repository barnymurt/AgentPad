#!/usr/bin/env python3
"""
Figma MCP Connector

Provides integration with Figma for creating wireframes, design files,
and design-system deliverables from skill outputs.

Usage:
    from figma_mcp import FigmaMCP, create_figma_deliverable
    
    figma = FigmaMCP()
    result = figma.create_wireframe(
        title="Wireframe: Dashboard",
        nodes=[...],
        parent_id=None
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


class FigmaMCPError(Exception):
    """Custom exception for Figma MCP errors"""
    pass


class FigmaMCP:
    """Figma MCP connector for creating design files"""
    
    def __init__(self, access_token: str = None):
        self.access_token = access_token or os.environ.get('FIGMA_API_KEY', '')
        self.base_url = 'https://api.figma.com/v1'
        
        if not self.access_token:
            raise FigmaMCPError("FIGMA_API_KEY not configured")
    
    def _headers(self) -> Dict[str, str]:
        return {
            'X-Figma-Token': self.access_token,
            'Content-Type': 'application/json'
        }
    
    def _make_request(self, method: str, endpoint: str, data: dict = None) -> Dict[str, Any]:
        import requests
        
        url = f"{self.base_url}/{endpoint}"
        headers = self._headers()
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, headers=headers, json=data, timeout=30)
            else:
                return {'success': False, 'error': 'unsupported_method', 'message': f'{method} not supported'}
            
            if response.status_code == 200:
                return {'success': True, 'data': response.json()}
            elif response.status_code == 401:
                return {'success': False, 'error': 'auth_failure', 'message': 'Invalid or expired Figma access token'}
            elif response.status_code == 403:
                return {'success': False, 'error': 'permission_denied', 'message': 'Insufficient permissions'}
            elif response.status_code == 429:
                return {'success': False, 'error': 'rate_limit', 'message': 'Figma API rate limit exceeded'}
            else:
                return {'success': False, 'error': 'api_error', 'message': f'Figma API error: {response.status_code}'}
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'timeout', 'message': 'Request to Figma timed out'}
        except Exception as e:
            return {'success': False, 'error': 'unknown', 'message': str(e)}
    
    def get_file(self, file_key: str) -> Dict[str, Any]:
        """Get a Figma file by key
        
        Args:
            file_key: The Figma file key (from URL)
            
        Returns:
            Dict with file data
        """
        return self._make_request('GET', f'files/{file_key}')
    
    def get_file_images(self, file_key: str, node_ids: List[str], 
                       format: str = 'png', scale: float = 2.0) -> Dict[str, Any]:
        """Get images for Figma nodes
        
        Args:
            file_key: The Figma file key
            node_ids: List of node IDs to render
            format: Image format (png, jpg, svg, pdf)
            scale: Scale factor (1, 2, 3, 4)
            
        Returns:
            Dict with image URLs
        """
        node_str = ','.join(node_ids)
        params = f'ids={node_str}&format={format}&scale={scale}'
        return self._make_request('GET', f'images/{file_key}?{params}')
    
    def create_wireframe(self, title: str, content: Dict, 
                        parent_id: str = None) -> Dict[str, Any]:
        """Create a wireframe structure (returns spec for manual creation)
        
        Since Figma API doesn't support creating files directly without a template,
        this returns a detailed specification that can be used to create the file.
        
        Args:
            title: Wireframe title
            content: Wireframe specification with nodes, frames, components
            parent_id: Parent project ID (optional)
            
        Returns:
            Dict with wireframe specification and instructions
        """
        # Build wireframe specification
        spec = {
            'title': title,
            'version': '1.0',
            'frames': content.get('frames', []),
            'components': content.get('components', []),
            'styles': content.get('styles', {}),
            'created_from': 'BobAI skill output'
        }
        
        # Return spec that can be used with Figma UI or automation
        return {
            'success': True,
            'deliverable_type': 'figma_wireframe',
            'spec': spec,
            'message': 'Wireframe specification created. Use Figma UI to create file from spec.',
            'instructions': [
                '1. Open Figma and create a new file',
                '2. Use the specification to build frames and components',
                '3. Or use figma_mcp.create_from_spec() with Figma plugin API'
            ]
        }
    
    def create_design_system(self, title: str, tokens: Dict) -> Dict[str, Any]:
        """Create a design system specification
        
        Args:
            title: Design system name
            tokens: Design tokens (colors, typography, spacing, shadows)
            
        Returns:
            Dict with design system specification
        """
        spec = {
            'title': title,
            'type': 'design_system',
            'version': '1.0',
            'tokens': tokens,
            'created_from': 'BobAI skill output'
        }
        
        return {
            'success': True,
            'deliverable_type': 'figma_design_system',
            'spec': spec,
            'message': 'Design system specification created'
        }
    
    def export_wireframe_images(self, file_key: str, node_ids: List[str]) -> Dict[str, Any]:
        """Export wireframe as images
        
        Args:
            file_key: Figma file key
            node_ids: Node IDs to export
            
        Returns:
            Dict with image URLs
        """
        return self.get_file_images(file_key, node_ids, format='png', scale=2.0)


def create_figma_deliverable(skill_name: str, title: str, content: Any,
                             user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a Figma deliverable from skill output
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        figma = FigmaMCP()
        
        # Parse content based on skill type
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {'raw_content': content}
        
        # Route to appropriate creator
        if skill_name in ['wireframing', 'ui-patterns', 'responsive-patterns']:
            result = figma.create_wireframe(title, content)
        elif skill_name in ['design-system', 'component-architecture']:
            result = figma.create_design_system(title, content)
        else:
            result = figma.create_wireframe(title, {'frames': [content]})
        
        if result['success']:
            return {
                'success': True,
                'deliverable_type': result['deliverable_type'],
                'spec': result.get('spec'),
                'message': f'{skill_name} delivered to Figma',
                'fallback': 'notion_document'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed to create Figma deliverable'),
                'fallback': 'notion_document'
            }
    
    except FigmaMCPError as e:
        return {
            'success': False,
            'error': 'not_configured',
            'message': str(e),
            'fallback': 'notion_document'
        }
    except Exception as e:
        return {
            'success': False,
            'error': 'unknown',
            'message': str(e),
            'fallback': 'notion_document'
        }


def get_skill_figma_type(skill_name: str) -> str:
    """Get the appropriate Figma deliverable type for a skill"""
    types = {
        'wireframing': 'wireframe',
        'ui-patterns': 'wireframe',
        'responsive-patterns': 'wireframe',
        'design-system': 'design_system',
        'component-architecture': 'design_system',
        'accessibility-review': 'audit',
        'animation-motion': 'prototype'
    }
    return types.get(skill_name, 'wireframe')


if __name__ == '__main__':
    print("Figma MCP Connector")
    print("Usage: Import and call create_figma_deliverable()")
