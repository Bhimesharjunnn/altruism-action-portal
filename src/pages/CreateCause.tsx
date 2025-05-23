
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Heart, Users, Target, Globe } from 'lucide-react';

const CreateCause = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    story: '',
    category: '',
    goal: '',
    imageUrl: ''
  });

  const categories = [
    'Education',
    'Healthcare',
    'Environment',
    'Poverty Relief',
    'Disaster Relief',
    'Animal Welfare',
    'Community Development',
    'Human Rights',
    'Technology Access',
    'Arts & Culture'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.category || !formData.goal) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    // Simulate cause creation
    toast({
      title: 'Cause Submitted!',
      description: 'Your cause has been submitted for review. You will be notified once it\'s approved.'
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      story: '',
      category: '',
      goal: '',
      imageUrl: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <main className="max-w-4xl mx-auto py-16 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Create a Cause</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have a cause that needs support? Share your story and connect with sponsors who want to make a difference.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold mb-2">Make an Impact</h3>
            <p className="text-sm text-gray-600">Turn your passion into positive change</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold mb-2">Find Sponsors</h3>
            <p className="text-sm text-gray-600">Connect with people who share your vision</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold mb-2">Reach Goals</h3>
            <p className="text-sm text-gray-600">Get the funding you need to succeed</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold mb-2">Global Reach</h3>
            <p className="text-sm text-gray-600">Share your cause with a worldwide audience</p>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Tell Us About Your Cause</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Cause Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g. Clean Water for Rural Communities"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Briefly describe what your cause is about..."
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="story">Your Story</Label>
                <Textarea
                  id="story"
                  value={formData.story}
                  onChange={(e) => handleInputChange('story', e.target.value)}
                  placeholder="Tell us more about why this cause matters to you and the impact it will have..."
                  rows={5}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="goal">Funding Goal (USD) *</Label>
                  <Input
                    id="goal"
                    type="number"
                    value={formData.goal}
                    onChange={(e) => handleInputChange('goal', e.target.value)}
                    placeholder="e.g. 5000"
                    min="1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.imageUrl}
                    onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your cause will be reviewed by our team</li>
                  <li>• Once approved, it will be published on our platform</li>
                  <li>• Sponsors can then discover and support your cause</li>
                  <li>• You'll receive notifications about new sponsors and updates</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Submit Cause for Review
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </Layout>
  );
};

export default CreateCause;
