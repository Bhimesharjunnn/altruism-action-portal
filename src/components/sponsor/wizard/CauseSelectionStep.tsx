
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CauseSelectionStepProps {
  formData: {
    organizationName: string;
    contactName: string;
    email: string;
    phone: string;
    selectedCause: string;
  };
  updateFormData: (data: Partial<{
    organizationName: string;
    contactName: string;
    email: string;
    phone: string;
    selectedCause: string;
  }>) => void;
}

const CauseSelectionStep = ({ formData, updateFormData }: CauseSelectionStepProps) => {
  // Mock causes data (would fetch from API)
  const causes = [
    { id: '1', title: 'Clean Water Initiative' },
    { id: '2', title: "Children's Education Fund" },
    { id: '3', title: 'Women Entrepreneurs' },
    { id: '4', title: 'Wildlife Conservation' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSelectChange = (value: string) => {
    updateFormData({ selectedCause: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Organization Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="organizationName">Organization Name</Label>
          <Input
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact Name</Label>
          <Input
            id="contactName"
            name="contactName"
            value={formData.contactName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="space-y-2 mt-6">
        <h3 className="text-lg font-semibold mb-2">Select a Cause to Sponsor</h3>
        <div className="space-y-2">
          <Label htmlFor="selectedCause">Choose a Cause</Label>
          <Select 
            value={formData.selectedCause} 
            onValueChange={handleSelectChange}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a cause" />
            </SelectTrigger>
            <SelectContent>
              {causes.map((cause) => (
                <SelectItem key={cause.id} value={cause.id}>
                  {cause.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {formData.selectedCause && (
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-1">Selected Cause:</h4>
            <Card className="bg-primary-50">
              <CardContent className="p-4">
                <p className="font-semibold">{causes.find(c => c.id === formData.selectedCause)?.title}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CauseSelectionStep;
