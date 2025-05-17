
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the form schema
const formSchema = z.object({
  organizationName: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  selectedCause: z.string().min(1, {
    message: "Please select a cause.",
  }),
});

interface CauseSelectionStepProps {
  formData: {
    organizationName: string;
    contactName: string;
    email: string;
    phone: string;
    selectedCause: string;
    toteQuantity: number;
    logoUrl: string;
    message: string;
  };
  updateFormData: (data: Partial<{
    organizationName: string;
    contactName: string;
    email: string;
    phone: string;
    selectedCause: string;
    toteQuantity: number;
    logoUrl: string;
    message: string;
  }>) => void;
}

const CauseSelectionStep: React.FC<CauseSelectionStepProps> = ({ formData, updateFormData }) => {
  // Mock causes data
  const causes = [
    { id: '1', name: 'Clean Water Initiative' },
    { id: '2', name: 'Children\'s Education Fund' },
    { id: '3', name: 'Women Entrepreneurs' },
    { id: '4', name: 'Wildlife Conservation' },
    { id: '5', name: 'Mental Health Support' },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: formData.organizationName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      selectedCause: formData.selectedCause,
    },
  });

  // Update parent component's state when form values change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateFormData]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Organization Information</h2>
      
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your organization name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact person name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
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
                    <Input type="tel" placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="selectedCause"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Cause</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a cause to sponsor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {causes.map((cause) => (
                      <SelectItem key={cause.id} value={cause.id}>
                        {cause.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CauseSelectionStep;
