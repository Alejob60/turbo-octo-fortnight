import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Key, ShieldCheck, AlertTriangle, X } from 'lucide-react';

const LoginOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, verifying, success

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('verifying');
    
    // Simulación de proceso de login seguro
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setIsLoading(false);
        // Aquí redirigirías al Dashboard real
        alert("ACCESS GRANTED: WELCOME TO ORBITAL PRIME.");
        onClose(); 
        setStatus('idle');
      }, 1000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030303]/90 backdrop-blur-sm p-4"
      >
        {/* FONDO ANIMADO SUTIL */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full" />
        </div>

        {/* TARJETA DE LOGIN */}
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="relative w-full max-w-md bg-[#050505] border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* BARRA SUPERIOR DECORATIVA */}
          <div className="h-1 w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-slate-800" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="p-8 md:p-10">
            {/* HEADER */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border border-slate-700 mb-4 text-cyan-400">
                <Lock size={20} />
              </div>
              <h2 className="text-2xl font-bold text-white font-mono tracking-tight">SYSTEM ACCESS</h2>
              <p className="text-xs text-slate-500 font-mono mt-2 tracking-widest uppercase">
                Orbital Prime • Secure Gateway
              </p>
            </div>

            {/* FORMULARIO */}
            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase pl-1">
                  Operator ID
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-500 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="ORG-ID-0000"
                    className="w-full bg-slate-900/50 border border-slate-800 text-white text-sm font-mono py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 tracking-widest uppercase pl-1">
                  Access Key
                </label>
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-500 transition-colors" size={16} />
                  <input 
                    type="password" 
                    placeholder="••••••••••••"
                    className="w-full bg-slate-900/50 border border-slate-800 text-white text-sm font-mono py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-700"
                  />
                </div>
              </div>

              {/* WARNING BOX */}
              <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded text-red-400/80 text-xs">
                <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                <p>Unauthorized access attempts are logged and reported to Orbital Security Operations.</p>
              </div>

              {/* BOTÓN DE ACCIÓN */}
              <button 
                disabled={isLoading}
                className={`w-full relative overflow-hidden group py-4 font-bold tracking-widest text-xs transition-all duration-300 ${
                  status === 'success' ? 'bg-green-500 text-black' : 'bg-white hover:bg-cyan-400 text-black'
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {status === 'verifying' ? (
                    <>
                      <span className="animate-spin w-3 h-3 border-2 border-black border-t-transparent rounded-full" />
                      VERIFYING ENCRYPTION...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <ShieldCheck size={16} />
                      ACCESS GRANTED
                    </>
                  ) : (
                    "ESTABLISH CONNECTION"
                  )}
                </div>
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-600 font-mono">
              <span>SECURED BY AZURE</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                SYSTEM ONLINE
              </span>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginOverlay;