
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCause } from '@/services/apiServices';
import { Card, CardContent } from '@/components/ui/card';
import HeroSection from '@/components/cause-details/HeroSection';
import CauseDetailsBreadcrumb from '@/components/cause-details/CauseDetailsBreadcrumb';
import CauseDetailsHeader from '@/components/cause-details/CauseDetailsHeader';
import CauseImageAndStory from '@/components/cause-details/CauseImageAndStory';
import CauseDetailsSidebar from '@/components/cause-details/CauseDetailsSidebar';

const CauseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: cause, isLoading, error } = useQuery({
    queryKey: ['cause', id],
    queryFn: () => fetchCause(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading cause details...</div>
      </div>
    );
  }

  if (error || !cause) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">
          {error ? 'Error loading cause details' : 'Cause not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection 
        title={cause.title}
        imageUrl={cause.imageUrl}
        id={cause._id || ''}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CauseDetailsBreadcrumb causeTitle={cause.title} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CauseDetailsHeader 
              title={cause.title}
              description={cause.description}
            />
            
            <Card>
              <CardContent className="p-6">
                <CauseImageAndStory 
                  title={cause.title}
                  story={cause.story}
                  imageUrl={cause.imageUrl}
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Detailed Description</h3>
                <p className="text-gray-600 leading-relaxed">{cause.story}</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <CauseDetailsSidebar 
              goal={cause.goal}
              raised={cause.raised}
              sponsors={cause.sponsors}
              status={cause.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CauseDetailsPage;
