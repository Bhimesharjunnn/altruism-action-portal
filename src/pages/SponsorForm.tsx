
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import OnboardingWizard from '@/components/sponsor/OnboardingWizard';

const SponsorFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const causeId = searchParams.get('causeId');
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmitComplete = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sponsorship Request Submitted",
        description: "Thank you for your sponsorship! You'll be redirected to your dashboard.",
      });
      
      navigate('/dashboard/sponsor');
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-primary-50 py-10">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-4"
          >
            &larr; Back
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Become a Sponsor</h1>
          <p className="text-lg text-gray-700 mb-6">
            Complete our simple wizard to start your sponsorship journey
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <OnboardingWizard 
                  initialCauseId={causeId} 
                  onComplete={handleSubmitComplete}
                  isSubmitting={isLoading}
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Sponsorship Benefits</h2>
                <ul className="space-y-3">
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Logo placement on cause page</span>
                  </li>
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Branded impact reporting</span>
                  </li>
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Social media recognition</span>
                  </li>
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Impact certificates</span>
                  </li>
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Employee engagement opportunities</span>
                  </li>
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Custom QR code for your totes</span>
                  </li>
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Real-time analytics dashboard</span>
                  </li>
                </ul>
                
                <div className="border-t mt-6 pt-6">
                  <h3 className="font-semibold mb-2">Have questions?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our team is here to help you find the perfect cause for your organization.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => window.location.href = 'mailto:support@causeconnect.org'}>
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SponsorFormPage;
