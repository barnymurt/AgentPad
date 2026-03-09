'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SkillSuggestionsProps {
  currentPhase?: string;
  completedSkills?: string[];
  projectDescription?: string;
  isPremium?: boolean;
}

const PHASE_SKILL_MAPPING: Record<string, { skill: string; reason: string }[]> = {
  discovery: [
    { skill: 'stakeholder-analysis', reason: 'identify key stakeholders and their needs' },
    { skill: 'user-persona-creation', reason: 'understand your target users better' },
    { skill: 'competitor-research', reason: 'understand the competitive landscape' },
  ],
  research: [
    { skill: 'requirements-elicitation', reason: 'define what to build' },
    { skill: 'user-journey-mapping', reason: 'understand user flows' },
    { skill: 'feature-prioritization', reason: 'decide what to build first' },
  ],
  build: [
    { skill: 'architecture-design', reason: 'plan your technical foundation' },
    { skill: 'api-design', reason: 'design your data interfaces' },
    { skill: 'data-modeling', reason: 'structure your data correctly' },
  ],
  design: [
    { skill: 'design-system', reason: 'build a consistent UI system' },
    { skill: 'information-architecture', reason: 'organize content effectively' },
    { skill: 'ui-patterns', reason: 'use proven UI patterns' },
  ],
  technical: [
    { skill: 'test-strategy', reason: 'plan your testing approach' },
    { skill: 'ci-cd-pipeline', reason: 'automate your deployments' },
    { skill: 'security-requirements-baseline', reason: 'address security early' },
  ],
  gtm: [
    { skill: 'messaging-framework', reason: 'craft your value proposition' },
    { skill: 'channel-strategy', reason: 'find where your users are' },
    { skill: 'pricing-strategy', reason: 'optimize your revenue model' },
  ],
};

function formatSkillName(skillId: string): string {
  return skillId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function SkillSuggestions({
  currentPhase = 'discovery',
  completedSkills = [],
  projectDescription = '',
  isPremium = false,
}: SkillSuggestionsProps) {
  const [showAll, setShowAll] = useState(false);

  const suggestions = PHASE_SKILL_MAPPING[currentPhase] || PHASE_SKILL_MAPPING['discovery'];
  const availableSuggestions = suggestions.filter(s => !completedSkills.includes(s.skill));
  const displaySuggestions = showAll ? availableSuggestions : availableSuggestions.slice(0, 2);

  if (availableSuggestions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-900 font-semibold text-sm">Recommended Skills</h3>
        {isPremium && (
          <Link
            href="/skills"
            className="text-xs text-blue-600 hover:text-blue-700"
          >
            View all skills
          </Link>
        )}
      </div>

      <div className="space-y-2">
        {displaySuggestions.map((suggestion) => (
          <div
            key={suggestion.skill}
            className="p-3 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="text-gray-900 text-sm font-medium">
                  {formatSkillName(suggestion.skill)}
                </h4>
                <p className="text-gray-600 text-xs mt-1">
                  {suggestion.reason}
                </p>
              </div>
              {isPremium ? (
                <Link
                  href={`/skills/${suggestion.skill}`}
                  className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg font-medium hover:bg-blue-700 whitespace-nowrap"
                >
                  Run
                </Link>
              ) : (
                <button
                  disabled
                  className="px-3 py-1.5 bg-gray-200 text-gray-500 text-xs rounded-lg font-medium cursor-not-allowed opacity-50"
                  title="Upgrade to premium to run skills"
                >
                  Locked
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {availableSuggestions.length > 2 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full mt-3 text-sm text-gray-500 hover:text-blue-600"
        >
          Show {availableSuggestions.length - 2} more suggestions
        </button>
      )}

      {!isPremium && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Upgrade to Premium to run more skills
          </p>
        </div>
      )}
    </div>
  );
}
