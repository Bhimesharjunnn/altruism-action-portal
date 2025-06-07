
import React, { useState, useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, AlertCircle, Move, RotateCcw, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [causeData, setCauseData] = useState<any>(null);
  
  const causeCanvasRef = useRef<HTMLCanvasElement>(null);
  const finalCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Fetch cause data on mount
    const data = mockCauseData[formData.selectedCause as keyof typeof mockCauseData];
    setCauseData(data);
  }, [formData.selectedCause]);

  useEffect(() => {
    if (causeData?.imageReady && causeData?.adminImageUrl && causeCanvasRef.current) {
      renderCauseCanvas();
    }
  }, [causeData]);

  useEffect(() => {
    if (causeData?.imageReady && causeData?.adminImageUrl && logoPreview && finalCanvasRef.current) {
      renderFinalCanvas();
    }
  }, [causeData, logoPreview, logoTransform]);

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

  const renderCauseCanvas = () => {
    const canvas = causeCanvasRef.current;
    if (!canvas || !causeData?.adminImageUrl) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const toteBag = new Image();
    toteBag.crossOrigin = 'anonymous';
    toteBag.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, 400, 400);
      
      // Draw tote bag template
      ctx.drawImage(toteBag, 0, 0, 400, 400);
      
      // Draw admin cause image
      const causeImg = new Image();
      causeImg.crossOrigin = 'anonymous';
      causeImg.onload = () => {
        // Define placeholder rectangle (adjust based on template)
        const placeholderX = 100;
        const placeholderY = 150;
        const placeholderWidth = 200;
        const placeholderHeight = 150;
        
        // Calculate aspect ratio and fit image
        const imgAspect = causeImg.width / causeImg.height;
        const placeholderAspect = placeholderWidth / placeholderHeight;
        
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imgAspect > placeholderAspect) {
          drawHeight = placeholderHeight;
          drawWidth = drawHeight * imgAspect;
          drawX = placeholderX - (drawWidth - placeholderWidth) / 2;
          drawY = placeholderY;
        } else {
          drawWidth = placeholderWidth;
          drawHeight = drawWidth / imgAspect;
          drawX = placeholderX;
          drawY = placeholderY - (drawHeight - placeholderHeight) / 2;
        }
        
        ctx.save();
        ctx.beginPath();
        ctx.rect(placeholderX, placeholderY, placeholderWidth, placeholderHeight);
        ctx.clip();
        ctx.drawImage(causeImg, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
      };
      causeImg.src = causeData.adminImageUrl;
    };
    toteBag.src = causeData.totebagTemplateUrl;
  };

  const renderFinalCanvas = () => {
    const canvas = finalCanvasRef.current;
    if (!canvas || !causeData?.adminImageUrl || !logoPreview) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const toteBag = new Image();
    toteBag.crossOrigin = 'anonymous';
    toteBag.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, 400, 400);
      
      // Draw tote bag template
      ctx.drawImage(toteBag, 0, 0, 400, 400);
      
      // Draw cause image
      const causeImg = new Image();
      causeImg.crossOrigin = 'anonymous';
      causeImg.onload = () => {
        const placeholderX = 100;
        const placeholderY = 150;
        const placeholderWidth = 200;
        const placeholderHeight = 150;
        
        const imgAspect = causeImg.width / causeImg.height;
        const placeholderAspect = placeholderWidth / placeholderHeight;
        
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imgAspect > placeholderAspect) {
          drawHeight = placeholderHeight;
          drawWidth = drawHeight * imgAspect;
          drawX = placeholderX - (drawWidth - placeholderWidth) / 2;
          drawY = placeholderY;
        } else {
          drawWidth = placeholderWidth;
          drawHeight = drawWidth / imgAspect;
          drawX = placeholderX;
          drawY = placeholderY - (drawHeight - placeholderHeight) / 2;
        }
        
        ctx.save();
        ctx.beginPath();
        ctx.rect(placeholderX, placeholderY, placeholderWidth, placeholderHeight);
        ctx.clip();
        ctx.drawImage(causeImg, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
        
        // Draw logo
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.onload = () => {
          const logoWidth = 400 * logoTransform.scale;
          const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
          const logoX = (logoTransform.x / 100) * 400 - logoWidth / 2;
          const logoY = (logoTransform.y / 100) * 400 - logoHeight / 2;
          
          ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
          
          // Export final mockup
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              updateFormData({ finalMockupUrl: url, logoTransform });
            }
          });
        };
        logoImg.src = logoPreview;
      };
      causeImg.src = causeData.adminImageUrl;
    };
    toteBag.src = causeData.totebagTemplateUrl;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!logoPreview) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setLogoTransform(prev => ({
      ...prev,
      x: Math.max(0, Math.min(100, prev.x + (deltaX / 4))),
      y: Math.max(0, Math.min(100, prev.y + (deltaY / 4)))
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!logoPreview) return;
    
    switch (e.key) {
      case 'ArrowLeft':
        setLogoTransform(prev => ({ ...prev, x: Math.max(0, prev.x - 1) }));
        break;
      case 'ArrowRight':
        setLogoTransform(prev => ({ ...prev, x: Math.min(100, prev.x + 1) }));
        break;
      case 'ArrowUp':
        setLogoTransform(prev => ({ ...prev, y: Math.max(0, prev.y - 1) }));
        break;
      case 'ArrowDown':
        setLogoTransform(prev => ({ ...prev, y: Math.min(100, prev.y + 1) }));
        break;
      case '+':
      case '=':
        setLogoTransform(prev => ({ ...prev, scale: Math.min(1, prev.scale + 0.05) }));
        break;
      case '-':
        setLogoTransform(prev => ({ ...prev, scale: Math.max(0.1, prev.scale - 0.05) }));
        break;
    }
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
      
      {/* Logo Upload Section */}
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
              onChange={handleLogoUpload}
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
          
          <div className="space-y-4">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Any special requests or details about your sponsorship?"
              value={formData.message}
              onChange={handleMessageChange}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Mockup Preview Section */}
      {causeData ? (
        causeData.imageReady && causeData.adminImageUrl ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cause Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Cause on Tote Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <canvas 
                  ref={causeCanvasRef}
                  width={400}
                  height={400}
                  className="border border-gray-200 rounded-lg max-w-full h-auto"
                />
              </CardContent>
            </Card>

            {/* Final Preview with Logo */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Final Tote Preview</CardTitle>
                  {logoPreview && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={resetLogoPosition}
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div 
                  className="relative"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onKeyDown={handleKeyDown}
                  tabIndex={0}
                  role="application"
                  aria-label="Interactive logo preview - use arrow keys to move, +/- to resize"
                >
                  <canvas 
                    ref={finalCanvasRef}
                    width={400}
                    height={400}
                    className="border border-gray-200 rounded-lg max-w-full h-auto cursor-move"
                  />
                  {logoPreview && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div 
                        className="absolute w-2 h-2 bg-blue-500 rounded-full"
                        style={{
                          left: `${logoTransform.x}%`,
                          top: `${logoTransform.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                    </div>
                  )}
                </div>
                
                {logoPreview && (
                  <div className="text-sm text-gray-600 text-center space-y-1">
                    <p>💡 Drag to move • Use arrow keys for precision</p>
                    <p>🔍 Press + or - to resize</p>
                    <p>Scale: {Math.round(logoTransform.scale * 100)}%</p>
                  </div>
                )}
                
                {!logoPreview && (
                  <p className="text-gray-400 text-center">
                    Upload a logo to see the final preview
                  </p>
                )}
              </CardContent>
            </Card>
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
