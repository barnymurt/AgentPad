#!/usr/bin/env python3
"""
Linear MCP Connector

Provides integration with Linear for creating issues, projects,
and roadmaps from skill outputs.

Usage:
    from linear_mcp import LinearMCP, create_linear_deliverable
    
    linear = LinearMCP()
    result = linear.create_issues(
        project_id="...",
        issues=[...]
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


class LinearMCPError(Exception):
    """Custom exception for Linear MCP errors"""
    pass


class LinearMCP:
    """Linear MCP connector for creating issues and projects"""
    
    def __init__(self, api_key: str = None, team_id: str = None):
        self.api_key = api_key or os.environ.get('LINEAR_API_KEY', '')
        self.team_id = team_id or os.environ.get('LINEAR_TEAM_ID', '')
        self.base_url = 'https://api.linear.app/graphql'
        
        if not self.api_key:
            raise LinearMCPError("LINEAR_API_KEY not configured")
    
    def _headers(self) -> Dict[str, str]:
        return {
            'Authorization': self.api_key,
            'Content-Type': 'application/json'
        }
    
    def _make_request(self, query: str, variables: dict = None) -> Dict[str, Any]:
        import requests
        
        payload = {'query': query}
        if variables:
            payload['variables'] = variables
        
        try:
            response = requests.post(
                self.base_url, 
                headers=self._headers(), 
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                data = response.json()
                if 'errors' in data:
                    return {'success': False, 'error': 'graphql_error', 'message': data['errors']}
                return {'success': True, 'data': data.get('data', {})}
            elif response.status_code == 401:
                return {'success': False, 'error': 'auth_failure', 'message': 'Invalid Linear API key'}
            elif response.status_code == 429:
                return {'success': False, 'error': 'rate_limit', 'message': 'Linear API rate limit exceeded'}
            else:
                return {'success': False, 'error': 'api_error', 'message': f'Linear API error: {response.status_code}'}
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'timeout', 'message': 'Request to Linear timed out'}
        except Exception as e:
            return {'success': False, 'error': 'unknown', 'message': str(e)}
    
    def create_issue(self, title: str, description: str = None,
                    team_id: str = None, state: str = 'backlog',
                    priority: int = 2) -> Dict[str, Any]:
        """Create a new issue
        
        Args:
            title: Issue title
            description: Issue description (markdown)
            team_id: Team ID (uses default if not provided)
            state: Initial state (backlog, todo, in_progress, done)
            priority: Priority (0=no priority, 1=urgent, 2=high, 3=medium, 4=low)
            
        Returns:
            Dict with issue info
        """
        team_id = team_id or self.team_id
        if not team_id:
            return {'success': False, 'error': 'no_team', 'message': 'No team ID provided'}
        
        query = '''
        mutation IssueCreate($input: IssueCreateInput!) {
            issueCreate(input: $input) {
                success
                issue {
                    id
                    identifier
                    title
                    url
                }
            }
        }
        '''
        
        state_map = {
            'backlog': 'backlog',
            'todo': 'todo', 
            'in_progress': 'in_progress',
            'done': 'done'
        }
        
        variables = {
            'input': {
                'teamId': team_id,
                'title': title,
                'description': description or '',
                'state': state_map.get(state, 'backlog'),
                'priority': priority
            }
        }
        
        result = self._make_request(query, variables)
        
        if result['success']:
            issue_data = result['data'].get('issueCreate', {}).get('issue', {})
            return {
                'success': True,
                'issue_id': issue_data.get('id'),
                'issue_identifier': issue_data.get('identifier'),
                'url': issue_data.get('url'),
                'message': 'Issue created successfully'
            }
        return result
    
    def create_issues_batch(self, issues: List[Dict], 
                           team_id: str = None) -> Dict[str, Any]:
        """Create multiple issues at once
        
        Args:
            issues: List of issue dicts with title, description, priority
            team_id: Team ID
            
        Returns:
            Dict with created issues
        """
        team_id = team_id or self.team_id
        if not team_id:
            return {'success': False, 'error': 'no_team', 'message': 'No team ID provided'}
        
        created = []
        errors = []
        
        for issue in issues:
            result = self.create_issue(
                title=issue.get('title', ''),
                description=issue.get('description'),
                team_id=team_id,
                state=issue.get('state', 'backlog'),
                priority=issue.get('priority', 2)
            )
            
            if result['success']:
                created.append(result)
            else:
                errors.append({'issue': issue.get('title'), 'error': result.get('message')})
        
        return {
            'success': len(errors) == 0,
            'created': len(created),
            'issues': created,
            'errors': errors,
            'message': f'Created {len(created)} issues'
        }
    
    def create_project(self, name: str, description: str = None,
                      team_id: str = None) -> Dict[str, Any]:
        """Create a new project
        
        Args:
            name: Project name
            description: Project description
            team_id: Team ID
            
        Returns:
            Dict with project info
        """
        team_id = team_id or self.team_id
        
        query = '''
        mutation ProjectCreate($input: ProjectCreateInput!) {
            projectCreate(input: $input) {
                success
                project {
                    id
                    name
                    url
                }
            }
        }
        '''
        
        variables = {
            'input': {
                'teamId': team_id,
                'name': name,
                'description': description or ''
            }
        }
        
        result = self._make_request(query, variables)
        
        if result['success']:
            project_data = result['data'].get('projectCreate', {}).get('project', {})
            return {
                'success': True,
                'project_id': project_data.get('id'),
                'name': project_data.get('name'),
                'url': project_data.get('url'),
                'message': 'Project created successfully'
            }
        return result
    
    def create_roadmap(self, title: str, items: List[Dict]) -> Dict[str, Any]:
        """Create a roadmap with issues
        
        Args:
            title: Roadmap/project title
            items: List of roadmap items with title, description, milestone
            
        Returns:
            Dict with project and issues
        """
        # Create project first
        project_result = self.create_project(
            name=title,
            description=f"Roadmap created from BobAI skill output"
        )
        
        if not project_result['success']:
            return project_result
        
        # Create issues for each item
        issues = []
        for item in items:
            issues.append({
                'title': item.get('title', ''),
                'description': item.get('description', ''),
                'state': item.get('state', 'backlog'),
                'priority': item.get('priority', 2)
            })
        
        issues_result = self.create_issues_batch(issues)
        
        return {
            'success': True,
            'deliverable_type': 'linear_roadmap',
            'project_id': project_result.get('project_id'),
            'url': project_result.get('url'),
            'issues_created': issues_result.get('created', 0),
            'message': f'Roadmap created with {issues_result.get("created", 0)} issues'
        }
    
    def create_feature_backlog(self, title: str, features: List[Dict]) -> Dict[str, Any]:
        """Create a feature backlog as issues
        
        Args:
            title: Backlog title
            features: List of features with title, description, priority
            
        Returns:
            Dict with created issues
        """
        # Map priority to Linear priority
        priority_map = {
            'P0': 1,  # Urgent
            'P1': 2,  # High
            'P2': 3,  # Medium
            'P3': 4   # Low
        }
        
        issues = []
        for feature in features:
            priority_str = feature.get('priority', 'P2')
            priority = priority_map.get(priority_str, 3)
            
            description = f"""
