
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { fetchStats } from '@/services/apiServices';

const WhySponsor = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats
  });

  return (
    <Layout>
      <main className="max-w-4xl mx-auto py-16 px-4 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600">
          <Link to="/">Home</Link> &gt; Why Sponsor?
        </nav>

        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Why Sponsor a Cause?</h1>
          <p className="text-lg text-gray-700">
            Empower communities, gain brand recognition, and track real impact in real time.
          </p>
          <Button asChild>
            <Link to="/sponsor/new">
              <Gift className="mr-2" /> Start Sponsoring
            </Link>
          </Button>
        </section>

        {/* Aims & Objectives */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Aims & Objectives</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Aim:</strong> Empower brands to drive real change through branded tote‐bag sponsorships.</li>
            <li><strong>Objective 1:</strong> Increase active sponsors by 20% each quarter.</li>
            <li><strong>Objective 2:</strong> Reach 10,000 claimed bags in the first year.</li>
            <li><strong>Objective 3:</strong> Ensure 95%+ of claims are fulfilled within 14 days.</li>
            <li><strong>Objective 4:</strong> Deliver clear, real-time impact analytics and digital badges.</li>
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
                <h3 className="text-lg font-medium">Total Sponsors</h3>
                <CardContent className="text-3xl pt-2 px-0">{stats?.totalSponsors || 0}</CardContent>
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-medium">Active Campaigns</h3>
                <CardContent className="text-3xl pt-2 px-0">{stats?.activeCampaigns || 0}</CardContent>
              </Card>
              <Card className="p-4">
                <h3 className="text-lg font-medium">Bags Sponsored</h3>
                <CardContent className="text-3xl pt-2 px-0">{stats?.totalBagsSponsored || 0}</CardContent>
              </Card>
            </>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default WhySponsor;
