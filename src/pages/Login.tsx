
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register, requestOtp } = useAuth();
  const { toast } = useToast();
  
  // Login state
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Register state
  const [regEmail, setRegEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('sponsor');
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtp, setRegOtp] = useState('');
  const [isRegLoading, setIsRegLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await requestOtp(email);
      if (success) {
        setOtpSent(true);
        toast({
          title: "OTP Sent",
          description: "Check your email for the verification code",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, otp);
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid OTP. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendRegOtp = async () => {
    if (!regEmail || !name) {
      toast({
        title: "Required Fields Missing",
        description: "Please enter your email and name",
        variant: "destructive"
      });
      return;
    }
    
    setIsRegLoading(true);
    try {
      const success = await requestOtp(regEmail);
      if (success) {
        setRegOtpSent(true);
        toast({
          title: "OTP Sent",
          description: "Check your email for the verification code",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRegLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegLoading(true);
    
    try {
      const success = await register(regEmail, name, role as any);
      if (success) {
        toast({
          title: "Registration Successful",
          description: "Your account has been created!",
        });
        navigate('/');
      } else {
        toast({
          title: "Registration Failed",
          description: "Invalid OTP. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during registration",
        variant: "destructive"
      });
    } finally {
      setIsRegLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-primary-800 flex items-center justify-center">
            <span className="mr-2">🤲</span>
            <span>CauseConnect</span>
          </Link>
        </div>
        
        <Card>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardContent className="p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      disabled={otpSent}
                    />
                  </div>
                  
                  {otpSent && (
                    <div className="space-y-2">
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter the code sent to your email"
                        required
                      />
                      <p className="text-sm text-gray-500">
                        Enter the verification code sent to your email
                      </p>
                    </div>
                  )}
                  
                  <Button
                    type={otpSent ? "submit" : "button"}
                    onClick={otpSent ? undefined : handleSendOtp}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Processing..." : otpSent ? "Login" : "Send Verification Code"}
                  </Button>
                  
                  {otpSent && (
                    <div className="text-center">
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp('');
                        }}
                      >
                        Use a different email
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="register">
              <CardContent className="p-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  {!regOtpSent ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="regEmail">Email</Label>
                        <Input
                          id="regEmail"
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">I want to join as a:</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            type="button"
                            variant={role === 'sponsor' ? "default" : "outline"}
                            onClick={() => setRole('sponsor')}
                            className="w-full"
                          >
                            Sponsor
                          </Button>
                          <Button
                            type="button"
                            variant={role === 'claimer' ? "default" : "outline"}
                            onClick={() => setRole('claimer')}
                            className="w-full"
                          >
                            Claimer
                          </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {role === 'sponsor' 
                            ? "As a sponsor, you can support causes with financial contributions." 
                            : "As a claimer, you can request sponsorship for your causes."}
                        </p>
                      </div>
                      
                      <Button
                        type="button"
                        onClick={handleSendRegOtp}
                        disabled={isRegLoading}
                        className="w-full"
                      >
                        {isRegLoading ? "Processing..." : "Continue"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="regOtp">Verification Code</Label>
                        <Input
                          id="regOtp"
                          value={regOtp}
                          onChange={(e) => setRegOtp(e.target.value)}
                          placeholder="Enter the code sent to your email"
                          required
                        />
                        <p className="text-sm text-gray-500">
                          Enter the verification code sent to {regEmail}
                        </p>
                      </div>
                      
                      <Button
                        type="submit"
                        disabled={isRegLoading}
                        className="w-full"
                      >
                        {isRegLoading ? "Processing..." : "Create Account"}
                      </Button>
                      
                      <div className="text-center">
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => {
                            setRegOtpSent(false);
                            setRegOtp('');
                          }}
                        >
                          Go back
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
          
          <CardFooter className="p-6 pt-0 text-center">
            <Button variant="link" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
