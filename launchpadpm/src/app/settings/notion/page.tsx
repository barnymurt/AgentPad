'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';

interface NotionConnection {
  connected: boolean;
  configured: boolean;
  workspaceName?: string;
}

export default function NotionSettings() {
  const router = useRouter();
  const { isDarkMode } = useAppLayout();
  const [connection, setConnection] = useState<NotionConnection>({
    connected: false,
    configured: false
  });
  const [loading, setLoading] = useState(true);
  const [autoSync, setAutoSync] = useState(false);
  const [defaultProject, setDefaultProject] = useState('');
  const [notionClientId, setNotionClientId] = useState('');
  const [notionClientSecret, setNotionClientSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const bgColor = isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const borderColor = isDarkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDarkMode ? 'bg-[#0f0f1a]' : 'bg-white';

  useEffect(() => {
    checkConnection();
    const savedSync = localStorage.getItem('notion-autosync');
    const savedProject = localStorage.getItem('notion-default-project');
    const savedClientId = localStorage.getItem('notion-client-id');
    const savedClientSecret = localStorage.getItem('notion-client-secret');
    if (savedSync) setAutoSync(savedSync === 'true');
    if (savedProject) setDefaultProject(savedProject);
    if (savedClientId) setNotionClientId(savedClientId);
    if (savedClientSecret) setNotionClientSecret(savedClientSecret);
  }, []);

  const checkConnection = async () => {
    try {
      const clientId = localStorage.getItem('notion-client-id');
      const clientSecret = localStorage.getItem('notion-client-secret');
      
      if (clientId && clientSecret) {
        const res = await fetch('/api/notion/connect?action=status');
        const data = await res.json();
        setConnection({ ...data, configured: true });
      } else {
        setConnection({ connected: false, configured: false });
      }
    } catch (error) {
      console.error('Failed to check Notion connection:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    const clientId = localStorage.getItem('notion-client-id');
    const clientSecret = localStorage.getItem('notion-client-secret');
    if (clientId && clientSecret) {
      document.cookie = `notion-client-id=${clientId}; path=/; max-age=31536000`;
      document.cookie = `notion-client-secret=${clientSecret}; path=/; max-age=31536000`;
    }
    window.location.href = '/api/notion/connect?action=connect';
  };

  const handleDisconnect = async () => {
    try {
      await fetch('/api/notion/connect?action=disconnect', { method: 'GET' });
      setConnection({ connected: false, configured: connection.configured });
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  const handleSaveCredentials = async () => {
    if (!notionClientId || !notionClientSecret) return;
    
    setSaving(true);
    localStorage.setItem('notion-client-id', notionClientId);
    localStorage.setItem('notion-client-secret', notionClientSecret);
    
    // Also set as cookies for the server to access
    document.cookie = `notion-client-id=${notionClientId}; path=/; max-age=31536000`;
    document.cookie = `notion-client-secret=${notionClientSecret}; path=/; max-age=31536000`;
    
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setConnection({ connected: false, configured: true });
      setTimeout(() => setSaved(false), 2000);
    }, 500);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('notion-autosync', String(autoSync));
    localStorage.setItem('notion-default-project', defaultProject);
  };

  if (loading) {
    return (
      <AppLayout title="Notion Integration">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Notion Integration">
      <div className="max-w-2xl mx-auto space-y-6">
        {!connection.configured ? (
          <div className={`${bgColor} ${borderColor} border rounded-xl p-6`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.047-.747.327-.747.933z" fill="#000"/>
                </svg>
              </div>
              <div>
                <h2 className={`font-semibold ${textColor} text-xl`}>Connect to Notion</h2>
                <p className={`${mutedColor}`}>Enter your Notion API credentials to get started</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  Notion Client ID
                </label>
                <input
                  type="text"
                  value={notionClientId}
                  onChange={(e) => setNotionClientId(e.target.value)}
                  placeholder="Enter your Notion Client ID"
                  className={`w-full px-4 py-3 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${textColor} mb-2`}>
                  Notion Client Secret
                </label>
                <div className="relative">
                  <input
                    type={showSecret ? 'text' : 'password'}
                    value={notionClientSecret}
                    onChange={(e) => setNotionClientSecret(e.target.value)}
                    placeholder="Enter your Notion Client Secret"
                    className={`w-full px-4 py-3 pr-12 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecret(!showSecret)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${mutedColor} hover:${textColor}`}
                  >
                    {showSecret ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSaveCredentials}
                disabled={!notionClientId || !notionClientSecret || saving}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Saving...
                  </>
                ) : saved ? (
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

              <div className={`p-4 ${cardBg} rounded-lg`}>
                <p className={`text-sm ${mutedColor}`}>
                  <strong className={textColor}>How to get your credentials:</strong>
                </p>
                <ol className={`text-sm ${mutedColor} mt-2 space-y-1 list-decimal list-inside`}>
                  <li>Go to <a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">notion.so/my-integrations</a></li>
                  <li>Create a new integration</li>
                  <li>Copy the "Client ID" and "Client Secret"</li>
                  <li>Paste them above and click Save</li>
                </ol>
              </div>

              <div className={`p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg`}>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Note:</strong> Your credentials are stored locally in your browser. They are only used to authenticate with Notion's API.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Connection Card */}
          <div className={`${bgColor} ${borderColor} border rounded-xl p-6`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.746 0-.933-.234-1.495-.933l-4.576-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM2.1 1.155l13.589-.933c1.635-.14 2.055-.047 3.082.7l4.296 3.013c.7.513.933.653.933 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.921c0-.84.373-1.54 1.68-1.633z" fill="#000"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className={`font-semibold ${textColor} text-xl`}>Connect to Notion</h2>
                <p className={`${mutedColor}`}>
                  Sync your validation results directly to your Notion workspace
                </p>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                connection.connected 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}>
                {connection.connected ? 'Connected' : 'Disconnected'}
              </div>
            </div>

            {connection.connected ? (
              <div className="space-y-4">
                <div className={`p-4 ${cardBg} rounded-lg`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${textColor}`}>Connected to {connection.workspaceName || 'Notion'}</p>
                      <p className={`text-sm ${mutedColor}`}>Your Notion account is linked</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="px-4 py-2 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Disconnect Notion
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className={`p-3 ${cardBg} rounded-lg text-center`}>
                    <div className="text-2xl mb-1">📄</div>
                    <p className={`text-xs ${mutedColor}`}>Auto-export pages</p>
                  </div>
                  <div className={`p-3 ${cardBg} rounded-lg text-center`}>
                    <div className="text-2xl mb-1">⚡</div>
                    <p className={`text-xs ${mutedColor}`}>Instant sync</p>
                  </div>
                  <div className={`p-3 ${cardBg} rounded-lg text-center`}>
                    <div className="text-2xl mb-1">🔒</div>
                    <p className={`text-xs ${mutedColor}`}>Secure & private</p>
                  </div>
                </div>
                <button
                  onClick={handleConnect}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.047-.747.327-.747.933z" fill="currentColor"/>
                  </svg>
                  Connect Notion Account
                </button>
                <p className={`text-center text-sm ${mutedColor}`}>
                  Click to authorize AgentPad to access your Notion workspace
                </p>
              </div>
            )}
          </div>

          {/* Settings Card */}
          {connection.connected && (
            <div className={`${bgColor} ${borderColor} border rounded-xl p-6`}>
              <h3 className={`font-semibold ${textColor} text-lg mb-4`}>Export Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0f0f1a] rounded-lg">
                  <div>
                    <p className={`font-medium ${textColor}`}>Auto-sync</p>
                    <p className={`text-sm ${mutedColor}`}>Automatically export after squad runs</p>
                  </div>
                  <button
                    onClick={() => setAutoSync(!autoSync)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoSync ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoSync ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>
                    Default Project Name
                  </label>
                  <input
                    type="text"
                    value={defaultProject}
                    onChange={(e) => setDefaultProject(e.target.value)}
                    placeholder="My Product"
                    className={`w-full px-4 py-3 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <p className={`text-sm ${mutedColor} mt-1`}>
                    Used for Notion exports unless specified otherwise
                  </p>
                </div>

                <button
                  onClick={handleSaveSettings}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* How It Works Card */}
          <div className={`${bgColor} ${borderColor} border rounded-xl p-6`}>
            <h3 className={`font-semibold ${textColor} text-lg mb-4`}>How It Works</h3>
            <div className="space-y-3">
              {[
                { step: '1', title: 'Connect', desc: 'Link your Notion account above' },
                { step: '2', title: 'Run Squad', desc: 'Execute any squad in AgentPad' },
                { step: '3', title: 'Export', desc: 'Click "Export to Notion" on results' },
                { step: '4', title: 'Done', desc: 'Pages appear in your Notion workspace' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-sm font-medium">
                    {item.step}
                  </div>
                  <div>
                    <p className={`font-medium ${textColor}`}>{item.title}</p>
                    <p className={`text-sm ${mutedColor}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg`}>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Security:</strong> Your Notion access is read-only for exports only. AgentPad can only create pages, never read your existing content.
              </p>
            </div>
          </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
