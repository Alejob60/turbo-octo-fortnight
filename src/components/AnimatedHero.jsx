'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const AnimatedHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-32"
    >
      <div className="inline-block mb-6 px-4 py-1 border border-cyan-500/30 bg-cyan-500/10 rounded-full text-cyan-400 text-xs font-mono tracking-widest">
        NVIDIA INCEPTION PARTNER • DEPLOYING INTELLIGENCE
      </div>
      
      <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-8 tracking-tighter">
        SOVEREIGN <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          INTELLIGENCE
        </span> <br />
        INFRASTRUCTURE.
      </h1>
      
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
        Orbital Prime implementa sistemas de IA de grado militar y cómputo predictivo para 
        Clínicas, Gobierno y Corporaciones en LATAM. 
        <br/><br/>
        <span className="text-white">Recuperamos el 15% de sus ingresos operativos en 90 días.</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          REQUEST ACCESS
        </button>
        <button className="px-8 py-4 border border-slate-700 hover:border-slate-500 text-slate-300 font-bold tracking-widest text-sm transition-all flex items-center gap-2">
          <Terminal size={16} /> VIEW CAPABILITIES
        </button>
      </div>
    </motion.div>
  );
};

export default AnimatedHero;