'use client';

import { useState, useEffect } from 'react';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';

interface MCPConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  envVars: {
    key: string;
    label: string;
    placeholder: string;
    help?: string;
  }[];
  color: string;
}

const MCP_CONFIGS: MCPConfig[] = [
  {
    id: 'notion',
    name: 'Notion',
    description: 'Create pages, databases, and Notion workspaces',
    icon: '📄',
    color: 'blue',
    envVars: [
      { key: 'NOTION_API_KEY', label: 'API Key', placeholder: 'secret_xxxxx', help: 'Get from notion.so/my-integrations' }
    ]
  },
  {
    id: 'google_sheets',
    name: 'Google Sheets',
    description: 'Create spreadsheets, charts, and financial models',
    icon: '📊',
    color: 'green',
    envVars: [
      { key: 'GOOGLE_SHEETS_CREDENTIALS', label: 'Credentials JSON', placeholder: 'Paste credentials JSON', help: 'Service account JSON file' }
    ]
  },
  {
    id: 'google_docs',
    name: 'Google Docs',
    description: 'Create documents and reports',
    icon: '📝',
    color: 'blue',
    envVars: [
      { key: 'GOOGLE_DOCS_CREDENTIALS', label: 'Credentials JSON', placeholder: 'Paste credentials JSON', help: 'Service account JSON file' }
    ]
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Create wireframes and design files',
    icon: '🎨',
    color: 'purple',
    envVars: [
      { key: 'FIGMA_API_KEY', label: 'Access Token', placeholder: 'figd_xxxxx', help: 'Get from Figma Settings > Personal Access Tokens' }
    ]
  },
  {
    id: 'miro',
    name: 'Miro',
    description: 'Create boards, mind maps, and journey maps',
    icon: '🗺️',
    color: 'yellow',
    envVars: [
      { key: 'MIRO_API_KEY', label: 'Access Token', placeholder: 'eyJxxxxx', help: 'Get from Miro Settings > Apps > Custom apps' }
    ]
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Create issues, projects, and roadmaps',
    icon: '📋',
    color: 'gray',
    envVars: [
      { key: 'LINEAR_API_KEY', label: 'API Key', placeholder: 'lin_api_xxxxx', help: 'Get from Linear Settings > API' },
      { key: 'LINEAR_TEAM_ID', label: 'Team ID', placeholder: 'Team ID', help: 'Your Linear team ID' }
    ]
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Create issues, repositories, and code files',
    icon: '🐙',
    color: 'gray',
    envVars: [
      { key: 'GITHUB_TOKEN', label: 'Personal Access Token', placeholder: 'ghp_xxxxx', help: 'Repo scope required' },
      { key: 'GITHUB_OWNER', label: 'Owner/Org', placeholder: 'username or org name' }
    ]
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Create deployments and projects',
    icon: '▲',
    color: 'black',
    envVars: [
      { key: 'VERCEL_TOKEN', label: 'Access Token', placeholder: 'vercel_d_plain_xxxxx', help: 'Get from Vercel Settings > Tokens' }
    ]
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Create issues, epics, and sprints',
    icon: '📊',
    color: 'blue',
    envVars: [
      { key: 'JIRA_DOMAIN', label: 'Domain', placeholder: 'yourcompany.atlassian.net' },
      { key: 'JIRA_EMAIL', label: 'Email', placeholder: 'you@company.com' },
      { key: 'JIRA_TOKEN', label: 'API Token', placeholder: 'Your Jira API token', help: 'Get from id.atlassian.com/manage-profile' },
      { key: 'JIRA_DEFAULT_PROJECT', label: 'Default Project', placeholder: 'PROJ' }
    ]
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Create contacts, deals, and marketing emails',
    icon: '🧡',
    color: 'orange',
    envVars: [
      { key: 'HUBSPOT_API_KEY', label: 'API Key', placeholder: 'xxxxx-xxxxx-xxxxx', help: 'Get from HubSpot Settings > Integrations' }
    ]
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Create products, prices, and checkout sessions',
    icon: '💳',
    color: 'purple',
    envVars: [
      { key: 'STRIPE_API_KEY', label: 'Secret Key', placeholder: 'sk_live_xxxxx', help: 'Get from Stripe Dashboard > Developers > API Keys' }
    ]
  },
  {
    id: 'google_analytics',
    name: 'Google Analytics',
    description: 'Get reports, realtime data, and funnels',
    icon: '📈',
    color: 'yellow',
    envVars: [
      { key: 'GA4_PROPERTY_ID', label: 'Property ID', placeholder: '123456789', help: 'GA4 Property ID' },
      { key: 'GOOGLE_ANALYTICS_CREDENTIALS', label: 'Credentials JSON', placeholder: 'Paste credentials JSON', help: 'Service account with GA4 access' }
    ]
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Send messages and manage community channels',
    icon: '💬',
    color: 'indigo',
    envVars: [
      { key: 'DISCORD_BOT_TOKEN', label: 'Bot Token', placeholder: 'Bot xxxxx', help: 'Get from Discord Developer Portal' },
      { key: 'DISCORD_DEFAULT_CHANNEL', label: 'Default Channel ID', placeholder: 'Channel ID', help: 'Right-click channel > Copy ID' }
    ]
  }
];

