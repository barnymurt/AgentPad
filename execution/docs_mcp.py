#!/usr/bin/env python3
"""
Google Docs MCP Connector

Provides integration with Google Docs for creating documents,
from skill outputs.

Usage:
    from docs_mcp import DocsMCP, create_docs_deliverable
    
    docs = DocsMCP()
    result = docs.create_document(title="My Doc", content="...")
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


class DocsMCPError(Exception):
    """Custom exception for Google Docs MCP errors"""
    pass


class DocsMCP:
    """Google Docs MCP connector"""
    
    def __init__(self, credentials_path: str = None):
        self.credentials_path = credentials_path or os.environ.get('GOOGLE_DOCS_CREDENTIALS', 'credentials.json')
        self.service = None
        self._authenticate()
    
    def _authenticate(self):
        """Authenticate with Google Docs API"""
        try:
            from google.oauth2 import service_account
            from googleapiclient import discovery
            
            if os.path.exists(self.credentials_path):
                credentials = service_account.Credentials.from_service_account_file(
                    self.credentials_path,
                    scopes=['https://www.googleapis.com/auth/documents']
                )
                self.service = discovery.build('docs', 'v1', credentials=credentials)
            else:
                credentials_json = os.environ.get('GOOGLE_DOCS_CREDENTIALS_JSON')
                if credentials_json:
                    import base64
                    credentials = service_account.Credentials.from_service_account_info(
                        json.loads(base64.b64decode(credentials_json)),
                        scopes=['https://www.googleapis.com/auth/documents']
                    )
                    self.service = discovery.build('docs', 'v1', credentials=credentials)
                else:
                    raise DocsMCPError("Google Docs credentials not configured")
        except ImportError as e:
            raise DocsMCPError(f"Google Docs libraries not installed: {e}")
        except Exception as e:
            raise DocsMCPError(f"Failed to authenticate: {e}")
    
    def create_document(self, title: str, content: str = None) -> Dict[str, Any]:
        """Create a Google Doc
        
        Args:
            title: Document title
            content: Document content (markdown will be converted)
            
        Returns:
            Dict with document info
        """
        if not self.service:
            return {'success': False, 'error': 'not_authenticated'}
        
        try:
            # Create empty document
            document = {
                'title': title
            }
            
            result = self.service.documents().create(body=document).execute()
            document_id = result.get('documentId')
            
            # Add content if provided
            if content:
                # Convert content to Google Docs format
                requests = self._content_to_requests(content)
                if requests:
                    self.service.documents().batchUpdate(
                        documentId=document_id,
                        body={'requests': requests}
                    ).execute()
            
            return {
                'success': True,
                'document_id': document_id,
                'url': f"https://docs.google.com/document/d/{document_id}",
                'message': 'Document created'
            }
        except Exception as e:
            return {'success': False, 'error': 'api_error', 'message': str(e)}
    
    def _content_to_requests(self, content: str) -> List[Dict]:
        """Convert markdown content to Google Docs API requests"""
        requests = []
        lines = content.split('\n')
        
        for line in lines:
            if not line.strip():
                continue
            
            # Heading 1
            if line.startswith('# '):
                requests.append({
                    'insertText': {
                        'location': {'index': 1},
                        'text': line[2:] + '\n'
                    }
                })
                requests.append({
                    'updateTextStyle': {
                        'range': {'startIndex': 1, 'endIndex': len(line)},
                        'textStyle': {'bold': True, 'fontSize': {'magnitude': 24, 'unit': 'PT'}},
                        'fields': 'bold,fontSize'
                    }
                })
            # Heading 2
            elif line.startswith('## '):
                requests.append({
                    'insertText': {
                        'location': {'index': 1},
                        'text': line[3:] + '\n'
                    }
                })
            # Heading 3
            elif line.startswith('### '):
                requests.append({
                    'insertText': {
                        'location': {'index': 1},
                        'text': line[4:] + '\n'
                    }
                })
            # Bullet list
            elif line.startswith('- '):
                requests.append({
                    'insertText': {
                        'location': {'index': 1},
                        'text': '• ' + line[2:] + '\n'
                    }
                })
            # Numbered list
            elif line[0].isdigit() and '. ' in line:
                requests.append({
                    'insertText': {
                        'location': {'index': 1},
                        'text': line + '\n'
                    }
                })
            # Regular paragraph
            else:
                requests.append({
                    'insertText': {
                        'location': {'index': 1},
                        'text': line + '\n'
                    }
                })
        
        return requests
    
    def get_document(self, document_id: str) -> Dict[str, Any]:
        """Get document content
        
        Args:
            document_id: Document ID
            
        Returns:
            Dict with document content
        """
        if not self.service:
            return {'success': False, 'error': 'not_authenticated'}
        
        try:
            result = self.service.documents().get(documentId=document_id).execute()
            return {
                'success': True,
                'document': result,
                'title': result.get('title')
            }
        except Exception as e:
            return {'success': False, 'error': 'api_error', 'message': str(e)}


def create_docs_deliverable(skill_name: str, title: str, content: Any,
                           user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a Google Doc deliverable
    
    Args:
        skill_name: Name of the skill
        title: Title for the document
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        docs = DocsMCP()
        
        # Parse content
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                pass
        
        content_str = str(content) if not isinstance(content, str) else content
        
        result = docs.create_document(title=title, content=content_str)
        
        if result.get('success'):
            return {
                'success': True,
                'deliverable_type': 'google_doc',
                'url': result.get('url'),
                'document_id': result.get('document_id'),
                'message': f'{skill_name} delivered to Google Docs'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed'),
                'fallback': 'markdown_document'
            }
    
    except DocsMCPError as e:
        return {
            'success': False,
            'error': 'not_configured',
            'message': str(e),
            'fallback': 'markdown_document'
        }
    except Exception as e:
        return {
            'success': False,
            'error': 'unknown',
            'message': str(e),
            'fallback': 'markdown_document'
        }


if __name__ == '__main__':
    print("Google Docs MCP Connector")
    print("Usage: Import and call create_docs_deliverable()")
