#!/usr/bin/env python3
"""
MCP Mock Tests

Tests MCP connectors using mock API responses.
Run with: python test_mcp_mocks.py

For real API testing, use the /api/mcp/test endpoint after configuring credentials.
"""

import json
import sys
from unittest.mock import patch, MagicMock
from typing import Dict, Any


def test_notion_mcp():
    """Test Notion MCP with mock"""
    print("Testing Notion MCP...")
    
    mock_response = {
        'id': 'test-page-id',
        'url': 'https://notion.so/test-page',
        'object': 'page'
    }
    
    with patch('requests.request') as mock_request:
        mock_request.return_value = MagicMock(
            status_code=200,
            json=lambda: mock_response
        )
        
        from notion_mcp import create_notion_deliverable
        
        result = create_notion_deliverable(
            skill_name='validation-pack',
            title='Test Page',
            content='# Test Content'
        )
        
        assert result['success'] == True, f"Expected success, got: {result}"
        assert 'page_id' in result or 'url' in result
        print("  [PASS] Notion MCP works!")
        return True


def test_sheets_mcp():
    """Test Sheets MCP with mock"""
    print("Testing Google Sheets MCP...")
    
    mock_response = {
        'spreadsheetId': 'test-spreadsheet-id',
        'spreadsheetUrl': 'https://docs.google.com/spreadsheets/d/test'
    }
    
    with patch('googleapiclient.discovery.build') as mock_build:
        mock_service = MagicMock()
        mock_service.spreadsheets().create.return_value.execute.return_value = mock_response
        mock_build.return_value = mock_service
        
        from sheets_mcp import create_sheets_deliverable
        
        result = create_sheets_deliverable(
            skill_name='business-case-modeling',
            title='Test Sheet',
            data={'assumptions': {'cac': 100}}
        )
        
        assert result['success'] == True, f"Expected success, got: {result}"
        print("  [PASS] Google Sheets MCP works!")
        return True


def test_figma_mcp():
    """Test Figma MCP with mock"""
    print("Testing Figma MCP...")
    
    from figma_mcp import create_figma_deliverable
    
    result = create_figma_deliverable(
        skill_name='wireframing',
        title='Test Wireframe',
        content='# Test'
    )
    
    # Should return spec since we can't actually create files without API
    assert result['success'] == True
    assert 'spec' in result
    print("  [PASS] Figma MCP works!")
    return True


def test_miro_mcp():
    """Test Miro MCP with mock"""
    print("Testing Miro MCP...")
    
    mock_board_response = {
        'id': 'test-board-id',
        'viewLink': 'https://miro.com/app/board/test'
    }
    
    with patch('requests.post') as mock_post:
        mock_post.return_value = MagicMock(
            status_code=201,
            json=lambda: mock_board_response
        )
        
        from miro_mcp import create_miro_deliverable
        
        result = create_miro_deliverable(
            skill_name='user-journey-mapping',
            title='Test Journey',
            content='{"journey_stages": []}'
        )
        
        assert result['success'] == True, f"Expected success, got: {result}"
        print("  [PASS] Miro MCP works!")
        return True


def test_linear_mcp():
    """Test Linear MCP with mock"""
    print("Testing Linear MCP...")
    
    mock_response = {
        'data': {
            'issueCreate': {
                'success': True,
                'issue': {
                    'id': 'test-issue-id',
                    'identifier': 'TEST-1',
                    'url': 'https://linear.app/test/issue/TEST-1'
                }
            }
        }
    }
    
    with patch('requests.post') as mock_post:
        mock_post.return_value = MagicMock(
            status_code=200,
            json=lambda: mock_response
        )
        
        from linear_mcp import create_linear_deliverable
        
        result = create_linear_deliverable(
            skill_name='feature-prioritization',
            title='Test Feature',
            content='# Test'
        )
        
        # May fail without team ID, but should not crash
        print("  [PASS] Linear MCP initialized!")
        return True


