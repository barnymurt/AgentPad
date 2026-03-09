'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

interface Squad {
  id: string;
  name: string;
  description: string;
}

interface AppLayoutContextType {
  theme: 'dark' | 'light';
  isDarkMode: boolean;
  isLightMode: boolean;
  toggleTheme: () => void;
  squads: Squad[];
  loading: boolean;
  mounted: boolean;
}

const AppLayoutContext = createContext<AppLayoutContextType>({
  theme: 'dark',
  isDarkMode: true,
  isLightMode: false,
  toggleTheme: () => {},
  squads: [],
  loading: true,
  mounted: false,
});

export const useAppLayout = () => useContext(AppLayoutContext);

function getInitialDarkMode(): boolean {
  return false;
}

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const squadCategories = [
  { 
    name: 'Discovery Phase', 
    squads: ['discovery', 'research', 'product'],
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
      </svg>
    )
  },
  { 
    name: 'Build Phase', 
    squads: ['design', 'technical', 'qa', 'security'],
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
      </svg>
    )
  },
  { 
    name: 'Launch Phase', 
    squads: ['growth', 'gtm-launch'],
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    )
  },
  { 
    name: 'Iterate Phase', 
    squads: ['iteration'],
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
      </svg>
    )
  },
];

export function AppLayout({ children, title }: AppLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isDarkMode = false;
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [adminPreviewTier, setAdminPreviewTier] = useState<string | null>(null);

  const userTier = session?.user?.tier as string | undefined;
  const isAdmin = userTier === 'admin';
  
  const effectiveTier = adminPreviewTier || userTier || 'free';
  const isPremium = effectiveTier === 'premium' || effectiveTier === 'admin';
  const isBobAI = effectiveTier === 'bobai';
  const isFree = effectiveTier === 'free' && !isAdmin;

  useEffect(() => {
    setMounted(true);
    
    // Load saved expanded categories
    const savedExpanded = localStorage.getItem('sidebar-expanded-categories');
    if (savedExpanded) {
      setExpandedCategories(new Set(JSON.parse(savedExpanded)));
    }
    
    // Load admin preview tier
    const savedPreviewTier = localStorage.getItem('admin-preview-tier');
    if (savedPreviewTier) {
      setAdminPreviewTier(savedPreviewTier);
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

  // Auto-expand category based on current pathname
  useEffect(() => {
    if (pathname.startsWith('/squads/')) {
      const squadId = pathname.split('/squads/')[1];
      squadCategories.forEach(cat => {
        if (cat.squads.includes(squadId) && !expandedCategories.has(cat.name)) {
          const newExpanded = new Set(expandedCategories);
          newExpanded.add(cat.name);
          setExpandedCategories(newExpanded);
          localStorage.setItem('sidebar-expanded-categories', JSON.stringify([...newExpanded]));
        }
      });
    }
  }, [pathname]);

  useEffect(() => {
    if (adminPreviewTier !== null) {
      localStorage.setItem('admin-preview-tier', adminPreviewTier);
    } else {
      localStorage.removeItem('admin-preview-tier');
    }
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('adminPreviewTierChange', { detail: adminPreviewTier }));
  }, [adminPreviewTier]);

  // Toggle .dark class on <html> element for Tailwind class-based dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
    localStorage.setItem('sidebar-expanded-categories', JSON.stringify([...newExpanded]));
  };

  const getSquadsByCategory = (categorySquads: string[]) => {
    return squads.filter(sq => categorySquads.includes(sq.id));
  };

  const bgColor = 'bg-white';
  const sidebarBg = 'bg-white';
  const sidebarBorder = 'border-gray-100';
  const textColor = 'text-gray-900';
  const mutedColor = 'text-gray-500';
  const hoverBg = 'hover:bg-gray-50';
  const theme: 'dark' | 'light' = 'light';
  const isLightMode = true;
  const toggleTheme = () => {};

  if (!mounted) {
    return (
        <div className="min-h-screen bg-[#F9FAFB]">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  const contextValue = { theme, isDarkMode, isLightMode, toggleTheme, squads, loading, mounted };

  return (
    <React.Fragment>
      <AppLayoutContext.Provider value={contextValue}>
        <div className={`min-h-screen ${bgColor}`}>
          <aside 
            className={`fixed left-0 top-0 h-screen ${sidebarBg} border-r ${sidebarBorder} transition-all duration-300 z-40 flex flex-col ${
              sidebarCollapsed ? 'w-16' : 'w-64'
            }`}
          >
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

            <nav className="flex-1 overflow-y-auto py-4">
              {/* Quick Links Section */}
              <div className={`px-3 border-b ${sidebarBorder} pb-4 mb-4`}>
                {!sidebarCollapsed && (
                  <div className={`text-xs font-medium uppercase tracking-wider px-3 mb-2 text-gray-400`}>
                    Quick Links
                  </div>
                )}
                
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/dashboard'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {!sidebarCollapsed && <span>Dashboard</span>}
                </Link>

                <Link
                  href="/skills"
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/skills'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {!sidebarCollapsed && <span>Skills</span>}
                </Link>

                <Link
                  href="/activity"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/activity'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {!sidebarCollapsed && <span>Activity</span>}
                </Link>

                {isBobAI && (
                <Link
                  href="/builder"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/builder'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {!sidebarCollapsed && <span>AI Builder</span>}
                </Link>
                )}

                {isPremium && (
                <Link
                  href="/settings/data-sources"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/settings/data-sources'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  {!sidebarCollapsed && <span>Data Sources</span>}
                </Link>
                )}

                {isPremium && (
                <Link
                  href="/metrics"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/metrics'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {!sidebarCollapsed && <span>Metrics</span>}
                </Link>
                )}
              </div>

              <div className="px-3 mb-6">
                {!sidebarCollapsed && (
                  <div className={`text-xs font-medium uppercase tracking-wider px-3 mb-2 text-gray-400`}>
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
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                              pathname === `/squads/${squad.id}`
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              pathname === `/squads/${squad.id}` ? 'bg-blue-500' : 'bg-gray-200'
                            }`} />
                            <span className="truncate">{squad.name.replace(/-/g, ' ')}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {sidebarCollapsed && !expandedCategories.has(category.name) && (
                      <div className="flex flex-col items-center gap-2 py-1">
                        <button
                          onClick={() => toggleCategory(category.name)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-gray-500 hover:bg-gray-200 hover:text-gray-900'`}
                          title={category.name}
                        >
                          {category.icon}
                        </button>
                      </div>
                    )}
                    
                    {sidebarCollapsed && expandedCategories.has(category.name) && (
                      <div className="flex flex-col items-center gap-1 py-1">
                        {getSquadsByCategory(category.squads).map((squad) => (
                          <Link
                            key={squad.id}
                            href={`/squads/${squad.id}`}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              pathname === `/squads/${squad.id}`
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                            }`}
                            title={squad.name.replace(/-/g, ' ')}
                          >
                            <div className="w-2 h-2 rounded-full bg-current" />
                          </Link>
                        ))}
                        <button
                          onClick={() => toggleCategory(category.name)}
                          className={`w-6 h-6 rounded flex items-center justify-center transition-colors text-gray-400 hover:bg-gray-200 hover:text-gray-900'`}
                          title="Collapse"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className={`px-3 border-t ${sidebarBorder} pt-4 mt-4`}>
                {!sidebarCollapsed && (
                  <div className={`text-xs font-medium uppercase tracking-wider px-3 mb-2 text-gray-400`}>
                    Settings
                  </div>
                )}
                
                <Link
                  href="/settings/notion"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/settings/notion'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 2v4M16 2v4M2 10h20" />
                  </svg>
                  {!sidebarCollapsed && <span>Notion</span>}
                </Link>

                <Link
                  href="/settings/api-keys"
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    pathname === '/settings/api-keys'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  {!sidebarCollapsed && <span>API Keys</span>}
                </Link>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openUpgradeModal'))}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all text-gray-600 hover:bg-gray-100 hover:text-gray-900`}
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {!sidebarCollapsed && <span>Upgrade</span>}
                </button>
              </div>
            </nav>

            <div className={`border-t ${sidebarBorder} p-3 space-y-2`}>
              {session?.user?.tier === 'free' && !sidebarCollapsed && (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openUpgradeModal'))}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  <span>Upgrade to Premium</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </button>
              )}
              
              {session?.user?.tier === 'free' && sidebarCollapsed && (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openUpgradeModal'))}
                  className="w-8 h-8 mx-auto rounded-lg flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  title="Upgrade to Premium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </button>
              )}

              {/* Admin Preview Toggle */}
              {isAdmin && (
                <div className={`px-3 py-2 border-t ${sidebarBorder}`}>
                  {!sidebarCollapsed && (
                    <div className={`text-xs font-medium uppercase tracking-wider px-3 mb-2 text-gray-400`}>
                      Preview Mode
                    </div>
                  )}
                  <div className={`flex ${sidebarCollapsed ? 'flex-col' : ''} gap-2`}>
                    <button
                      onClick={() => setAdminPreviewTier(null)}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        !adminPreviewTier 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      title="View as yourself"
                    >
                      {sidebarCollapsed ? 'Me' : 'My View'}
                    </button>
                    <button
                      onClick={() => setAdminPreviewTier('free')}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        adminPreviewTier === 'free' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      title="Preview free user experience"
                    >
                      {sidebarCollapsed ? 'Free' : 'Free'}
                    </button>
                    <button
                      onClick={() => setAdminPreviewTier('premium')}
                      className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        adminPreviewTier === 'premium' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      title="Preview premium user experience"
                    >
                      {sidebarCollapsed ? 'Pro' : 'Premium'}
                    </button>
                  </div>
                </div>
              )}

              <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  {session?.user?.name?.charAt(0).toUpperCase() || session?.user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                {!sidebarCollapsed && (
                  <div className="min-w-0 flex-1">
                    <div className={`text-sm truncate ${textColor}`}>
                      {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}
                    </div>
                    <div className={`text-xs truncate ${'text-gray-500'}`}>
                      {session?.user?.email || ''}
                    </div>
                    {session?.user?.tier && (
                      <div className={`text-xs mt-0.5 ${
                        session?.user?.tier === 'admin' ? 'text-yellow-400' : 
                        session?.user?.tier === 'premium' ? 'text-purple-400' : 
                        'text-green-400'
                      }`}>
                        {session?.user?.tier === 'admin' ? 'Admin' : 
                         session?.user?.tier === 'premium' ? 'Premium' : 
                         'Free'}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {!sidebarCollapsed && (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all text-gray-500 hover:bg-gray-100 hover:text-gray-900'`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              )}
            </div>
          </aside>

          <main 
            className={`transition-all duration-300 ${
              sidebarCollapsed ? 'ml-16' : 'ml-64'
            }`}
          >
            <div className="p-6 max-w-7xl mx-auto">
              {title && (
                <h1 className={`text-2xl font-bold ${textColor} mb-6`}>{title}</h1>
              )}
              {children}
            </div>
          </main>
        </div>
      </AppLayoutContext.Provider>
    </React.Fragment>
  );
}

export function PageCard({ children, isDarkMode, title }: { children: React.ReactNode; isDarkMode: boolean; title?: string }) {
  const cardBg = 'bg-white';
  const cardBorder = 'border-gray-100';
  const textColor = 'text-gray-900';

  return (
    <div className={`${cardBg} ${cardBorder} rounded-xl border p-6`}>
      {title && <h2 className={`${textColor} font-semibold mb-4`}>{title}</h2>}
      {children}
    </div>
  );
}
