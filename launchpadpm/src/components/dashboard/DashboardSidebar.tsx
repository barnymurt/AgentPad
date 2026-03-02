'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Squad {
  id: string;
  name: string;
  description: string;
}

interface SidebarProps {
  squads: Squad[];
  currentPath?: string;
  darkMode?: boolean;
}

const squadCategories = [
  {
    name: 'Discovery Phase',
    squads: ['discovery', 'research', 'product']
  },
  {
    name: 'Build Phase',
    squads: ['design', 'technical', 'qa', 'security']
  },
  {
    name: 'Launch Phase',
    squads: ['growth', 'gtm-launch']
  },
  {
    name: 'Iterate Phase',
    squads: ['iteration']
  }
];

export default function DashboardSidebar({ squads, currentPath = '', darkMode = true }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Discovery Phase', 'Build Phase', 'Launch Phase', 'Iterate Phase'])
  );

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getSquadsByCategory = (categorySquads: string[]) => {
    return squads.filter(sq => categorySquads.includes(sq.id));
  };

  const bgColor = darkMode ? 'bg-[#1a1a2e]' : 'bg-white';
  const borderColor = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = darkMode ? 'hover:bg-[#2a2a3e]' : 'hover:bg-gray-100';

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen ${bgColor} border-r ${borderColor} transition-all duration-300 z-40 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className={`h-16 flex items-center justify-between px-4 border-b ${borderColor}`}>
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AP</span>
            </div>
            <span className={`font-semibold ${textColor}`}>AgentPad</span>
          </Link>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg ${hoverBg} ${mutedColor} hover:${textColor} transition-colors`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {collapsed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            )}
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
          {/* SQUADS Section */}
        <div className="px-3 mb-6">
          {!collapsed && (
            <div className={`text-xs font-medium uppercase tracking-wider px-3 mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Squads
            </div>
          )}
          
          {squadCategories.map((category) => (
            <div key={category.name} className="mb-2">
              {/* Category Header */}
              {!collapsed && (
                <button
                  onClick={() => toggleCategory(category.name)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-sm transition-colors ${mutedColor} hover:${textColor}`}
                >
                  <span>{category.name}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${expandedCategories.has(category.name) ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
              
              {/* Squad Items */}
              {(!collapsed && expandedCategories.has(category.name)) && (
                <div className="mt-1 space-y-0.5">
                  {getSquadsByCategory(category.squads).map((squad) => (
                    <Link
                      key={squad.id}
                      href={`/squads/${squad.id}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        currentPath === `/squads/${squad.id}`
                          ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500'
                          : darkMode 
                            ? 'text-gray-300 hover:bg-[#2a2a3e] hover:text-white' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        currentPath === `/squads/${squad.id}` ? 'bg-blue-500' : darkMode ? 'bg-gray-500' : 'bg-gray-400'
                      }`} />
                      <span className="truncate">{squad.name.replace(/-/g, ' ')}</span>
                    </Link>
                  ))}
                </div>
              )}
              
              {/* Collapsed state - show dots */}
              {collapsed && (
                <div className="flex flex-col items-center gap-1 py-1">
                  {getSquadsByCategory(category.squads).slice(0, 3).map((squad) => (
                    <Link
                      key={squad.id}
                      href={`/squads/${squad.id}`}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        currentPath === `/squads/${squad.id}`
                          ? 'bg-blue-600/20 text-blue-400'
                          : darkMode 
                            ? 'text-gray-500 hover:bg-[#2a2a3e] hover:text-white'
                            : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      title={squad.name}
                    >
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SETTINGS Section */}
        <div className={`px-3 border-t ${borderColor} pt-4`}>
          {!collapsed && (
            <div className={`text-xs font-medium uppercase tracking-wider px-3 mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Settings
            </div>
          )}
          
          <Link
            href="/settings/notion"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              currentPath === '/settings/notion'
                ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500'
                : darkMode 
                  ? 'text-gray-300 hover:bg-[#2a2a3e] hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4M16 2v4M2 10h20" />
            </svg>
            {!collapsed && <span>Notion</span>}
          </Link>

          <Link
            href="/settings"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              darkMode 
                ? 'text-gray-300 hover:bg-[#2a2a3e] hover:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.37-1.43" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {!collapsed && <span>Settings</span>}
          </Link>
        </div>
      </nav>

      {/* User Section */}
      <div className={`border-t ${borderColor} p-3`}>
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
            U
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className={`text-sm truncate ${textColor}`}>User</div>
              <div className={`text-xs truncate ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>user@example.com</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
