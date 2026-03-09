#!/usr/bin/env python3
"""
GitHub MCP Connector

Provides integration with GitHub for creating issues, repositories,
pull requests, and code-related deliverables from skill outputs.

Usage:
    from github_mcp import GitHubMCP, create_github_deliverable
    
    github = GitHubMCP()
    result = github.create_issues(repo="owner/repo", issues=[...])
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


class GitHubMCPError(Exception):
    """Custom exception for GitHub MCP errors"""
    pass


class GitHubMCP:
    """GitHub MCP connector for creating issues, repos, and code content"""
    
    def __init__(self, token: str = None, owner: str = None):
        self.token = token or os.environ.get('GITHUB_TOKEN', '')
        self.owner = owner or os.environ.get('GITHUB_OWNER', '')
        self.base_url = 'https://api.github.com'
        
        if not self.token:
            raise GitHubMCPError("GITHUB_TOKEN not configured")
    
    def _headers(self) -> Dict[str, str]:
        return {
            'Authorization': f'token {self.token}',
            'Accept': 'application/vnd.github.v3+json',
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
                return {'success': False, 'error': 'unsupported_method'}
            
            if response.status_code in (200, 201, 204):
                return {'success': True, 'data': response.json() if response.content else {}}
            elif response.status_code == 401:
                return {'success': False, 'error': 'auth_failure', 'message': 'Invalid GitHub token'}
            elif response.status_code == 403:
                return {'success': False, 'error': 'rate_limit', 'message': 'GitHub API rate limit'}
            elif response.status_code == 404:
                return {'success': False, 'error': 'not_found', 'message': 'Resource not found'}
            else:
                return {'success': False, 'error': 'api_error', 'message': f'GitHub error: {response.status_code}'}
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'timeout', 'message': 'Request timed out'}
        except Exception as e:
            return {'success': False, 'error': 'unknown', 'message': str(e)}
    
    def create_issue(self, repo: str, title: str, body: str = None,
                    labels: List[str] = None) -> Dict[str, Any]:
        """Create an issue
        
        Args:
            repo: Repository in "owner/repo" format
            title: Issue title
            body: Issue body
            labels: List of labels
            
        Returns:
            Dict with issue info
        """
        payload = {'title': title}
        if body:
            payload['body'] = body
        if labels:
            payload['labels'] = labels
        
        result = self._make_request('POST', f'repos/{repo}/issues', payload)
        
        if result['success']:
            issue_data = result['data']
            return {
                'success': True,
                'issue_number': issue_data.get('number'),
                'url': issue_data.get('html_url'),
                'message': 'Issue created successfully'
            }
        return result
    
    def create_issues_batch(self, repo: str, issues: List[Dict]) -> Dict[str, Any]:
        """Create multiple issues
        
        Args:
            repo: Repository in "owner/repo" format
            issues: List of issue dicts with title, body, labels
            
        Returns:
            Dict with created issues
        """
        created = []
        errors = []
        
        for issue in issues:
            result = self.create_issue(
                repo=repo,
                title=issue.get('title', ''),
                body=issue.get('body'),
                labels=issue.get('labels')
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
    
    def create_repository(self, name: str, description: str = None,
                        private: bool = False) -> Dict[str, Any]:
        """Create a new repository
        
        Args:
            name: Repository name
            description: Repository description
            private: Whether to make it private
            
        Returns:
            Dict with repo info
        """
        payload = {
            'name': name,
            'private': private,
            'auto_init': True
        }
        if description:
            payload['description'] = description
        
        result = self._make_request('POST', f'user/repos', payload)
        
        if result['success']:
            repo_data = result['data']
            return {
                'success': True,
                'repo_name': repo_data.get('name'),
                'url': repo_data.get('html_url'),
                'clone_url': repo_data.get('clone_url'),
                'message': 'Repository created'
            }
        return result
    
    def create_file(self, repo: str, path: str, content: str,
                   message: str, branch: str = 'main') -> Dict[str, Any]:
        """Create or update a file in repository
        
        Args:
            repo: Repository in "owner/repo" format
            path: File path
            content: File content
            commit message
            branch: Branch name
            
        Returns:
            Dict with file info
        """
        import base64
        
        payload = {
            'message': message,
            'content': base64.b64encode(content.encode()).decode(),
            'branch': branch
        }
        
        result = self._make_request('PUT', f'repos/{repo}/contents/{path}', payload)
        
        if result['success']:
            return {
                'success': True,
                'commit_sha': result['data'].get('commit', {}).get('sha'),
                'url': result['data'].get('content', {}).get('html_url'),
                'message': 'File created/updated'
            }
        return result
    
    def create_pull_request(self, repo: str, title: str, body: str,
                          head: str, base: str = 'main') -> Dict[str, Any]:
        """Create a pull request
        
        Args:
            repo: Repository
            title: PR title
            body: PR description
            head: Source branch
            base: Target branch
            
        Returns:
            Dict with PR info
        """
        payload = {
            'title': title,
            'body': body,
            'head': head,
            'base': base
        }
        
        result = self._make_request('POST', f'repos/{repo}/pulls', payload)
        
        if result['success']:
            pr_data = result['data']
            return {
                'success': True,
                'pr_number': pr_data.get('number'),
                'url': pr_data.get('html_url'),
                'message': 'Pull request created'
            }
        return result
    
    def create_tech_spec(self, repo: str, title: str, content: str) -> Dict[str, Any]:
        """Create a technical specification as a markdown file
        
        Args:
            repo: Repository
            title: Spec title
            content: Markdown content
            
        Returns:
            Dict with file info
        """
        path = f"docs/specs/{title.lower().replace(' ', '-')}.md"
        
        return self.create_file(
            repo=repo,
            path=path,
            content=f"# {title}\n\n{content}",
            message=f"Add technical spec: {title}"
        )


def create_github_deliverable(skill_name: str, title: str, content: Any,
                              user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a GitHub deliverable
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        github = GitHubMCP()
        
        # Parse content
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {'raw_content': content}
        
        # Route based on skill type
        repo = os.environ.get('GITHUB_DEFAULT_REPO', '')
        
        if skill_name == 'ci-cd-pipeline':
            # Create pipeline config file
            path = '.github/workflows/ci.yml'
            result = github.create_file(
                repo=repo,
                path=path,
                content=content.get('pipeline_config', str(content)),
                message=f'Add CI/CD pipeline: {title}'
            )
        elif skill_name == 'technical-readiness-pack':
            # Create tech spec
            result = github.create_tech_spec(repo, title, str(content))
        elif skill_name == 'architecture-design':
            # Create architecture doc
            result = github.create_tech_spec(repo, title, str(content))
        elif skill_name == 'api-design':
            # Create API spec
            path = f"docs/api/{title.lower().replace(' ', '-')}.md"
            result = github.create_file(
                repo=repo,
                path=path,
                content=str(content),
                message=f'Add API spec: {title}'
            )
        else:
            # Create issues
            issues = [{'title': title, 'body': str(content)[:6000]}]
            result = github.create_issues_batch(repo, issues) if repo else {
                'success': False, 'error': 'no_repo', 'message': 'Set GITHUB_DEFAULT_REPO'
            }
        
        if result.get('success'):
            return {
                'success': True,
                'deliverable_type': 'github_content',
                'url': result.get('url', ''),
                'message': f'{skill_name} delivered to GitHub'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed'),
                'fallback': 'notion_document'
            }
    
    except GitHubMCPError as e:
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
    print("GitHub MCP Connector")
    print("Usage: Import and call create_github_deliverable()")
