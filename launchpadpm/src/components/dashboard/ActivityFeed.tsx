'use client';

import { useState, useEffect } from 'react';

interface ActivityItem {
  id: string;
  type: 'skill' | 'squad' | 'project' | 'export' | 'message';
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  jobId?: string;
  skillId?: string;
  status?: string;
}

interface ActivityFeedProps {
  darkMode?: boolean;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'skill',
    title: 'Ran Product Vision skill',
    description: 'Generated vision document for My Startup',
    timestamp: '2 hours ago',
  },
];

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

export default function ActivityFeed({ darkMode = true }: ActivityFeedProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [jobLoading, setJobLoading] = useState(false);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formattedActivities: ActivityItem[] = data.slice(0, 10).map((job: any) => ({
            id: job.id,
            type: 'skill' as const,
            title: `Ran ${formatSkillName(job.skillId)}`,
            description: job.input?.substring(0, 50) + (job.input?.length > 50 ? '...' : ''),
            timestamp: formatTimestamp(job.createdAt),
            jobId: job.id,
            skillId: job.skillId,
            status: job.status,
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
      setSelectedJob(data);
    } catch (err) {
      console.error('Failed to load job:', err);
    } finally {
      setJobLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = darkMode ? 'hover:bg-[#1f1f35]' : 'hover:bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  const displayActivities = activities.length > 0 ? activities : mockActivities;

  return (
    <>
      <div className={`${cardBg} ${cardBorder} rounded-xl border overflow-hidden`}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full p-5 flex items-center justify-between ${hoverBg} transition-colors`}
        >
          <h2 className={`${titleColor} font-semibold flex items-center gap-2`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Activity Feed
          </h2>
          <svg
            className={`w-5 h-5 ${mutedColor} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isExpanded && (
          <div className={`border-t ${cardBorder}`}>
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            ) : (
              <>
                <div className={`divide-y ${cardBorder}`}>
                  {displayActivities.slice(0, 5).map((activity) => (
                    <div 
                      key={activity.id} 
                      className={`p-4 ${hoverBg} transition-colors ${activity.jobId ? 'cursor-pointer' : ''}`}
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
                            <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} text-xs flex-shrink-0`}>{activity.timestamp}</span>
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
                  ))}
                </div>
                
                <div className={`p-3 border-t ${cardBorder}`}>
                  <button className={`w-full text-center text-sm ${mutedColor} hover:text-white transition-colors`}>
                    View all activity
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Job Result Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[#2a2a3e]">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {formatSkillName(selectedJob.skillId)}
                </h2>
                <p className="text-sm text-gray-400">{selectedJob.input}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-[#2a2a3e] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              {selectedJob.status === 'completed' ? (
                <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono bg-[#0f0f1a] p-4 rounded-lg overflow-auto">
                  {selectedJob.output}
                </pre>
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
            
            <div className="flex justify-end gap-3 p-4 border-t border-[#2a2a3e]">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-[#2a2a3e] text-white rounded-lg hover:bg-[#3a3a4e] transition-colors"
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
          <div className="bg-[#1a1a2e] border border-[#2a2a3e] rounded-xl p-8 flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-white">Loading result...</span>
          </div>
        </div>
      )}
    </>
  );
}
