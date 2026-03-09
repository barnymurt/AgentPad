#!/usr/bin/env python3
"""
Vercel MCP Connector

Provides integration with Vercel for deployments, projects,
and serverless functions from skill outputs.

Usage:
    from vercel_mcp import VercelMCP, create_vercel_deliverable
    
    vercel = VercelMCP()
    result = vercel.create_deployment(project="my-project", files=[...])
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


class VercelMCPError(Exception):
    """Custom exception for Vercel MCP errors"""
    pass


class VercelMCP:
    """Vercel MCP connector for deployments and projects"""
    
    def __init__(self, token: str = None):
        self.token = token or os.environ.get('VERCEL_TOKEN', '')
        self.base_url = 'https://api.vercel.com'
        
        if not self.token:
            raise VercelMCPError("VERCEL_TOKEN not configured")
    
    def _headers(self) -> Dict[str, str]:
        return {
            'Authorization': f'Bearer {self.token}',
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
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)
            else:
                return {'success': False, 'error': 'unsupported_method'}
            
            if response.status_code in (200, 201):
                return {'success': True, 'data': response.json()}
            elif response.status_code == 401:
                return {'success': False, 'error': 'auth_failure', 'message': 'Invalid Vercel token'}
            elif response.status_code == 403:
                return {'success': False, 'error': 'permission_denied', 'message': 'Insufficient permissions'}
            elif response.status_code == 429:
                return {'success': False, 'error': 'rate_limit', 'message': 'Vercel API rate limit'}
            else:
                return {'success': False, 'error': 'api_error', 'message': f'Vercel error: {response.status_code}'}
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'timeout'}
        except Exception as e:
            return {'success': False, 'error': 'unknown', 'message': str(e)}
    
    def list_deployments(self, project_id: str = None) -> Dict[str, Any]:
        """List deployments
        
        Args:
            project_id: Optional project ID
            
        Returns:
            Dict with deployments
        """
        endpoint = f'v6/deployments'
        if project_id:
            endpoint += f'?projectId={project_id}'
        
        return self._make_request('GET', endpoint)
    
    def get_deployment(self, deployment_id: str) -> Dict[str, Any]:
        """Get deployment details
        
        Args:
            deployment_id: Deployment ID
            
        Returns:
            Dict with deployment info
        """
        return self._make_request('GET', f'v6/deployments/{deployment_id}')
    
    def create_deployment(self, name: str, files: List[Dict] = None,
                        project_id: str = None) -> Dict[str, Any]:
        """Create a new deployment
        
        Note: This is a simplified version. Real implementation would need
        to upload files first using the Vercel Files API.
        
        Args:
            name: Project name
            files: List of files to deploy
            project_id: Project ID
            
        Returns:
            Dict with deployment info
        """
        payload = {
            'name': name,
            'files': files or [],
            'public': True
        }
        if project_id:
            payload['projectId'] = project_id
        
        return self._make_request('POST', 'v6/deployments', payload)
    
    def list_projects(self) -> Dict[str, Any]:
        """List all projects
        
        Returns:
            Dict with projects
        """
        return self._make_request('GET', 'v6/projects')
    
    def create_project(self, name: str, framework: str = None) -> Dict[str, Any]:
        """Create a new project
        
        Args:
            name: Project name
            framework: Framework (nextjs, react, vue, etc.)
            
        Returns:
            Dict with project info
        """
        payload = {'name': name}
        if framework:
            payload['framework'] = framework
        
        return self._make_request('POST', 'v6/projects', payload)
    
    def get_project_env(self, project_id: str) -> Dict[str, Any]:
        """Get project environment variables
        
        Args:
            project_id: Project ID
            
        Returns:
            Dict with env vars
        """
        return self._make_request('GET', f'v6/projects/{project_id}/env')
    
    def add_project_env(self, project_id: str, key: str, value: str,
                       env_type: str = 'production') -> Dict[str, Any]:
        """Add environment variable
        
        Args:
            project_id: Project ID
            key: Variable name
            value: Variable value
            env_type: Type (production, preview, development)
            
        Returns:
            Dict with result
        """
        payload = {
            'key': key,
            'value': value,
            'target': [env_type]
        }
        
        return self._make_request('POST', f'v6/projects/{project_id}/env', payload)
    
    def get_deployment_status(self, deployment_id: str) -> Dict[str, Any]:
        """Get deployment status
        
        Args:
            deployment_id: Deployment ID
            
        Returns:
            Dict with status
        """
        return self._make_request('GET', f'v2/deployments/{deployment_id}')


def create_vercel_deliverable(skill_name: str, title: str, content: Any,
                              user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a Vercel deliverable
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        vercel = VercelMCP()
        
        # Parse content
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {'raw_content': content}
        
        # Route based on skill type
        if skill_name == 'serverless-development':
            # Create project or return spec
            result = vercel.create_project(
                name=title.lower().replace(' ', '-'),
                framework=content.get('framework', 'nextjs')
            )
        elif skill_name == 'infrastructure-as-code':
            # Return infrastructure spec
            return {
                'success': True,
                'deliverable_type': 'vercel_config',
                'spec': content,
                'message': 'Infrastructure spec created - configure in Vercel dashboard',
                'fallback': 'github_content'
            }
        else:
            # List projects as generic action
            result = vercel.list_projects()
        
        if result.get('success'):
            return {
                'success': True,
                'deliverable_type': 'vercel_project',
                'message': f'{skill_name} delivered to Vercel'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed'),
                'fallback': 'notion_document'
            }
    
    except VercelMCPError as e:
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
    print("Vercel MCP Connector")
    print("Usage: Import and call create_vercel_deliverable()")
