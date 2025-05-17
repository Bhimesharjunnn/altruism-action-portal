
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Mail, Phone } from 'lucide-react';

const OtpVerificationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [activeTab, setActiveTab] = useState('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(30);

  // Get form data from location state
  const formData = location.state?.formData;
  const cause = location.state?.cause;

  useEffect(() => {
    // If no form data is provided, redirect back to claim form
    if (!formData) {
      navigate(`/claim/${id}`);
      return;
    }

    // Start countdown for resend button
    let timer: number;
    if (countdown > 0) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, formData, id, navigate]);

  const handleResendOtp = () => {
    toast({
      title: "OTP Resent",
      description: `A new verification code has been sent to your ${activeTab === 'email' ? 'email' : 'phone'}.`,
    });
    setCountdown(30);
  };

  const verifyOtp = async () => {
    if ((activeTab === 'email' && emailOtp.length < 6) || 
        (activeTab === 'phone' && phoneOtp.length < 6)) {
      toast({
        title: "Incomplete Code",
        description: "Please enter the complete 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (activeTab === 'email') {
        // After email verification, switch to phone verification
        if (phoneOtp.length < 6) {
          setActiveTab('phone');
          setIsSubmitting(false);
          toast({
            title: "Email Verified",
            description: "Please verify your phone number to continue.",
          });
          return;
        }
      }
      
      // Both verified, proceed to confirmation
      navigate(`/claim/${id}/confirmed`, { 
        state: { 
          formData,
          cause
        } 
      });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "The code you entered is incorrect. Please try again.",
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
          
          <h1 className="text-3xl font-bold mb-2">Verify Your Identity</h1>
          <p className="text-lg text-gray-700 mb-6">
            Please enter the verification codes sent to your email and phone
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email Verification</span>
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone Verification</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Verify Your Email</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      We've sent a verification code to <strong>{formData?.email}</strong>
                    </p>
                  </div>
                  
                  <div className="flex justify-center my-6">
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
                  
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      onClick={handleResendOtp}
                      disabled={countdown > 0}
                      className="text-sm"
                    >
                      {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="phone" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Verify Your Phone</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      We've sent a verification code to <strong>{formData?.phone}</strong>
                    </p>
                  </div>
                  
                  <div className="flex justify-center my-6">
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
                  
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      onClick={handleResendOtp}
                      disabled={countdown > 0}
                      className="text-sm"
                    >
                      {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-6 border-t">
              <Button 
                onClick={verifyOtp} 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying...' : 'Verify and Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OtpVerificationPage;
