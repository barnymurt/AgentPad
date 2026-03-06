#!/usr/bin/env python3
"""
Google Sheets MCP Connector

Provides integration with Google Sheets for creating spreadsheets,
charts, and data from skill outputs.

Usage:
    from sheets_mcp import SheetsMCP, create_sheets_deliverable
    
    result = create_sheets_deliverable(
        skill_name='business-case-modeling',
        title='Financial Model: My SaaS',
        data= {...}
    )
"""

import os
import json
from typing import Optional, Dict, Any, List

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass


class SheetsMCPError(Exception):
    """Custom exception for Sheets MCP errors"""
    pass


class SheetsMCP:
    """Google Sheets MCP connector"""
    
    def __init__(self, credentials_path: str = None):
        self.credentials_path = credentials_path or os.environ.get('GOOGLE_SHEETS_CREDENTIALS', 'credentials.json')
        self.service = None
        self._authenticate()
    
    def _authenticate(self):
        """Authenticate with Google Sheets API"""
        try:
            from google.oauth2 import service_account
            from googleapiclient import discovery
            
            # Try to load credentials
            if os.path.exists(self.credentials_path):
                credentials = service_account.Credentials.from_service_account_file(
                    self.credentials_path,
                    scopes=['https://www.googleapis.com/auth/spreadsheets']
                )
                self.service = discovery.build('sheets', 'v4', credentials=credentials)
            else:
                # Try environment variable approach
                import base64
                credentials_json = os.environ.get('GOOGLE_SHEETS_CREDENTIALS_JSON')
                if credentials_json:
                    import io
                    from google.oauth2 import service_account
                    credentials = service_account.Credentials.from_service_account_info(
                        json.loads(base64.b64decode(credentials_json)),
                        scopes=['https://www.googleapis.com/auth/spreadsheets']
                    )
                    self.service = discovery.build('sheets', 'v4', credentials=credentials)
                else:
                    raise SheetsMCPError("Google Sheets credentials not configured")
        except ImportError as e:
            raise SheetsMCPError(f"Google Sheets API libraries not installed: {e}")
        except Exception as e:
            raise SheetsMCPError(f"Failed to authenticate: {e}")
    
    def create_spreadsheet(self, title: str, sheets: List[Dict] = None) -> Dict[str, Any]:
        """Create a new Google Spreadsheet
        
        Args:
            title: Spreadsheet title
            sheets: List of sheet configurations
            
        Returns:
            Dict with success status and spreadsheet info
        """
        if not self.service:
            return {'success': False, 'error': 'not_authenticated', 'message': 'Not authenticated'}
        
        try:
            spreadsheet = {
                'properties': {'title': title},
                'sheets': sheets or [
                    {'properties': {'title': 'Sheet1'}}
                ]
            }
            
            result = self.service.spreadsheets().create(body=spreadsheet).execute()
            
            spreadsheet_id = result.get('spreadsheetId', '')
            spreadsheet_url = f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}"
            
            return {
                'success': True,
                'spreadsheet_id': spreadsheet_id,
                'url': spreadsheet_url,
                'message': 'Spreadsheet created'
            }
        except Exception as e:
            return {'success': False, 'error': 'api_error', 'message': str(e)}
    
    def update_values(self, spreadsheet_id: str, range: str, values: List[List]) -> Dict[str, Any]:
        """Update values in a spreadsheet
        
        Args:
            spreadsheet_id: Spreadsheet ID
            range: Cell range (e.g., 'Sheet1!A1:D5')
            values: 2D array of values
            
        Returns:
            Dict with success status
        """
        if not self.service:
            return {'success': False, 'error': 'not_authenticated'}
        
        try:
            body = {'values': values}
            result = self.service.spreadsheets().values().update(
                spreadsheetId=spreadsheet_id,
                range=range,
                valueInputOption='USER_ENTERED',
                body=body
            ).execute()
            
            return {
                'success': True,
                'updated_cells': result.get('updatedCells', 0),
                'message': 'Values updated'
            }
        except Exception as e:
            return {'success': False, 'error': 'api_error', 'message': str(e)}
    
    def append_values(self, spreadsheet_id: str, sheet_name: str, values: List[List]) -> Dict[str, Any]:
        """Append values to a sheet
        
        Args:
            spreadsheet_id: Spreadsheet ID
            sheet_name: Name of the sheet
            values: 2D array of values to append
            
        Returns:
            Dict with success status
        """
        if not self.service:
            return {'success': False, 'error': 'not_authenticated'}
        
        try:
            range = f"{sheet_name}!A:A"
            body = {'values': values}
            result = self.service.spreadsheets().values().append(
                spreadsheetId=spreadsheet_id,
                range=range,
                valueInputOption='USER_ENTERED',
                body=body
            ).execute()
            
            return {
                'success': True,
                'updated_rows': result.get('updates', {}).get('updatedRows', 0),
                'message': 'Values appended'
            }
        except Exception as e:
            return {'success': False, 'error': 'api_error', 'message': str(e)}
    
    def add_chart(self, spreadsheet_id: str, sheet_id: int, chart_config: Dict) -> Dict[str, Any]:
        """Add a chart to a sheet
        
        Args:
            spreadsheet_id: Spreadsheet ID
            sheet_id: Sheet ID
            chart_config: Chart configuration
            
        Returns:
            Dict with success status
        """
        if not self.service:
            return {'success': False, 'error': 'not_authenticated'}
        
        try:
            requests = [{
                'addChart': {
                    'chart': chart_config
                }
            }]
            
            body = {'requests': requests}
            result = self.service.spreadsheets().batchUpdate(
                spreadsheetId=spreadsheet_id,
                body=body
            ).execute()
            
            return {
                'success': True,
                'chart_id': result.get('replies', [{}])[0].get('addChart', {}).get('chart', {}).get('chartId'),
                'message': 'Chart added'
            }
        except Exception as e:
            return {'success': False, 'error': 'api_error', 'message': str(e)}


