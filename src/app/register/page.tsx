'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Register from '@/components/auth/Register';

const RegisterPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('access_token');
    
    // If user is already logged in, redirect to dashboard
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);
  
  return <Register />;
};

export default RegisterPage;