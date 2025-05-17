
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const ClaimStatusPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from location state
  const claimReference = location.state?.claimReference;
  const cause = location.state?.cause;
  const formData = location.state?.formData;
  
  // Mock status data - in reality would come from API
  const statusData = {
    status: 'processing',
    estimatedDelivery: '2-3 business days',
    lastUpdated: new Date().toLocaleDateString(),
    steps: [
      {
        label: 'Claim Submitted',
        date: new Date().toLocaleDateString(),
        completed: true,
        current: false
      },
      {
        label: 'Processing',
        date: new Date().toLocaleDateString(),
        completed: false,
        current: true
      },
      {
        label: 'Shipped',
        date: null,
        completed: false,
        current: false
      },
      {
        label: 'Delivered',
        date: null,
        completed: false,
        current: false
      }
    ]
  };

  return (
    <Layout>
      <div className="bg-primary-50 py-10">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/causes')} 
            className="mb-4"
          >
            &larr; Back to Causes
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Claim Status</h1>
          </div>
          <p className="text-lg text-gray-700 mb-2">
            Track your tote bag claim
          </p>
          <p className="text-gray-600">
            Reference: <span className="font-mono font-medium">{claimReference}</span>
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Shipping Status</h3>
                
                <div className="relative">
                  {/* Status Timeline */}
                  <div className="ml-6 border-l-2 border-gray-200 pb-6 pl-8 relative">
                    {statusData.steps.map((step, index) => (
                      <div key={index} className="mb-6 relative">
                        <div className={`absolute -left-10 mt-1.5 w-4 h-4 rounded-full ${
                          step.current ? "bg-primary border-2 border-primary-600" : 
                            step.completed ? "bg-green-500" : "bg-gray-300"
                        }`}></div>
                        <div>
                          <p className={`font-medium ${
                            step.current ? "text-primary" :
                              step.completed ? "text-green-700" : "text-gray-500"
                          }`}>
                            {step.label}
                          </p>
                          {step.date && (
                            <p className="text-sm text-gray-500">{step.date}</p>
                          )}
                          {step.current && (
                            <p className="text-sm text-primary-600 mt-1">In progress</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-gray-600">
                    <span className="font-medium">Estimated Delivery:</span> {statusData.estimatedDelivery}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Last updated: {statusData.lastUpdated}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Shipping Address</h4>
                  <p className="text-gray-700">
                    {formData?.fullName}<br />
                    {formData?.address}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Claim Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <img 
                      src={cause?.imageUrl} 
                      alt={cause?.title} 
                      className="w-full h-48 object-cover rounded-md mb-3" 
                    />
                    <h4 className="font-medium">{cause?.title}</h4>
                    <p className="text-sm text-gray-600">Sponsored by {cause?.sponsorName}</p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-4">
                      Have questions about your order? Contact support for assistance.
                    </p>
                    <Button variant="outline" className="w-full">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClaimStatusPage;
