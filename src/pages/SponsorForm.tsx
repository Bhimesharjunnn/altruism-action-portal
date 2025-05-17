
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const SponsorFormPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const causeId = searchParams.get('causeId');
  const { toast } = useToast();
  
  // Form state
  const [form, setForm] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    sponsorshipAmount: '',
    selectedCause: causeId || '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock causes data (would fetch from API)
  const causes = [
    { id: '1', title: 'Clean Water Initiative' },
    { id: '2', title: 'Children's Education Fund' },
    { id: '3', title: 'Women Entrepreneurs' },
    { id: '4', title: 'Wildlife Conservation' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSelectChange = (value: string) => {
    setForm({
      ...form,
      selectedCause: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This would normally send data to your backend
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Sponsorship Request Submitted",
        description: "Thank you for your interest! Our team will contact you soon.",
      });
      
      navigate('/causes');
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-primary-50 py-10">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="mb-4"
          >
            &larr; Back
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Become a Sponsor</h1>
          <p className="text-lg text-gray-700 mb-6">
            Complete the form below to start your sponsorship journey
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organizationName">Organization Name</Label>
                      <Input
                        id="organizationName"
                        name="organizationName"
                        value={form.organizationName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name</Label>
                      <Input
                        id="contactName"
                        name="contactName"
                        value={form.contactName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="selectedCause">Cause to Sponsor</Label>
                      <Select 
                        value={form.selectedCause} 
                        onValueChange={handleSelectChange}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a cause" />
                        </SelectTrigger>
                        <SelectContent>
                          {causes.map((cause) => (
                            <SelectItem key={cause.id} value={cause.id}>
                              {cause.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sponsorshipAmount">Sponsorship Amount ($)</Label>
                      <Input
                        id="sponsorshipAmount"
                        name="sponsorshipAmount"
                        type="number"
                        min="100"
                        value={form.sponsorshipAmount}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Submitting...' : 'Submit Sponsorship Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Sponsorship Benefits</h2>
                <ul className="space-y-3">
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Logo placement on cause page</span>
                  </li>
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Branded impact reporting</span>
                  </li>
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Social media recognition</span>
                  </li>
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Impact certificates</span>
                  </li>
                  <li className="flex">
                    <div className="mr-2 text-primary-600">✓</div>
                    <span>Employee engagement opportunities</span>
                  </li>
                </ul>
                
                <div className="border-t mt-6 pt-6">
                  <h3 className="font-semibold mb-2">Have questions?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Our team is here to help you find the perfect cause for your organization.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => window.location.href = 'mailto:support@causeconnect.org'}>
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SponsorFormPage;