def create_business_case_sheet(title: str, data: Dict) -> Dict[str, Any]:
    """Create a business case / financial model spreadsheet
    
    Args:
        title: Title for the spreadsheet
        data: Financial model data with sections
        
    Returns:
        Dict with success status and spreadsheet URL
    """
    try:
        sheets = SheetsMCP()
        
        # Create spreadsheet
        result = sheets.create_spreadsheet(title)
        if not result['success']:
            return result
        
        spreadsheet_id = result['spreadsheet_id']
        
        # Build data rows
        rows = []
        
        # Assumptions section
        rows.append(['ASSUMPTIONS'])
        rows.append([''])
        for key, value in data.get('assumptions', {}).items():
            rows.append([key, value])
        rows.append([''])
        
        # Revenue projections
        rows.append(['REVENUE PROJECTIONS'])
        rows.append([''])
        for row in data.get('revenue', []):
            rows.append(row)
        rows.append([''])
        
        # Costs
        rows.append(['COSTS'])
        rows.append([''])
        for row in data.get('costs', []):
            rows.append(row)
        rows.append([''])
        
        # Unit Economics
        rows.append(['UNIT ECONOMICS'])
        rows.append([''])
        for key, value in data.get('unit_economics', {}).items():
            rows.append([key, value])
        
        # Update the spreadsheet
        sheets.update_values(spreadsheet_id, 'Sheet1!A1', rows)
        
        return {
            'success': True,
            'deliverable_type': 'google_sheet',
            'url': result['url'],
            'id': spreadsheet_id,
            'message': 'Business case spreadsheet created'
        }
    
    except SheetsMCPError as e:
        return {
            'success': False,
            'error': 'not_configured',
            'message': str(e),
            'fallback': 'markdown_table',
            'content': format_data_as_markdown_table(data)
        }
    except Exception as e:
        return {
            'success': False,
            'error': 'unknown',
            'message': str(e),
            'fallback': 'markdown_table',
            'content': format_data_as_markdown_table(data)
        }


def create_competitor_analysis_sheet(title: str, data: List[Dict]) -> Dict[str, Any]:
    """Create a competitor analysis spreadsheet
    
    Args:
        title: Title for the spreadsheet
        data: List of competitor data
        
    Returns:
        Dict with success status and spreadsheet URL
    """
    try:
        sheets = SheetsMCP()
        
        result = sheets.create_spreadsheet(title)
        if not result['success']:
            return result
        
        spreadsheet_id = result['spreadsheet_id']
        
        # Header row
        headers = ['Competitor', 'Features', 'Pricing', 'Strengths', 'Weaknesses', 'URL']
        rows = [headers]
        
        # Data rows
        for competitor in data:
            rows.append([
                competitor.get('name', ''),
                competitor.get('features', ''),
                competitor.get('pricing', ''),
                competitor.get('strengths', ''),
                competitor.get('weaknesses', ''),
                competitor.get('url', '')
            ])
        
        sheets.update_values(spreadsheet_id, 'Sheet1!A1', rows)
        
        return {
            'success': True,
            'deliverable_type': 'google_sheet',
            'url': result['url'],
            'id': spreadsheet_id,
            'message': 'Competitor analysis spreadsheet created'
        }
    
    except SheetsMCPError as e:
        return {
            'success': False,
            'error': 'not_configured',
            'message': str(e),
            'fallback': 'markdown_table',
            'content': format_competitors_as_markdown(data)
        }
    except Exception as e:
        return {
            'success': False,
            'error': 'unknown',
            'message': str(e),
            'fallback': 'markdown_table',
            'content': format_competitors_as_markdown(data)
        }


