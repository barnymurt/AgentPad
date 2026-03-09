import { NextRequest, NextResponse } from 'next/server';

const MCP_KEYS: Record<string, string[]> = {
  notion: ['NOTION_API_KEY'],
  google_sheets: ['GOOGLE_SHEETS_CREDENTIALS', 'GOOGLE_SHEETS_CREDENTIALS_JSON'],
  google_docs: ['GOOGLE_DOCS_CREDENTIALS', 'GOOGLE_DOCS_CREDENTIALS_JSON'],
  figma: ['FIGMA_API_KEY'],
  miro: ['MIRO_API_KEY'],
  linear: ['LINEAR_API_KEY', 'LINEAR_TEAM_ID'],
  github: ['GITHUB_TOKEN', 'GITHUB_OWNER'],
  vercel: ['VERCEL_TOKEN'],
  jira: ['JIRA_DOMAIN', 'JIRA_EMAIL', 'JIRA_TOKEN', 'JIRA_DEFAULT_PROJECT'],
  hubspot: ['HUBSPOT_API_KEY'],
  stripe: ['STRIPE_API_KEY'],
  google_analytics: ['GA4_PROPERTY_ID', 'GOOGLE_ANALYTICS_CREDENTIALS'],
  discord: ['DISCORD_BOT_TOKEN', 'DISCORD_DEFAULT_CHANNEL'],
};

function getApiKeysFromCookies(cookieHeader: string | null, mcpId: string): Record<string, string> {
  const keys: Record<string, string> = {};
  const requiredKeys = MCP_KEYS[mcpId] || [];
  
  if (!cookieHeader) return keys;
  
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map(c => c.split('='))
  );
  
  for (const key of requiredKeys) {
    if (cookies[key]) {
      keys[key] = cookies[key];
    }
  }
  
  return keys;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mcpId } = body;
    
    if (!mcpId) {
      return NextResponse.json(
        { success: false, message: 'Missing mcpId' },
        { status: 400 }
      );
    }
    
    const cookieHeader = request.headers.get('cookie');
    const apiKeys = getApiKeysFromCookies(cookieHeader, mcpId);
    const requiredKeys = MCP_KEYS[mcpId] || [];
    
    if (requiredKeys.length === 0) {
      return NextResponse.json(
        { success: false, message: `Unknown MCP: ${mcpId}` },
        { status: 400 }
      );
    }
    
    const missingKeys = requiredKeys.filter(k => !apiKeys[k]);
    
    if (missingKeys.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Missing keys: ${missingKeys.join(', ')}`
      });
    }
    
    return NextResponse.json({
      success: true,
      message: `All required keys configured for ${mcpId}`
    });
    
  } catch (error) {
    console.error('MCP test error:', error);
    return NextResponse.json(
      { success: false, message: 'Test failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Use POST method to test MCP connections'
  });
}
