import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Mock data for pending causes
  const pendingCauses = [
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
  const pendingSponsors = [
    {
      id: '2',
      sponsor: 'Green Future Fund',
      cause: "Children's Education Fund",
      amount: 3500,
      date: '2025-04-02'
    }
  ];

  const handleApprove = (itemId: string, type: 'cause' | 'sponsor') => {
    // This would normally call an API endpoint
    toast({
      title: `${type === 'cause' ? 'Cause' : 'Sponsorship'} Approved`,
      description: `The ${type} has been successfully approved.`
    });
  };
  
  const handleReject = (itemId: string, type: 'cause' | 'sponsor') => {
    // This would normally call an API endpoint
    toast({
      title: `${type === 'cause' ? 'Cause' : 'Sponsorship'} Rejected`,
      description: `The ${type} has been rejected.`
    });
  };

  return (
    <DashboardLayout 
      title="Admin Dashboard" 
      subtitle={`Welcome back, ${user?.name}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Causes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Sponsors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Raised
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$14,500</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="pending-causes">
        <TabsList className="mb-6">
          <TabsTrigger value="pending-causes">Pending Causes</TabsTrigger>
          <TabsTrigger value="pending-sponsors">Pending Sponsorships</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending-causes">
          <div className="space-y-4">
            {pendingCauses.map((cause) => (
              <Card key={cause.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{cause.title}</h3>
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                          Pending Review
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{cause.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Creator</p>
                          <p className="font-medium">{cause.createdBy}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-medium">{cause.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Submitted</p>
                          <p className="font-medium">{new Date(cause.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 md:flex-col w-full md:w-auto md:min-w-[120px] mt-4 md:mt-0">
                      <Button 
                        onClick={() => handleApprove(cause.id, 'cause')} 
                        className="flex-1 md:flex-grow-0"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleReject(cause.id, 'cause')}
                        variant="outline" 
                        className="flex-1 md:flex-grow-0"
                      >
                        Reject
                      </Button>
                      <Button 
                        onClick={() => navigate(`/admin/cause/${cause.id}`)}
                        variant="ghost" 
                        className="flex-1 md:flex-grow-0"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {pendingCauses.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No pending causes</h3>
                <p className="text-gray-500">All causes have been reviewed.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="pending-sponsors">
          <div className="space-y-4">
            {pendingSponsors.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">
                          {item.sponsor} &rarr; {item.cause}
                        </h3>
                        <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                          Pending Review
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Sponsor</p>
                          <p className="font-medium">{item.sponsor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="font-medium">${item.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Submitted</p>
                          <p className="font-medium">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 md:flex-col w-full md:w-auto md:min-w-[120px] mt-4 md:mt-0">
                      <Button 
                        onClick={() => handleApprove(item.id, 'sponsor')} 
                        className="flex-1 md:flex-grow-0"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleReject(item.id, 'sponsor')}
                        variant="outline" 
                        className="flex-1 md:flex-grow-0"
                      >
                        Reject
                      </Button>
                      <Button 
                        onClick={() => navigate(`/admin/sponsor/${item.id}`)}
                        variant="ghost" 
                        className="flex-1 md:flex-grow-0"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {pendingSponsors.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No pending sponsorships</h3>
                <p className="text-gray-500">All sponsorships have been reviewed.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminDashboard;
