
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { fetchStories } from '@/services/apiServices';
import { Skeleton } from '@/components/ui/skeleton';

const Stories = () => {
  const { data: stories, isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: fetchStories
  });

  return (
    <Layout>
      <main className="max-w-5xl mx-auto py-16 px-4 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600">
          <Link to="/">Home</Link> &gt; Stories
        </nav>

        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Stories of Impact</h1>
          <p className="text-lg text-gray-700">
            Real experiences from claimers and sponsors—see how CauseConnect makes a difference.
          </p>
          <Button asChild>
            <Link to="/stories/submit">
              <MessageCircle className="mr-2" /> Share Your Story
            </Link>
          </Button>
        </section>

        {/* Aims & Objectives */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Aims & Objectives</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Aim:</strong> Spotlight real-world impact from our community of sponsors and claimers.</li>
            <li><strong>Objective 1:</strong> Publish 50+ authentic impact stories in the first year.</li>
            <li><strong>Objective 2:</strong> Inspire new users by showcasing measurable outcomes.</li>
            <li><strong>Objective 3:</strong> Foster a feedback loop between claimers, sponsors, and admins.</li>
            <li><strong>Objective 4:</strong> Drive engagement by enabling story submissions and shares.</li>
          </ul>
        </section>

        {/* Stories Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(null).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <CardContent className="space-y-3 p-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            stories?.map(story => (
              <Card key={story.id} className="hover:shadow-lg overflow-hidden">
                <div className="h-40 overflow-hidden">
                  {story.imageUrl && (
                    <img 
                      src={story.imageUrl} 
                      alt={story.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105" 
                    />
                  )}
                </div>
                <CardContent className="space-y-3 p-4">
                  <h3 className="text-xl font-semibold">{story.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{story.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">By {story.authorName}</span>
                    <Button variant="link" size="sm" className="p-0">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )) || []
          )}
        </section>
      </main>
    </Layout>
  );
};

export default Stories;
