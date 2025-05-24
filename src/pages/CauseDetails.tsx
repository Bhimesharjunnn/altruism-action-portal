import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCause } from '@/services/apiServices';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from "@/components/ui/separator"
import CauseDetailsBreadcrumb from '@/components/cause-details/CauseDetailsBreadcrumb';
import CauseDetailsHeader from '@/components/cause-details/CauseDetailsHeader';
import CauseImageAndStory from '@/components/cause-details/CauseImageAndStory';
import CauseDetailsSidebar from '@/components/cause-details/CauseDetailsSidebar';

const CauseDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: cause, isLoading, isError } = useQuery({
    queryKey: ['cause', id],
    queryFn: () => fetchCause(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <main className="container mx-auto py-16 px-4">
          <section className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </section>
          <Separator className="my-6" />
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <Skeleton className="h-64 w-full" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="md:col-span-1 space-y-4">
              <Card>
                <CardContent className="space-y-3">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-3">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </Layout>
    );
  }

  if (isError || !cause) {
    return (
      <Layout>
        <main className="container mx-auto py-16 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p>Failed to load cause details.</p>
            <Link to="/causes" className="text-blue-500">Go back to causes</Link>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="container mx-auto py-16 px-4">
        <CauseDetailsBreadcrumb causeTitle={cause.title} />
        
        <CauseDetailsHeader 
          title={cause.title} 
          description={cause.description} 
        />

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CauseImageAndStory
            imageUrl={cause.imageUrl}
            title={cause.title}
            story={cause.story}
          />
          
          <CauseDetailsSidebar cause={cause} />
        </div>
      </main>
    </Layout>
  );
};

export default CauseDetails;
