'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '@/i18n/LanguageContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#030303] text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-cyan-400 font-mono text-sm">{t('auth.loading') || 'CARGANDO...'}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // El efecto de redirección se encargará de la navegación
  }

  return children;
};

export default ProtectedRoute;