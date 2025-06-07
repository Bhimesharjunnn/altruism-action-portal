
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import LogoUploadSection from './logo-upload/LogoUploadSection';
import MessageSection from './logo-upload/MessageSection';
import CausePreviewCanvas from './logo-upload/CausePreviewCanvas';
import FinalPreviewCanvas from './logo-upload/FinalPreviewCanvas';

interface LogoUploadStepProps {
  formData: {
    selectedCause: string;
    logoUrl: string;
    message: string;
    finalMockupUrl?: string;
    logoTransform?: { x: number; y: number; scale: number };
  };
  updateFormData: (data: Partial<{
    logoUrl: string;
    message: string;
    finalMockupUrl: string;
    logoTransform: { x: number; y: number; scale: number };
  }>) => void;
}

// Mock data - in real app, fetch from API
const mockCauseData = {
  '1': {
    adminImageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    totebagTemplateUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    status: 'sponsored',
    imageReady: true
  },
  '2': {
    adminImageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    totebagTemplateUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    status: 'sponsored',
    imageReady: true
  },
  '3': {
    adminImageUrl: null,
    totebagTemplateUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    status: 'open',
    imageReady: false
  }
};

const LogoUploadStep = ({ formData, updateFormData }: LogoUploadStepProps) => {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string>(formData.logoUrl);
  const [uploading, setUploading] = useState(false);
  const [logoTransform, setLogoTransform] = useState(formData.logoTransform || { x: 50, y: 50, scale: 0.3 });
  const [causeData, setCauseData] = useState<any>(null);

  useEffect(() => {
    // Fetch cause data on mount
    const data = mockCauseData[formData.selectedCause as keyof typeof mockCauseData];
    setCauseData(data);
  }, [formData.selectedCause]);

  const validateImageFile = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!file.type.match(/^image\/(png|jpeg|jpg|svg)$/)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PNG, JPEG, or SVG image",
          variant: "destructive"
        });
        resolve(false);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Image must be smaller than 5MB",
          variant: "destructive"
        });
        resolve(false);
        return;
      }

      resolve(true);
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);

    validateImageFile(file).then((isValid) => {
      if (isValid) {
        const imageUrl = URL.createObjectURL(file);
        setLogoPreview(imageUrl);
        updateFormData({ logoUrl: imageUrl });
      }
      setUploading(false);
    });
  };

  const handleLogoTransformChange = (newTransform: { x: number; y: number; scale: number }) => {
    setLogoTransform(newTransform);
  };

  const resetLogoPosition = () => {
    setLogoTransform({ x: 50, y: 50, scale: 0.3 });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ message: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Logo Upload & Mockup Preview</h2>
      
      <LogoUploadSection
        uploading={uploading}
        onLogoUpload={handleLogoUpload}
      />

      <MessageSection
        message={formData.message}
        onMessageChange={handleMessageChange}
      />

      {/* Mockup Preview Section */}
      {causeData ? (
        causeData.imageReady && causeData.adminImageUrl ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CausePreviewCanvas causeData={causeData} />
            <FinalPreviewCanvas
              causeData={causeData}
              logoPreview={logoPreview}
              logoTransform={logoTransform}
              onLogoTransformChange={handleLogoTransformChange}
              onResetLogoPosition={resetLogoPosition}
              onUpdateFormData={updateFormData}
            />
          </div>
        ) : (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Cause artwork pending admin upload. The mockup preview will be available once the admin uploads the cause image for this campaign.
            </AlertDescription>
          </Alert>
        )
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">
              Loading cause data...
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LogoUploadStep;
