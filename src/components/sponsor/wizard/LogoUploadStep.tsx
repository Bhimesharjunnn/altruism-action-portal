
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface LogoUploadStepProps {
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

const LogoUploadStep: React.FC<LogoUploadStepProps> = ({ formData, updateFormData }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setIsUploading(true);
      
      // In a real app, this would upload the file to a server
      // Here we'll simulate that with a timeout and a data URL
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
          updateFormData({ logoUrl: event.target?.result as string });
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ message: e.target.value });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Logo & Additional Information</h2>
      
      <div className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="logo-upload">Organization Logo</Label>
          <div className="mt-1">
            <div className="flex items-center">
              <Label 
                htmlFor="logo-upload" 
                className="relative flex cursor-pointer rounded-md bg-white font-medium text-primary hover:text-primary-600 focus-within:outline-none"
              >
                <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors">
                  {formData.logoUrl ? (
                    <img
                      src={formData.logoUrl}
                      alt="Logo preview"
                      className="object-contain h-28 w-full rounded"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center py-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="mt-2 text-sm text-gray-500">
                        {isUploading ? "Uploading..." : "Upload logo"}
                      </span>
                    </div>
                  )}
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </div>
              </Label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              PNG, JPG or SVG (max. 2MB). This logo will appear on the tote bags.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Additional Information (Optional)</Label>
          <Textarea
            id="message"
            placeholder="Any special requests or information you'd like to provide?"
            value={formData.message}
            onChange={handleMessageChange}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default LogoUploadStep;
