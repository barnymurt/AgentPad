#!/usr/bin/env python3
"""
HubSpot MCP Connector

Provides integration with HubSpot for CRM, marketing automation,
and sales enablement from skill outputs.

Usage:
    from hubspot_mcp import HubSpotMCP, create_hubspot_deliverable
    
    hubspot = HubSpotMCP()
    result = hubspot.create_contact(properties={...})
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


class HubSpotMCPError(Exception):
    """Custom exception for HubSpot MCP errors"""
    pass


class HubSpotMCP:
    """HubSpot MCP connector for CRM and marketing"""
    
    def __init__(self, access_token: str = None):
        self.access_token = access_token or os.environ.get('HUBSPOT_API_KEY', '')
        self.base_url = 'https://api.hubapi.com'
        
        if not self.access_token:
            raise HubSpotMCPError("HUBSPOT_API_KEY not configured")
    
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
                return {'success': False, 'error': 'unsupported_method'}
            
            if response.status_code in (200, 201, 204):
                return {'success': True, 'data': response.json()}
            elif response.status_code == 401:
                return {'success': False, 'error': 'auth_failure', 'message': 'Invalid HubSpot API key'}
            elif response.status_code == 403:
                return {'success': False, 'error': 'permission_denied', 'message': 'Insufficient permissions'}
            elif response.status_code == 429:
                return {'success': False, 'error': 'rate_limit', 'message': 'HubSpot API rate limit'}
            else:
                return {'success': False, 'error': 'api_error', 'message': f'HubSpot error: {response.status_code}'}
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'timeout'}
        except Exception as e:
            return {'success': False, 'error': 'unknown', 'message': str(e)}
    
    def create_contact(self, email: str, properties: Dict = None) -> Dict[str, Any]:
        """Create a contact
        
        Args:
            email: Contact email
            properties: Additional properties
            
        Returns:
            Dict with contact info
        """
        payload = {'properties': properties or {}}
        payload['properties']['email'] = email
        
        result = self._make_request('POST', 'crm/v3/objects/contacts', payload)
        
        if result['success']:
            return {
                'success': True,
                'contact_id': result['data'].get('id'),
                'message': 'Contact created'
            }
        return result
    
    def create_deal(self, name: str, properties: Dict = None) -> Dict[str, Any]:
        """Create a deal
        
        Args:
            name: Deal name
            properties: Deal properties
            
        Returns:
            Dict with deal info
        """
        payload = {'properties': properties or {}}
        payload['properties']['dealname'] = name
        payload['properties']['dealstage'] = 'appointmentscheduled'
        
        result = self._make_request('POST', 'crm/v3/objects/deals', payload)
        
        if result['success']:
            return {
                'success': True,
                'deal_id': result['data'].get('id'),
                'message': 'Deal created'
            }
        return result
    
    def create_company(self, name: str, properties: Dict = None) -> Dict[str, Any]:
        """Create a company
        
        Args:
            name: Company name
            properties: Company properties
            
        Returns:
            Dict with company info
        """
        payload = {'properties': properties or {}}
        payload['properties']['name'] = name
        
        result = self._make_request('POST', 'crm/v3/objects/companies', payload)
        
        if result['success']:
            return {
                'success': True,
                'company_id': result['data'].get('id'),
                'message': 'Company created'
            }
        return result
    
    def create_ticket(self, subject: str, content: str, properties: Dict = None) -> Dict[str, Any]:
        """Create a ticket
        
        Args:
            subject: Ticket subject
            content: Ticket content
            properties: Additional properties
            
        Returns:
            Dict with ticket info
        """
        payload = {'properties': properties or {}}
        payload['properties']['subject'] = subject
        payload['properties']['content'] = content
        payload['properties']['hs_pipeline_stage'] = 'new'
        
        result = self._make_request('POST', 'crm/v3/objects/tickets', payload)
        
        if result['success']:
            return {
                'success': True,
                'ticket_id': result['data'].get('id'),
                'message': 'Ticket created'
            }
        return result
    
    def create_marketing_email(self, name: str, subject: str, content: str) -> Dict[str, Any]:
        """Create a marketing email (content only, needs to be sent separately)
        
        Args:
            name: Email name
            subject: Email subject
            content: Email HTML content
            
        Returns:
            Dict with email info
        """
        payload = {
            'name': name,
            'subject': subject,
            'htmlContent': content
        }
        
        result = self._make_request('POST', 'marketing/v3/emails', payload)
        
        if result['success']:
            return {
                'success': True,
                'email_id': result['data'].get('id'),
                'message': 'Marketing email created'
            }
        return result
    
    def list_contacts(self, limit: int = 10) -> Dict[str, Any]:
        """List contacts
        
        Args:
            limit: Number of contacts to return
            
        Returns:
            Dict with contacts
        """
        return self._make_request('GET', f'crm/v3/objects/contacts?limit={limit}')


def create_hubspot_deliverable(skill_name: str, title: str, content: Any,
                               user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a HubSpot deliverable
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        hubspot = HubSpotMCP()
        
        # Parse content
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {'raw_content': content}
        
        # Route based on skill type
        if skill_name == 'sales-enablement':
            result = hubspot.create_deal(
                name=title,
                properties={'deal_description': str(content)[:1000]}
            )
        elif skill_name == 'partner-strategy':
            result = hubspot.create_company(
                name=title,
                properties={'description': str(content)[:1000]}
            )
        elif skill_name == 'content-strategy':
            # Create email campaign draft
            result = hubspot.create_marketing_email(
                name=title,
                subject=f"Content: {title}",
                content=str(content)
            )
        else:
            # Generic contact
            result = hubspot.create_contact(
                email=f"lead-{title.lower().replace(' ', '-')}@example.com",
                properties={'firstname': title}
            )
        
        if result.get('success'):
            return {
                'success': True,
                'deliverable_type': 'hubspot_record',
                'message': f'{skill_name} delivered to HubSpot'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed'),
                'fallback': 'notion_document'
            }
    
    except HubSpotMCPError as e:
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
    print("HubSpot MCP Connector")
    print("Usage: Import and call create_hubspot_deliverable()")
