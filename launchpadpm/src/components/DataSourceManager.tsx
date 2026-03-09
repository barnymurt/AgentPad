'use client';

import { useState, useEffect } from 'react';

interface DataSource {
  id: string;
  name: string;
  type: string;
  location?: string;
  squads?: string[];
  created_at: string;
}

export default function DataSourceManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
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

  useEffect(() => {
    if (isOpen) {
      fetchDataSources();
    }
  }, [isOpen]);

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
      setStatus({ type: 'error', message: 'Connection failed. Please check the URL and try again.' });
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

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
      >
        Add Data
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Connect Your Data</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Add research, analytics, or credentials to enhance analysis
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {status.type && (
            <div className={`mb-4 p-3 rounded-lg ${
              status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {status.message}
            </div>
          )}
          
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : dataSources.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No data sources connected</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="text-blue-600 hover:underline"
              >
                Add your first data source
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {dataSources.map((ds) => (
                <div
                  key={ds.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{ds.name}</p>
                    <p className="text-sm text-gray-500">{ds.type} {ds.location && `• ${ds.location.substring(0, 30)}...`}</p>
                  </div>
                  <button
                    onClick={() => removeDataSource(ds.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {showAddForm && (
            <form onSubmit={addDataSource} className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Add Data Source</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newSource.name}
                    onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                    placeholder="e.g., Customer Interview Data"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Type</label>
                  <select
                    value={newSource.type}
                    onChange={(e) => setNewSource({ ...newSource, type: e.target.value, authType: 'none', apiKey: '', username: '', password: '' })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                  >
                    <option value="spreadsheet">Spreadsheet (Google Sheets)</option>
                    <option value="database">Database (PostgreSQL, MySQL)</option>
                    <option value="api">API Endpoint</option>
                    <option value="url">URL (public)</option>
                    <option value="file">File</option>
                    <option value="cloud_storage">Cloud Storage (S3, GCS)</option>
                  </select>
                </div>
                
                {/* Auth Type based on data source */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Authentication</label>
                  <select
                    value={newSource.authType}
                    onChange={(e) => setNewSource({ ...newSource, authType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                  >
                    <option value="none">None (public)</option>
                    <option value="apiKey">API Key</option>
                    <option value="basic">Username & Password</option>
                    <option value="oauth">OAuth Token</option>
                  </select>
                </div>

                {/* Show auth fields based on type */}
                {newSource.authType === 'apiKey' && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">API Key</label>
                    <input
                      type="password"
                      value={newSource.apiKey}
                      onChange={(e) => setNewSource({ ...newSource, apiKey: e.target.value })}
                      placeholder="Enter your API key"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                    />
                  </div>
                )}
                
                {newSource.authType === 'basic' && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        value={newSource.username}
                        onChange={(e) => setNewSource({ ...newSource, username: e.target.value })}
                        placeholder="Username"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={newSource.password}
                        onChange={(e) => setNewSource({ ...newSource, password: e.target.value })}
                        placeholder="Password"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                      />
                    </div>
                  </>
                )}

                {newSource.authType === 'oauth' && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">OAuth Token</label>
                    <input
                      type="password"
                      value={newSource.apiKey}
                      onChange={(e) => setNewSource({ ...newSource, apiKey: e.target.value })}
                      placeholder="Enter OAuth token"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    {newSource.type === 'spreadsheet' ? 'Spreadsheet URL' : 
                     newSource.type === 'database' ? 'Connection String' :
                     newSource.type === 'api' ? 'API Endpoint URL' :
                     newSource.type === 'url' ? 'URL' :
                     newSource.type === 'cloud_storage' ? 'Bucket/Container Name' : 'File Path'}
                  </label>
                  <input
                    type="text"
                    value={newSource.location}
                    onChange={(e) => setNewSource({ ...newSource, location: e.target.value })}
                    placeholder={
                      newSource.type === 'spreadsheet' ? 'https://docs.google.com/spreadsheets/d/...' :
                      newSource.type === 'database' ? 'postgresql://user:pass@host:5432/db' :
                      newSource.type === 'api' ? 'https://api.example.com/v1/...' :
                      newSource.type === 'url' ? 'https://example.com/data' :
                      newSource.type === 'cloud_storage' ? 's3://my-bucket or gs://my-bucket' : '/path/to/file.csv'
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Connect
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}

          {!showAddForm && dataSources.length > 0 && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700"
            >
              + Add another data source
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
