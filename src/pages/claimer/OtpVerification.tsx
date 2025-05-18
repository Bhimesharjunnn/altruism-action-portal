
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from "@/components/ui/input-otp";
import { toast } from '@/components/ui/use-toast';

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromWaitlist = searchParams.get('source') === 'waitlist';
  const [activeTab, setActiveTab] = useState<string>(fromWaitlist ? 'phone' : 'email');
  const [emailOtp, setEmailOtp] = useState<string>('');
  const [phoneOtp, setPhoneOtp] = useState<string>('');
  const [formData, setFormData] = useState<any>(null);
  
  useEffect(() => {
    // Retrieve form data from session storage
    const storedData = sessionStorage.getItem('claimFormData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    } else {
      // If no data is found, redirect back to the claim form
      navigate('/causes');
    }
    
    // For waitlist users, we might skip email verification if they've already verified
    if (fromWaitlist) {
      toast({
        title: "Waitlist Member Detected",
        description: "Since you've already verified your email, you only need to verify your phone number.",
      });
    }
    
    // In a real app, this would trigger API calls to send OTPs
    console.log('Sending verification codes...');
  }, [navigate, fromWaitlist]);
  
  const verifyEmail = () => {
    // Mock verification
    if (emailOtp.length === 6) {
      // For demo purposes, any 6-digit code is accepted
      toast({
        title: "Email Verified!",
        description: "Your email has been successfully verified.",
      });
      setActiveTab('phone');
    } else {
      toast({
        title: "Verification Failed",
        description: "Please enter a valid verification code.",
        variant: "destructive",
      });
    }
  };
  
  const verifyPhone = () => {
    // Mock verification
    if (phoneOtp.length === 6) {
      // For demo purposes, any 6-digit code is accepted
      toast({
        title: "Phone Verified!",
        description: "Your phone has been successfully verified.",
      });
      // Store verification status
      sessionStorage.setItem('verificationComplete', 'true');
      
      // Add fromWaitlist flag if applicable
      if (fromWaitlist) {
        const claimData = JSON.parse(sessionStorage.getItem('claimFormData') || '{}');
        sessionStorage.setItem('claimFormData', JSON.stringify({
          ...claimData,
          fromWaitlist: true
        }));
      }
      
      navigate('/claim/confirmed');
    } else {
      toast({
        title: "Verification Failed",
        description: "Please enter a valid verification code.",
        variant: "destructive",
      });
    }
  };
  
  const resendCode = (type: string) => {
    toast({
      title: "Code Sent!",
      description: `A new verification code has been sent to your ${type}.`,
    });
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
          
          <h1 className="text-3xl font-bold mb-2">Verify Your Contact Information</h1>
          <p className="text-lg text-gray-700 mb-6">
            Enter the verification codes sent to your email and phone
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="email">Email Verification</TabsTrigger>
                <TabsTrigger value="phone" disabled={!formData?.email || activeTab === 'email'}>
                  Phone Verification
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600">
                    We've sent a verification code to:
                  </p>
                  <p className="font-medium text-lg">
                    {formData?.email || 'your email'}
                  </p>
                </div>
                
                <div className="flex justify-center mb-8">
                  <InputOTP maxLength={6} value={emailOtp} onChange={setEmailOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <Button onClick={verifyEmail} disabled={emailOtp.length !== 6}>
                    Verify Email
                  </Button>
                  
                  <div className="text-center">
                    <Button 
                      variant="link" 
                      onClick={() => resendCode('email')} 
                      className="text-sm"
                    >
                      Didn't receive a code? Resend
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-600">
                    We've sent a verification code to:
                  </p>
                  <p className="font-medium text-lg">
                    {formData?.phone || 'your phone'}
                  </p>
                </div>
                
                <div className="flex justify-center mb-8">
                  <InputOTP maxLength={6} value={phoneOtp} onChange={setPhoneOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                
                <div className="flex flex-col space-y-4">
                  <Button onClick={verifyPhone} disabled={phoneOtp.length !== 6}>
                    Verify Phone
                  </Button>
                  
                  <div className="text-center">
                    <Button 
                      variant="link" 
                      onClick={() => resendCode('phone')} 
                      className="text-sm"
                    >
                      Didn't receive a code? Resend
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OtpVerificationPage;
