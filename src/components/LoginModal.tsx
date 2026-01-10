import React, { useState, useEffect, FormEvent } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Lock, User, Key, ShieldCheck, AlertTriangle, X, Activity, Mail } from 'lucide-react';

import { misybotAPI } from '@/lib/api';

import { useRouter } from 'next/navigation';

import { useLanguage } from '@/i18n/LanguageContext';


const LoginModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {

  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState('idle'); // idle, verifying, success

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const { t } = useLanguage();


  // Resetear estado cuando se abre/cierra

  useEffect(() => {

    if (isOpen) {

      setStatus('idle');

      setError(null);

    }

  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    setIsLoading(true);

    setError(null);

    try {

      const response = await misybotAPI.login({

        email: loginData.email,

        password: loginData.password

      });

      

      const token = response.token || response.access_token || response.data?.token;
      
      if (token) {

        localStorage.setItem('access_token', token);
        
        const userData = response.user || response.data || {

          email: loginData.email,

          name: loginData.email.split('@')[0],

        };
        
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        setStatus('success');

        
        setTimeout(() => {

          setIsLoading(false);

          router.push('/dashboard');

          onClose();

        }, 1500);

      } else {

        throw new Error('Token no encontrado en la respuesta del servidor');

      }

    } catch (err: any) {

      setError(err.message || 'Credenciales inválidas. Por favor, inténtalo de nuevo.');

      setIsLoading(false);

      setStatus('idle');

    }

  };
  

  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault();

    setIsLoading(true);

    setError(null);

    try {

      const response = await misybotAPI.register({

        email: registerData.email,

        password: registerData.password,

        name: registerData.name

      });

      

      const token = response.token || response.access_token || response.data?.token;
      
      if (token) {

        localStorage.setItem('access_token', token);
        
        const userData = response.user || response.data || {

          email: registerData.email,

          name: registerData.name,

        };
        
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        setStatus('success');

        
        setTimeout(() => {

          setIsLoading(false);

          router.push('/dashboard');

          onClose();

        }, 1500);

      } else {

        throw new Error('Token no encontrado en la respuesta del servidor');

      }

    } catch (err: any) {

      setError(err.message || 'Error al registrar usuario. Por favor, inténtalo de nuevo.');

      setIsLoading(false);

      setStatus('idle');

    }

  };


  if (!isOpen) return null;


  return (

    <AnimatePresence>

      {/* OVERLAY OSCURO CON EFECTO BLUR */}

      <motion.div 

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}

        transition={{ duration: 0.2 }}

        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303]/95 backdrop-blur-sm p-4"

      >

        {/* CERRAR AL HACER CLICK AFUERA */}

        <div className="absolute inset-0" onClick={onClose}></div>


        {/* TARJETA DEL LOGIN */}

        <motion.div 

          initial={{ scale: 0.95, opacity: 0, y: 20 }}

          animate={{ scale: 1, opacity: 1, y: 0 }}

          exit={{ scale: 0.95, opacity: 0, y: 20 }}

          transition={{ type: "spring", damping: 20, stiffness: 300 }}

          className="relative w-full max-w-md bg-[#0a0a0a] border border-slate-800 shadow-[0_0_60px_-15px_rgba(6,182,212,0.2)] overflow-hidden rounded-sm z-10"

          onClick={(e) => e.stopPropagation()} // Evitar cierre al clickear dentro

        >

          {/* LÍNEA DE ENERGÍA SUPERIOR */}

          {status === 'verifying' && (

             <motion.div 

                initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2.5, ease: "linear" }}

                className="h-0.5 w-full bg-cyan-500 absolute top-0 left-0 z-20"

             />

          )}

          <div className="h-1 w-full bg-gradient-to-r from-slate-800 via-cyan-900 to-slate-800 opacity-50" />

          
          {/* BOTÓN DE CERRAR */}

          <button onClick={onClose} className="absolute top-5 right-5 text-slate-500 hover:text-cyan-400 transition-colors">

            <X size={18} />

          </button>


          <div className="p-8 pt-10">

            {/* HEADER DEL MODAL */}

            <div className="text-center mb-8">

              <motion.div 

                animate={status === 'verifying' ? { rotate: 360 } : {}}

                transition={status === 'verifying' ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}

                className={`inline-flex items-center justify-center w-12 h-12 rounded-full border mb-4 transition-colors duration-500 ${status === 'success' ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-slate-900 border-slate-700 text-cyan-400'}`}

              >

                {status === 'success' ? <ShieldCheck size={24} /> : status === 'verifying' ? <Activity size={24} /> : <Lock size={24} />}

              </motion.div>

              <h2 className="text-xl font-bold text-white font-mono tracking-tight">SECURE GATEWAY</h2>

              <div className="flex items-center justify-center gap-2 mt-2">

                <span className="relative flex h-2 w-2">

                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>

                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>

                </span>

                <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">

                  Orbital Prime • Neural Net Link

                </p>

              </div>

            </div>


            {/* PESTAÑAS */}

            <div className="flex border-b border-slate-800 mb-6">

              <button

                type="button"

                className={`flex-1 py-3 text-center text-sm font-mono ${activeTab === 'login' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'}`}

                onClick={() => setActiveTab('login')}

              >

                {t('auth.login')}

              </button>

              <button

                type="button"

                className={`flex-1 py-3 text-center text-sm font-mono ${activeTab === 'register' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-500'}`}

                onClick={() => setActiveTab('register')}

              >

                {t('auth.register')}

              </button>

            </div>

            

            {error && (

              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-center font-mono text-sm">

                {error}

              </div>

            )}
            

            {activeTab === 'login' ? (
              <form id="loginForm" onSubmit={handleLogin} className="space-y-5">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase pl-1">{t('auth.email')}</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={16} />
                    <input 
                      type="email" 
                      placeholder={t('auth.emailPlaceholder')} 
                      disabled={isLoading}
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      className="w-full bg-[#050505] border border-slate-800 text-cyan-50 text-sm font-mono py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase pl-1">{t('auth.password')}</label>
                  <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={16} />
                    <input 
                      type="password" 
                      placeholder={t('auth.passwordPlaceholder')} 
                      disabled={isLoading}
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full bg-[#050505] border border-slate-800 text-cyan-50 text-sm font-mono py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700 disabled:opacity-50"
                    />
                  </div>
                </div>
              </form>
            ) : (
              <form id="registerForm" onSubmit={handleRegister} className="space-y-5">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase pl-1">{t('auth.name')}</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={16} />
                    <input 
                      type="text" 
                      placeholder={t('auth.namePlaceholder')} 
                      disabled={isLoading}
                      value={registerData.name}
                      onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                      className="w-full bg-[#050505] border border-slate-800 text-cyan-50 text-sm font-mono py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase pl-1">{t('auth.email')}</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={16} />
                    <input 
                      type="email" 
                      placeholder={t('auth.emailPlaceholder')} 
                      disabled={isLoading}
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      className="w-full bg-[#050500] border border-slate-800 text-cyan-50 text-sm font-mono py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700 disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase pl-1">{t('auth.password')}</label>
                  <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={16} />
                    <input 
                      type="password" 
                      placeholder={t('auth.passwordPlaceholder')} 
                      disabled={isLoading}
                      value={registerData.password}
                      onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                      className="w-full bg-[#050505] border border-slate-800 text-cyan-50 text-sm font-mono py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700 disabled:opacity-50"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* ADVERTENCIA */}
            <div className="flex items-start gap-3 p-3 bg-red-950/20 border border-red-900/50 rounded-sm text-red-400/90 text-xs font-mono leading-tight mt-4">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <p>{t('auth.restricted_area_warning')}</p>
            </div>

            {/* BOTÓN DE ACCIÓN PRINCIPAL */}
            <button 
              type="submit"
              form={activeTab === 'login' ? 'loginForm' : 'registerForm'}
              disabled={isLoading || status === 'success'}
              className={`w-full relative overflow-hidden group py-4 font-bold tracking-[0.2em] text-xs transition-all duration-500 border ${
                status === 'success' 
                  ? 'bg-green-500 border-green-400 text-black' 
                  : 'bg-cyan-950/30 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black hover:border-cyan-400'
              }`}
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {status === 'verifying' ? (
                  <span className="flex items-center gap-2">{activeTab === 'login' ? t('auth.loggingIn') : t('auth.registering')}...</span>
                ) : status === 'success' ? (
                  <span className="flex items-center gap-2"><ShieldCheck size={16} /> {t('auth.access_granted')}</span>
                ) : (
                  activeTab === 'login' ? t('auth.loginButton') : t('auth.registerButton')

                )}
              </div>
              {/* Efecto de escaneo en el botón */}
              {status === 'idle' && <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-cyan-400/20 opacity-40 group-hover:animate-shiny" />}
            </button>


            {/* FOOTER DEL MODAL */}

            <div className="mt-8 pt-4 border-t border-slate-900/50 flex justify-between items-center text-[9px] text-slate-600 font-mono uppercase tracking-wider">

              <span>Enforced by Azure Gov Cloud</span>

              <span>Latency: 14ms</span>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

};


export default LoginModal;