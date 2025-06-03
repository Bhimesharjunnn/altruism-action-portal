
import React from 'react';
import EnhancedDistributionInfoStep from './EnhancedDistributionInfoStep';

interface DistributionInfoStepProps {
  formData: {
    distributionType?: 'online' | 'physical';
    campaignStartDate?: Date;
    campaignEndDate?: Date;
    selectedCities?: string[];
    distributionPoints?: {
      [city: string]: {
        malls: { name: string; totes: number; selected: boolean }[];
        parks: { name: string; totes: number; selected: boolean }[];
        theatres: { name: string; totes: number; selected: boolean }[];
        metroStations: { name: string; totes: number; selected: boolean }[];
        schools: { name: string; totes: number; selected: boolean }[];
      };
    };
  };
  updateFormData: (data: Partial<any>) => void;
}

const DistributionInfoStep: React.FC<DistributionInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <EnhancedDistributionInfoStep 
      formData={formData}
      updateFormData={updateFormData}
    />
  );
};

export default DistributionInfoStep;
