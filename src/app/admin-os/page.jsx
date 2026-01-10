'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import OrbitalPrimeDashboard from '@/components/OrbitalPrimeDashboard';

const AdminOSPage = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/');
      }
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#030303] text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-cyan-400 font-mono text-sm">VERIFICANDO SESIÓN...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Mostrar un mensaje temporal mientras se redirige
    return (
      <div className="flex items-center justify-center h-screen bg-[#030303] text-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-cyan-400 font-mono text-sm">ACCESO NO AUTORIZADO - REDIRIGIENDO...</p>
        </div>
      </div>
    );
  }

  return <OrbitalPrimeDashboard />;
};

export default AdminOSPage;