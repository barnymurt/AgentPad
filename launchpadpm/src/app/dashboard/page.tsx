import DashboardLayout from '@/components/dashboard/DashboardLayout';

const mockSquads = [
  { id: 'discovery', name: 'Discovery', description: 'Initial research and validation' },
  { id: 'research', name: 'Research', description: 'Market and competitor analysis' },
  { id: 'product', name: 'Product', description: 'Product management and strategy' },
  { id: 'design', name: 'Design', description: 'UI/UX and visual design' },
  { id: 'technical', name: 'Technical', description: 'Engineering and architecture' },
  { id: 'qa', name: 'QA', description: 'Quality assurance and testing' },
  { id: 'security', name: 'Security', description: 'Security audit and compliance' },
  { id: 'growth', name: 'Growth', description: 'Marketing and user acquisition' },
  { id: 'gtm-launch', name: 'GTM Launch', description: 'Go-to-market execution' },
  { id: 'iteration', name: 'Iteration', description: 'Continuous improvement' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout squads={mockSquads}>
      {/* Empty - main content is in the layout */}
    </DashboardLayout>
  );
}
