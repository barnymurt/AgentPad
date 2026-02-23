'use client';

import Link from 'next/link';

const skillCapabilities: Record<string, { description: string; capabilities: string[]; squads: string[] }> = {
  'validation-pack': {
    description: 'Comprehensive validation of your product idea including market research, competitive analysis, and business modeling.',
    capabilities: [
      'Requirements Analysis',
      'User Persona Creation', 
      'Competitor Research',
      'Business Case Modeling',
      'Feature Prioritization',
      'User Journey Mapping',
      'Gap Analysis',
      'Synthesis & Recommendation'
    ],
    squads: ['discovery']
  },
  'requirements-elicitation': {
    description: 'Extract and document functional and non-functional requirements from your product idea.',
    capabilities: [
      'Stakeholder Interview Questions',
      'User Story Development',
      'Acceptance Criteria Definition',
      'Technical Constraints Documentation'
    ],
    squads: ['discovery', 'product']
  },
  'user-persona-creation': {
    description: 'Create detailed user personas to understand your target customers and their needs.',
    capabilities: [
      'Demographic Profiling',
      'Behavioral Pattern Analysis',
      'Pain Point Identification',
      'Goal & Motivation Mapping'
    ],
    squads: ['discovery', 'research']
  },
  'competitor-research': {
    description: 'Analyze your competitive landscape to identify opportunities and threats.',
    capabilities: [
      'Competitor Feature Mapping',
      'Pricing Analysis',
      'Market Positioning',
      'SWOT Analysis'
    ],
    squads: ['discovery']
  },
  'business-case-modeling': {
    description: 'Build financial models to validate the business viability of your product.',
    capabilities: [
      'Revenue Projections',
      'Cost Structure Analysis',
      'Unit Economics',
      'ROI Calculations'
    ],
    squads: ['discovery']
  },
  'feature-prioritization': {
    description: 'Prioritize features using the RICE framework to focus on high-impact work.',
    capabilities: [
      'Impact Scoring',
      'Effort Estimation',
      'RICE Ranking',
      'Sprint Planning'
    ],
    squads: ['discovery', 'product']
  },
  'user-journey-mapping': {
    description: 'Map out user journeys to identify pain points and opportunities.',
    capabilities: [
      'Journey Stage Identification',
      'Touchpoint Analysis',
      'Emotion Mapping',
      'Opportunity Discovery'
    ],
    squads: ['discovery', 'design']
  },
  'wireframing': {
    description: 'Create wireframes to visualize your product interface.',
    capabilities: [
      'Layout Planning',
      'Component Design',
      'User Flow Visualization',
      'Responsive Design'
    ],
    squads: ['design']
  },
  'data-visualization': {
    description: 'Build data visualizations to communicate insights effectively.',
    capabilities: [
      'Chart Selection',
      'Dashboard Design',
      'Metric Definition',
      'Visual Storytelling'
    ],
    squads: ['data', 'growth']
  },
  'threat-modeling': {
    description: 'Identify and mitigate security threats in your system design.',
    capabilities: [
      'Attack Surface Analysis',
      'Vulnerability Assessment',
      'Risk Scoring',
      'Mitigation Strategies'
    ],
    squads: ['security']
  },
  'architecture-design': {
    description: 'Design the technical architecture for your product.',
    capabilities: [
      'System Component Design',
      'Database Schema',
      'API Architecture',
      'Scalability Planning'
    ],
    squads: ['technical']
  }
};

function getSkillData(skillName: string) {
  const key = Object.keys(skillCapabilities).find(k => skillName.includes(k));
  if (key) {
    return skillCapabilities[key];
  }
  
  return {
    description: `This skill helps you work on ${skillName.replace(/-/g, ' ')} for your product. It analyzes your input and provides actionable insights.`,
    capabilities: [
      'Analysis & Research',
      'Data Collection',
      'Pattern Identification',
      'Recommendations'
    ],
    squads: ['discovery']
  };
}

export default function SkillPage({ params }: { params: { skill: string } }) {
  const skillName = params?.skill || '';
  const skillData = getSkillData(skillName);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              ← Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {skillName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Skill Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {skillData.description}
          </p>
        </div>

        {/* Capabilities */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            What This Skill Does
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {skillData.capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  {idx + 1}
                </div>
                <span className="text-gray-700 dark:text-gray-300">{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          
          <div className="flex items-center justify-center gap-4 py-6">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center min-w-[120px]">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Input</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your idea</div>
            </div>
            
            <div className="text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 text-center min-w-[120px] border-2 border-blue-500">
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Process</div>
              <div className="text-xs text-blue-500 dark:text-blue-400 mt-1">AI Analysis</div>
            </div>
            
            <div className="text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center min-w-[120px]">
              <div className="text-sm font-medium text-green-700 dark:text-green-300">Output</div>
              <div className="text-xs text-green-500 dark:text-green-400 mt-1">Actionable results</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            Run Skill
          </button>
          <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium">
            Add to Squad
          </button>
        </div>

        {/* Squad Membership */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Available In Squads
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillData.squads.includes('discovery') && (
              <Link href="/squads/discovery" className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200">
                Discovery
              </Link>
            )}
            {skillData.squads.includes('data') && (
              <Link href="/squads/data" className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:bg-purple-200">
                Data
              </Link>
            )}
            {skillData.squads.includes('technical') && (
              <Link href="/squads/technical" className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm hover:bg-green-200">
                Technical
              </Link>
            )}
            {skillData.squads.includes('design') && (
              <Link href="/squads/design" className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm hover:bg-pink-200">
                Design
              </Link>
            )}
            {skillData.squads.includes('product') && (
              <Link href="/squads/product" className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm hover:bg-orange-200">
                Product
              </Link>
            )}
            {skillData.squads.includes('research') && (
              <Link href="/squads/research" className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm hover:bg-teal-200">
                Research
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
