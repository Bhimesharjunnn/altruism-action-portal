
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface ToteQuantityStepProps {
  formData: {
    organizationName: string;
    contactName: string;
    email: string;
    phone: string;
    selectedCause: string;
    toteQuantity: number;
    logoUrl: string;
    message: string;
  };
  updateFormData: (data: Partial<{
    organizationName: string;
    contactName: string;
    email: string;
    phone: string;
    selectedCause: string;
    toteQuantity: number;
    logoUrl: string;
    message: string;
  }>) => void;
}

const ToteQuantityStep: React.FC<ToteQuantityStepProps> = ({ formData, updateFormData }) => {
  const handleToteQuantityChange = (value: number[]) => {
    updateFormData({ toteQuantity: value[0] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 50) {
      updateFormData({ toteQuantity: value });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Select Tote Quantity</h2>
      
      <div className="space-y-8">
        <div className="space-y-2">
          <label className="text-lg font-medium">Tote Quantity (minimum 50)</label>
          <div className="flex items-center space-x-4">
            <Slider
              value={[formData.toteQuantity]}
              min={50}
              max={500}
              step={10}
              onValueChange={handleToteQuantityChange}
              className="flex-1"
            />
            <Input
              type="number"
              min={50}
              value={formData.toteQuantity}
              onChange={handleInputChange}
              className="w-24"
            />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h3 className="font-medium">Order Summary</h3>
          <div className="flex justify-between">
            <span>Tote Quantity:</span>
            <span className="font-medium">{formData.toteQuantity}</span>
          </div>
          <div className="flex justify-between">
            <span>Price per Tote:</span>
            <span className="font-medium">$10.00</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-medium">Total Contribution:</span>
            <span className="font-medium">${(formData.toteQuantity * 10).toLocaleString()}.00</span>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            Your sponsorship helps fund the cause and provides your organization with
            branded tote bags. The minimum order is 50 totes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToteQuantityStep;
