
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { fetchStats } from '@/services/apiServices';

const WhyClaim = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats
  });

  return (
    <Layout>
      <main className="max-w-4xl mx-auto py-16 px-4 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600">
          <Link to="/">Home</Link> &gt; Why Claim?
        </nav>

        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Why Claim a Tote Bag?</h1>
          <p className="text-lg text-gray-700">
            Support causes you care about, get free eco-friendly bags, and join a community of changemakers.
          </p>
          <Button variant="secondary" asChild>
            <Link to="/causes">
              <Heart className="mr-2" /> Browse Causes
            </Link>
          </Button>
        </section>

        {/* Aims & Objectives */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Aims & Objectives</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Aim:</strong> Give individuals free, eco-friendly tote bags while raising awareness for social causes.</li>
            <li><strong>Objective 1:</strong> Enable 10,000 claimers to join the movement in Year 1.</li>
            <li><strong>Objective 2:</strong> Maintain a 95% on-time shipment rate.</li>
            <li><strong>Objective 3:</strong> Reward claimers with digital badges and community recognition.</li>
            <li><strong>Objective 4:</strong> Provide seamless, transparent claim tracking via SMS/email.</li>
          </ul>
        </section>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <Card className="h-24 animate-pulse bg-gray-100"></Card>
              <Card className="h-24 animate-pulse bg-gray-100"></Card>
              <Card className="h-24 animate-pulse bg-gray-100"></Card>
            </>
          ) : (
            <>
              <Card className="p-4">
                <h3 className="text-lg font-medium">Total Claimers</h3>
                <CardContent className="text-3xl pt-2 px-0">{stats?.totalClaimers || 0}</CardContent>
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-medium">Bags Claimed</h3>
                <CardContent className="text-3xl pt-2 px-0">{stats?.totalBagsClaimed || 0}</CardContent>
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-medium">Active Campaigns</h3>
                <CardContent className="text-3xl pt-2 px-0">{stats?.activeCampaigns || 0}</CardContent>
              </Card>
            </>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default WhyClaim;
