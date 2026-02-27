'use client';

import { useState } from 'react';
import NotionPreview from './NotionPreview';

interface SquadPage {
  title: string;
  sections: { heading: string; content: string }[];
}

interface NotionExportButtonProps {
  squadId: string;
  squadName: string;
  pages: SquadPage[];
  onSuccess?: () => void;
}

export default function NotionExportButton({ 
  squadId, 
  squadName, 
  pages,
  onSuccess 
}: NotionExportButtonProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleExport = async (options: {
    format: 'zip' | 'notion';
    projectName: string;
    appendMode: 'append' | 'replace';
  }) => {
    setIsExporting(true);
    setExportStatus('idle');

    try {
      if (options.format === 'zip') {
        const response = await fetch('/api/notion/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            squadId,
            squadName,
            projectName: options.projectName,
            pages,
            format: 'zip'
          })
        });

        if (!response.ok) {
          throw new Error('Export failed');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${options.projectName}_${squadName}.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        localStorage.setItem('notion-default-project', options.projectName);
        
        setExportStatus('success');
        setShowPreview(false);
        onSuccess?.();
        
      } else {
        const response = await fetch('/api/notion/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            squadId,
            squadName,
            projectName: options.projectName,
            pages,
            format: 'notion'
          })
        });

        if (!response.ok) {
          throw new Error('Sync failed');
        }

        const result = await response.json();
        
        if (result.notionUrl) {
          window.open(result.notionUrl, '_blank');
        }

        localStorage.setItem('notion-default-project', options.projectName);
        
        setExportStatus('success');
        setShowPreview(false);
        onSuccess?.();
      }
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('error');
      alert('Export failed. Please try downloading as ZIP instead.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPreview(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
      >
        <svg 
          className="w-5 h-5" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="M8 2v4M16 2v4M2 10h20" />
        </svg>
        Export to Notion
      </button>

      {showPreview && (
        <NotionPreview
          squadName={squadName}
          pages={pages}
          onClose={() => setShowPreview(false)}
          onExport={handleExport}
        />
      )}

      {exportStatus === 'success' && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Export successful!
        </div>
      )}

      {exportStatus === 'error' && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
          Export failed. Please try again.
        </div>
      )}
    </>
  );
}