**Priority:** {priority_str}
**Quadrant:** {feature.get('quadrant', 'N/A')}

{feature.get('description', '')}

---
*Created from BobAI Feature Prioritization*
"""
            
            issues.append({
                'title': feature.get('title', ''),
                'description': description,
                'priority': priority,
                'state': 'backlog'
            })
        
        return self.create_issues_batch(issues)


def create_linear_deliverable(skill_name: str, title: str, content: Any,
                             user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a Linear deliverable from skill output
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        linear = LinearMCP()
        
        # Parse content
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {'raw_content': content}
        
        # Route based on skill type
        if skill_name == 'feature-prioritization':
            features = content.get('features', [])
            result = linear.create_feature_backlog(title, features)
        elif skill_name == 'roadmap-planning':
            items = content.get('roadmap_items', [])
            result = linear.create_roadmap(title, items)
        elif skill_name == 'ticket-refinement':
            tickets = content.get('tickets', [])
            result = linear.create_issues_batch(tickets)
        elif skill_name == 'iteration-planning':
            items = content.get('items', [])
            result = linear.create_issues_batch(items)
        else:
            # Generic single issue
            result = linear.create_issue(
                title=title,
                description=str(content)[:2000]
            )
        
        if result.get('success') or result.get('created', 0) > 0:
            return {
                'success': True,
                'deliverable_type': 'linear_issues',
                'url': result.get('url', ''),
                'issues_created': result.get('created', 1),
                'message': f'{skill_name} delivered to Linear'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed to create Linear deliverable'),
                'fallback': 'notion_document'
            }
    
    except LinearMCPError as e:
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
    print("Linear MCP Connector")
    print("Usage: Import and call create_linear_deliverable()")
