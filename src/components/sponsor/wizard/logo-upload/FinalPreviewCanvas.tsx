
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface FinalPreviewCanvasProps {
  causeData: any;
  logoPreview: string;
  logoTransform: { x: number; y: number; scale: number };
  onLogoTransformChange: (transform: { x: number; y: number; scale: number }) => void;
  onResetLogoPosition: () => void;
  onUpdateFormData: (data: any) => void;
}

const FinalPreviewCanvas = ({ 
  causeData, 
  logoPreview, 
  logoTransform, 
  onLogoTransformChange,
  onResetLogoPosition,
  onUpdateFormData
}: FinalPreviewCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    if (causeData?.imageReady && causeData?.adminImageUrl && logoPreview && canvasRef.current) {
      renderFinalCanvas();
    }
  }, [causeData, logoPreview, logoTransform]);

  const renderFinalCanvas = () => {
    const canvas = canvasRef.current;
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
              onUpdateFormData({ finalMockupUrl: url, logoTransform });
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
    
    const newTransform = {
      ...logoTransform,
      x: Math.max(0, Math.min(100, logoTransform.x + (deltaX / 4))),
      y: Math.max(0, Math.min(100, logoTransform.y + (deltaY / 4)))
    };
    
    onLogoTransformChange(newTransform);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!logoPreview) return;
    
    let newTransform = { ...logoTransform };
    
    switch (e.key) {
      case 'ArrowLeft':
        newTransform.x = Math.max(0, logoTransform.x - 1);
        break;
      case 'ArrowRight':
        newTransform.x = Math.min(100, logoTransform.x + 1);
        break;
      case 'ArrowUp':
        newTransform.y = Math.max(0, logoTransform.y - 1);
        break;
      case 'ArrowDown':
        newTransform.y = Math.min(100, logoTransform.y + 1);
        break;
      case '+':
      case '=':
        newTransform.scale = Math.min(1, logoTransform.scale + 0.05);
        break;
      case '-':
        newTransform.scale = Math.max(0.1, logoTransform.scale - 0.05);
        break;
    }
    
    onLogoTransformChange(newTransform);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Final Tote Preview</CardTitle>
          {logoPreview && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onResetLogoPosition}
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
            ref={canvasRef}
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
  );
};

export default FinalPreviewCanvas;
