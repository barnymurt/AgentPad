'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout, useAppLayout } from '@/components/layout/AppLayout';

interface Squad {
  id: string;
  name: string;
  skills: string[];
}

interface Skill {
  id: string;
  name: string;
  description: string;
}

const LIFECYCLE_ORDER = [
  'discovery', 'research',
  'product', 'design', 'technical', 'qa', 'security',
  'growth', 'gtm-launch',
  'iteration', 'data', 'infrastructure'
];

export default function SkillsPage() {
  const { darkMode } = useAppLayout();
  const [squads, setSquads] = useState<Squad[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSquads, setSelectedSquads] = useState<Set<string>>(new Set());
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
    const matchesSearch = skill.name.toLowerCase().includes(search.toLowerCase()) ||
      (skill.description?.toLowerCase().includes(search.toLowerCase()) ?? false);
    return matchesFilter && matchesSearch;
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

  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const mutedColor = darkMode ? 'text-gray-400' : 'text-gray-600';
  const inputBg = darkMode ? 'bg-[#0f0f1a]' : 'bg-gray-100';
  const inputBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-300';
  const cardBg = darkMode ? 'bg-[#1a1a2e]' : 'bg-[#F9FAFB]';
  const cardBorder = darkMode ? 'border-[#2a2a3e]' : 'border-gray-200';

  return (
    <AppLayout title="Skills" key={darkMode ? 'dark' : 'light'}>
      <div className="space-y-6">
        {/* Filters */}
        <div className={`${cardBg} ${cardBorder} rounded-xl border p-4`}>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search skills..."
              className={`flex-1 px-4 py-2 rounded-lg border ${inputBorder} ${inputBg} ${textColor} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                      : darkMode 
                        ? 'bg-[#2a2a3e] text-gray-300 hover:bg-[#3a3a4e]'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {squad.name}
                </button>
              ))}
              {selectedSquads.size > 0 && (
                <button
                  onClick={() => setSelectedSquads(new Set())}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
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
              return (
                <Link
                  key={skill.id}
                  href={`/skills/${skill.id}`}
                  className={`${cardBg} ${cardBorder} border rounded-xl p-5 hover:border-blue-500 transition-colors group`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`${textColor} font-semibold group-hover:text-blue-400 transition-colors`}>
                      {(skill.name || '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {skillSquads.map(sqId => {
                      const squad = squads.find(s => s.id === sqId);
                      return squad ? (
                        <span key={sqId} className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-[#2a2a3e]' : 'bg-gray-100'} ${mutedColor}`}>
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
