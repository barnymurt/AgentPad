import SquadClient from '@/components/squad/SquadClient';
import { getSquadById, getSquadList } from '@/lib/squads';

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

  if (!squad) {
    return <SquadClient squadId={squadId} />;
  }

  return <SquadClient squadId={squadId} />;
}
