'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';
import StyledOutput from '@/components/skill/StyledOutput';

interface ActivityItem {
  id: string;
  type: 'skill' | 'squad' | 'project' | 'export' | 'message';
  title: string;
  description?: string;
  timestamp: string;
  jobId?: string;
  skillId?: string;
  status?: string;
  createdAt?: string;
  input?: string;
  output?: string;
  error?: string;
}

function formatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
}

function formatSkillName(skillId: string): string {
  return skillId
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

const getTypeStyles = (type: ActivityItem['type']) => {
  switch (type) {
    case 'skill':
      return 'bg-purple-500/20 text-purple-400';
    case 'squad':
      return 'bg-blue-500/20 text-blue-400';
    case 'project':
      return 'bg-green-500/20 text-green-400';
    case 'export':
      return 'bg-gray-500/20 text-gray-400';
    case 'message':
      return 'bg-yellow-500/20 text-yellow-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

export default function ActivityPage() {
  const { isDarkMode } = useAppLayout();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('status') || 'all';
  
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedJob, setSelectedJob] = useState<ActivityItem | null>(null);
  const [jobLoading, setJobLoading] = useState(false);
  const [localTheme, setLocalTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-dark-mode');
    if (saved !== null) {
      setLocalTheme(saved === 'true' ? 'dark' : 'light');
    } else if (typeof window !== 'undefined') {
      setLocalTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  const theme = isDarkMode !== undefined ? (isDarkMode ? 'dark' : 'light') : localTheme;

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const formattedActivities: ActivityItem[] = data.map((job: any) => ({
            id: job.id,
            type: 'skill' as const,
            title: `Ran ${formatSkillName(job.skillId)}`,
            description: job.input?.substring(0, 80) + (job.input?.length > 80 ? '...' : ''),
            timestamp: formatTimestamp(job.createdAt),
            jobId: job.id,
            skillId: job.skillId,
            status: job.status,
            createdAt: job.createdAt,
            input: job.input,
            output: job.output,
            error: job.error,
          }));
          setActivities(formattedActivities);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load activities:', err);
        setLoading(false);
      });
  }, []);

  const handleActivityClick = async (activity: ActivityItem) => {
    if (!activity.jobId) return;
    
    setJobLoading(true);
    setSelectedJob(null);
    
    try {
      const res = await fetch(`/api/jobs/${activity.jobId}`);
      const data = await res.json();
      setSelectedJob({
        ...activity,
        output: data.output,
        error: data.error,
      });
    } catch (err) {
      console.error('Failed to load job:', err);
    } finally {
      setJobLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, activityId: string) => {
    e.stopPropagation();
    
    try {
      const res = await fetch(`/api/jobs?id=${activityId}`, { method: 'DELETE' });
      if (res.ok) {
        setActivities(activities.filter(a => a.id !== activityId));
      }
    } catch (err) {
      console.error('Failed to delete activity:', err);
    }
  };

  const filteredActivities = activeTab === 'all' 
    ? activities 
    : activities.filter(a => a.status === activeTab);

  const runningCount = activities.filter(a => a.status === 'running').length;
  const completedCount = activities.filter(a => a.status === 'completed').length;
  const failedCount = activities.filter(a => a.status === 'failed').length;

  const cardBg = theme === 'dark' ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = theme === 'dark' ? 'border-[#2a2a3e]' : 'border-gray-200';
  const titleColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const mutedColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = theme === 'dark' ? 'hover:bg-[#1f1f35]' : 'hover:bg-gray-50';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const descColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const tabActiveBg = theme === 'dark' ? 'bg-[#2a2a3e]' : 'bg-gray-200';

  return (
    <AppLayout title="Activity">
      <div className="space-y-6">
        {/* Header */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h1 className={`${titleColor} font-semibold text-2xl mb-2`}>Activity</h1>
          <p className={mutedColor}>View all your skill runs and their status</p>
        </div>

        {/* Tabs */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl overflow-hidden`}>
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : `${mutedColor} hover:text-white`
              }`}
            >
              All ({activities.length})
            </button>
            <button
              onClick={() => setActiveTab('running')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'running'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : `${mutedColor} hover:text-white`
              }`}
            >
              Running ({runningCount})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'text-green-400 border-b-2 border-green-400'
                  : `${mutedColor} hover:text-white`
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => setActiveTab('failed')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'failed'
                  ? 'text-red-400 border-b-2 border-red-400'
                  : `${mutedColor} hover:text-white`
              }`}
            >
              Failed ({failedCount})
            </button>
          </div>

          {/* Activity List */}
          <div className="divide-y divide-gray-700">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : filteredActivities.length === 0 ? (
              <div className="p-8 text-center">
                <p className={mutedColor}>No activities found</p>
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`p-4 ${hoverBg} transition-colors cursor-pointer`}
                  onClick={() => handleActivityClick(activity)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getTypeStyles(activity.type)} flex-shrink-0`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={`${textColor} text-sm font-medium truncate`}>{activity.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} text-xs flex-shrink-0`}>{activity.timestamp}</span>
                          {activity.jobId && (
                            <button
                              onClick={(e) => handleDelete(e, activity.id)}
                              className={`p-1 rounded hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors`}
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                      {activity.description && (
                        <p className={`${descColor} text-sm mt-0.5 truncate`}>{activity.description}</p>
                      )}
                      {activity.status && (
                        <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${
                          activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          activity.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                          activity.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {activity.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Job Result Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className={`${cardBg} border ${cardBorder} rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col`}>
            <div className={`flex items-center justify-between p-4 border-b ${cardBorder}`}>
              <div>
                <h2 className={`text-lg font-semibold ${titleColor}`}>
                  {formatSkillName(selectedJob.skillId || '')}
                </h2>
                <p className={`text-sm ${mutedColor}`}>{selectedJob.input}</p>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className={`p-2 ${hoverBg} rounded-lg transition-colors`}
              >
                <svg className={`w-5 h-5 ${mutedColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {selectedJob.status === 'completed' ? (
                <StyledOutput content={selectedJob.output || ''} skillId={selectedJob.skillId} />
              ) : selectedJob.status === 'failed' ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h3 className="text-red-400 font-medium mb-2">Job Failed</h3>
                  <pre className="text-sm text-red-300 whitespace-pre-wrap">{selectedJob.error}</pre>
                </div>
              ) : selectedJob.status === 'running' ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3 text-gray-400">Running...</span>
                </div>
              ) : (
                <div className="text-gray-400">Pending...</div>
              )}
            </div>
            
            <div className={`flex justify-end gap-3 p-4 border-t ${cardBorder}`}>
              <button
                onClick={() => setSelectedJob(null)}
                className={`px-4 py-2 ${theme === 'dark' ? 'bg-[#2a2a3e] text-white hover:bg-[#3a3a4e]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} rounded-lg transition-colors`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Modal */}
      {jobLoading && !selectedJob && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className={`${cardBg} border ${cardBorder} rounded-xl p-8 flex items-center gap-4`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className={titleColor}>Loading result...</span>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
