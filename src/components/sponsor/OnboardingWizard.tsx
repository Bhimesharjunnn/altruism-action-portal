
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import CauseSelectionStep from './wizard/CauseSelectionStep';
import ToteQuantityStep from './wizard/ToteQuantityStep';
import LogoUploadStep from './wizard/LogoUploadStep';
import DistributionInfoStep from './wizard/DistributionInfoStep';
import ConfirmationStep from './wizard/ConfirmationStep';

interface OnboardingWizardProps {
  initialCauseId?: string | null;
  onComplete: (formData: any) => void;
  isSubmitting: boolean;
}

const OnboardingWizard = ({ 
  initialCauseId, 
  onComplete,
  isSubmitting
}: OnboardingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    selectedCause: initialCauseId || '',
    toteQuantity: 50,
    logoUrl: '',
    message: '',
    distributionType: undefined,
    campaignStartDate: undefined,
    campaignEndDate: undefined,
    selectedCities: [],
    distributionPoints: [],
    demographics: {
      ageGroups: [],
      income: '',
      education: '',
      other: '',
    },
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    onComplete(formData);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {currentStep === 1 && (
        <CauseSelectionStep 
          formData={formData} 
          updateFormData={updateFormData} 
        />
      )}

      {currentStep === 2 && (
        <ToteQuantityStep
          formData={formData}
          updateFormData={updateFormData}
        />
      )}

      {currentStep === 3 && (
        <LogoUploadStep
          formData={formData}
          updateFormData={updateFormData}
        />
      )}

      {currentStep === 4 && (
        <DistributionInfoStep
          formData={formData}
          updateFormData={updateFormData}
        />
      )}

      {currentStep === 5 && (
        <ConfirmationStep
          formData={formData}
        />
      )}

      <div className="flex justify-between mt-8 pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={prevStep}
          disabled={currentStep === 1 || isSubmitting}
        >
          Back
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={nextStep}>
            Continue
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Complete Sponsorship'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingWizard;
