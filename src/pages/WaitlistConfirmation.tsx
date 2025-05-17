
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const WaitlistConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get form data from location state
  const formData = location.state?.formData;
  const cause = location.state?.cause;
  
  // Generate a waitlist reference number
  const waitlistReference = `WL-${Math.floor(100000 + Math.random() * 900000)}`;

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
          
          <h1 className="text-3xl font-bold mb-2">Waitlist Confirmed</h1>
          <p className="text-lg text-gray-700 mb-6">
            You've been added to the waitlist
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              You're on the Waitlist!
            </h2>
            <p className="text-blue-700 mb-6">
              We'll notify you when {cause?.title} is available for claiming.
            </p>
            
            <div className="bg-white rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-1">Waitlist Reference</p>
              <p className="text-xl font-mono font-semibold">{waitlistReference}</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-left border-t border-blue-200 pt-4">
                <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
                <ol className="list-decimal list-inside text-sm text-blue-700 space-y-2">
                  <li>You're now on the waitlist for this cause</li>
                  <li>We'll email you at {formData?.email} when spots open up</li>
                  <li>You'll be able to claim your tote when notified</li>
                  <li>Your position on the waitlist is secured</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
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

export default WaitlistConfirmationPage;
