
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

// Define form schema
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 characters" }),
});

type WaitlistFormValues = z.infer<typeof formSchema>;

const JoinWaitlistPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  // Mock cause data (would come from API)
  const cause = {
    id: id,
    title: 'Clean Water Initiative',
    imageUrl: 'https://images.unsplash.com/photo-1541252260730-0412e8e2d5d8',
    description: 'Providing clean drinking water to communities in need.',
    sponsorName: 'EcoSolutions Inc.',
  };

  const onSubmit = async (values: WaitlistFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to waitlist confirmation
      navigate(`/waitlist/${id}/confirmed`, { 
        state: { 
          formData: values,
          cause
        } 
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was a problem joining the waitlist. Please try again.",
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
          
          <h1 className="text-3xl font-bold mb-2">Join Waitlist</h1>
          <p className="text-lg text-gray-700 mb-6">
            Get notified when this cause becomes available for claiming
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Join the Waitlist</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below to be notified when this cause is open for claiming.
                </p>
                
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
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">About This Cause</h3>
                
                <div className="space-y-4">
                  <div>
                    <img 
                      src={cause.imageUrl} 
                      alt={cause.title} 
                      className="w-full h-48 object-cover rounded-md mb-3" 
                    />
                    <h4 className="font-medium">{cause.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{cause.description}</p>
                    <p className="text-sm text-gray-600">Sponsored by {cause.sponsorName}</p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Why join the waitlist?</h4>
                    <ul className="text-sm space-y-2 list-disc list-inside text-gray-600">
                      <li>Be the first to know when claiming opens</li>
                      <li>Priority access when spots become available</li>
                      <li>Support an important cause</li>
                      <li>Get your exclusive tote bag</li>
                    </ul>
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

export default JoinWaitlistPage;
