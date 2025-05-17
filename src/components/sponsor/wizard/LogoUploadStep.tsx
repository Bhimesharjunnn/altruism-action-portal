
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface LogoUploadStepProps {
  formData: {
    logoUrl: string;
    message: string;
  };
  updateFormData: (data: Partial<typeof formData>) => void;
}

const LogoUploadStep = ({ formData, updateFormData }: LogoUploadStepProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(formData.logoUrl);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);

    // Simulate file upload
    setTimeout(() => {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      updateFormData({ logoUrl: imageUrl });
      setUploading(false);
      console.log("Image URL being set:", imageUrl);
    }, 1000);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({ message: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Logo Upload</h2>
      <p className="text-gray-600 mb-6">
        Upload your organization's logo to be displayed on the cause page and tote bags.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="space-y-4">
            <Label htmlFor="logoUpload">Upload Logo</Label>
            <div className="flex items-center gap-4">
              <Input
                id="logoUpload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button 
                variant="outline" 
                className="w-full h-32 border-dashed"
                onClick={() => document.getElementById('logoUpload')?.click()}
                disabled={uploading}
              >
                <div className="flex flex-col items-center text-gray-500">
                  <Upload className="h-8 w-8 mb-2" />
                  <span>{uploading ? 'Uploading...' : 'Click to upload logo'}</span>
                  <span className="text-xs mt-1">PNG, JPG, SVG (max 5MB)</span>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Any special requests or details about your sponsorship?"
              value={formData.message}
              onChange={handleMessageChange}
              rows={4}
            />
          </div>
        </div>
        
        <div>
          <Label className="block mb-4">Logo Preview</Label>
          <Card className="border-2 border-dashed border-gray-200">
            <CardContent className="flex items-center justify-center p-8 min-h-[200px]">
              {previewUrl ? (
                <div>
                  <p className="font-medium mb-2">Your logo on a tote:</p>
                  <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
                    <img 
                      src={previewUrl} 
                      alt="Logo Preview" 
                      className="max-h-32 max-w-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-center">
                  Your logo preview will appear here after upload
                </p>
              )}
            </CardContent>
          </Card>

          {previewUrl && (
            <div className="mt-4 text-sm text-gray-500">
              <p>This is how your logo will appear on sponsored totes and the cause page.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoUploadStep;
