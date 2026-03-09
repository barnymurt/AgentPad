#!/usr/bin/env python3
"""
Discord MCP Connector

Provides integration with Discord for creating channels, messages,
and managing community from skill outputs.

Usage:
    from discord_mcp import DiscordMCP, create_discord_deliverable
    
    discord = DiscordMCP()
    result = discord.send_message(channel_id="...", content="...")
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


class DiscordMCPError(Exception):
    """Custom exception for Discord MCP errors"""
    pass


class DiscordMCP:
    """Discord MCP connector for community management"""
    
    def __init__(self, bot_token: str = None):
        self.bot_token = bot_token or os.environ.get('DISCORD_BOT_TOKEN', '')
        self.base_url = 'https://discord.com/api/v10'
        
        if not self.bot_token:
            raise DiscordMCPError("DISCORD_BOT_TOKEN not configured")
    
    def _headers(self) -> Dict[str, str]:
        return {
            'Authorization': f'Bot {self.bot_token}',
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
                return {'success': False, 'error': 'auth_failure', 'message': 'Invalid Discord bot token'}
            elif response.status_code == 403:
                return {'success': False, 'error': 'permission_denied', 'message': 'Insufficient permissions'}
            elif response.status_code == 429:
                return {'success': False, 'error': 'rate_limit', 'message': 'Discord API rate limit'}
            else:
                return {'success': False, 'error': 'api_error', 'message': f'Discord error: {response.status_code}'}
        except requests.exceptions.Timeout:
            return {'success': False, 'error': 'timeout'}
        except Exception as e:
            return {'success': False, 'error': 'unknown', 'message': str(e)}
    
    def send_message(self, channel_id: str, content: str, 
                   embed: Dict = None) -> Dict[str, Any]:
        """Send a message to a channel
        
        Args:
            channel_id: Channel ID
            content: Message content
            embed: Optional embed
            
        Returns:
            Dict with message info
        """
        payload = {'content': content}
        if embed:
            payload['embeds'] = [embed]
        
        result = self._make_request('POST', f'channels/{channel_id}/messages', payload)
        
        if result['success']:
            return {
                'success': True,
                'message_id': result['data'].get('id'),
                'message_url': f"https://discord.com/channels/@me/{channel_id}/{result['data'].get('id')}",
                'message': 'Message sent'
            }
        return result
    
    def create_channel(self, guild_id: str, name: str, 
                     channel_type: int = 0) -> Dict[str, Any]:
        """Create a channel
        
        Args:
            guild_id: Guild (server) ID
            name: Channel name
            channel_type: 0 = text, 2 = voice, 4 = category
            
        Returns:
            Dict with channel info
        """
        payload = {
            'name': name,
            'type': channel_type
        }
        
        result = self._make_request('POST', f'guilds/{guild_id}/channels', payload)
        
        if result['success']:
            return {
                'success': True,
                'channel_id': result['data'].get('id'),
                'message': 'Channel created'
            }
        return result
    
    def create_role(self, guild_id: str, name: str, 
                  color: int = 0) -> Dict[str, Any]:
        """Create a role
        
        Args:
            guild_id: Guild ID
            name: Role name
            color: Color value
            
        Returns:
            Dict with role info
        """
        payload = {
            'name': name,
            'color': color
        }
        
        result = self._make_request('POST', f'guilds/{guild_id}/roles', payload)
        
        if result['success']:
            return {
                'success': True,
                'role_id': result['data'].get('id'),
                'message': 'Role created'
            }
        return result
    
    def add_member_role(self, guild_id: str, user_id: str, 
                       role_id: str) -> Dict[str, Any]:
        """Add a role to a member
        
        Args:
            guild_id: Guild ID
            user_id: User ID
            role_id: Role ID
            
        Returns:
            Dict with result
        """
        return self._make_request('PUT', f'guilds/{guild_id}/members/{user_id}/roles/{role_id}', {})
    
    def get_guild_channels(self, guild_id: str) -> Dict[str, Any]:
        """Get all channels in a guild
        
        Args:
            guild_id: Guild ID
            
        Returns:
            Dict with channels
        """
        return self._make_request('GET', f'guilds/{guild_id}/channels')


def create_discord_deliverable(skill_name: str, title: str, content: Any,
                              user_id: str = None) -> Dict[str, Any]:
    """Convenience function to create a Discord deliverable
    
    Args:
        skill_name: Name of the skill
        title: Title for the deliverable
        content: Skill output content
        user_id: Optional user ID
        
    Returns:
        Dict with deliverable info
    """
    try:
        discord = DiscordMCP()
        
        # Parse content
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {'raw_content': content}
        
        channel_id = os.environ.get('DISCORD_DEFAULT_CHANNEL', '')
        
        if skill_name == 'community-building':
            # Send community setup guide
            embed = {
                'title': f'Community Setup: {title}',
                'description': str(content)[:2000],
                'color': 5814783
            }
            result = discord.send_message(
                channel_id=channel_id,
                content=f'📢 **Community Setup Guide: {title}**',
                embed=embed
            )
        elif skill_name == 'launch-planning':
            # Send launch announcement template
            embed = {
                'title': f'🚀 Launch Plan: {title}',
                'description': str(content)[:2000],
                'color': 2067276
            }
            result = discord.send_message(
                channel_id=channel_id,
                content='📢 **Launch Planning**',
                embed=embed
            )
        else:
            # Generic message
            result = discord.send_message(
                channel_id=channel_id,
                content=f'**{title}**\n\n{str(content)[:1500]}'
            )
        
        if result.get('success'):
            return {
                'success': True,
                'deliverable_type': 'discord_message',
                'message_id': result.get('message_id'),
                'message': f'{skill_name} delivered to Discord'
            }
        else:
            return {
                'success': False,
                'error': result.get('error', 'unknown'),
                'message': result.get('message', 'Failed'),
                'fallback': 'notion_document'
            }
    
    except DiscordMCPError as e:
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
    print("Discord MCP Connector")
    print("Usage: Import and call create_discord_deliverable()")
