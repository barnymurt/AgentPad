'use client';

import { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import QuickActions from './QuickActions';
import ActiveProject from './ActiveProject';
import ActivityFeed from './ActivityFeed';
import ResultsPanel from './ResultsPanel';

interface Squad {
  id: string;
  name: string;
  description: string;
}

interface DashboardLayoutProps {
  children?: React.ReactNode;
  squads: Squad[];
}

export default function DashboardLayout({ children, squads }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-dark-mode');
    if (saved !== null) {
      setDarkMode(saved === 'true');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('dashboard-dark-mode', String(newMode));
  };

  const handleValidate = () => {
    if (!userInput.trim()) return;
    window.location.href = `/?idea=${encodeURIComponent(userInput)}`;
  };

  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-white';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-100';
  const inputBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-300';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-50'}`}>
      <DashboardSidebar 
        squads={squads} 
        currentPath="/"
        darkMode={darkMode}
      />
      
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
          {/* Validate Idea Section - AT THE TOP */}
          <div className={`${cardBg} ${cardBorder} rounded-xl border p-6 mb-6`}>
            <h3 className={`${textColor} font-semibold mb-3 flex items-center gap-2`}>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Validate an Idea
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Describe your startup idea..."
                className={`flex-1 px-4 py-2.5 rounded-lg border ${inputBorder} ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
              />
              <button
                onClick={handleValidate}
                disabled={!userInput.trim()}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Validate
              </button>
            </div>
            <p className={`${mutedColor} text-sm mt-2`}>
              Run AI-powered validation analysis on your idea
            </p>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className={`text-2xl font-bold ${textColor}`}>Dashboard</h1>
            <p className={`${mutedColor} mt-1`}>Welcome back! Here is your project overview.</p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Project Card */}
              <ActiveProject darkMode={darkMode} />
              
              {/* Results Panel */}
              <ResultsPanel darkMode={darkMode} />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActions darkMode={darkMode} />
              
              {/* Activity Feed */}
              <ActivityFeed darkMode={darkMode} />
            </div>
          </div>

          {/* Main Content Area */}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
