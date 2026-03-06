'use client';

import Link from 'next/link';

interface SkillMetadata {
  name?: string;
  description?: string;
  lifecycle?: string;
  category?: string;
  relatedBefore?: string[];
  relatedAfter?: string[];
  outputSummary?: string;
  nextSteps?: string;
}

interface SkillGuidanceProps {
  skill: SkillMetadata;
  darkMode?: boolean;
}

const lifecycleConfig = {
  discovery: {
    label: 'Discovery',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description: 'Understand your users and market',
  },
  build: {
    label: 'Build',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    description: 'Create and develop your product',
  },
  launch: {
    label: 'Launch',
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    description: 'Get your product to market',
  },
  iterate: {
    label: 'Iterate',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    description: 'Measure and improve',
  },
};

const categoryConfig = {
  product: {
    label: 'Product',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  design: {
    label: 'Design',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  research: {
    label: 'Research',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  engineering: {
    label: 'Engineering',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  growth: {
    label: 'Growth',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
};

function formatSkillName(skillId: string): string {
  return skillId
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export default function SkillGuidance({ skill, darkMode = true }: SkillGuidanceProps) {
  const lifecycle = skill.lifecycle || 'build';
  const category = skill.category || 'product';
  
  const lifecycleInfo = lifecycleConfig[lifecycle as keyof typeof lifecycleConfig] || lifecycleConfig.build;
  const categoryInfo = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.product;
  
  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = darkMode ? 'hover:bg-[#2a2a3e]' : 'hover:bg-gray-100';

  return (
    <div className={`${cardBg} ${cardBorder} border rounded-xl p-5`}>
      <h3 className={`${textColor} font-semibold mb-4 flex items-center gap-2`}>
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        How to Use This Skill
      </h3>
      
      {/* Lifecycle & Category Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${lifecycleInfo.color}`}>
          {lifecycleInfo.label} Phase
        </span>
        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${darkMode ? 'bg-[#2a2a3e] border-[#3a3a4e] text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'} flex items-center gap-1.5`}>
          {categoryInfo.icon}
          {categoryInfo.label}
        </span>
      </div>
      
      <p className={`${mutedColor} text-sm mb-4`}>
        {lifecycleInfo.description}
      </p>
      
      {/* Output Summary - for manually enhanced skills */}
      {skill.outputSummary && (
        <div className={`mb-4 p-3 rounded-lg ${darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-50'}`}>
          <span className={`text-xs font-medium ${mutedColor} block mb-1`}>What this skill outputs:</span>
          <p className={`${textColor} text-sm`}>{skill.outputSummary}</p>
        </div>
      )}
      
      {/* Related Skills */}
      {(skill.relatedBefore || skill.relatedAfter) && (
        <div className="space-y-3">
          {skill.relatedBefore && skill.relatedBefore.length > 0 && (
            <div>
              <span className={`text-xs font-medium ${mutedColor} block mb-2`}>Run this before:</span>
              <div className="flex flex-wrap gap-2">
                {skill.relatedBefore.map((skillId) => (
                  <Link
                    key={skillId}
                    href={`/skills/${skillId}`}
                    className={`px-2.5 py-1 rounded-lg text-xs border transition-colors ${
                      darkMode 
                        ? 'bg-[#2a2a3e] border-[#3a3a4e] text-gray-300 hover:border-blue-500 hover:text-blue-400' 
                        : 'bg-gray-100 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {formatSkillName(skillId)}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {skill.relatedAfter && skill.relatedAfter.length > 0 && (
            <div>
              <span className={`text-xs font-medium ${mutedColor} block mb-2`}>Run this after:</span>
              <div className="flex flex-wrap gap-2">
                {skill.relatedAfter.map((skillId) => (
                  <Link
                    key={skillId}
                    href={`/skills/${skillId}`}
                    className={`px-2.5 py-1 rounded-lg text-xs border transition-colors ${
                      darkMode 
                        ? 'bg-[#2a2a3e] border-[#3a3a4e] text-gray-300 hover:border-blue-500 hover:text-blue-400' 
                        : 'bg-gray-100 border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {formatSkillName(skillId)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Next Steps - for manually enhanced skills */}
      {skill.nextSteps && (
        <div className={`mt-4 pt-4 border-t ${cardBorder}`}>
          <span className={`text-xs font-medium ${mutedColor} block mb-2`}>Next steps:</span>
          <p className={`${textColor} text-sm`}>{skill.nextSteps}</p>
        </div>
      )}
    </div>
  );
}
