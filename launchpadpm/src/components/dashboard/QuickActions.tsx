'use client';

import Link from 'next/link';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const defaultActions: QuickAction[] = [
  {
    id: 'new-project',
    label: 'New Project',
    href: '/projects/new',
    color: 'from-blue-500 to-blue-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    id: 'run-skill',
    label: 'Run Skill',
    href: '/skills',
    color: 'from-purple-500 to-purple-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'export-notion',
    label: 'Export to Notion',
    href: '/settings/notion',
    color: 'from-gray-500 to-gray-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4M16 2v4M2 10h20" />
      </svg>
    ),
  },
  {
    id: 'view-dashboard',
    label: 'Metrics',
    href: '/metrics',
    color: 'from-teal-500 to-teal-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const freeTierActions: QuickAction[] = [
  {
    id: 'run-skill',
    label: 'Run Skill',
    href: '/skills',
    color: 'from-purple-500 to-purple-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'export-notion',
    label: 'Export to Notion',
    href: '/settings/notion',
    color: 'from-gray-500 to-gray-600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4M16 2v4M2 10h20" />
      </svg>
    ),
  },
];

interface QuickActionsProps {
  actions?: QuickAction[];
  darkMode?: boolean;
  isPremium?: boolean;
}

export default function QuickActions({ actions, darkMode = true, isPremium = false }: QuickActionsProps) {
  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const titleColor = darkMode ? 'text-white' : 'text-gray-900';

  const displayActions = isPremium ? (actions || defaultActions) : freeTierActions;

  return (
    <div className={`${cardBg} ${cardBorder} rounded-xl border p-5`}>
      <h2 className={`${titleColor} font-semibold mb-4 flex items-center gap-2`}>
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-2 gap-3" data-testid="quick-actions">
        {displayActions.map((action) => (
          <Link
            key={action.id}
            href={action.href}
            data-testid={`quick-action-${action.id}`}
            className={`flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br ${action.color} hover:opacity-90 transition-opacity group`}
          >
            <div className="text-white/90 group-hover:text-white transition-colors">
              {action.icon}
            </div>
            <span className="text-white font-medium text-sm">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
