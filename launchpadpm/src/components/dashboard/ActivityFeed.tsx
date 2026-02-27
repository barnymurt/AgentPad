'use client';

import { useState, useEffect } from 'react';

interface ActivityItem {
  id: string;
  type: 'skill' | 'squad' | 'project' | 'export' | 'message';
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
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
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: '2',
    type: 'squad',
    title: 'Design squad completed',
    description: 'UI/UX design phase finished with 12 artifacts',
    timestamp: '5 hours ago',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: '3',
    type: 'export',
    title: 'Exported to Notion',
    description: 'Discovery and Research pages synced',
    timestamp: '1 day ago',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4M16 2v4M2 10h20" />
      </svg>
    ),
  },
  {
    id: '4',
    type: 'skill',
    title: 'Ran Iteration Planning skill',
    description: 'Created sprint backlog with 8 items',
    timestamp: '2 days ago',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    id: '5',
    type: 'project',
    title: 'Project created',
    description: 'My Startup project initialized',
    timestamp: '3 days ago',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
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

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'skill':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'squad':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'export':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4M16 2v4M2 10h20" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      );
  }
};

export default function ActivityFeed({ darkMode = true }: ActivityFeedProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

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
            icon: getActivityIcon('skill'),
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

  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-white';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = darkMode ? 'hover:bg-[#1f1f35]' : 'hover:bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor = darkMode ? 'text-gray-400' : 'text-gray-600';

  const displayActivities = activities.length > 0 ? activities : mockActivities;

  return (
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
                  <div key={activity.id} className={`p-4 ${hoverBg} transition-colors`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getTypeStyles(activity.type)} flex-shrink-0`}>
                        {activity.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className={`${textColor} text-sm font-medium truncate`}>{activity.title}</h3>
                          <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} text-xs flex-shrink-0`}>{activity.timestamp}</span>
                        </div>
                        {activity.description && (
                          <p className={`${descColor} text-sm mt-0.5 truncate`}>{activity.description}</p>
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
  );
}
