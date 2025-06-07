
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface LogoUploadSectionProps {
  uploading: boolean;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LogoUploadSection = ({ uploading, onLogoUpload }: LogoUploadSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Your Logo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="logoUpload">Upload Logo</Label>
          <Input
            id="logoUpload"
            type="file"
            accept="image/*"
            onChange={onLogoUpload}
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
              <span className="text-xs mt-1">PNG, JPG, SVG (transparent background recommended)</span>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoUploadSection;
