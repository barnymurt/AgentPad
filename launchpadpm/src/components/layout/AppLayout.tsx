'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Squad {
  id: string;
  name: string;
  description: string;
}

interface AppLayoutContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  squads: Squad[];
  loading: boolean;
  mounted: boolean;
}

const AppLayoutContext = createContext<AppLayoutContextType>({
  darkMode: true,
  toggleDarkMode: () => {},
  squads: [],
  loading: true,
  mounted: false,
});

export const useAppLayout = () => useContext(AppLayoutContext);

function getInitialDarkMode(): boolean {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('dashboard-dark-mode');
  if (saved !== null) return saved === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const squadCategories = [
  { name: 'Discovery Phase', squads: ['discovery', 'research'] },
  { name: 'Build Phase', squads: ['product', 'design', 'technical', 'qa', 'security'] },
  { name: 'Launch Phase', squads: ['growth', 'gtm-launch'] },
  { name: 'Iterate Phase', squads: ['iteration'] },
];

export function AppLayout({ children, title }: AppLayoutProps) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Discovery Phase', 'Build Phase', 'Launch Phase', 'Iterate Phase'])
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('dashboard-dark-mode');
    if (saved !== null) {
      setDarkMode(saved === 'true');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    fetch('/api/squads')
      .then(res => res.json())
      .then(data => {
        setSquads(data.map((s: any) => ({ id: s.id, name: s.name, description: s.description || '' })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('dashboard-dark-mode');
      if (saved !== null) {
        setDarkMode(saved === 'true');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('dashboard-dark-mode', String(newMode));
  };

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

  const bgColor = darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-50';
  const sidebarBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-white';
  const sidebarBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const hoverBg = darkMode ? 'hover:bg-[#2a2a3e]' : 'hover:bg-gray-100';

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <AppLayoutContext.Provider value={{ darkMode, toggleDarkMode, squads, loading, mounted }}>
      <div className={`min-h-screen ${bgColor}`}>
        {/* Sidebar */}
        <aside 
          className={`fixed left-0 top-0 h-screen ${sidebarBg} border-r ${sidebarBorder} transition-all duration-300 z-40 flex flex-col ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          {/* Logo */}
          <div className={`h-16 flex items-center justify-between px-4 border-b ${sidebarBorder}`}>
            {!sidebarCollapsed && (
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AP</span>
                </div>
                <span className={`font-semibold ${textColor}`}>AgentPad</span>
              </Link>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`p-1.5 rounded-lg ${hoverBg} ${mutedColor} transition-colors`}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarCollapsed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 mb-6">
              {!sidebarCollapsed && (
                <div className={`text-xs font-medium uppercase tracking-wider px-3 mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Squads
                </div>
              )}
              
              {squadCategories.map((category) => (
                <div key={category.name} className="mb-2">
                  {!sidebarCollapsed && (
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
                  
                  {(!sidebarCollapsed && expandedCategories.has(category.name)) && (
                    <div className="mt-1 space-y-0.5">
                      {getSquadsByCategory(category.squads).map((squad) => (
                        <Link
                          key={squad.id}
                          href={`/squads/${squad.id}`}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            pathname === `/squads/${squad.id}`
                              ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500'
                              : darkMode 
                                ? 'text-gray-300 hover:bg-[#2a2a3e] hover:text-white' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            pathname === `/squads/${squad.id}` ? 'bg-blue-500' : darkMode ? 'bg-gray-500' : 'bg-gray-400'
                          }`} />
                          <span className="truncate">{squad.name.replace(/-/g, ' ')}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {sidebarCollapsed && (
                    <div className="flex flex-col items-center gap-1 py-1">
                      {getSquadsByCategory(category.squads).slice(0, 3).map((squad) => (
                        <Link
                          key={squad.id}
                          href={`/squads/${squad.id}`}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            pathname === `/squads/${squad.id}`
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

            {/* Quick Links */}
            <div className={`px-3 border-t ${sidebarBorder} pt-4`}>
              {!sidebarCollapsed && (
                <div className={`text-xs font-medium uppercase tracking-wider px-3 mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Quick Links
                </div>
              )}
              
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === '/dashboard'
                    ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-[#2a2a3e] hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {!sidebarCollapsed && <span>Dashboard</span>}
              </Link>

              <Link
                href="/skills"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === '/skills'
                    ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-[#2a2a3e] hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {!sidebarCollapsed && <span>Skills</span>}
              </Link>

              <Link
                href="/metrics"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === '/metrics'
                    ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-500'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-[#2a2a3e] hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {!sidebarCollapsed && <span>Metrics</span>}
              </Link>
            </div>

            {/* Settings */}
            <div className={`px-3 border-t ${sidebarBorder} pt-4 mt-4`}>
              {!sidebarCollapsed && (
                <div className={`text-xs font-medium uppercase tracking-wider px-3 mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  Settings
                </div>
              )}
              
              <Link
                href="/settings/notion"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === '/settings/notion'
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
                {!sidebarCollapsed && <span>Notion</span>}
              </Link>
            </div>
          </nav>

          {/* User */}
          <div className={`border-t ${sidebarBorder} p-3`}>
            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                U
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0">
                  <div className={`text-sm truncate ${textColor}`}>User</div>
                  <div className={`text-xs truncate ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>user@example.com</div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main 
          className={`transition-all duration-300 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          {/* Theme Toggle */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-[#1a1a2e] text-yellow-400 hover:bg-[#2a2a3e]' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md border border-gray-200'
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          <div className="p-6 max-w-7xl mx-auto">
            {title && (
              <h1 className={`text-2xl font-bold ${textColor} mb-6`}>{title}</h1>
            )}
            {children}
          </div>
        </main>
      </div>
    </AppLayoutContext.Provider>
  );
}

export function PageCard({ children, darkMode, title }: { children: React.ReactNode; darkMode: boolean; title?: string }) {
  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-white';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={`${cardBg} ${cardBorder} rounded-xl border p-6`}>
      {title && <h2 className={`${textColor} font-semibold mb-4`}>{title}</h2>}
      {children}
    </div>
  );
}
