
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SponsorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Mock data for sponsored causes
  const sponsoredCauses = [
    {
      id: '1',
      title: 'Clean Water Initiative',
      description: 'Providing clean drinking water to communities in need.',
      imageUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2d5d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      amount: 5000,
      status: 'active',
      date: '2025-03-15'
    },
    {
      id: '2',
      title: 'Children's Education Fund',
      description: 'Supporting education for underprivileged children worldwide.',
      imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      amount: 3500,
      status: 'pending',
      date: '2025-04-02'
    }
  ];
  
  // Mock data for impact reports
  const impactReports = [
    {
      id: '1',
      title: 'Q1 2025 Impact Report - Clean Water Initiative',
      causeTitle: 'Clean Water Initiative',
      date: 'March 31, 2025',
      highlights: [
        '3 water filtration systems installed',
        '1,200 people now have access to clean water',
        '2 training sessions conducted with local technicians'
      ]
    }
  ];

  return (
    <DashboardLayout 
      title="Sponsor Dashboard" 
      subtitle={`Welcome back, ${user?.name}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Contributed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$8,500</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Sponsorships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Sponsorships
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="sponsorships">
        <TabsList className="mb-6">
          <TabsTrigger value="sponsorships">My Sponsorships</TabsTrigger>
          <TabsTrigger value="impact">Impact Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sponsorships">
          <div className="space-y-6">
            {sponsoredCauses.map((cause) => (
              <Card key={cause.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                      <img 
                        src={cause.imageUrl} 
                        alt={cause.title} 
                        className="w-full h-32 object-cover rounded-md" 
                      />
                    </div>
                    <div className="md:w-3/4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{cause.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          cause.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {cause.status === 'active' ? 'Active' : 'Pending Approval'}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{cause.description}</p>
                      <div className="flex flex-wrap gap-6">
                        <div>
                          <p className="text-sm text-gray-500">Contribution Amount</p>
                          <p className="font-semibold">${cause.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-semibold">{new Date(cause.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex-grow"></div>
                        <Button 
                          variant="outline" 
                          onClick={() => navigate(`/cause/${cause.id}`)}
                        >
                          View Cause
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center pt-6">
              <Button onClick={() => navigate('/causes')}>
                Browse More Causes
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="impact">
          {impactReports.length > 0 ? (
            <div className="space-y-6">
              {impactReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle>{report.title}</CardTitle>
                    <p className="text-sm text-gray-500">
                      {report.causeTitle} - {report.date}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-2">Highlights:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {report.highlights.map((highlight, i) => (
                        <li key={i} className="text-gray-600">{highlight}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Download Full Report
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No reports yet</h3>
              <p className="text-gray-500 mb-6">Impact reports will be available once your sponsored causes begin implementation.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default SponsorDashboard;
