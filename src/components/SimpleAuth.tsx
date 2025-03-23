
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SimpleAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Check URL for error parameters that might indicate verification issues
    const url = new URL(window.location.href);
    const errorDescription = url.searchParams.get('error_description');
    if (errorDescription?.includes('Email not confirmed')) {
      setNeedsVerification(true);
      toast({
        title: "Email verification required",
        description: "Please check your inbox and verify your email before logging in.",
        variant: "destructive",
      });
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    try {
      if (isSignUp) {
        // Sign up
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) {
          if (error.message.includes('User already registered')) {
            throw new Error('An account with this email already exists. Please sign in instead.');
          } else {
            throw error;
          }
        }
        
        setNeedsVerification(true);
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account before signing in.",
        });
        
        // Switch to sign in mode after successful signup
        setIsSignUp(false);
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Auth error:", error);
          
          if (error.message.includes('Invalid login credentials')) {
            // Check if the user exists but needs verification
            const { data, error: checkError } = await supabase.auth.signInWithOtp({
              email,
              options: {
                shouldCreateUser: false,
              }
            });
            
            if (checkError) {
              if (checkError.message.includes('Email not confirmed')) {
                setNeedsVerification(true);
                throw new Error('Your email has not been verified. Please check your inbox or request a new verification email.');
              } else {
                throw new Error('Invalid login credentials. Please check your email and password.');
              }
            } else if (data) {
              setNeedsVerification(true);
              throw new Error('Email not verified. We sent a new verification email to your inbox.');
            } else {
              throw new Error('Invalid login credentials. Please check your email and password.');
            }
          } else if (error.message.includes('Email not confirmed')) {
            setNeedsVerification(true);
            throw new Error('Your email has not been verified. Please check your inbox or request a new verification email.');
          } else {
            throw error;
          }
        }
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      setAuthError(error.message || "An error occurred during authentication");
      toast({
        title: "Authentication error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to resend verification",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) throw error;

      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not resend verification email",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {isSignUp ? 'Create an account' : 'Sign in'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {authError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}
        
        {needsVerification && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">Email verification required</p>
              <p className="text-xs text-amber-700 mt-1">
                Please check your inbox and verify your email address before logging in.
              </p>
              <Button 
                variant="link" 
                className="text-xs p-0 h-auto mt-1 text-amber-800" 
                onClick={handleResendVerification}
                disabled={loading}
              >
                Resend verification email
              </Button>
            </div>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading 
              ? 'Processing...' 
              : isSignUp ? 'Create Account' : 'Sign In'
            }
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="link" 
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm"
        >
          {isSignUp 
            ? 'Already have an account? Sign in' 
            : 'Need an account? Sign up'
          }
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SimpleAuth;
