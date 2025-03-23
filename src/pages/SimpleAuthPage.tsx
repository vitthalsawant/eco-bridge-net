
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import SimpleAuth from '@/components/SimpleAuth';
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const SimpleAuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen pt-28 pb-12 flex flex-col items-center">
      <Container>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to EcoRelay</h1>
          <p className="text-muted-foreground mt-2">Sign in or create an account to continue</p>
        </div>
        <SimpleAuth />
      </Container>
    </div>
  );
};

export default SimpleAuthPage;
