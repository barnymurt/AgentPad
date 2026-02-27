'use client';

import { useState } from 'react';

interface Result {
  id: string;
  skillName: string;
  recommendation: 'go' | 'pivot' | 'kill';
  summary: string;
  details: string[];
  timestamp: string;
}

interface ResultsPanelProps {
  results?: Result[];
  darkMode?: boolean;
}

const defaultResults: Result[] = [
  {
    id: '1',
    skillName: 'Product Vision',
    recommendation: 'go',
    summary: 'Strong product-market fit potential identified',
    details: [
      'Target market validated with $2.5B opportunity',
      'Unique value proposition clearly defined',
      'Competition analysis shows differentiation path',
      'Revenue model is sustainable at scale',
    ],
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    skillName: 'Iteration Planning',
    recommendation: 'go',
    summary: 'Sprint backlog ready with clear priorities',
    details: [
      '8 user stories defined with acceptance criteria',
      'Technical complexity assessed as medium',
      'Dependencies mapped between features',
      'Velocity estimate: 21 story points/sprint',
    ],
    timestamp: '1 day ago',
  },
  {
    id: '3',
    skillName: 'Scale Readiness',
    recommendation: 'pivot',
    summary: 'Architecture needs adjustment before scaling',
    details: [
      'Database queries need optimization',
      'Caching layer recommended before 10x growth',
      'Consider microservices for independent scaling',
      'Infrastructure cost projections updated',
    ],
    timestamp: '2 days ago',
  },
];

const recommendationConfig = {
  go: {
    label: 'GO',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
  },
  pivot: {
    label: 'PIVOT',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30',
  },
  kill: {
    label: 'KILL',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
  },
};

export default function ResultsPanel({ results = defaultResults, darkMode = true }: ResultsPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-white';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = darkMode ? 'hover:bg-[#1f1f35]' : 'hover:bg-gray-50';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const descColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const detailColor = darkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className={`${cardBg} ${cardBorder} rounded-xl border overflow-hidden`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-5 flex items-center justify-between ${hoverBg} transition-colors`}
      >
        <h2 className={`${titleColor} font-semibold flex items-center gap-2`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          AI Recommendations
          <span className={`ml-2 px-2 py-0.5 text-xs ${darkMode ? 'bg-[#2a2a3e] text-gray-400' : 'bg-gray-100 text-gray-600'} rounded-full`}>
            {results.length}
          </span>
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
          <div className={`divide-y ${cardBorder}`}>
            {results.map((result) => {
              const config = recommendationConfig[result.recommendation];
              const isDetailExpanded = expandedId === result.id;

              return (
                <div key={result.id} className={`p-4 ${hoverBg} transition-colors`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className={`p-2 rounded-lg ${config.bg} ${config.color} flex-shrink-0 mt-0.5`}>
                        {result.recommendation === 'go' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {result.recommendation === 'pivot' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                          </svg>
                        )}
                        {result.recommendation === 'kill' && (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`${textColor} text-sm font-medium`}>{result.skillName}</h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded ${config.bg} ${config.color}`}>
                            {config.label}
                          </span>
                        </div>
                        <p className={`${descColor} text-sm mt-1`}>{result.summary}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} text-xs`}>{result.timestamp}</span>
                      <button
                        onClick={() => setExpandedId(isDetailExpanded ? null : result.id)}
                        className={`p-1 rounded ${darkMode ? 'hover:bg-[#2a2a3e]' : 'hover:bg-gray-100'} ${mutedColor} hover:text-white transition-colors`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${isDetailExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {isDetailExpanded && (
                    <div className="mt-3 ml-10 space-y-2">
                      {result.details.map((detail, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <div className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${darkMode ? 'bg-gray-500' : 'bg-gray-400'}`} />
                          <span className={detailColor}>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
