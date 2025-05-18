
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  BarChart, 
  TrendingUp, 
  Package, 
  Clock, 
  CheckCircle2,
  XCircle,
  Eye,
  Download,
  RefreshCcw,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
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
  
  // Mock data for claims
  const recentClaims = [
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

  const handleApprove = (itemId: string, type: 'cause' | 'sponsor' | 'claim') => {
    // This would normally call an API endpoint
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Approved`,
      description: `The ${type} has been successfully approved.`
    });
  };
  
  const handleReject = (itemId: string, type: 'cause' | 'sponsor' | 'claim') => {
    // This would normally call an API endpoint
    toast({
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Rejected`,
      description: `The ${type} has been rejected.`
    });
  };
  
  const handleToggleCampaignStatus = (causeId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    // This would normally call an API endpoint
    toast({
      title: `Campaign Status Updated`,
      description: `Campaign is now ${newStatus ? 'online' : 'offline'}.`
    });
  };
  
  const handleForceCloseClaims = (causeId: string) => {
    // This would normally call an API endpoint
    toast({
      title: `Claims Closed`,
      description: `All claims for this cause have been closed as it reached the tote limit.`
    });
  };

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      subtitle="Manage campaigns, claims, and system analytics"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Causes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">6</div>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-xs text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+2 this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Sponsors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">2</div>
              <BarChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              No change this week
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Raised
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">$14,500</div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-xs text-green-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+$3,500 this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">6</div>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-xs text-amber-600 mt-1 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              <span>3 require immediate review</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="pending-causes">
        <TabsList className="mb-6">
          <TabsTrigger value="pending-causes">Pending Causes</TabsTrigger>
          <TabsTrigger value="pending-sponsors">Pending Sponsorships</TabsTrigger>
          <TabsTrigger value="recent-claims">Recent Claims</TabsTrigger>
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
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1"
                          onClick={() => handleToggleCampaignStatus(cause.id, false)}
                        >
                          <Eye className="h-3 w-3" />
                          Toggle Online/Offline
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1 text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleForceCloseClaims(cause.id)}
                        >
                          <XCircle className="h-3 w-3" />
                          Force-close Claims
                        </Button>
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
        
        <TabsContent value="recent-claims">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Claims</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                Export
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <RefreshCcw className="h-3 w-3" />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {recentClaims.map((claim) => (
              <Card key={claim.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{claim.cause}</h3>
                        <Badge 
                          variant="outline" 
                          className={
                            claim.status === 'pending' 
                              ? 'bg-orange-100 text-orange-800 hover:bg-orange-100' 
                              : claim.status === 'verified'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                          }
                        >
                          {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Claimer</p>
                          <p className="font-medium">{claim.claimerName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Organization</p>
                          <p className="font-medium">{claim.organization}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium">{new Date(claim.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Mark as Picked Up
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 md:flex-col w-full md:w-auto md:min-w-[120px] mt-4 md:mt-0">
                      {claim.status === 'pending' && (
                        <Button 
                          onClick={() => handleApprove(claim.id, 'claim')} 
                          className="flex-1 md:flex-grow-0"
                        >
                          Verify
                        </Button>
                      )}
                      <Button 
                        onClick={() => navigate(`/admin/claim/${claim.id}`)}
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
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
