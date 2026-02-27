'use client';

import { useState } from 'react';

interface PagePreview {
  title: string;
  sections: { heading: string; content: string }[];
}

interface NotionPreviewProps {
  squadName: string;
  pages: PagePreview[];
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
}

interface ExportOptions {
  format: 'zip' | 'notion';
  projectName: string;
  appendMode: 'append' | 'replace';
}

export default function NotionPreview({ 
  squadName, 
  pages, 
  onClose, 
  onExport 
}: NotionPreviewProps) {
  const [projectName, setProjectName] = useState(
    typeof window !== 'undefined' 
      ? localStorage.getItem('notion-default-project') || ''
      : ''
  );
  const [appendMode, setAppendMode] = useState<'append' | 'replace'>('append');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'zip' | 'notion') => {
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }

    setIsExporting(true);
    
    onExport({
      format,
      projectName: projectName.trim(),
      appendMode
    });

    setIsExporting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Export to Notion: {squadName}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My SaaS App"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              If pages already exist:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={appendMode === 'append'}
                  onChange={() => setAppendMode('append')}
                />
                <span>Add as new version</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={appendMode === 'replace'}
                  onChange={() => setAppendMode('replace')}
                />
                <span>Replace existing</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Pages to be exported ({pages.length})</h3>
            <div className="border rounded-lg overflow-hidden">
              {pages.map((page, index) => (
                <div key={index} className="border-b last:border-b-0 p-3">
                  <div className="font-medium">{page.title}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {page.sections.length} sections
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex gap-3 justify-end">
          <button
            onClick={() => handleExport('zip')}
            disabled={isExporting}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Download ZIP
          </button>
          <button
            onClick={() => handleExport('notion')}
            disabled={isExporting || !projectName.trim()}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {isExporting ? 'Exporting...' : 'Sync to Notion'}
          </button>
        </div>

      </div>
    </div>
  );
}
