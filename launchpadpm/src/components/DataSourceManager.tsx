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
  const [newSource, setNewSource] = useState({ name: '', type: 'spreadsheet', location: '' });

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
    try {
      const res = await fetch('/api/data-sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSource),
      });
      if (res.ok) {
        fetchDataSources();
        setShowAddForm(false);
        setNewSource({ name: '', type: 'spreadsheet', location: '' });
      }
    } catch (err) {
      console.error('Failed to add data source:', err);
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Connect Your Data</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Add research, analytics, or credentials to enhance analysis
          </p>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : dataSources.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No data sources connected</p>
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
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{ds.name}</p>
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
            <form onSubmit={addDataSource} className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Add Data Source</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    value={newSource.name}
                    onChange={(e) => setNewSource({ ...newSource, name: e placeholder="e.g.target.value })}
                   ., Customer Interview Data"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select
                    value={newSource.type}
                    onChange={(e) => setNewSource({ ...newSource, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="spreadsheet">Spreadsheet (Google Sheets, Excel)</option>
                    <option value="database">Database (PostgreSQL, MySQL)</option>
                    <option value="api">API</option>
                    <option value="url">URL</option>
                    <option value="file">File</option>
                    <option value="cloud_storage">Cloud Storage</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Location (optional)</label>
                  <input
                    type="text"
                    value={newSource.location}
                    onChange={(e) => setNewSource({ ...newSource, location: e.target.value })}
                    placeholder="URL, file path, or connection string"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300"
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
              className="mt-4 w-full px-4 py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 hover:text-gray-700"
            >
              + Add another data source
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
