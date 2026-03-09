#!/usr/bin/env python3
"""
Jira MCP Connector

Provides integration with Jira for creating issues, projects,
and agile boards from skill outputs.

Usage:
    from jira_mcp import JiraMCP, create_jira_deliverable
    
    jira = JiraMCP()
    result = jira.create_issues(project="PROJ", issues=[...])
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


class JiraMCPError(Exception):
    """Custom exception for Jira MCP errors"""
    pass


class JiraMCP:
    """Jira MCP connector for creating issues and projects"""
    
    def __init__(self, domain: str = None, email: str = None, token: str = None):
        self.domain = domain or os.environ.get('JIRA_DOMAIN', '')
        self.email = email or os.environ.get('JIRA_EMAIL', '')
        self.token = token or os.environ.get('JIRA_TOKEN', '')
        
        if not self.domain or not self.token:
            raise JiraMCPError("JIRA_DOMAIN and JIRA_TOKEN not configured")
    
    def _headers(self) -> Dict[str, str]:
        import base64
        credentials = f"{self.email}:{self.token}"
        auth = base64.b64encode(credentials.encode()).decode()
        
        return {
            'Authorization': f'Basic {auth}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    
    def _make_request(self, method: str, endpoint: str, data: dict = None) -> Dict[str, Any]:
        import requests
        
        url = f"https://{self.domain}/rest/api/3/{endpoint}"
        headers = self._headers()
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, headers=headers, json=data, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, headers=headers, json=data, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)
            else:
                return {'success': False, 'error': 'unsupported_method'}
            
            if response.status_code in (200, 201, 204):
                return {'success': True, 'data': response.json() if response.content else {}}
            elif response.status_code == 401:
                return {'success': False, 'error': 'auth_failure', 'message': 'Invalid Jira credentials'}
            elif response.status_code == 403:
                return {'success': False, 'error': 'permission_denied', 'message': 'Insufficient permissions'}
            elif response.status_code == 429:
                return {'success': False, 'error': 'rate_limit', 'message': 'Jira API rate limit'}
            else:
                return {'success': False, 'error': 'api_error', 'message': f'Jira error: {response.status_code}'}
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'timeout'}
        except Exception as e:
            return {'success': False, 'error': 'unknown', 'message': str(e)}
    
    def create_issue(self, project_key: str, summary: str, issue_type: str = 'Task',
                    description: str = None) -> Dict[str, Any]:
        """Create an issue
        
        Args:
            project_key: Project key (e.g., 'PROJ')
            summary: Issue summary
            issue_type: Issue type (Task, Story, Bug, Epic)
            description: Issue description
            
        Returns:
            Dict with issue info
        """
        payload = {
            'fields': {
                'project': {'key': project_key},
                'summary': summary,
                'issuetype': {'name': issue_type}
            }
        }
        
        if description:
            payload['fields']['description'] = {
                'type': 'doc',
                'version': 1,
                'content': [
                    {
                        'type': 'paragraph',
                        'content': [{'type': 'text', 'text': description}]
                    }
                ]
            }
        
        result = self._make_request('POST', 'issue', payload)
        
        if result['success']:
            issue_data = result['data']
            return {
                'success': True,
                'issue_key': issue_data.get('key'),
                'issue_id': issue_data.get('id'),
                'url': f"https://{self.domain}/browse/{issue_data.get('key')}",
                'message': 'Issue created successfully'
            }
        return result
    
    def create_issues_batch(self, project_key: str, issues: List[Dict]) -> Dict[str, Any]:
        """Create multiple issues
        
        Args:
            project_key: Project key
            issues: List of issue dicts with summary, description, type
            
        Returns:
            Dict with created issues
        """
        created = []
        errors = []
        
        for issue in issues:
            result = self.create_issue(
                project_key=project_key,
                summary=issue.get('summary', ''),
                issue_type=issue.get('type', 'Task'),
                description=issue.get('description')
            )
            
            if result['success']:
                created.append(result)
            else:
                errors.append({'issue': issue.get('summary'), 'error': result.get('message')})
        
        return {
            'success': len(errors) == 0,
            'created': len(created),
            'issues': created,
            'errors': errors,
            'message': f'Created {len(created)} issues'
        }
    
    def create_epic(self, project_key: str, name: str, summary: str = None) -> Dict[str, Any]:
        """Create an epic
        
        Args:
            project_key: Project key
            name: Epic name
            summary: Optional summary
            
        Returns:
            Dict with epic info
        """
        return self.create_issue(
            project_key=project_key,
            summary=summary or name,
            issue_type='Epic'
        )
    
    def create_sprint_issues(self, project_key: str, issues: List[Dict]) -> Dict[str, Any]:
        """Create issues for a sprint
        
        Args:
            project_key: Project key
            issues: List of issues
            
        Returns:
            Dict with created issues
        """
        return self.create_issues_batch(project_key, issues)
    
    def add_comment(self, issue_key: str, comment: str) -> Dict[str, Any]:
        """Add comment to issue
        
        Args:
            issue_key: Issue key
            comment: Comment text
            
        Returns:
            Dict with result
        """
        payload = {
            'body': {
                'type': 'doc',
                'version': 1,
                'content': [
                    {
                        'type': 'paragraph',
                        'content': [{'type': 'text', 'text': comment}]
                    }
                ]
            }
        }
        
        return self._make_request('POST', f'issue/{issue_key}/comment', payload)
    
    def link_issues(self, issue_key1: str, issue_key2: str, 
                   link_type: str = 'Blocks') -> Dict[str, Any]:
        """Link two issues
        
        Args:
            issue_key1: First issue key
            issue_key2: Second issue key
            link_type: Link type (Blocks, Relates to, etc.)
            
        Returns:
            Dict with result
        """
        link_types = {
            'Blocks': '10001',
            'Relates to': '10002',
            'Duplicates': '10003'
        }
        
        payload = {
            'type': {'id': link_types.get(link_type, '10001')},
            'inwardIssue': {'key': issue_key1},
            'outwardIssue': {'key': issue_key2}
        }
        
        return self._make_request('POST', 'issueLink', payload)


def create_jira_deliverable(skill_name: str, title: str, content: Any,
                            user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a Jira deliverable
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        jira = JiraMCP()
        
        # Parse content
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {'raw_content': content}
        
        project_key = os.environ.get('JIRA_DEFAULT_PROJECT', 'PROJ')
        
        # Route based on skill type
        if skill_name == 'ticket-refinement':
            tickets = content.get('tickets', [])
            result = jira.create_issues_batch(project_key, tickets)
        elif skill_name == 'roadmap-planning':
            items = content.get('roadmap_items', [])
            issues = [{'summary': item.get('title', ''), 'description': item.get('description', '')} for item in items]
            result = jira.create_issues_batch(project_key, issues)
        else:
            # Generic issue
            result = jira.create_issue(
                project_key=project_key,
                summary=title,
                description=str(content)[:5000]
            )
        
        if result.get('success') or result.get('created', 0) > 0:
            return {
                'success': True,
                'deliverable_type': 'jira_issues',
                'issues_created': result.get('created', 1),
                'message': f'{skill_name} delivered to Jira'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed'),
                'fallback': 'notion_document'
            }
    
    except JiraMCPError as e:
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
    print("Jira MCP Connector")
    print("Usage: Import and call create_jira_deliverable()")
