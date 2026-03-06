'use client';

import { useState, useEffect } from 'react';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';

interface Job {
  id: string;
  skillId: string;
  status: string;
  createdAt: string;
  completedAt: string | null;
}

interface Metric {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
}

export default function MetricsPage() {
  const { isDarkMode } = useAppLayout();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = isDarkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = isDarkMode ? 'border-[#2a2a3e]' : 'border-gray-200';

  const completedJobs = jobs.filter(j => j.status === 'completed').length;
  const totalJobs = jobs.length;
  const successRate = totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0;

  const metrics: Metric[] = [
    { label: 'Total Validations', value: totalJobs, change: '+12%', positive: true },
    { label: 'Completed', value: completedJobs, change: '+8%', positive: true },
    { label: 'Success Rate', value: `${successRate}%`, change: successRate >= 70 ? '+5%' : '-3%', positive: successRate >= 70 },
    { label: 'Active Projects', value: 1, change: '+1', positive: true },
  ];

  return (
    <AppLayout title="Metrics">
      <div className="space-y-6">
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className={`${cardBg} ${cardBorder} border rounded-xl p-5`}>
              <p className={`${mutedColor} text-sm mb-1`}>{metric.label}</p>
              <div className="flex items-end justify-between">
                <span className={`${textColor} text-3xl font-bold`}>{metric.value}</span>
                {metric.change && (
                  <span className={`text-sm ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Jobs */}
        <div className={`${cardBg} ${cardBorder} border rounded-xl p-6`}>
          <h2 className={`${textColor} font-semibold mb-4`}>Recent Validations</h2>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : jobs.length === 0 ? (
            <p className={`${mutedColor} text-center py-8`}>No validations yet. Start by validating an idea!</p>
          ) : (
            <div className="space-y-3">
              {jobs.slice(0, 10).map((job) => (
                <div key={job.id} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-[#0f0f1a]' : 'bg-gray-50'}`}>
                  <div className="min-w-0 flex-1">
                    <p className={`${textColor} font-medium truncate`}>
                      {job.skillId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </p>
                    <p className={`${mutedColor} text-sm`}>
                      {new Date(job.createdAt).toLocaleDateString()} at {new Date(job.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : job.status === 'failed'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
