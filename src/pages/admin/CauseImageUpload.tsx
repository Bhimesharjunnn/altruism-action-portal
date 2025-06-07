
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Upload, Link, ArrowLeft, CheckCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const CauseImageUpload = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [causeTitle, setCauseTitle] = useState('');

  useEffect(() => {
    // Mock fetch cause details
    setCauseTitle('Clean Water Initiative');
  }, [id]);

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
      img.src = URL.createObjectURL(file);
    });
  };

  const validateImageUrl = async (url: string): Promise<boolean> => {
    try {
      if (!url.match(/^https?:\/\/.+/)) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid HTTP/HTTPS URL",
          variant: "destructive"
        });
        return false;
      }

      const response = await fetch(url, { method: 'HEAD' });
      
      if (!response.ok) {
        toast({
          title: "URL Not Accessible",
          description: "Could not access the image at this URL",
          variant: "destructive"
        });
        return false;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.match(/^image\/(png|jpeg|jpg)/)) {
        toast({
          title: "Invalid Image Type",
          description: "URL must point to a PNG or JPEG image",
          variant: "destructive"
        });
        return false;
      }

      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > 5 * 1024 * 1024) {
        toast({
          title: "Image Too Large",
          description: "Image must be smaller than 5MB",
          variant: "destructive"
        });
        return false;
      }

      return true;
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Could not validate the image URL",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValid = await validateImageFile(file);
    if (isValid) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleUrlSubmit = async () => {
    if (!imageUrl.trim()) return;

    const isValid = await validateImageUrl(imageUrl);
    if (isValid) {
      setPreview(imageUrl);
    }
  };

  const handleUpload = async () => {
    if (!preview) return;

    setUploading(true);
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Image Uploaded Successfully",
        description: "The cause image has been uploaded and is now available for sponsors.",
      });

      navigate('/admin/causes');
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading the image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout title="Upload Cause Image" loading={false}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/causes')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Causes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upload Image for: {causeTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={uploadMethod === 'url' ? 'default' : 'outline'}
                onClick={() => setUploadMethod('url')}
                className="h-12"
              >
                <Link className="h-4 w-4 mr-2" />
                Upload from URL
              </Button>
              <Button
                variant={uploadMethod === 'file' ? 'default' : 'outline'}
                onClick={() => setUploadMethod('file')}
                className="h-12"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>

            {uploadMethod === 'url' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="imageUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <Button onClick={handleUrlSubmit} disabled={!imageUrl.trim()}>
                      Load
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {uploadMethod === 'file' && (
              <div>
                <Label htmlFor="fileUpload">Choose Image File</Label>
                <Input
                  id="fileUpload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
              </div>
            )}

            <Alert>
              <AlertDescription>
                Images must be PNG or JPEG format, minimum 1000×1000 pixels, and under 5MB.
                High-resolution images work best for tote bag printing.
              </AlertDescription>
            </Alert>

            {preview && (
              <div className="space-y-4">
                <div>
                  <Label>Preview</Label>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <img
                      src={preview}
                      alt="Cause image preview"
                      className="max-w-full h-auto max-h-64 mx-auto rounded"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full"
                  size="lg"
                >
                  {uploading ? (
                    'Uploading...'
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Upload Image
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CauseImageUpload;
