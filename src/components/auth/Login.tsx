'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { misybotAPI } from '@/lib/api';
import { useLanguage } from '@/i18n/LanguageContext';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Autenticación con el backend de MisYBot
      const response = await misybotAPI.login({
        email: formData.email,
        password: formData.password
      });

      console.log('Login response:', response); // Para debugging

      console.log('Login response completo:', response); // Mostrar el payload completo en consola
      
      // Extraer token y datos del usuario de la respuesta
      // El backend puede devolver el token en diferentes campos
      const token = response.token || response.access_token || response.data?.token;
      
      if (token) {
        localStorage.setItem('access_token', token);
        
        // Extraer datos del usuario de la respuesta
        const userData = response.user || response.data || {
          email: formData.email,
          name: formData.email.split('@')[0], // Usar parte del email como nombre si no está disponible
        };
        
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        // Mostrar datos del usuario en consola
        console.log('Datos del usuario almacenados:', userData);
        
        // Redirigir al Admin OS Dashboard que tiene botón de logout
        router.push('/admin-os');
      } else {
        throw new Error('Token no encontrado en la respuesta del servidor');
      }
    } catch (err: any) {
      setError(err.message || 'Credenciales inválidas. Por favor, inténtalo de nuevo.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center p-4">
      <div className="bg-slate-900/20 border border-slate-800 backdrop-blur-sm rounded-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 font-mono text-cyan-400">ORBITAL PRIME</h1>
          <p className="text-slate-500 font-mono">{t('nav.login')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-center font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 font-mono text-slate-400">
              {t('auth.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-800 bg-slate-900/50 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-white font-mono"
              placeholder={t('auth.emailPlaceholder')}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 font-mono text-slate-400">
              {t('auth.password')}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-800 bg-slate-900/50 rounded focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-white font-mono"
              placeholder={t('auth.passwordPlaceholder')}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] py-4"
          >
            {loading ? t('auth.loggingIn') : t('auth.loginButton')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500 font-mono">
          <p>
            {t('auth.noAccount')}{' '}
            <a href="/register" className="text-cyan-400 hover:underline">
              {t('auth.registerLink')}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;