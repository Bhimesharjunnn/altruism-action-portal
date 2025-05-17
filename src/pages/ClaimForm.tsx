
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, FileText } from 'lucide-react';

// Define form schema
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 characters" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
});

type ClaimFormValues = z.infer<typeof formSchema>;

const ClaimFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<ClaimFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // Mock cause data (would come from API)
  const cause = {
    id: id,
    title: 'Clean Water Initiative',
    imageUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2d5d8',
    sponsorName: 'EcoSolutions Inc.',
  };

  const onSubmit = async (values: ClaimFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to OTP verification with form data
      navigate(`/claim/${id}/verify`, { 
        state: { 
          formData: values,
          cause
        } 
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
          
          <div className="flex items-center gap-3 mb-2">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Claim Your Tote</h1>
          </div>
          
          <p className="text-lg text-gray-700 mb-6">
            Complete this form to claim your sponsored tote for {cause.title}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shipping Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your shipping address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Continue to Verification'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Claim Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <img 
                      src={cause.imageUrl} 
                      alt={cause.title} 
                      className="w-full h-48 object-cover rounded-md mb-3" 
                    />
                    <h4 className="font-medium">{cause.title}</h4>
                    <p className="text-sm text-gray-600">Sponsored by {cause.sponsorName}</p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">What happens next?</h4>
                    <ol className="text-sm space-y-2 list-decimal list-inside text-gray-600">
                      <li>Complete this form with your information</li>
                      <li>Verify your email and phone with a one-time code</li>
                      <li>Receive confirmation of your successful claim</li>
                      <li>Track status of your tote bag delivery</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClaimFormPage;
