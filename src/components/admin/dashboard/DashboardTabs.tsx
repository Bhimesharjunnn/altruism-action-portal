
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PendingCauses from './PendingCauses';
import PendingSponsors from './PendingSponsors';
import RecentClaims from './RecentClaims';

// Mock data types
interface PendingCause {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  date: string;
  category: string;
}

interface PendingSponsor {
  id: string;
  sponsor: string;
  cause: string;
  amount: number;
  date: string;
}

interface Claim {
  id: string;
  cause: string;
  claimerName: string;
  organization: string;
  status: 'pending' | 'verified' | 'processing';
  date: string;
}

const DashboardTabs = () => {
  // Mock data for pending causes
  const pendingCauses: PendingCause[] = [
    {
      id: '4',
      title: 'Wildlife Conservation',
      description: 'Protecting endangered species and their habitats.',
      createdBy: 'Conservation Alliance',
      date: '2025-03-12',
      category: 'Environment',
    },
    {
      id: '5',
      title: 'Mental Health Support',
      description: 'Providing resources for mental health services in underserved areas.',
      createdBy: 'Wellness Foundation',
      date: '2025-03-15',
      category: 'Healthcare',
    }
  ];
  
  // Mock data for pending sponsorships
  const pendingSponsors: PendingSponsor[] = [
    {
      id: '2',
      sponsor: 'Green Future Fund',
      cause: "Children's Education Fund",
      amount: 3500,
      date: '2025-04-02'
    }
  ];
  
  // Mock data for claims
  const recentClaims: Claim[] = [
    {
      id: '101',
      cause: 'Clean Water Initiative',
      claimerName: 'John Smith',
      organization: 'Community Outreach',
      status: 'pending',
      date: '2025-04-05'
    },
    {
      id: '102',
      cause: 'Food Security Project',
      claimerName: 'Maria Garcia',
      organization: 'Urban Farms Coalition',
      status: 'verified',
      date: '2025-04-03'
    },
    {
      id: '103',
      cause: 'Literacy Program',
      claimerName: 'David Johnson',
      organization: 'Education First',
      status: 'processing',
      date: '2025-04-01'
    }
  ];

  return (
    <Tabs defaultValue="pending-causes">
      <TabsList className="mb-6">
        <TabsTrigger value="pending-causes">Pending Causes</TabsTrigger>
        <TabsTrigger value="pending-sponsors">Pending Sponsorships</TabsTrigger>
        <TabsTrigger value="recent-claims">Recent Claims</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pending-causes">
        <PendingCauses pendingCauses={pendingCauses} />
      </TabsContent>
      
      <TabsContent value="pending-sponsors">
        <PendingSponsors pendingSponsors={pendingSponsors} />
      </TabsContent>
      
      <TabsContent value="recent-claims">
        <RecentClaims recentClaims={recentClaims} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
