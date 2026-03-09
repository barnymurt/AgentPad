'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';
import QuickActions from '@/components/dashboard/QuickActions';
import ActiveProject from '@/components/dashboard/ActiveProject';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import UpgradeModal from '@/components/UpgradeModal';
import SkillSuggestions from '@/components/dashboard/SkillSuggestions';

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

interface UserUsage {
  tier: string;
  validationsUsed: number;
  skillsUsed: number;
  canRunValidation: boolean;
  canRunSkill: boolean;
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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { squads: contextSquads } = useAppLayout();
  const [userInput, setUserInput] = useState('');
  const [project, setProject] = useState<Project | null>(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [showValidateModal, setShowValidateModal] = useState(false);
  const [userUsage, setUserUsage] = useState<UserUsage | null>(null);
  const [adminPreviewTier, setAdminPreviewTier] = useState<string | null>(null);

  // Get admin preview tier from localStorage
  useEffect(() => {
    const savedPreview = localStorage.getItem('admin-preview-tier');
    if (savedPreview) {
      setAdminPreviewTier(savedPreview);
    }
    
    const handlePreviewChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setAdminPreviewTier(customEvent.detail);
    };
    window.addEventListener('adminPreviewTierChange', handlePreviewChange);
    return () => window.removeEventListener('adminPreviewTierChange', handlePreviewChange);
  }, []);

  const sessionTier = session?.user?.tier as string | undefined;
  const effectiveTier = adminPreviewTier || sessionTier || 'free';
  const isAdmin = effectiveTier === 'admin';
  const isPremium = effectiveTier === 'premium' || isAdmin;
  const isBobAI = effectiveTier === 'bobai';
  const isFree = effectiveTier === 'free' && !isAdmin;

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetch('/api/auth-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check-usage' }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.tier) {
            setUserUsage(data);
          }
        })
        .catch(console.error);
    }
  }, [session]);

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

  const handleValidate = async () => {
    if (!userInput.trim()) return;
    
    if (isFree && userUsage && !userUsage.canRunValidation) {
      alert('You have reached your monthly validation limit. Upgrade to Premium for unlimited validations.');
      return;
    }
    
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
        setTimeout(() => {
          setIsValidating(false);
          setShowValidateModal(false);
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
    
    if (isFree) {
      alert('Project creation is available for Premium users. Upgrade to create unlimited projects.');
      return;
    }
    
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

  const textColor = 'text-gray-900';
  const mutedColor = 'text-gray-600';
  const cardBg = 'bg-white';
  const cardBorder = 'border-gray-200';
  const inputBg = 'bg-white';
  const inputBorder = 'border-gray-300';
  const modalBg = 'bg-white';

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        {/* Validate Idea Section - AT THE TOP */}
        <div className={`${cardBg} ${cardBorder} rounded-xl border p-6 shadow-card`}>
          <h3 className={`${textColor} font-semibold mb-3 flex items-center gap-2`}>
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              data-testid="validation-input"
              className={`flex-1 px-4 py-2.5 rounded-xl border ${inputBorder} ${inputBg} ${textColor} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              onKeyDown={(e) => e.key === 'Enter' && handleValidate()}
            />
            <button
              onClick={handleValidate}
              disabled={!userInput.trim() || isValidating}
              data-testid="validate-button"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isValidating ? 'Validating...' : 'Validate'}
            </button>
          </div>
          <p className={`${mutedColor} text-sm mt-2`}>
            Run AI-powered validation analysis on your idea
          </p>
          
          {/* New Project Option - Premium Only */}
          {!project && (
            <div className={`mt-4 pt-4 border-t ${cardBorder}`}>
              {isFree ? (
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${textColor} text-sm font-medium`}>Create New Project</p>
                      <p className={`${mutedColor} text-xs`}>Upgrade to Premium to create unlimited projects</p>
                    </div>
                    <button
                      onClick={() => document.dispatchEvent(new CustomEvent('openUpgradeModal'))}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowNewProject(!showNewProject)}
                    data-testid="start-project-button"
                    className={`text-sm ${mutedColor} hover:text-blue-600 transition-colors`}
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
                        data-testid="project-name-input"
                        className={`flex-1 px-4 py-2 rounded-xl border ${inputBorder} ${inputBg} ${textColor} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                      />
                      <button
                        onClick={handleCreateProject}
                        disabled={!newProjectName.trim()}
                        data-testid="create-project-button"
                        className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                      >
                        Create Project
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Project Card */}
            <ActiveProject 
              project={project}
              isPremium={isPremium}
              isBobAI={isBobAI}
            />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions isPremium={isPremium} />
            
            {/* Skill Suggestions */}
            {isPremium && (
              <SkillSuggestions
                isPremium={isPremium}
                projectDescription={project?.description}
              />
            )}
            
            {/* Activity Feed */}
            <ActivityFeed />
          </div>
        </div>
      </div>

      {/* Validation Modal */}
      {showValidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className={`${modalBg} rounded-xl p-8 max-w-md w-full mx-4 shadow-xl`}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                {isValidating ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
                ) : (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <UpgradeModal />
    </AppLayout>
  );
}