def create_metrics_dashboard(title: str, metrics: Dict) -> Dict[str, Any]:
    """Create a metrics dashboard spreadsheet
    
    Args:
        title: Title for the spreadsheet
        metrics: Dictionary of metrics
        
    Returns:
        Dict with success status and spreadsheet URL
    """
    try:
        sheets = SheetsMCP()
        
        result = sheets.create_spreadsheet(title)
        if not result['success']:
            return result
        
        spreadsheet_id = result['spreadsheet_id']
        
        rows = []
        
        # KPI Section
        rows.append(['KEY PERFORMANCE INDICATORS'])
        rows.append([''])
        for key, value in metrics.items():
            if isinstance(value, dict):
                rows.append([key, value.get('value', ''), value.get('target', '')])
            else:
                rows.append([key, value, ''])
        
        sheets.update_values(spreadsheet_id, 'Sheet1!A1', rows)
        
        return {
            'success': True,
            'deliverable_type': 'google_sheet',
            'url': result['url'],
            'id': spreadsheet_id,
            'message': 'Metrics dashboard created'
        }
    
    except Exception as e:
        return {
            'success': False,
            'error': 'not_configured',
            'message': str(e),
            'fallback': 'markdown_table',
            'content': format_metrics_as_markdown(metrics)
        }


def create_sheets_deliverable(skill_name: str, title: str, data: Any) -> Dict[str, Any]:
    """Main entry point for creating sheets deliverables
    
    Args:
        skill_name: Name of the skill
        title: Title for the spreadsheet
        data: Skill output data (format varies by skill)
        
    Returns:
        Dict with success status and spreadsheet info
    """
    skill_handlers = {
        'business-case-modeling': lambda: create_business_case_sheet(title, data),
        'competitor-research': lambda: create_competitor_analysis_sheet(title, data),
        'cohort-analysis': lambda: create_metrics_dashboard(title, data),
        'funnel-analysis': lambda: create_metrics_dashboard(title, data),
        'saas-metrics-analysis': lambda: create_metrics_dashboard(title, data),
        'metrics-dashboard-creation': lambda: create_metrics_dashboard(title, data),
        'kpi-tracking': lambda: create_metrics_dashboard(title, data),
    }
    
    handler = skill_handlers.get(skill_name)
    if handler:
        return handler()
    
    # Generic fallback - create simple sheet
    try:
        sheets = SheetsMCP()
        result = sheets.create_spreadsheet(title)
        
        if result['success']:
            return {
                'success': True,
                'deliverable_type': 'google_sheet',
                'url': result['url'],
                'id': result['spreadsheet_id'],
                'message': f'{skill_name} spreadsheet created'
            }
        else:
            return result
    
    except SheetsMCPError as e:
        return {
            'success': False,
            'error': 'not_configured',
            'message': str(e),
            'fallback': 'markdown_document'
        }


def format_data_as_markdown_table(data: Dict) -> str:
    """Format data as markdown table fallback"""
    lines = []
    for key, value in data.items():
        if isinstance(value, dict):
            lines.append(f"### {key}")
            for k, v in value.items():
                lines.append(f"| {k} | {v} |")
        else:
            lines.append(f"| {key} | {value} |")
    return '\n'.join(lines)


def format_competitors_as_markdown(competitors: List[Dict]) -> str:
    """Format competitors as markdown"""
    lines = ["| Competitor | Features | Pricing |", "|-----------|----------|---------|"]
    for c in competitors:
        lines.append(f"| {c.get('name', '')} | {c.get('features', '')} | {c.get('pricing', '')} |")
    return '\n'.join(lines)


def format_metrics_as_markdown(metrics: Dict) -> str:
    """Format metrics as markdown"""
    lines = ["| Metric | Value |", "|--------|-------|"]
    for key, value in metrics.items():
        lines.append(f"| {key} | {value} |")
    return '\n'.join(lines)


if __name__ == '__main__':
    # Test
    print("Sheets MCP Connector")
    print("Usage: Import and call create_sheets_deliverable()")
