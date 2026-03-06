'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LifecyclePhase {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending';
}

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  lifecyclePhases: LifecyclePhase[];
}

interface ActiveProjectProps {
  project?: Project | null;
  darkMode?: boolean;
  isPremium?: boolean;
  isBobAI?: boolean;
}

const defaultLifecyclePhases: LifecyclePhase[] = [
  { id: 'discovery', name: 'Discovery', status: 'completed' },
  { id: 'research', name: 'Research', status: 'completed' },
  { id: 'product', name: 'Product', status: 'completed' },
  { id: 'design', name: 'Design', status: 'active' },
  { id: 'technical', name: 'Technical', status: 'pending' },
  { id: 'qa', name: 'QA', status: 'pending' },
  { id: 'security', name: 'Security', status: 'pending' },
  { id: 'growth', name: 'Growth', status: 'pending' },
  { id: 'gtm-launch', name: 'GTM Launch', status: 'pending' },
  { id: 'iteration', name: 'Iteration', status: 'pending' },
];

export default function ActiveProject({
  project,
  darkMode = true,
  isPremium = false,
  isBobAI = false,
}: ActiveProjectProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const projectName = project?.name || 'No Active Project';
  const description = project?.description || 'Validate an idea to get started';
  const progress = project?.progress || 0;
  const lifecyclePhases = project?.lifecyclePhases || defaultLifecyclePhases;

  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = darkMode ? 'hover:bg-[#1f1f35]' : 'hover:bg-gray-50';
  const progressBg = darkMode ? 'bg-[#2a2a3e]' : 'bg-gray-200';

  const getStatusColor = (status: LifecyclePhase['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'active':
        return 'bg-blue-500';
      default:
        return darkMode ? 'bg-gray-600' : 'bg-gray-400';
    }
  };

  const getStatusRingColor = (status: LifecyclePhase['status']) => {
    switch (status) {
      case 'completed':
        return 'ring-green-500/30';
      case 'active':
        return 'ring-blue-500/50';
      default:
        return darkMode ? 'ring-gray-600/30' : 'ring-gray-400/30';
    }
  };

  const phaseLinkBg = darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-50';
  const activePhaseIndex = lifecyclePhases.findIndex((p) => p.status === 'active');

  return (
    <div className={`${cardBg} ${cardBorder} rounded-xl border overflow-hidden`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-5 flex items-center justify-between ${hoverBg} transition-colors`}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-left">
            <h2 className={`${textColor} font-semibold text-lg`}>{projectName}</h2>
            <p className={`${mutedColor} text-sm`}>{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className={`text-2xl font-bold ${textColor}`}>{progress}%</div>
            <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Complete</div>
          </div>
          <svg
            className={`w-5 h-5 ${mutedColor} transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className={`px-5 pb-5 border-t ${cardBorder}`}>
          {/* Progress bar */}
          <div className={`mt-4 ${progressBg} rounded-full overflow-hidden`}>
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Lifecycle phases */}
          <div className="mt-4">
            <h3 className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'} uppercase tracking-wider mb-3`}>
              Lifecycle Progress
            </h3>
            <div className="flex flex-wrap gap-2">
              {lifecyclePhases.map((phase) => (
                <Link
                  key={phase.id}
                  href={`/squads/${phase.id}`}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    phase.status === 'active'
                      ? 'border-blue-500/50 bg-blue-500/10'
                      : `${cardBorder} ${phaseLinkBg} hover:border-gray-400`
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${getStatusColor(phase.status)} ring-2 ${getStatusRingColor(phase.status)}`}
                  />
                  <span
                    className={`text-sm ${
                      phase.status === 'active' ? 'text-blue-400 font-medium' : darkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'
                    }`}
                  >
                    {phase.name}
                  </span>
                  {phase.status === 'completed' && (
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Run with AI Builder Button */}
          <div className="mt-4">
            {isBobAI ? (
              <Link
                href="/builder"
                className="w-full py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-90"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Launch AI Builder
              </Link>
            ) : isPremium ? (
              <div className="w-full py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500/50 to-blue-500/50 text-white/70">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Guided Builder Active
              </div>
            ) : (
              <button
                onClick={() => alert('Guided Builder is available for Premium users. Upgrade to use this feature.')}
                className="w-full py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500/50 to-blue-500/50 text-white/70 cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Upgrade to Start Guided Builder
              </button>
            )}
          </div>

          {/* Current focus */}
          {activePhaseIndex >= 0 && (
            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm text-blue-400">
                  Currently working on: <span className="font-medium">{lifecyclePhases[activePhaseIndex].name}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