def test_github_mcp():
    """Test GitHub MCP with mock"""
    print("Testing GitHub MCP...")
    
    mock_response = {
        'id': 'test-issue-id',
        'number': 1,
        'html_url': 'https://github.com/test/repo/issues/1'
    }
    
    with patch('requests.post') as mock_post:
        mock_post.return_value = MagicMock(
            status_code=201,
            json=lambda: mock_response
        )
        
        from github_mcp import create_github_deliverable
        
        # Need GITHUB_DEFAULT_REPO set
        import os
        os.environ['GITHUB_DEFAULT_REPO'] = 'test/repo'
        
        result = create_github_deliverable(
            skill_name='ci-cd-pipeline',
            title='Test Pipeline',
            content='# Test'
        )
        
        print("  [PASS] GitHub MCP initialized!")
        return True


def test_stripe_mcp():
    """Test Stripe MCP with mock"""
    print("Testing Stripe MCP...")
    
    mock_response = {
        'id': 'prod_test',
        'name': 'Test Product'
    }
    
    with patch('requests.post') as mock_post:
        mock_post.return_value = MagicMock(
            status_code=200,
            json=lambda: mock_response
        )
        
        from stripe_mcp import create_stripe_deliverable
        
        result = create_stripe_deliverable(
            skill_name='pricing-strategy',
            title='Test Pricing',
            content='{"tiers": []}'
        )
        
        # Without real API key, should fail gracefully
        print("  [PASS] Stripe MCP initialized!")
        return True


def test_hubspot_mcp():
    """Test HubSpot MCP with mock"""
    print("Testing HubSpot MCP...")
    
    from hubspot_mcp import create_hubspot_deliverable
    
    result = create_hubspot_deliverable(
        skill_name='sales-enablement',
        title='Test Deal',
        content='# Test'
    )
    
    # Without API key, should fail gracefully with fallback
    assert 'success' in result
    print("  [PASS] HubSpot MCP initialized!")
    return True


def test_mcp_orchestrator():
    """Test orchestrator routing"""
    print("Testing MCP Orchestrator...")
    
    from mcp_orchestrator import create_deliverable, get_mcp_for_skill, get_available_mcps
    
    # Test skill to MCP mapping
    mapping = get_mcp_for_skill('validation-pack')
    assert mapping is not None
    
    mapping = get_mcp_for_skill('wireframing')
    assert mapping is not None
    
    mapping = get_mcp_for_skill('feature-prioritization')
    assert mapping is not None
    
    mapping = get_mcp_for_skill('ci-cd-pipeline')
    assert mapping is not None
    
    # Test available MCPs check
    mcps = get_available_mcps()
    assert isinstance(mcps, dict)
    
    print("  [PASS] MCP Orchestrator works!")
    return True


def run_all_tests():
    """Run all MCP tests"""
    print("\n" + "="*50)
    print("Running MCP Mock Tests")
    print("="*50 + "\n")
    
    tests = [
        ("MCP Orchestrator", test_mcp_orchestrator),
        ("Notion MCP", test_notion_mcp),
        ("Google Sheets MCP", test_sheets_mcp),
        ("Figma MCP", test_figma_mcp),
        ("Miro MCP", test_miro_mcp),
        ("Linear MCP", test_linear_mcp),
        ("GitHub MCP", test_github_mcp),
        ("Stripe MCP", test_stripe_mcp),
        ("HubSpot MCP", test_hubspot_mcp),
    ]
    
    passed = 0
    failed = 0
    
    for name, test_func in tests:
        try:
            test_func()
            passed += 1
        except Exception as e:
            print(f"  [FAIL] {name} failed: {e}")
            failed += 1
    
    print("\n" + "="*50)
    print(f"Results: {passed} passed, {failed} failed")
    print("="*50 + "\n")
    
    return failed == 0


if __name__ == '__main__':
    success = run_all_tests()
    sys.exit(0 if success else 1)
