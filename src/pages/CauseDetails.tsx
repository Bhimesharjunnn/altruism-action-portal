import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

const CauseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock cause data (would be fetched from API using the id)
  const cause = {
    id: id,
    title: 'Clean Water Initiative',
    description: 'Providing clean drinking water to communities in need.',
    story: `<p class="mb-4">Access to clean water is a fundamental human right, yet millions around the world lack access to this basic necessity. The Clean Water Initiative focuses on bringing sustainable clean water solutions to communities facing water scarcity and contamination issues.</p>
            <p class="mb-4">Our approach combines innovative water purification technology with community engagement and education programs. This ensures not only immediate access to clean water but also long-term sustainability of the projects.</p>
            <p class="mb-4">By sponsoring this cause, you'll be directly contributing to:</p>
            <ul class="list-disc pl-5 mb-4">
              <li>Installation of water filtration systems in 5 communities</li>
              <li>Well construction in areas with limited groundwater access</li>
              <li>Training of local technicians for system maintenance</li>
              <li>Education programs on water conservation and hygiene</li>
            </ul>
            <p>Your support will help us reach our goal of providing clean water to over 10,000 people this year.</p>`,
    imageUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2d5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    raised: 12500,
    goal: 25000,
    category: 'Environment',
    status: 'open',
    location: 'Multiple Regions, East Africa',
    organizer: {
      name: 'Water For All Foundation',
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    sponsors: [
      { 
        id: '1', 
        name: 'EcoSolutions Inc.', 
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        amount: 5000
      },
      { 
        id: '2', 
        name: 'Green Future Fund', 
        logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
        amount: 3500
      }
    ],
    timeline: [
      {
        date: 'January 2025',
        milestone: 'Project Kickoff',
        description: 'Initial assessment and community engagement'
      },
      {
        date: 'March 2025',
        milestone: 'Phase 1 Implementation',
        description: 'First two water systems installed'
      },
      {
        date: 'June 2025',
        milestone: 'Education Program Launch',
        description: 'Community training on maintenance and hygiene'
      },
      {
        date: 'September 2025',
        milestone: 'Phase 2 Implementation',
        description: 'Remaining systems installed'
      },
      {
        date: 'December 2025',
        milestone: 'Project Completion',
        description: 'Final assessment and handover to community'
      }
    ],
    impact: {
      people: 10000,
      communities: 5,
      description: 'This project will provide clean water to 10,000 people across 5 communities, reducing waterborne diseases by an estimated 80% and saving an average of 3 hours daily spent collecting water.'
    }
  };

  const handleAction = () => {
    if (cause.status === 'open') {
      navigate(`/sponsor/new?causeId=${id}`);
    } else if (cause.status === 'sponsored') {
      navigate(`/claim/${id}`);
    } else if (cause.status === 'waitlist') {
      navigate(`/waitlist/${id}`);
    }
  };

  const getActionButton = () => {
    switch(cause.status) {
      case 'open':
        return (
          <Button onClick={handleAction} size="lg" className="w-full">
            Sponsor This Cause
          </Button>
        );
      case 'sponsored':
        return (
          <Button onClick={handleAction} variant="secondary" size="lg" className="w-full">
            Claim Tote
          </Button>
        );
      case 'waitlist':
        return (
          <Button onClick={handleAction} variant="outline" size="lg" className="w-full">
            Join Waitlist
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-primary-50">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/causes')} 
            className="mb-4"
          >
            &larr; Back to Causes
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <img 
                src={cause.imageUrl} 
                alt={cause.title} 
                className="w-full rounded-lg shadow-md object-cover aspect-video" 
              />
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                      {cause.category}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-2">{cause.title}</h1>
                  <p className="text-gray-600 mb-6">{cause.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">Progress</span>
                      <span>{Math.round((cause.raised / cause.goal) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${(cause.raised / cause.goal) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-gray-600">
                        ${cause.raised.toLocaleString()} raised
                      </span>
                      <span className="text-gray-600">
                        ${cause.goal.toLocaleString()} goal
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Organized By:</h3>
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={cause.organizer.logo} alt={cause.organizer.name} />
                        <AvatarFallback>{cause.organizer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{cause.organizer.name}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Location:</h3>
                    <p className="text-gray-600">{cause.location}</p>
                  </div>
                  
                  {getActionButton()}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="story" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="story" className="mt-0">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: cause.story }} />
          </TabsContent>
          
          <TabsContent value="impact" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-4xl font-bold text-primary-600 mb-2">
                    {cause.impact.people.toLocaleString()}
                  </h3>
                  <p className="text-gray-600">People Impacted</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-4xl font-bold text-primary-600 mb-2">
                    {cause.impact.communities}
                  </h3>
                  <p className="text-gray-600">Communities Served</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="text-4xl font-bold text-primary-600 mb-2">
                    80%
                  </h3>
                  <p className="text-gray-600">Reduction in Disease</p>
                </CardContent>
              </Card>
            </div>
            
            <p className="text-lg">{cause.impact.description}</p>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-0">
            <div className="relative border-l-2 border-primary-200 pl-6 ml-6">
              {cause.timeline.map((item, index) => (
                <div key={index} className="mb-8 relative">
                  <div className="absolute -left-10 mt-1 w-4 h-4 bg-primary-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold">{item.milestone}</h3>
                  <p className="text-primary-600 font-medium mb-1">{item.date}</p>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sponsors" className="mt-0">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Current Sponsors</h3>
              {cause.sponsors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cause.sponsors.map((sponsor) => (
                    <Card key={sponsor.id}>
                      <CardContent className="p-4 flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={sponsor.logo} alt={sponsor.name} />
                          <AvatarFallback>{sponsor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{sponsor.name}</h4>
                          <p className="text-sm text-gray-600">
                            Contributed ${sponsor.amount.toLocaleString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p>This cause is currently seeking its first sponsors.</p>
              )}
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Become a Sponsor</h3>
              <p className="text-gray-600 mb-4">
                Your organization can make a meaningful difference by sponsoring this cause.
              </p>
              <Button onClick={() => navigate(`/sponsor/new?causeId=${id}`)}>
                Sponsor This Cause
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CauseDetailsPage;
