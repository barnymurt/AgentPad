'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';

interface MCPConfig {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  bgGradient: string;
  features: string[];
  envVars: {
    key: string;
    label: string;
    placeholder: string;
    help?: string;
  }[];
  docUrl?: string;
}

const MCP_CONFIGS: MCPConfig[] = [
  {
    id: 'notion',
    name: 'Notion',
    description: 'Create pages, databases, and workspaces',
    longDescription: 'Connect Notion to automatically create structured pages, databases, and workspaces for your validation packs, requirements documents, and more.',
    icon: 'M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.047-.747.327-.747.933z',
    color: 'gray',
    bgGradient: 'from-gray-500 to-gray-600',
    features: ['Auto-create pages', 'Database sync', 'Workspace organization', 'Rich embeds'],
    envVars: [
      { key: 'NOTION_API_KEY', label: 'Integration Token', placeholder: 'secret_xxxxx', help: 'Get from notion.so/my-integrations' }
    ],
    docUrl: 'https://developers.notion.com/'
  },
  {
    id: 'google_sheets',
    name: 'Google Sheets',
    description: 'Create spreadsheets and financial models',
    longDescription: 'Create Google Sheets for business case modeling, financial projections, and data tracking. Automatically populate cells with validation data.',
    icon: 'M3 10h18M3 14h18m-9-4v8m-7 0h18a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    color: 'green',
    bgGradient: 'from-green-500 to-emerald-600',
    features: ['Financial models', 'Data tables', 'Charts & graphs', 'Real-time collaboration'],
    envVars: [
      { key: 'GOOGLE_SHEETS_CREDENTIALS', label: 'Service Account JSON', placeholder: 'Paste credentials JSON', help: 'Download from Google Cloud Console' }
    ],
    docUrl: 'https://developers.google.com/sheets'
  },
  {
    id: 'google_docs',
    name: 'Google Docs',
    description: 'Create documents and reports',
    longDescription: 'Generate professional Google Docs for requirements, reports, and documentation. Format content automatically with headings and lists.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    color: 'blue',
    bgGradient: 'from-blue-500 to-indigo-600',
    features: ['Auto-formatting', 'Templates', 'Team collaboration', 'Version history'],
    envVars: [
      { key: 'GOOGLE_DOCS_CREDENTIALS', label: 'Service Account JSON', placeholder: 'Paste credentials JSON' }
    ],
    docUrl: 'https://developers.google.com/docs'
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Create wireframes and design files',
    longDescription: 'Generate Figma files with wireframes, UI patterns, and design components. Perfect for design validation and prototyping.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2z',
    color: 'purple',
    bgGradient: 'from-purple-500 to-pink-600',
    features: ['Wireframe creation', 'Design components', 'Prototyping', 'Design systems'],
    envVars: [
      { key: 'FIGMA_API_KEY', label: 'Access Token', placeholder: 'figd_xxxxx', help: 'Get from Figma Settings > Account' }
    ],
    docUrl: 'https://www.figma.com/developers/api'
  },
  {
    id: 'miro',
    name: 'Miro',
    description: 'Create boards and visual diagrams',
    longDescription: 'Create Miro boards for user journey mapping, mind maps, and visual collaboration. Perfect for stakeholder workshops.',
    icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
    color: 'yellow',
    bgGradient: 'from-yellow-500 to-orange-600',
    features: ['Journey maps', 'Mind maps', 'Whiteboarding', 'Templates'],
    envVars: [
      { key: 'MIRO_API_KEY', label: 'Access Token', placeholder: 'eyJxxxxx' }
    ],
    docUrl: 'https://developers.miro.com/'
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Create issues and roadmaps',
    longDescription: 'Sync feature prioritization and roadmaps directly to Linear. Create issues, epics, and track development progress.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    color: 'gray',
    bgGradient: 'from-gray-600 to-gray-800',
    features: ['Issue creation', 'Roadmap sync', 'Sprint planning', 'Labels & projects'],
    envVars: [
      { key: 'LINEAR_API_KEY', label: 'API Key', placeholder: 'lin_api_xxxxx', help: 'Get from Linear Settings > API' },
      { key: 'LINEAR_TEAM_ID', label: 'Team ID', placeholder: 'Team ID' }
    ],
    docUrl: 'https://developers.linear.app/'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Create issues and repositories',
    longDescription: 'Create GitHub issues, repositories, and technical specifications. Perfect for developer handoff and CI/CD pipelines.',
    icon: 'M9 19c-5 1.5-5-5.5 0-6 5.5 0 6 .5-9 5 0 6 6 0 6-1.5 5-5.5 0-6-5.5 0-6 .5 9 5 0 6-6 0-1.5 5 5.5 0 6 5.5 0 0-6z M9 10c.5 0 1-.5 1-1s-.5-1-1-1-1 .5-1 1 .5 1 1 1z',
    color: 'gray',
    bgGradient: 'from-gray-800 to-gray-900',
    features: ['Issue tracking', 'Repo creation', 'PR automation', 'Tech specs'],
    envVars: [
      { key: 'GITHUB_TOKEN', label: 'Personal Access Token', placeholder: 'ghp_xxxxx', help: 'Requires repo scope' },
      { key: 'GITHUB_OWNER', label: 'Owner/Org', placeholder: 'username or org' }
    ],
    docUrl: 'https://docs.github.com/'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: 'Deploy projects and manage infrastructure',
    longDescription: 'Deploy projects and manage serverless infrastructure directly from your validation workflow.',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    color: 'black',
    bgGradient: 'from-gray-900 to-black',
    features: ['One-click deploy', 'Serverless functions', 'Environment variables', 'Preview deployments'],
    envVars: [
      { key: 'VERCEL_TOKEN', label: 'Access Token', placeholder: 'vercel_d_xxxxx' }
    ],
    docUrl: 'https://vercel.com/docs'
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Create issues and manage projects',
    longDescription: 'Sync tickets, epics, and sprints to Jira for enterprise teams. Full project management integration.',
    icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2m0-10a2 2 0 012 2h2a2 2 0 012-2m0 10V7m-4 5a2 2 0 104 0m0 0a2 2 0 11-4 0',
    color: 'blue',
    bgGradient: 'from-blue-600 to-blue-800',
    features: ['Issue tracking', 'Epic management', 'Sprint planning', 'Custom workflows'],
    envVars: [
      { key: 'JIRA_DOMAIN', label: 'Domain', placeholder: 'company.atlassian.net' },
      { key: 'JIRA_EMAIL', label: 'Email', placeholder: 'you@company.com' },
      { key: 'JIRA_TOKEN', label: 'API Token', placeholder: 'Your API token' },
      { key: 'JIRA_DEFAULT_PROJECT', label: 'Default Project', placeholder: 'PROJ' }
    ],
    docUrl: 'https://developer.atlassian.com/cloud/jira/'
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM, contacts, and marketing',
    longDescription: 'Create contacts, deals, and marketing emails in HubSpot. Perfect for sales enablement and CRM sync.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    color: 'orange',
    bgGradient: 'from-orange-500 to-red-600',
    features: ['Contact creation', 'Deal tracking', 'Marketing emails', 'Pipeline management'],
    envVars: [
      { key: 'HUBSPOT_API_KEY', label: 'API Key', placeholder: 'xxxxx-xxxxx-xxxxx' }
    ],
    docUrl: 'https://developers.hubspot.com/'
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payments and subscriptions',
    longDescription: 'Create Stripe products, pricing tiers, and checkout sessions. Perfect for pricing strategy validation.',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
    color: 'purple',
    bgGradient: 'from-purple-600 to-indigo-700',
    features: ['Product creation', 'Pricing tiers', 'Checkout sessions', 'Coupon codes'],
    envVars: [
      { key: 'STRIPE_API_KEY', label: 'Secret Key', placeholder: 'sk_live_xxxxx' }
    ],
    docUrl: 'https://stripe.com/docs'
  },
  {
    id: 'google_analytics',
    name: 'Google Analytics',
    description: 'Reports and analytics',
    longDescription: 'Query GA4 for analytics reports, funnels, and cohort analysis. Track validation results and user behavior.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    color: 'yellow',
    bgGradient: 'from-yellow-500 to-amber-600',
    features: ['Realtime data', 'Funnel analysis', 'Cohort reports', 'Event tracking'],
    envVars: [
      { key: 'GA4_PROPERTY_ID', label: 'Property ID', placeholder: '123456789' },
      { key: 'GOOGLE_ANALYTICS_CREDENTIALS', label: 'Service Account JSON', placeholder: 'Credentials JSON' }
    ],
    docUrl: 'https://developers.google.com/analytics/devguides/reporting/data/v1'
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Community and messaging',
    longDescription: 'Send messages and manage community channels in Discord. Perfect for launch announcements and team coordination.',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    color: 'indigo',
    bgGradient: 'from-indigo-600 to-violet-700',
    features: ['Message sending', 'Channel management', 'Webhook integration', 'Bot commands'],
    envVars: [
      { key: 'DISCORD_BOT_TOKEN', label: 'Bot Token', placeholder: 'Bot xxxxx' },
      { key: 'DISCORD_DEFAULT_CHANNEL', label: 'Default Channel ID', placeholder: 'Channel ID' }
    ],
    docUrl: 'https://discord.com/developers/docs'
  }
];

