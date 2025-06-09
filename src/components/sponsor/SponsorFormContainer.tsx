
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import OnboardingWizard from './OnboardingWizard';
import SponsorBenefits from './SponsorBenefits';

interface SponsorFormContainerProps {
  causeId: string | null;
}

const SponsorFormContainer: React.FC<SponsorFormContainerProps> = ({ causeId }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmitComplete = async (formData: any) => {
    setIsLoading(true);
    
    try {
      console.log('Submitting sponsor form data:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sponsorship Request Submitted",
        description: "Thank you for your sponsorship! You'll be redirected to your dashboard.",
      });
      
      navigate('/dashboard/sponsor');
    } catch (error) {
      console.error('Error submitting sponsorship:', error);
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
          <SponsorBenefits />
        </div>
      </div>
    </div>
  );
};

export default SponsorFormContainer;
