import { getSquadById, getSquadList } from '@/lib/squads';
import { getSkillsBySquad } from '@/lib/skills';
import SkillCard from '@/components/SkillCard';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ squad: string }>;
}

export async function generateStaticParams() {
  const squads = getSquadList();
  return squads.map((squad) => ({
    squad: squad.id,
  }));
}

export default async function SquadPage({ params }: PageProps) {
  const { squad: squadId } = await params;
  const squad = getSquadById(squadId);
  const skills = squad ? getSkillsBySquad(squad.skills) : [];

  if (!squad) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Squad not found
          </h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

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
              {squad.name}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Squad Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {squad.description}
          </p>
          {squad.example_data_sources && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Example data sources:</span> {squad.example_data_sources}
            </p>
          )}
        </div>

        {/* Skills */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Skills in this squad
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {skills.length} skills
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              description={skill.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
