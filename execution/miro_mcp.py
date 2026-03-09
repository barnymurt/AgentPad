#!/usr/bin/env python3
"""
Miro MCP Connector

Provides integration with Miro for creating boards, mind maps,
user journey maps, and visual deliverables from skill outputs.

Usage:
    from miro_mcp import MiroMCP, create_miro_deliverable
    
    miro = MiroMCP()
    result = miro.create_board(
        title="User Journey: My App",
        content={...}
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


class MiroMCPError(Exception):
    """Custom exception for Miro MCP errors"""
    pass


class MiroMCP:
    """Miro MCP connector for creating boards and visual content"""
    
    def __init__(self, access_token: str = None):
        self.access_token = access_token or os.environ.get('MIRO_API_KEY', '')
        self.base_url = 'https://api.miro.com/v2'
        
        if not self.access_token:
            raise MiroMCPError("MIRO_API_KEY not configured")
    
    def _headers(self) -> Dict[str, str]:
        return {
            'Authorization': f'Bearer {self.access_token}',
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
            elif method == 'PATCH':
                response = requests.patch(url, headers=headers, json=data, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)
            else:
                return {'success': False, 'error': 'unsupported_method', 'message': f'{method} not supported'}
            
            if response.status_code in (200, 201):
                return {'success': True, 'data': response.json()}
            elif response.status_code == 401:
                return {'success': False, 'error': 'auth_failure', 'message': 'Invalid or expired Miro access token'}
            elif response.status_code == 403:
                return {'success': False, 'error': 'permission_denied', 'message': 'Insufficient permissions'}
            elif response.status_code == 429:
                return {'success': False, 'error': 'rate_limit', 'message': 'Miro API rate limit exceeded'}
            else:
                return {'success': False, 'error': 'api_error', 'message': f'Miro API error: {response.status_code}'}
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'timeout', 'message': 'Request to Miro timed out'}
        except Exception as e:
            return {'success': False, 'error': 'unknown', 'message': str(e)}
    
    def create_board(self, name: str, description: str = None,
                     team_id: str = None) -> Dict[str, Any]:
        """Create a new Miro board
        
        Args:
            name: Board name
            description: Board description
            team_id: Team ID (optional)
            
        Returns:
            Dict with board info
        """
        payload = {'name': name}
        if description:
            payload['description'] = description
        if team_id:
            payload['teamId'] = team_id
        
        result = self._make_request('POST', 'boards', payload)
        
        if result['success']:
            board_data = result['data']
            return {
                'success': True,
                'board_id': board_data.get('id', ''),
                'url': board_data.get('viewLink', ''),
                'message': 'Board created successfully'
            }
        else:
            return result
    
    def add_sticky_note(self, board_id: str, content: str,
                       position: Dict = None) -> Dict[str, Any]:
        """Add a sticky note to a board
        
        Args:
            board_id: Board ID
            content: Sticky note text
            position: Position {x, y}
            
        Returns:
            Dict with sticky note info
        """
        data = {
            'type': 'sticky_note',
            'data': {'content': content},
            'position': position or {'x': 0, 'y': 0}
        }
        
        result = self._make_request('POST', f'boards/{board_id}/sticky_notes', data)
        
        if result['success']:
            return {
                'success': True,
                'item_id': result['data'].get('id'),
                'message': 'Sticky note added'
            }
        return result
    
    def add_shape(self, board_id: str, shape: str, content: str = None,
                  position: Dict = None) -> Dict[str, Any]:
        """Add a shape to a board
        
        Args:
            board_id: Board ID
            shape: Shape type (rectangle, circle, triangle)
            content: Optional text content
            position: Position {x, y}
            
        Returns:
            Dict with shape info
        """
        data = {
            'type': 'shape',
            'data': {'shape': shape},
            'position': position or {'x': 0, 'y': 0}
        }
        if content:
            data['data']['content'] = content
        
        result = self._make_request('POST', f'boards/{board_id}/shapes', data)
        
        if result['success']:
            return {
                'success': True,
                'item_id': result['data'].get('id'),
                'message': 'Shape added'
            }
        return result
    
    def add_text(self, board_id: str, content: str,
                position: Dict = None) -> Dict[str, Any]:
        """Add text to a board
        
        Args:
            board_id: Board ID
            content: Text content
            position: Position {x, y}
            
        Returns:
            Dict with text info
        """
        data = {
            'type': 'text',
            'data': {'content': content},
            'position': position or {'x': 0, 'y': 0}
        }
        
        result = self._make_request('POST', f'boards/{board_id}/texts', data)
        
        if result['success']:
            return {
                'success': True,
                'item_id': result['data'].get('id'),
                'message': 'Text added'
            }
        return result
    
    def create_user_journey_board(self, title: str, stages: List[Dict]) -> Dict[str, Any]:
        """Create a user journey map board
        
        Args:
            title: Board title
            stages: List of journey stages with touchpoints
            
        Returns:
            Dict with board info and items created
        """
        # Create board first
        board_result = self.create_board(
            name=title,
            description=f"User journey map created from BobAI skill output"
        )
        
        if not board_result['success']:
            return board_result
        
        board_id = board_result['board_id']
        
        # Add stages as columns/sections
        x_pos = 0
        for i, stage in enumerate(stages):
            # Add stage header
            self.add_shape(
                board_id, 'rectangle', 
                f"## {stage.get('name', f'Stage {i+1}')}",
                {'x': x_pos, 'y': -200}
            )
            
            # Add touchpoints as sticky notes
            touchpoints = stage.get('touchpoints', [])
            y_pos = -100
            for j, tp in enumerate(touchpoints):
                self.add_sticky_note(
                    board_id,
                    f"**{tp.get('name', '')}**\n{tp.get('description', '')}",
                    {'x': x_pos, 'y': y_pos}
                )
                y_pos += 150
            
            x_pos += 300
        
        return {
            'success': True,
            'deliverable_type': 'miro_board',
            'board_id': board_id,
            'url': board_result['url'],
            'message': f'User journey map created with {len(stages)} stages'
        }
    
    def create_mind_map_board(self, title: str, data: Dict) -> Dict[str, Any]:
        """Create a mind map board
        
        Args:
            title: Board title
            data: Mind map data with root and children
            
        Returns:
            Dict with board info
        """
        board_result = self.create_board(
            name=title,
            description="Mind map created from BobAI skill output"
        )
        
        if not board_result['success']:
            return board_result
        
        board_id = board_result['board_id']
        
        # Add root node
        root_content = data.get('root', title)
        self.add_sticky_note(board_id, root_content, {'x': 0, 'y': 0})
        
        # Add children
        children = data.get('children', [])
        x_pos = 300
        for child in children:
            self.add_sticky_note(
                board_id,
                child.get('content', ''),
                {'x': x_pos, 'y': (children.index(child) - len(children)/2) * 150}
            )
            x_pos += 250
        
        return {
            'success': True,
            'deliverable_type': 'miro_board',
            'board_id': board_id,
            'url': board_result['url'],
            'message': 'Mind map board created'
        }


def create_miro_deliverable(skill_name: str, title: str, content: Any,
                            user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a Miro deliverable from skill output
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        miro = MiroMCP()
        
        # Parse content
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {'raw_content': content}
        
        # Route based on skill type
        if skill_name == 'user-journey-mapping':
            stages = content.get('journey_stages', [])
            result = miro.create_user_journey_board(title, stages)
        elif skill_name in ['information-architecture', 'process-mapping']:
            result = miro.create_mind_map_board(title, content)
        elif skill_name in ['devils-advocate', 'stakeholder-analysis']:
            result = miro.create_mind_map_board(title, content)
        else:
            # Generic board
            result = miro.create_board(name=title, description=str(content)[:500])
        
        if result['success']:
            return {
                'success': True,
                'deliverable_type': 'miro_board',
                'url': result.get('url', ''),
                'board_id': result.get('board_id', ''),
                'message': f'{skill_name} delivered to Miro'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed to create Miro deliverable'),
                'fallback': 'notion_document'
            }
    
    except MiroMCPError as e:
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


if __name__ == '__main__':
    print("Miro MCP Connector")
    print("Usage: Import and call create_miro_deliverable()")
