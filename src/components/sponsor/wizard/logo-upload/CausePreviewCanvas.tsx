
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CausePreviewCanvasProps {
  causeData: any;
}

const CausePreviewCanvas = ({ causeData }: CausePreviewCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (causeData?.imageReady && causeData?.adminImageUrl && canvasRef.current) {
      renderCauseCanvas();
    }
  }, [causeData]);

  const renderCauseCanvas = () => {
    const canvas = canvasRef.current;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cause on Tote Preview</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <canvas 
          ref={canvasRef}
          width={400}
          height={400}
          className="border border-gray-200 rounded-lg max-w-full h-auto"
        />
      </CardContent>
    </Card>
  );
};

export default CausePreviewCanvas;
