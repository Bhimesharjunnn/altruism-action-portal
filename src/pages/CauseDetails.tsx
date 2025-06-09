
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import CauseDetailsHeader from '@/components/cause-details/CauseDetailsHeader';
import CauseDetailsSidebar from '@/components/cause-details/CauseDetailsSidebar';
import CauseImageAndStory from '@/components/cause-details/CauseImageAndStory';
import ImpactStats from '@/components/cause-details/ImpactStats';
import SponsorShowcase from '@/components/cause-details/SponsorShowcase';
import DetailedDescription from '@/components/cause-details/DetailedDescription';
import TransparencyTrust from '@/components/cause-details/TransparencyTrust';
import FinalCallout from '@/components/cause-details/FinalCallout';
import StickyBottomBar from '@/components/cause-details/StickyBottomBar';
import type { Cause } from '@/types';

const CauseDetails = () => {
  const { id } = useParams();
  const [cause, setCause] = useState<Cause | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch
    const mockCause: Cause = {
      _id: id || '1',
      title: 'Clean Water Initiative',
      description: 'Providing clean drinking water to remote communities in need.',
      story: 'In many remote villages, families walk miles just to access clean water. Our initiative builds sustainable water systems that provide safe drinking water directly to these communities.',
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'Water & Sanitation',
      goal: 50000,
      raised: 32000,
      status: 'open' as const,
      sponsors: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isOnline: true
    };
    
    setCause(mockCause);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading cause details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!cause) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Cause Not Found</h1>
            <p className="text-gray-600">The cause you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const mockStats = [
    { label: 'Communities Reached', value: '24' },
    { label: 'Water Systems Built', value: '8' },
    { label: 'People Served', value: '2,400' }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <CauseDetailsHeader 
          title={cause.title}
          description={cause.description}
        />
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CauseImageAndStory 
                imageUrl={cause.imageUrl}
                title={cause.title}
                story={cause.story}
              />
              <ImpactStats stats={mockStats} />
              <SponsorShowcase sponsors={cause.sponsors} />
              <DetailedDescription content={cause.description} />
              <TransparencyTrust partnerLogos={[]} />
              <FinalCallout 
                title="Ready to make a difference?"
                onDonate={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>
            
            <div className="lg:col-span-1">
              <CauseDetailsSidebar cause={cause} />
            </div>
          </div>
        </div>
        
        <StickyBottomBar cause={cause} />
      </div>
    </Layout>
  );
};

export default CauseDetails;
