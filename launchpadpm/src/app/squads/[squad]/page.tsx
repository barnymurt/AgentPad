import { getSquadById, getSquadList } from '@/lib/squads';
import { getSkillsBySquad } from '@/lib/skills';
import SquadRunClient from '@/components/SquadRunClient';
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

  return <SquadRunClient squad={squad} skills={skills.map((s: any) => ({ name: s.name, description: s.description || '' }))} />;
}
