
import React, { useState, useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, AlertCircle, Move, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

interface LogoUploadStepProps {
  formData: {
    selectedCause: string;
    logoUrl: string;
    message: string;
    causeImageUrl?: string;
    finalMockupUrl?: string;
    logoTransform?: { x: number; y: number; scale: number };
  };
  updateFormData: (data: Partial<{
    logoUrl: string;
    message: string;
    causeImageUrl: string;
    finalMockupUrl: string;
    logoTransform: { x: number; y: number; scale: number };
  }>) => void;
}

// Mock approved causes list
const approvedCauses = ['1', '2']; // In real app, fetch from API

// Mock tote bag templates
const toteBagTemplates = {
  '1': 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  '2': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
};

const LogoUploadStep = ({ formData, updateFormData }: LogoUploadStepProps) => {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string>(formData.logoUrl);
  const [causeImagePreview, setCauseImagePreview] = useState<string>(formData.causeImageUrl || '');
  const [causeImageUrl, setCauseImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadingCauseImage, setUploadingCauseImage] = useState(false);
  const [logoTransform, setLogoTransform] = useState(formData.logoTransform || { x: 50, y: 50, scale: 0.3 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const causeCanvasRef = useRef<HTMLCanvasElement>(null);
  const finalCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const isApprovedCause = approvedCauses.includes(formData.selectedCause);

  useEffect(() => {
    if (isApprovedCause && causeImagePreview && causeCanvasRef.current) {
      renderCauseCanvas();
    }
  }, [causeImagePreview, isApprovedCause]);

  useEffect(() => {
    if (isApprovedCause && causeImagePreview && logoPreview && finalCanvasRef.current) {
      renderFinalCanvas();
    }
  }, [causeImagePreview, logoPreview, logoTransform, isApprovedCause]);

  const validateImageUrl = async (url: string): Promise<boolean> => {
    try {
      if (!url.match(/^https?:\/\/.+/)) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid HTTP or HTTPS URL",
          variant: "destructive"
        });
        return false;
      }

      const response = await fetch(url, { method: 'HEAD' });
      if (!response.ok) {
        toast({
          title: "Invalid Image",
          description: "Unable to load image from the provided URL",
          variant: "destructive"
        });
        return false;
      }

      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Image must be smaller than 5MB",
          variant: "destructive"
        });
        return false;
      }

      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate image URL",
        variant: "destructive"
      });
      return false;
    }
  };

  const validateImageFile = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PNG or JPEG image",
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

      const img = new Image();
      img.onload = () => {
        if (img.width < 1000 || img.height < 1000) {
          toast({
            title: "Image Too Small",
            description: "Image must be at least 1000x1000 pixels",
            variant: "destructive"
          });
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.onerror = () => {
        toast({
          title: "Invalid Image",
          description: "Unable to load the selected image",
          variant: "destructive"
        });
        resolve(false);
      };
      img.src = URL.createObjectURL(file);
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
        console.log("Logo URL being set:", imageUrl);
      }
      setUploading(false);
    });
  };

  const handleCauseImageUrlSubmit = async () => {
    if (!causeImageUrl.trim()) return;
    
    setUploadingCauseImage(true);
    
    const isValid = await validateImageUrl(causeImageUrl);
    if (isValid) {
      setCauseImagePreview(causeImageUrl);
      updateFormData({ causeImageUrl });
    }
    
    setUploadingCauseImage(false);
  };

  const handleCauseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadingCauseImage(true);

    validateImageFile(file).then((isValid) => {
      if (isValid) {
        const imageUrl = URL.createObjectURL(file);
        setCauseImagePreview(imageUrl);
        updateFormData({ causeImageUrl: imageUrl });
      }
      setUploadingCauseImage(false);
    });
  };

  const renderCauseCanvas = () => {
    const canvas = causeCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const toteBagSrc = toteBagTemplates[formData.selectedCause as keyof typeof toteBagTemplates];
    
    const toteBag = new Image();
    toteBag.crossOrigin = 'anonymous';
    toteBag.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, 400, 400);
      
      // Draw tote bag template
      ctx.drawImage(toteBag, 0, 0, 400, 400);
      
      // Draw cause image if available
      if (causeImagePreview) {
        const causeImg = new Image();
        causeImg.crossOrigin = 'anonymous';
        causeImg.onload = () => {
          // Define placeholder rectangle (adjust these values based on your template)
          const placeholderX = 100;
          const placeholderY = 150;
          const placeholderWidth = 200;
          const placeholderHeight = 150;
          
          // Calculate aspect ratio and fit image
          const imgAspect = causeImg.width / causeImg.height;
          const placeholderAspect = placeholderWidth / placeholderHeight;
          
          let drawWidth, drawHeight, drawX, drawY;
          
          if (imgAspect > placeholderAspect) {
            // Image is wider
            drawHeight = placeholderHeight;
            drawWidth = drawHeight * imgAspect;
            drawX = placeholderX - (drawWidth - placeholderWidth) / 2;
            drawY = placeholderY;
          } else {
            // Image is taller
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
        causeImg.src = causeImagePreview;
      }
    };
    toteBag.src = toteBagSrc;
  };

  const renderFinalCanvas = () => {
    const canvas = finalCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const toteBagSrc = toteBagTemplates[formData.selectedCause as keyof typeof toteBagTemplates];
    
    const toteBag = new Image();
    toteBag.crossOrigin = 'anonymous';
    toteBag.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, 400, 400);
      
      // Draw tote bag template
      ctx.drawImage(toteBag, 0, 0, 400, 400);
      
      // Draw cause image
      if (causeImagePreview) {
        const causeImg = new Image();
        causeImg.crossOrigin = 'anonymous';
        causeImg.onload = () => {
          // Same logic as cause canvas
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
          if (logoPreview) {
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
          }
        };
        causeImg.src = causeImagePreview;
      }
    };
    toteBag.src = toteBagSrc;
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
      
      {/* Cause Image Upload Section */}
      {isApprovedCause ? (
        <Card>
          <CardHeader>
            <CardTitle>Cause Image Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="causeImageUrl">Paste Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="causeImageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={causeImageUrl}
                    onChange={(e) => setCauseImageUrl(e.target.value)}
                  />
                  <Button 
                    onClick={handleCauseImageUrlSubmit}
                    disabled={uploadingCauseImage}
                  >
                    {uploadingCauseImage ? 'Loading...' : 'Load'}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="causeImageUpload">Or Upload File</Label>
                <Input
                  id="causeImageUpload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleCauseImageUpload}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  className="w-full h-10 border-dashed"
                  onClick={() => document.getElementById('causeImageUpload')?.click()}
                  disabled={uploadingCauseImage}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploadingCauseImage ? 'Uploading...' : 'Upload Image'}
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              Requirements: PNG/JPEG, ≤5MB, minimum 1000×1000px
            </div>
          </CardContent>
        </Card>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Cause image upload is only available for approved causes. Your selected cause needs approval before you can upload a custom image.
          </AlertDescription>
        </Alert>
      )}

      {/* Logo Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Logo Upload</CardTitle>
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

      {/* Dual Preview Section */}
      {isApprovedCause && causeImagePreview && (
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
                  <p>🔍 Press + or - to resize • Shift+drag corner for proportional resize</p>
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
      )}

      {!isApprovedCause && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">
              Preview will be available once your cause is approved and you upload a cause image.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LogoUploadStep;
