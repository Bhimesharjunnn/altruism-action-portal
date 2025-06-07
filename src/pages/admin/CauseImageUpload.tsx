import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Upload, ArrowLeft, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CauseImageUpload = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cause, setCause] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cause details
    // In real app: fetchCause(id)
    const mockCause = {
      _id: id,
      title: 'Ocean Cleanup Initiative',
      status: 'sponsored',
      adminImageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    };
    setCause(mockCause);
    setImagePreview(mockCause.adminImageUrl || '');
    setLoading(false);
  }, [id]);

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

      const contentType = response.headers.get('content-type');
      if (!contentType?.match(/^image\/(png|jpeg|jpg)$/)) {
        toast({
          title: "Invalid Format",
          description: "Only PNG and JPEG images are supported",
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

      resolve(true);
    });
  };

  const handleUrlUpload = async () => {
    if (!imageUrl.trim()) return;
    
    setUploading(true);
    
    const isValid = await validateImageUrl(imageUrl);
    if (isValid) {
      setImagePreview(imageUrl);
      // In real app: await updateCauseImage(id, imageUrl)
      toast({
        title: "Image URL Set",
        description: "The cause image has been updated successfully."
      });
    }
    
    setUploading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);

    const isValid = await validateImageFile(file);
    if (isValid) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      // In real app: upload file to storage and update cause
      toast({
        title: "Image Uploaded",
        description: "The cause image has been uploaded successfully."
      });
    }
    
    setUploading(false);
  };

  const handleSave = async () => {
    if (!imagePreview) {
      toast({
        title: "No Image Selected",
        description: "Please upload or set an image URL first.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    try {
      // In real app: API call to save the image
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Image Saved",
        description: "The cause image has been saved successfully."
      });
      
      navigate('/admin/causes');
    } catch (error) {
      toast({
        title: "Save Error",
        description: "Failed to save the image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Upload Cause Image" loading={true} />
    );
  }

  if (!cause) {
    return (
      <AdminLayout title="Cause Not Found">
        <div className="text-center py-12">
          <p className="text-gray-500">The requested cause could not be found.</p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/causes')}
            className="mt-4"
          >
            Back to Causes
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Upload Cause Image" 
      subtitle={`Set the tote bag artwork for "${cause.title}"`}
    >
      <div className="max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/admin/causes')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Causes
        </Button>

        {cause.status !== 'sponsored' && (
          <Alert className="mb-6">
            <AlertDescription>
              This cause is not yet sponsored. Images can be uploaded for any cause, but they will only be visible to sponsors after the cause is approved.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Upload Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* URL Upload */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Paste Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <Button 
                    onClick={handleUrlUpload}
                    disabled={uploading || !imageUrl.trim()}
                  >
                    {uploading ? 'Loading...' : 'Load'}
                  </Button>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="fileUpload">Or Upload File</Label>
                <Input
                  id="fileUpload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  className="w-full h-32 border-dashed"
                  onClick={() => document.getElementById('fileUpload')?.click()}
                  disabled={uploading}
                >
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="h-8 w-8 mb-2" />
                    <span>{uploading ? 'Uploading...' : 'Click to upload image'}</span>
                    <span className="text-xs mt-1">PNG or JPEG, ≤5MB</span>
                  </div>
                </Button>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-1">Requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>PNG or JPEG format only</li>
                  <li>Maximum file size: 5MB</li>
                  <li>Recommended: High resolution artwork</li>
                  <li>Image will be fitted to tote bag template</li>
                </ul>
              </div>

              <Button 
                onClick={handleSave}
                disabled={!imagePreview || uploading}
                className="w-full"
              >
                {uploading ? 'Saving...' : 'Save Cause Image'}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {imagePreview ? (
                <div className="space-y-4">
                  <div className="aspect-square border border-gray-200 rounded-lg overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Cause artwork preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Image ready for tote bag mockups</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-square border border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                  <div className="text-center text-gray-500">
                    <Upload className="h-12 w-12 mx-auto mb-2" />
                    <p>No image selected</p>
                    <p className="text-sm">Upload an image to see preview</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CauseImageUpload;
