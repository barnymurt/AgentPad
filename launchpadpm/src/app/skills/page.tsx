'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';

interface Squad {
  id: string;
  name: string;
  skills: string[];
}

interface Skill {
  id: string;
  name: string;
  description: string;
  lifecycle?: string;
  category?: string;
  specialization?: string;
}

const LIFECYCLES = [
  { id: 'all', label: 'All' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'build', label: 'Build' },
  { id: 'launch', label: 'Launch' },
  { id: 'iterate', label: 'Iterate' },
];

const LIFECYCLE_COLORS: Record<string, string> = {
  discovery: 'bg-blue-100 text-blue-700 border-blue-200',
  build: 'bg-purple-100 text-purple-700 border-purple-200',
  launch: 'bg-green-100 text-green-700 border-green-200',
  iterate: 'bg-orange-100 text-orange-700 border-orange-200',
};

const SPECIALIZATION_COLORS: Record<string, string> = {
  frontend: 'bg-pink-100 text-pink-700 border-pink-200',
  backend: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  qa: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  fullstack: 'bg-violet-100 text-violet-700 border-violet-200',
};

const LIFECYCLE_ORDER = [
  'discovery', 'research',
  'product', 'design', 'technical', 'qa', 'security',
  'growth', 'gtm-launch',
  'iteration', 'data', 'infrastructure'
];

export default function SkillsPage() {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSquads, setSelectedSquads] = useState<Set<string>>(new Set());
  const [selectedLifecycle, setSelectedLifecycle] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/squads').then(r => r.json()),
      fetch('/api/skills').then(r => r.json())
    ])
      .then(([squadsData, skillsData]) => {
        const ordered = LIFECYCLE_ORDER
          .map(id => squadsData.find((s: any) => s.id === id))
          .filter(Boolean);
        setSquads(ordered);
        setSkills(skillsData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getSkillSquads = (skillId: string): string[] => {
    return squads
      .filter(sq => sq.skills?.includes(skillId))
      .map(sq => sq.id);
  };

  const filteredSkills = skills.filter(skill => {
    const skillSquads = getSkillSquads(skill.id);
    const matchesFilter = selectedSquads.size === 0 || 
      skillSquads.some(sq => selectedSquads.has(sq));
    const matchesLifecycle = selectedLifecycle === 'all' || skill.lifecycle === selectedLifecycle;
    const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase()) ||
      (skill.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
    return matchesFilter && matchesLifecycle && matchesSearch;
  });

  const toggleSquad = (squadId: string) => {
    const newSelected = new Set(selectedSquads);
    if (newSelected.has(squadId)) {
      newSelected.delete(squadId);
    } else {
      newSelected.add(squadId);
    }
    setSelectedSquads(newSelected);
  };

  const textColor = 'text-gray-900';
  const mutedColor = 'text-gray-600';
  const inputBg = 'bg-white';
  const inputBorder = 'border-gray-300';
  const cardBg = 'bg-white';
  const cardBorder = 'border-gray-200';
  const tabActiveBg = 'bg-gray-200';

  return (
    <AppLayout title="Skills">
      <div className="space-y-6">
        {/* Lifecycle Filter Tabs */}
        <div className={`${cardBg} ${cardBorder} rounded-xl border p-1 flex gap-1`}>
          {LIFECYCLES.map((lifecycle) => (
            <button
              key={lifecycle.id}
              onClick={() => setSelectedLifecycle(lifecycle.id)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedLifecycle === lifecycle.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {lifecycle.label}
            </button>
          ))}
        </div>

        {/* Search and Squad Filters */}
        <div className={`${cardBg} ${cardBorder} rounded-xl border p-4 shadow-card`}>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills..."
              className={`flex-1 px-4 py-2.5 rounded-xl border ${inputBorder} ${inputBg} ${textColor} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          {/* Squad Filter Pills - Ordered by lifecycle */}
          <div className="mt-4">
            <p className={`text-sm ${mutedColor} mb-2`}>Filter by squad:</p>
            <div className="flex flex-wrap gap-2">
              {squads.map((squad) => (
                <button
                  key={squad.id}
                  onClick={() => toggleSquad(squad.id)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedSquads.has(squad.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {squad.name}
                </button>
              ))}
              {selectedSquads.size > 0 && (
                <button
                  onClick={() => setSelectedSquads(new Set())}
                  className="px-3 py-1.5 rounded-full text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => {
              const skillSquads = getSkillSquads(skill.id);
              const lifecycleColor = LIFECYCLE_COLORS[skill.lifecycle || 'build'];
              const specializationColor = SPECIALIZATION_COLORS[skill.specialization || ''];
              return (
                <Link
                  key={skill.id}
                  href={`/skills/${skill.id}`}
                  className={`${cardBg} ${cardBorder} border rounded-xl p-5 hover:border-blue-300 hover:shadow-card transition-all group`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`${textColor} font-semibold group-hover:text-blue-600 transition-colors`}>
                      {(skill.name || '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <div className="flex gap-1">
                      {skill.lifecycle && (
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${lifecycleColor}`}>
                          {skill.lifecycle}
                        </span>
                      )}
                      {skill.specialization && specializationColor && (
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${specializationColor}`}>
                          {skill.specialization}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {skillSquads.map(sqId => {
                      const squad = squads.find(s => s.id === sqId);
                      return squad ? (
                        <span key={sqId} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {squad.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                  <p className={`${mutedColor} text-sm line-clamp-2`}>
                    {skill.description || 'No description available'}
                  </p>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className={mutedColor}>No skills found matching your criteria</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
