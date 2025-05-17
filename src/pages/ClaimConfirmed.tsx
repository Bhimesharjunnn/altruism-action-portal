
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const ClaimConfirmedPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from location state
  const formData = location.state?.formData;
  const cause = location.state?.cause;
  
  // Generate a claim reference number
  const claimReference = `CLM-${Math.floor(100000 + Math.random() * 900000)}`;

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
          
          <h1 className="text-3xl font-bold mb-2">Claim Confirmed</h1>
          <p className="text-lg text-gray-700 mb-6">
            Your tote claim has been successfully processed
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Thank You for Your Claim!
            </h2>
            <p className="text-green-700 mb-6">
              Your tote claim for {cause?.title} has been confirmed.
            </p>
            
            <div className="bg-white rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Claim Reference</p>
              <p className="text-xl font-mono font-semibold">{claimReference}</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-left border-t border-green-200 pt-4">
                <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
                <ol className="list-decimal list-inside text-sm text-green-700 space-y-2">
                  <li>Your tote claim is now being processed</li>
                  <li>You'll receive a confirmation email at {formData?.email}</li>
                  <li>The tote will be prepared for delivery or pickup</li>
                  <li>You can track your claim status on your status page</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => navigate(`/claim/${id}/status`, { 
              state: { 
                claimReference,
                cause,
                formData
              } 
            })} 
            className="flex-1"
          >
            View Status
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/causes')} 
            className="flex-1"
          >
            Browse More Causes
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ClaimConfirmedPage;
