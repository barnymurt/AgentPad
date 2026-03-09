#!/usr/bin/env python3
"""
Stripe MCP Connector

Provides integration with Stripe for payments, subscriptions,
and pricing from skill outputs.

Usage:
    from stripe_mcp import StripeMCP, create_stripe_deliverable
    
    stripe = StripeMCP()
    result = stripe.create_product(name="My Product", prices=[...])
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


class StripeMCPError(Exception):
    """Custom exception for Stripe MCP errors"""
    pass


class StripeMCP:
    """Stripe MCP connector for payments and subscriptions"""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.environ.get('STRIPE_API_KEY', '')
        self.base_url = 'https://api.stripe.com/v1'
        
        if not self.api_key:
            raise StripeMCPError("STRIPE_API_KEY not configured")
    
    def _make_request(self, method: str, endpoint: str, data: dict = None) -> Dict[str, Any]:
        import requests
        
        url = f"{self.base_url}/{endpoint}"
        auth = (self.api_key, '')
        
        try:
            if method == 'GET':
                response = requests.get(url, auth=auth, data=data, timeout=30)
            elif method == 'POST':
                response = requests.post(url, auth=auth, data=data, timeout=30)
            else:
                return {'success': False, 'error': 'unsupported_method'}
            
            if response.status_code in (200, 201):
                return {'success': True, 'data': response.json()}
            elif response.status_code == 401:
                return {'success': False, 'error': 'auth_failure', 'message': 'Invalid Stripe API key'}
            elif response.status_code == 402:
                return {'success': False, 'error': 'payment_error', 'message': 'Payment required'}
            elif response.status_code == 429:
                return {'success': False, 'error': 'rate_limit', 'message': 'Stripe API rate limit'}
            else:
                return {'success': False, 'error': 'api_error', 'message': f'Stripe error: {response.status_code}'}
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'timeout'}
        except Exception as e:
            return {'success': False, 'error': 'unknown', 'message': str(e)}
    
    def create_product(self, name: str, description: str = None) -> Dict[str, Any]:
        """Create a product
        
        Args:
            name: Product name
            description: Product description
            
        Returns:
            Dict with product info
        """
        data = {'name': name}
        if description:
            data['description'] = description
        
        result = self._make_request('POST', 'products', data)
        
        if result['success']:
            return {
                'success': True,
                'product_id': result['data'].get('id'),
                'message': 'Product created'
            }
        return result
    
    def create_price(self, product_id: str, unit_amount: int, 
                   currency: str = 'usd', recurring: Dict = None) -> Dict[str, Any]:
        """Create a price
        
        Args:
            product_id: Product ID
            unit_amount: Amount in cents
            currency: Currency code
            recurring: Recurring config (interval, trial_days)
            
        Returns:
            Dict with price info
        """
        data = {
            'product': product_id,
            'unit_amount': unit_amount,
            'currency': currency
        }
        
        if recurring:
            data.update(recurring)
        
        result = self._make_request('POST', 'prices', data)
        
        if result['success']:
            return {
                'success': True,
                'price_id': result['data'].get('id'),
                'message': 'Price created'
            }
        return result
    
    def create_pricing_tier(self, name: str, tiers: List[Dict]) -> Dict[str, Any]:
        """Create pricing tiers for a product
        
        Args:
            name: Pricing tier name
            tiers: List of tier configs with up_to, unit_amount
            
        Returns:
            Dict with product and prices
        """
        # Create product first
        product_result = self.create_product(name)
        
        if not product_result['success']:
            return product_result
        
        product_id = product_result['product_id']
        created_prices = []
        
        for tier in tiers:
            price_result = self.create_price(
                product_id=product_id,
                unit_amount=tier.get('unit_amount', 0),
                currency=tier.get('currency', 'usd'),
                recurring=tier.get('recurring')
            )
            
            if price_result['success']:
                created_prices.append(price_result['price_id'])
        
        return {
            'success': True,
            'product_id': product_id,
            'price_ids': created_prices,
            'message': f'Pricing tiers created with {len(created_prices)} prices'
        }
    
    def create_coupon(self, name: str, percent_off: int = None,
                    amount_off: int = None, duration: str = 'once') -> Dict[str, Any]:
        """Create a coupon
        
        Args:
            name: Coupon name
            percent_off: Percentage discount
            amount_off: Fixed amount discount
            duration: How long (once, forever, repeating)
            
        Returns:
            Dict with coupon info
        """
        data = {'duration': duration}
        
        if percent_off:
            data['percent_off'] = percent_off
        elif amount_off:
            data['amount_off'] = amount_off
            data['currency'] = 'usd'
        
        result = self._make_request('POST', 'coupons', data)
        
        if result['success']:
            return {
                'success': True,
                'coupon_id': result['data'].get('id'),
                'message': 'Coupon created'
            }
        return result
    
    def create_checkout_session(self, price_id: str, success_url: str,
                              cancel_url: str) -> Dict[str, Any]:
        """Create a checkout session
        
        Args:
            price_id: Price ID for checkout
            success_url: URL after successful payment
            cancel_url: URL after cancelled payment
            
        Returns:
            Dict with checkout session info
        """
        data = {
            'mode': 'subscription',
            'line_items[0][price]': price_id,
            'line_items[0][quantity]': '1',
            'success_url': success_url,
            'cancel_url': cancel_url
        }
        
        result = self._make_request('POST', 'checkout/sessions', data)
        
        if result['success']:
            return {
                'success': True,
                'session_id': result['data'].get('id'),
                'url': result['data'].get('url'),
                'message': 'Checkout session created'
            }
        return result
    
    def list_prices(self, product_id: str = None) -> Dict[str, Any]:
        """List prices
        
        Args:
            product_id: Optional product ID to filter
            
        Returns:
            Dict with prices
        """
        data = {}
        if product_id:
            data['product'] = product_id
        
        return self._make_request('GET', 'prices', data)


def create_stripe_deliverable(skill_name: str, title: str, content: Any,
                              user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a Stripe deliverable
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        stripe = StripeMCP()
        
        # Parse content
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {'raw_content': content}
        
        # Route based on skill type
        if skill_name == 'pricing-strategy' or skill_name == 'pricing-launch':
            # Create pricing tiers
            tiers = content.get('tiers', [
                {'unit_amount': 9900, 'recurring': {'interval': 'month'}},
                {'unit_amount': 9900, 'recurring': {'interval': 'year'}}
            ])
            result = stripe.create_pricing_tier(title, tiers)
        elif skill_name == 'referral-program':
            # Create discount coupon
            percent_off = content.get('discount_percent', 20)
            result = stripe.create_coupon(
                name=f"Referral: {title}",
                percent_off=percent_off,
                duration='forever'
            )
        else:
            # Generic product
            result = stripe.create_product(
                name=title,
                description=str(content)[:500]
            )
        
        if result.get('success'):
            return {
                'success': True,
                'deliverable_type': 'stripe_config',
                'message': f'{skill_name} delivered to Stripe'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed'),
                'fallback': 'notion_document'
            }
    
    except StripeMCPError as e:
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
    print("Stripe MCP Connector")
    print("Usage: Import and call create_stripe_deliverable()")