export default function APIKeysPage() {
  const [savedMCPs, setSavedMCPs] = useState<Set<string>>(new Set());
  const [expandedMCP, setExpandedMCP] = useState<string | null>(null);
  const [showSecrets, setShowSecrets] = useState<Set<string>>(new Set());
  const [mcpValues, setMcpValues] = useState<Record<string, Record<string, string>>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [testing, setTesting] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string }>>({});
  const [docsMCP, setDocsMCP] = useState<MCPConfig | null>(null);

  const bgColor = 'bg-white';
  const borderColor = 'border-gray-200';
  const textColor = 'text-gray-900';
  const mutedColor = 'text-gray-600';
  const cardBg = 'bg-white';

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
              <p className={mutedColor}>Connect your tools to enable AI-powered deliverable creation</p>
            </div>
          </div>

          <div className={`p-4 ${cardBg} rounded-lg`}>
            <p className={`text-sm ${mutedColor}`}>
              <strong className={textColor}>How it works:</strong> Each tool below can create real deliverables when you run skills. 
              API keys are stored locally in your browser - nothing is sent to external servers.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {MCP_CONFIGS.map(mcp => {
            const isExpanded = expandedMCP === mcp.id;
            const isConnected = savedMCPs.has(mcp.id);

            return (
              <div key={mcp.id} className={`${bgColor} ${borderColor} border rounded-xl overflow-hidden`}>
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-opacity-50"
                  onClick={() => setExpandedMCP(isExpanded ? null : mcp.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${mcp.bgGradient} rounded-xl flex items-center justify-center`}>
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={mcp.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${textColor}`}>{mcp.name}</h3>
                      <p className={`text-sm ${mutedColor}`}>{mcp.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isConnected && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Connected
                      </span>
                    )}
                    <svg 
                      className={`w-5 h-5 ${mutedColor} transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {isExpanded && (
                  <div className={`p-6 pt-0 border-t ${borderColor}`}>
                    <p className={`text-sm ${mutedColor} mb-4`}>{mcp.longDescription}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      {mcp.features.map((feature, i) => (
                        <button
                          key={i}
                          onClick={() => setDocsMCP(mcp)}
                          className={`p-3 ${cardBg} rounded-lg text-center hover:bg-blue-50 cursor-pointer group transition-colors`}
                        >
                          <p className={`text-xs ${mutedColor} group-hover:text-blue-500`}>{feature}</p>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4 mb-6">
                      {mcp.envVars.map(env => (
                        <div key={env.key}>
                          <label className={`block text-sm font-medium ${textColor} mb-2`}>
                            {env.label}
                            {isConnected && (
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
                          isConnected ? 'Update Credentials' : 'Save Credentials'
                        )}
                      </button>

                      {isConnected && (
                        <button
                          onClick={() => handleDisconnect(mcp.id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium"
                        >
                          Disconnect
                        </button>
                      )}

                      {mcp.docUrl && (
                        <a
                          href={mcp.docUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                        >
                          Docs
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Docs Modal */}
        {docsMCP && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setDocsMCP(null)}
            />
            <div className={`relative ${cardBg} rounded-xl border ${borderColor} max-w-2xl w-full max-h-[80vh] overflow-hidden`}>
              <div className="flex items-center justify-between p-4 border-b ${borderColor}">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${docsMCP.bgGradient} rounded-lg flex items-center justify-center`}>
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={docsMCP.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${textColor}`}>{docsMCP.name} Integration</h3>
                    <p className={`text-sm ${mutedColor}`}>{docsMCP.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDocsMCP(null)}
                  className={`p-2 rounded-lg hover:bg-gray-100 ${mutedColor}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <p className={`text-sm ${mutedColor} mb-4`}>{docsMCP.longDescription}</p>
                
                <h4 className={`font-medium ${textColor} mb-2`}>Key Features</h4>
                <ul className="space-y-2 mb-6">
                  {docsMCP.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${textColor}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <h4 className={`font-medium ${textColor} mb-2`}>Required Credentials</h4>
                <ul className="space-y-2 mb-6">
                  {docsMCP.envVars.map((env, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                      <span className={`text-sm ${textColor}`}>{env.label}</span>
                    </li>
                  ))}
                </ul>

                {docsMCP.docUrl && (
                  <a
                    href={docsMCP.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View Full Documentation
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