export default function APIKeysPage() {
  const { isDarkMode } = useAppLayout();
  const [savedMCPs, setSavedMCPs] = useState<Set<string>>(new Set());
  const [expandedMCP, setExpandedMCP] = useState<string | null>(null);
  const [showSecrets, setShowSecrets] = useState<Set<string>>(new Set());
  const [mcpValues, setMcpValues] = useState<Record<string, Record<string, string>>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [testing, setTesting] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({});

  const bgColor = isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const borderColor = isDarkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDarkMode ? 'bg-[#0f0f1a]' : 'bg-white';

  useEffect(() => {
    const saved = new Set<string>();
    const values: Record<string, Record<string, string>> = {};

    MCP_CONFIGS.forEach(mcp => {
      mcp.envVars.forEach(env => {
        const value = localStorage.getItem(env.key);
        if (value) {
          saved.add(mcp.id);
          if (!values[mcp.id]) values[mcp.id] = {};
          values[mcp.id][env.key] = value;
        }
      });
    });

    setSavedMCPs(saved);
    setMcpValues(values);
  }, []);

  const handleSave = async (mcpId: string) => {
    setSaving(mcpId);
    const mcp = MCP_CONFIGS.find(m => m.id === mcpId);
    if (!mcp) return;

    const values = mcpValues[mcpId] || {};
    mcp.envVars.forEach(env => {
      const value = values[env.key] || '';
      if (value) {
        localStorage.setItem(env.key, value);
        document.cookie = `${env.key}=${encodeURIComponent(value)}; path=/; max-age=31536000; SameSite=Lax`;
      }
    });

    setSavedMCPs(prev => new Set([...prev, mcpId]));
    setSaving(null);
    setSaved(new Set([...saved, mcpId]));
    setTimeout(() => setSaved(new Set([...saved].filter(s => s !== mcpId))), 2000);
  };

  const handleTest = async (mcpId: string) => {
    setTesting(mcpId);
    setTestResults(prev => ({ ...prev, [mcpId]: { success: false, message: 'Testing...' } }));

    try {
      const response = await fetch('/api/mcp/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mcpId })
      });
      const data = await response.json();
      setTestResults(prev => ({ ...prev, [mcpId]: data }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [mcpId]: { success: false, message: 'Test request failed' } 
      }));
    }

    setTesting(null);
  };

  const handleDisconnect = (mcpId: string) => {
    const mcp = MCP_CONFIGS.find(m => m.id === mcpId);
    if (!mcp) return;

    mcp.envVars.forEach(env => {
      localStorage.removeItem(env.key);
      document.cookie = `${env.key}=; path=/; max-age=0`;
    });

    setSavedMCPs(prev => {
      const next = new Set(prev);
      next.delete(mcpId);
      return next;
    });

    setMcpValues(prev => {
      const next = { ...prev };
      delete next[mcpId];
      return next;
    });
  };

  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
    orange: 'from-orange-500 to-orange-600',
    indigo: 'from-indigo-500 to-indigo-600',
    gray: 'from-gray-500 to-gray-600',
    black: 'from-gray-900 to-gray-800'
  };

  return (
    <AppLayout title="API Keys">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className={`${bgColor} ${borderColor} border rounded-xl p-6`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
              🔑
            </div>
            <div>
              <h2 className={`font-semibold ${textColor} text-xl`}>API Keys</h2>
              <p className={mutedColor}>Configure API keys for MCP integrations</p>
            </div>
          </div>

          <div className={`p-4 ${cardBg} rounded-lg mb-6`}>
            <p className={`text-sm ${mutedColor}`}>
              <strong className={textColor}>How it works:</strong> API keys are stored locally in your browser and used by the LLM to create real deliverables in your connected accounts. 
              No data is sent to our servers - everything runs locally or directly between your browser and the service APIs.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {MCP_CONFIGS.map(mcp => (
            <div key={mcp.id} className={`${bgColor} ${borderColor} border rounded-xl overflow-hidden`}>
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-opacity-50"
                onClick={() => setExpandedMCP(expandedMCP === mcp.id ? null : mcp.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[mcp.color]} rounded-lg flex items-center justify-center text-xl`}>
                    {mcp.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${textColor}`}>{mcp.name}</h3>
                    <p className={`text-sm ${mutedColor}`}>{mcp.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {savedMCPs.has(mcp.id) && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">
                      Connected
                    </span>
                  )}
                  <svg 
                    className={`w-5 h-5 ${mutedColor} transition-transform ${expandedMCP === mcp.id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {expandedMCP === mcp.id && (
                <div className={`p-4 pt-0 space-y-4`}>
                  <div className="space-y-4">
                    {mcp.envVars.map(env => (
                      <div key={env.key}>
                        <label className={`block text-sm font-medium ${textColor} mb-2`}>
                          {env.label}
                          {savedMCPs.has(mcp.id) && (
                            <span className="ml-2 text-green-500">✓</span>
                          )}
                        </label>
                        <div className="relative">
                          <input
                            type={showSecrets.has(env.key) ? 'text' : 'password'}
                            value={mcpValues[mcp.id]?.[env.key] || ''}
                            onChange={(e) => setMcpValues(prev => ({
                              ...prev,
                              [mcp.id]: { ...prev[mcp.id], [env.key]: e.target.value }
                            }))}
                            placeholder={env.placeholder}
                            className={`w-full px-4 py-3 pr-12 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowSecrets(prev => {
                              const next = new Set(prev);
                              if (next.has(env.key)) next.delete(env.key);
                              else next.add(env.key);
                              return next;
                            })}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${mutedColor} hover:${textColor}`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {showSecrets.has(env.key) ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              )}
                            </svg>
                          </button>
                        </div>
                        {env.help && (
                          <p className={`text-xs ${mutedColor} mt-1`}>{env.help}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSave(mcp.id)}
                      disabled={saving === mcp.id}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {saving === mcp.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Saving...
                        </>
                      ) : saved.has(mcp.id) ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Saved!
                        </>
                      ) : (
                        'Save Credentials'
                      )}
                    </button>

                    {savedMCPs.has(mcp.id) && (
                      <>
                        <button
                          onClick={() => handleTest(mcp.id)}
                          disabled={testing === mcp.id}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 font-medium disabled:opacity-50 flex items-center gap-2"
                        >
                          {testing === mcp.id ? 'Testing...' : 'Test'}
                        </button>
                        <button
                          onClick={() => handleDisconnect(mcp.id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium"
                        >
                          Disconnect
                        </button>
                      </>
                    )}
                  </div>

                  {testResults[mcp.id] && (
                    <div className={`p-3 rounded-lg ${testResults[mcp.id].success ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
                      {testResults[mcp.id].message}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
