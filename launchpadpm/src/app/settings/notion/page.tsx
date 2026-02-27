'use client';

import { useState, useEffect } from 'react';

interface NotionConnection {
  connected: boolean;
  configured: boolean;
  workspaceName?: string;
}

export default function NotionSettings() {
  const [connection, setConnection] = useState<NotionConnection>({
    connected: false,
    configured: false
  });
  const [loading, setLoading] = useState(true);
  const [autoSync, setAutoSync] = useState(false);
  const [defaultProject, setDefaultProject] = useState('');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const res = await fetch('/api/notion/connect?action=status');
      const data = await res.json();
      setConnection(data);
    } catch (error) {
      console.error('Failed to check Notion connection:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    window.location.href = '/api/notion/connect?action=connect';
  };

  const handleDisconnect = async () => {
    try {
      await fetch('/api/notion/connect?action=disconnect', { method: 'GET' });
      setConnection({ connected: false, configured: true });
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('notion-autosync', String(autoSync));
    localStorage.setItem('notion-default-project', defaultProject);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Notion Integration</h1>

      {!connection.configured ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-yellow-800">Notion API Not Configured</h3>
          <p className="text-yellow-700 mt-2">
            To enable Notion sync, add NOTION_CLIENT_ID and NOTION_CLIENT_SECRET 
            to your environment variables. You can still use manual export.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white border rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Connection Status</h3>
                <p className="text-gray-600">
                  {connection.connected 
                    ? `Connected to ${connection.workspaceName || 'Notion'}`
                    : 'Not connected to Notion'
                  }
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                connection.connected 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {connection.connected ? 'Connected' : 'Disconnected'}
              </div>
            </div>

            {connection.connected ? (
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 border border-red-300 text-red-600 rounded hover:bg-red-50"
              >
                Disconnect Notion
              </button>
            ) : (
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Connect Notion Account
              </button>
            )}
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Export Settings</h3>
            
            <div className="mb-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={autoSync}
                  onChange={(e) => setAutoSync(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Auto-sync after squad runs</span>
              </label>
              <p className="text-sm text-gray-500 mt-1">
                Automatically export to Notion when a squad finishes running
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Default Project Name
              </label>
              <input
                type="text"
                value={defaultProject}
                onChange={(e) => setDefaultProject(e.target.value)}
                placeholder="My Product"
                className="w-full px-3 py-2 border rounded"
              />
              <p className="text-sm text-gray-500 mt-1">
                This name will be used for Notion exports unless you specify otherwise
              </p>
            </div>

            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Save Settings
            </button>
          </div>

          <div className="bg-gray-50 border rounded-lg p-6 mt-6">
            <h3 className="font-semibold mb-2">How It Works</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>1. Connect your Notion account to enable auto-sync</li>
              <li>2. Run any squad to generate results</li>
              <li>3. Click "Export to Notion" to add results to your workspace</li>
              <li>4. Your workspace builds incrementally as you run more squads</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
