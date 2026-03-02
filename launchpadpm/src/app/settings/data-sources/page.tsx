'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';

interface DataSource {
  id: string;
  name: string;
  type: string;
  location?: string;
  squads?: string[];
  created_at: string;
}

export default function DataSourcesPage() {
  const router = useRouter();
  const { darkMode } = useAppLayout();
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [newSource, setNewSource] = useState({
    name: '',
    type: 'spreadsheet',
    location: '',
    authType: 'none',
    apiKey: '',
    username: '',
    password: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [saving, setSaving] = useState(false);

  const bgColor = darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const borderColor = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-[#0f0f1a]' : 'bg-white';

  useEffect(() => {
    fetchDataSources();
  }, []);

  const fetchDataSources = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/data-sources');
      const data = await res.json();
      setDataSources(data.data_sources || []);
    } catch (err) {
      console.error('Failed to fetch data sources:', err);
    } finally {
      setLoading(false);
    }
  };

  const addDataSource = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: null, message: '' });
    
    try {
      const res = await fetch('/api/data-sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSource),
      });
      
      if (res.ok) {
        setStatus({ type: 'success', message: 'Data source connected successfully!' });
        fetchDataSources();
        setShowAddForm(false);
        setNewSource({ name: '', type: 'spreadsheet', location: '', authType: 'none', apiKey: '', username: '', password: '' });
        setTimeout(() => setStatus({ type: null, message: '' }), 3000);
      } else {
        const data = await res.json();
        setStatus({ type: 'error', message: data.error || 'Failed to connect' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Connection failed. Please check the details and try again.' });
    } finally {
      setSaving(false);
    }
  };

  const removeDataSource = async (id: string) => {
    if (!confirm('Remove this data source?')) return;
    try {
      await fetch(`/api/data-sources?id=${id}`, { method: 'DELETE' });
      fetchDataSources();
    } catch (err) {
      console.error('Failed to remove data source:', err);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'spreadsheet':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M3 10h18M3 14h18M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'database':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C7 3 3 4.5 3 6v12c0 1.5 4 3 9 3s9-1.5 9-3V6c0-1.5-4-3-9-3z" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 12c0 1.5 4 3 9 3s9-1.5 9-3" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'api':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      case 'cloud_storage':
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M3 15a4 4 0 014-4h10a4 4 0 010 8H7a4 4 0 01-4-4z" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 17l2-4h14l2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <AppLayout title="Data Connections">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Data Connections">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className={`${bgColor} ${borderColor} border rounded-xl p-6`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 className={`font-semibold ${textColor} text-xl`}>Connect Your Data</h2>
              <p className={mutedColor}>Add data sources to enhance AI analysis</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 ${cardBg} rounded-lg text-center`}>
              <div className="text-2xl mb-1">📊</div>
              <p className={`text-xs ${mutedColor}`}>Spreadsheets</p>
            </div>
            <div className={`p-3 ${cardBg} rounded-lg text-center`}>
              <div className="text-2xl mb-1">🗄️</div>
              <p className={`text-xs ${mutedColor}`}>Databases</p>
            </div>
            <div className={`p-3 ${cardBg} rounded-lg text-center`}>
              <div className="text-2xl mb-1">🔗</div>
              <p className={`text-xs ${mutedColor}`}>APIs</p>
            </div>
          </div>
        </div>

        {/* Data Sources List */}
        <div className={`${bgColor} ${borderColor} border rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${textColor} text-lg`} data-testid="connected-sources-title">Connected Sources</h3>
            <button
              onClick={() => setShowAddForm(true)}
              data-testid="add-source-button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
            >
              + Add Source
            </button>
          </div>

          {status.type && (
            <div className={`mb-4 p-3 rounded-lg ${
              status.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            }`}>
              {status.message}
            </div>
          )}

          {dataSources.length === 0 ? (
            <div className="text-center py-12" data-testid="empty-data-sources">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7V4h16v3M9 20h6M12 4v16" strokeLinecap="round"/>
                </svg>
              </div>
              <p className={`${mutedColor} mb-4`}>No data sources connected yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                data-testid="add-first-source-button"
                className="text-blue-600 hover:underline"
              >
                Add your first data source
              </button>
            </div>
          ) : (
              <div className="space-y-3" data-testid="data-sources-list">
              {dataSources.map((ds) => (
                <div key={ds.id} className={`flex items-center justify-between p-4 ${cardBg} rounded-lg`} data-testid={`data-source-${ds.id}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                      {getTypeIcon(ds.type)}
                    </div>
                    <div>
                      <p className={`font-medium ${textColor}`}>{ds.name}</p>
                      <p className={`text-sm ${mutedColor}`}>
                        {ds.type} {ds.location && `• ${ds.location.substring(0, 40)}...`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeDataSource(ds.id)}
                    data-testid={`remove-source-${ds.id}`}
                    className="px-3 py-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`${bgColor} rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto`}>
              <div className={`p-6 border-b ${borderColor}`}>
                <div className="flex items-center justify-between">
                  <h2 className={`font-semibold ${textColor} text-xl`}>Add Data Source</h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    data-testid="source-modal-close"
                    className={`${mutedColor} hover:${textColor}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={addDataSource} className="p-6 space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>Name</label>
                  <input
                    type="text"
                    value={newSource.name}
                    onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                    placeholder="e.g., Customer Interview Data"
                    data-testid="source-name-input"
                    className={`w-full px-4 py-3 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>Type</label>
                  <select
                    value={newSource.type}
                    onChange={(e) => setNewSource({ ...newSource, type: e.target.value, authType: 'none' })}
                    data-testid="source-type-select"
                    className={`w-full px-4 py-3 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="spreadsheet">Spreadsheet (Google Sheets, Excel)</option>
                    <option value="database">Database (PostgreSQL, MySQL)</option>
                    <option value="api">API Endpoint</option>
                    <option value="url">URL (public)</option>
                    <option value="file">File Upload</option>
                    <option value="cloud_storage">Cloud Storage (S3, GCS)</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>Authentication</label>
                  <select
                    value={newSource.authType}
                    onChange={(e) => setNewSource({ ...newSource, authType: e.target.value })}
                    data-testid="source-auth-type-select"
                    className={`w-full px-4 py-3 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="none">None (public)</option>
                    <option value="apiKey">API Key</option>
                    <option value="basic">Username & Password</option>
                    <option value="oauth">OAuth Token</option>
                  </select>
                </div>

                {newSource.authType === 'apiKey' && (
                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>API Key</label>
                    <div className="relative">
                      <input
                        type={showSecret ? 'text' : 'password'}
                        value={newSource.apiKey}
                        onChange={(e) => setNewSource({ ...newSource, apiKey: e.target.value })}
                        placeholder="Enter your API key"
                        data-testid="source-api-key-input"
                        className={`w-full px-4 py-3 pr-12 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSecret(!showSecret)}
                        data-testid="source-toggle-secret"
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
                )}

                {newSource.authType === 'basic' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${textColor} mb-2`}>Username</label>
                      <input
                        type="text"
                        value={newSource.username}
                        onChange={(e) => setNewSource({ ...newSource, username: e.target.value })}
                        placeholder="Username"
                        data-testid="source-username-input"
                        className={`w-full px-4 py-3 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${textColor} mb-2`}>Password</label>
                      <input
                        type="password"
                        value={newSource.password}
                        onChange={(e) => setNewSource({ ...newSource, password: e.target.value })}
                        placeholder="Password"
                        data-testid="source-password-input"
                        className={`w-full px-4 py-3 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  </div>
                )}

                {newSource.authType === 'oauth' && (
                  <div>
                    <label className={`block text-sm font-medium ${textColor} mb-2`}>OAuth Token</label>
                    <input
                      type="password"
                      value={newSource.apiKey}
                      onChange={(e) => setNewSource({ ...newSource, apiKey: e.target.value })}
                      placeholder="Enter OAuth token"
                      data-testid="source-oauth-input"
                      className={`w-full px-4 py-3 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                )}

                <div>
                  <label className={`block text-sm font-medium ${textColor} mb-2`}>
                    {newSource.type === 'spreadsheet' ? 'Spreadsheet URL' : 
                     newSource.type === 'database' ? 'Connection String' :
                     newSource.type === 'api' ? 'API Endpoint URL' :
                     newSource.type === 'url' ? 'URL' :
                     newSource.type === 'cloud_storage' ? 'Bucket/Container Name' : 'File'}
                  </label>
                  <input
                    type="text"
                    value={newSource.location}
                    onChange={(e) => setNewSource({ ...newSource, location: e.target.value })}
                    data-testid="source-location-input"
                    placeholder={
                      newSource.type === 'spreadsheet' ? 'https://docs.google.com/spreadsheets/d/...' :
                      newSource.type === 'database' ? 'postgresql://user:pass@host:5432/db' :
                      newSource.type === 'api' ? 'https://api.example.com/v1/...' :
                      newSource.type === 'url' ? 'https://example.com/data' :
                      newSource.type === 'cloud_storage' ? 's3://my-bucket or gs://my-bucket' : '/path/to/file.csv'
                    }
                    className={`w-full px-4 py-3 ${cardBg} border ${borderColor} rounded-lg ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    data-testid="source-cancel-button"
                    className={`flex-1 px-4 py-3 border ${borderColor} ${textColor} rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    data-testid="source-connect-button"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
                  >
                    {saving ? 'Connecting...' : 'Connect'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
