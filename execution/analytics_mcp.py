#!/usr/bin/env python3
"""
Google Analytics MCP Connector

Provides integration with Google Analytics 4 for reports,
events, and metrics from skill outputs.

Usage:
    from analytics_mcp import AnalyticsMCP, create_analytics_deliverable
    
    analytics = AnalyticsMCP()
    result = analytics.get_report(property_id="...", metrics=[...])
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


class AnalyticsMCPError(Exception):
    """Custom exception for Analytics MCP errors"""
    pass


class AnalyticsMCP:
    """Google Analytics MCP connector for GA4 reports and events"""
    
    def __init__(self, credentials_path: str = None, property_id: str = None):
        self.credentials_path = credentials_path or os.environ.get('GOOGLE_ANALYTICS_CREDENTIALS', 'credentials.json')
        self.property_id = property_id or os.environ.get('GA4_PROPERTY_ID', '')
        
        if not self.property_id:
            raise AnalyticsMCPError("GA4_PROPERTY_ID not configured")
        
        self.service = None
        self._authenticate()
    
    def _authenticate(self):
        """Authenticate with Google Analytics Data API"""
        try:
            from google.oauth2 import service_account
            from googleapiclient import discovery
            
            if os.path.exists(self.credentials_path):
                credentials = service_account.Credentials.from_service_account_file(
                    self.credentials_path,
                    scopes=['https://www.googleapis.com/auth/analytics.readonly']
                )
                self.service = discovery.build('analyticsdata', 'v1beta', credentials=credentials)
            else:
                credentials_json = os.environ.get('GOOGLE_ANALYTICS_CREDENTIALS_JSON')
                if credentials_json:
                    import base64
                    import io
                    credentials = service_account.Credentials.from_service_account_info(
                        json.loads(base64.b64decode(credentials_json)),
                        scopes=['https://www.googleapis.com/auth/analytics.readonly']
                    )
                    self.service = discovery.build('analyticsdata', 'v1beta', credentials=credentials)
                else:
                    raise AnalyticsMCPError("Google Analytics credentials not configured")
        except ImportError as e:
            raise AnalyticsMCPError(f"Google Analytics libraries not installed: {e}")
        except Exception as e:
            raise AnalyticsMCPError(f"Failed to authenticate: {e}")
    
    def run_report(self, metrics: List[str], dimensions: List[str] = None,
                   date_range: str = 'last_7_days') -> Dict[str, Any]:
        """Run a GA4 report
        
        Args:
            metrics: List of metrics (e.g., 'sessions', 'users', 'conversions')
            dimensions: List of dimensions (e.g., 'country', 'deviceCategory')
            date_range: Date range (last_7_days, last_30_days, etc.)
            
        Returns:
            Dict with report data
        """
        if not self.service:
            return {'success': False, 'error': 'not_authenticated'}
        
        try:
            request_body = {
                'metrics': [{'name': m} for m in metrics],
                'dateRanges': [{'startDate': date_range, 'endDate': 'today'}]
            }
            
            if dimensions:
                request_body['dimensions'] = [{'name': d} for d in dimensions]
            
            response = self.service.properties().runReport(
                property=f'properties/{self.property_id}',
                body=request_body
            ).execute()
            
            return {
                'success': True,
                'data': response,
                'message': 'Report generated'
            }
        except Exception as e:
            return {'success': False, 'error': 'api_error', 'message': str(e)}
    
    def get_realtime_users(self) -> Dict[str, Any]:
        """Get realtime active users
        
        Returns:
            Dict with realtime data
        """
        if not self.service:
            return {'success': False, 'error': 'not_authenticated'}
        
        try:
            response = self.service.properties().runRealtimeReport(
                property=f'properties/{self.property_id}',
                body={
                    'metrics': [{'name': 'activeUsers'}]
                }
            ).execute()
            
            return {
                'success': True,
                'realtime_users': response.get('rows', [{}])[0].get('metricValues', [{}])[0].get('value', 0),
                'message': 'Realtime data retrieved'
            }
        except Exception as e:
            return {'success': False, 'error': 'api_error', 'message': str(e)}
    
    def get_funnel_report(self, events: List[str]) -> Dict[str, Any]:
        """Get funnel conversion report
        
        Args:
            events: List of event names in funnel order
            
        Returns:
            Dict with funnel data
        """
        metrics = []
        for event in events:
            metrics.append({'name': f'eventCount_{event}'})
        
        return self.run_report(
            metrics=['sessions', 'totalUsers'],
            dimensions=['eventName'],
            date_range='last_30_days'
        )
    
    def get_campaign_performance(self) -> Dict[str, Any]:
        """Get campaign performance report
        
        Returns:
            Dict with campaign data
        """
        return self.run_report(
            metrics=['sessions', 'users', 'conversions', 'totalRevenue'],
            dimensions=['sessionCampaign', 'sessionSource', 'sessionMedium'],
            date_range='last_30_days'
        )


def create_analytics_deliverable(skill_name: str, title: str, content: Any,
                                 user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create an analytics deliverable
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        analytics = AnalyticsMCP()
        
        # Parse content
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {'raw_content': content}
        
        # Route based on skill type
        if skill_name == 'launch-analytics':
            result = analytics.get_campaign_performance()
        elif skill_name == 'funnel-analysis':
            events = content.get('events', ['page_view', 'sign_up', 'purchase'])
            result = analytics.get_funnel_report(events)
        elif skill_name == 'cohort-analysis':
            result = analytics.run_report(
                metrics=['newUsers', 'sessions', 'totalUsers'],
                dimensions=['date'],
                date_range='last_30_days'
            )
        else:
            # Generic report
            result = analytics.run_report(
                metrics=['sessions', 'users', 'pageViews'],
                date_range='last_7_days'
            )
        
        if result.get('success'):
            return {
                'success': True,
                'deliverable_type': 'analytics_report',
                'data': result.get('data'),
                'message': f'{skill_name} analytics report created'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed'),
                'fallback': 'notion_document'
            }
    
    except AnalyticsMCPError as e:
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
    print("Google Analytics MCP Connector")
    print("Usage: Import and call create_analytics_deliverable()")
