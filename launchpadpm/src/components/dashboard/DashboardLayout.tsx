'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  createdAt: string;
  lifecyclePhases: {
    id: string;
    name: string;
    status: 'completed' | 'active' | 'pending';
  }[];
}

const defaultLifecyclePhases = [
  { id: 'discovery', name: 'Discovery', status: 'completed' as const },
  { id: 'research', name: 'Research', status: 'completed' as const },
  { id: 'product', name: 'Product', status: 'completed' as const },
  { id: 'design', name: 'Design', status: 'active' as const },
  { id: 'technical', name: 'Technical', status: 'pending' as const },
  { id: 'qa', name: 'QA', status: 'pending' as const },
  { id: 'security', name: 'Security', status: 'pending' as const },
  { id: 'growth', name: 'Growth', status: 'pending' as const },
  { id: 'gtm-launch', name: 'GTM Launch', status: 'pending' as const },
  { id: 'iteration', name: 'Iteration', status: 'pending' as const },
];

interface DashboardLayoutProps {
  children?: React.ReactNode;
  squads?: Squad[];
}

export default function DashboardLayout({ children, squads: initialSquads }: DashboardLayoutProps) {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [squads, setSquads] = useState<Squad[]>(initialSquads || []);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(!initialSquads);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [showValidateModal, setShowValidateModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-dark-mode');
    if (saved !== null) {
      setDarkMode(saved === 'true');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    if (!initialSquads) {
      fetch('/api/squads')
        .then(res => res.json())
        .then(data => {
          const mappedSquads = data.map((s: any) => ({
            id: s.id,
            name: s.name,
            description: s.description,
          }));
          setSquads(mappedSquads);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load squads:', err);
          setLoading(false);
        });
    }
  }, [initialSquads]);

  useEffect(() => {
    const savedProject = localStorage.getItem('active-project');
    if (savedProject) {
      try {
        setProject(JSON.parse(savedProject));
      } catch (e) {
        console.error('Failed to parse project:', e);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('dashboard-dark-mode', String(newMode));
  };

  const handleValidate = async () => {
    if (!userInput.trim()) return;
    setIsValidating(true);
    setShowValidateModal(true);
    
    try {
      const response = await fetch('/api/run-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId: 'validation-pack',
          input: userInput,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Show success - the validation is running
        setTimeout(() => {
          setIsValidating(false);
          setShowValidateModal(false);
          // Refresh activity feed
          window.location.reload();
        }, 2000);
      } else {
        setIsValidating(false);
        alert(data.error || 'Validation failed');
      }
    } catch (err) {
      setIsValidating(false);
      console.error('Validation error:', err);
    }
  };

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      description: userInput.trim() || 'AI-powered product development',
      progress: 0,
      createdAt: new Date().toISOString(),
      lifecyclePhases: [...defaultLifecyclePhases],
    };
    
    setProject(newProject);
    localStorage.setItem('active-project', JSON.stringify(newProject));
    setShowNewProject(false);
    setNewProjectName('');
  };

  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';
  const inputBg = darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-100';
  const inputBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-300';
  const modalBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-[#0f0f1a]' : 'bg-[#F9FAFB]'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#0f0f1a]' : 'bg-[#F9FAFB]'}`}>
      <DashboardSidebar 
        squads={squads} 
        currentPath="/dashboard"
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
                disabled={!userInput.trim() || isValidating}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isValidating ? 'Validating...' : 'Validate'}
              </button>
            </div>
            <p className={`${mutedColor} text-sm mt-2`}>
              Run AI-powered validation analysis on your idea
            </p>
            
            {/* New Project Option */}
            {!project && (
              <div className={`mt-4 pt-4 border-t ${cardBorder}`}>
                <button
                  onClick={() => setShowNewProject(!showNewProject)}
                  className={`text-sm ${mutedColor} hover:text-blue-500 transition-colors`}
                >
                  Or start a new project instead →
                </button>
                
                {showNewProject && (
                  <div className="mt-3 flex gap-3">
                    <input
                      type="text"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="Project name..."
                      className={`flex-1 px-4 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                    />
                    <button
                      onClick={handleCreateProject}
                      disabled={!newProjectName.trim()}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      Create Project
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className={`text-2xl font-bold ${textColor}`}>Dashboard</h1>
            <p className={`${mutedColor} mt-1`}>
              {project ? `Working on: ${project.name}` : 'Welcome back! Start by validating an idea above or creating a project.'}
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Project Card */}
              <ActiveProject 
                darkMode={darkMode} 
                project={project}
              />
              
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

      {/* Validation Modal */}
      {showValidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className={`${modalBg} rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl`}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                {isValidating ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                ) : (
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <h3 className={`${textColor} text-xl font-semibold mb-2`}>
                {isValidating ? 'Running Validation...' : 'Validation Complete!'}
              </h3>
              <p className={mutedColor}>
                {isValidating 
                  ? 'Our AI is analyzing your idea...'
                  : 'Your validation results are ready.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
