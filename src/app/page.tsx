'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, GraduationCap, Search, 
  Server, Cpu, Globe, ChevronRight, Menu,
  Satellite, Box, Scan, Layers, Eye, 
  Move3d, Component, Leaf, Shield, Radio, MessageSquare,
  ShieldCheck, Building2, Factory, Store
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Login from '@/components/auth/Login';
import InfrastructureMap from '@/components/InfrastructureMap';

const LandingPage = () => {
  const { t } = useLanguage();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- LÓGICA DEL HERO DINÁMICO (Typewriter Effect) ---
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const messages = [
    "Blindar los Recursos Públicos.",
    "Automatizar la Industria 4.0.",
    "Monitorear el Territorio Nacional.",
    "Salvar Vidas con Datos.",
    "Construir la Colombia del Futuro."
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % messages.length;
      const fullText = messages[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, messages, typingSpeed]);
  
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-slate-900">
      
      {/* --- LOGIN MODAL --- */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowLoginModal(false)} className="absolute inset-0"></div>
          <div onClick={(e) => e.stopPropagation()} className="relative bg-slate-900 border border-slate-700 rounded-xl p-6 w-full max-w-md">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <div className="w-full max-w-sm mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 font-mono">INICIAR SESIÓN</h2>
                <p className="text-slate-400 text-sm font-mono">Acceso a Plataforma</p>
              </div>
              <Login />
            </div>
          </div>
        </div>
      )}
      
      {/* --- NAVBAR --- */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                <div className="w-4 h-4 bg-slate-950 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold tracking-tighter">ORBITAL <span className="text-cyan-400">PRIME</span></span>
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <a href="#vision-ai" className="hover:text-cyan-400 transition-colors px-3 py-2 text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                  <Scan size={14} className="text-cyan-400" /> Vision-AI
                </a>
                <a href="#earth" className="hover:text-cyan-400 transition-colors px-3 py-2 text-xs font-bold tracking-widest uppercase">Space & Earth</a>
                <a href="#gov" className="hover:text-cyan-400 transition-colors px-3 py-2 text-xs font-bold tracking-widest uppercase">GovTech</a>
                <a href="#tecnologia" className="hover:text-cyan-400 transition-colors px-3 py-2 text-xs font-bold tracking-widest uppercase">Infraestructura</a>
                <button 
                  onClick={() => {
                    const currentLang = localStorage.getItem('language') || 'es';
                    const newLang = currentLang === 'es' ? 'en' : 'es';
                    localStorage.setItem('language', newLang);
                    window.location.reload();
                  }}
                  className="text-cyan-400 hover:text-white px-3 py-2 text-xs font-bold tracking-widest uppercase flex items-center gap-1 transition-colors"
                >
                  <Globe size={14} /> {t('nav.language') || 'EN/ES'}
                </button>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-none border border-cyan-400 text-xs font-bold transition-all shadow-[0_0_15px_rgba(8,145,178,0.5)] uppercase"
                >
                  Acceso
                </button>
              </div>
            </div>
            <div className="-mr-2 flex lg:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-slate-950 border-t border-slate-800">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a 
                  href="#vision-ai" 
                  className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Vision-AI
                </a>
                <a 
                  href="#earth" 
                  className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Space & Earth
                </a>
                <a 
                  href="#gov" 
                  className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  GovTech
                </a>
                <a 
                  href="#tecnologia" 
                  className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-cyan-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Infraestructura
                </a>
                <button 
                  onClick={() => {
                    const currentLang = localStorage.getItem('language') || 'es';
                    const newLang = currentLang === 'es' ? 'en' : 'es';
                    localStorage.setItem('language', newLang);
                    window.location.reload();
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-cyan-400 hover:text-white transition-colors"
                >
                  {t('nav.language') || 'EN/ES'}
                </button>
                <button 
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-cyan-600 hover:bg-cyan-500 transition-colors"
                >
                  Acceso
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 lg:pb-24 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-800/50 mb-8 bg-slate-900/50 backdrop-blur-sm shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-cyan-400 text-xs font-mono tracking-[0.2em] uppercase">{t('hero.badge') || 'NEURAL INFRASTRUCTURE: ONLINE'}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Infraestructura de <br />
            <span className="text-white">Vigilancia Autónoma & Forense</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 min-h-[90px] block filter drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              {text}
              <span className="animate-blink text-cyan-200 ml-1">|</span>
            </span>
          </h1>
          
          <p className="mt-8 max-w-3xl mx-auto text-xl text-slate-300 mb-10 leading-relaxed font-light">
            Transforme su red actual de cámaras en un ecosistema de inteligencia militar. 
            <strong className="text-cyan-400">Sin cambiar hardware. Sin depender de sensores propietarios.</strong> 
            Detección, trazabilidad y auditoría jurídica en tiempo real.
            <span className="text-slate-500 text-sm mt-3 block font-mono">
              [ HARDWARE AGNOSTIC • FORENSIC LEDGER • 3D SPATIAL AWARENESS ]
            </span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button 
              onClick={() => document.getElementById('demo-piloto')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-cyan-500 text-slate-950 px-8 py-4 font-bold hover:bg-cyan-400 transition-all hover:scale-105 flex items-center justify-center gap-2 uppercase tracking-wide shadow-[0_0_30px_rgba(6,182,212,0.4)] rounded-sm"
            >
              Iniciar Protocolo de Piloto
              <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => document.getElementById('tecnologia')?.scrollIntoView({ behavior: 'smooth' })}
              className="group border border-slate-600 bg-slate-900/50 text-slate-300 px-8 py-4 font-semibold hover:bg-slate-800 hover:border-slate-500 transition-all flex items-center justify-center gap-2 uppercase tracking-wide rounded-sm backdrop-blur-md"
            >
              <Globe className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
              Ver Arquitectura Técnica
            </button>
          </div>
        </div>

        {/* Trust Bar - Compatibilidad */}
        <div className="w-full bg-slate-900/30 border-y border-slate-800 py-6">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center text-slate-500 text-xs uppercase tracking-widest mb-4">
              Compatible con infraestructura existente:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <span className="text-slate-400 font-mono text-sm opacity-70 hover:opacity-100 transition-opacity">ONVIF PROFILE S/G</span>
              <span className="text-slate-400 font-mono text-sm opacity-70 hover:opacity-100 transition-opacity">RTSP/H.264</span>
              <span className="text-slate-400 font-mono text-sm opacity-70 hover:opacity-100 transition-opacity">VMS INTEGRATION</span>
              <span className="text-slate-400 font-mono text-sm opacity-70 hover:opacity-100 transition-opacity">STANDARD PROTOCOLS</span>
              <span className="text-slate-400 font-mono text-sm opacity-70 hover:opacity-100 transition-opacity">ONVIF S/G</span>
            </div>
          </div>
        </div>

        {/* Efecto de Fondo "Matrix" Sutil */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
           {/* Luz ambiental */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        </div>
      </div>

      {/* --- SECTION: VISION-AI (INDUSTRIAL & CIVIL) --- */}
      <section id="vision-ai" className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Scanning Line Effect */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 animate-[scan_3s_ease-in-out_infinite]"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-2">{t('vision_ai.title') || 'Visión Artificial Industrial'}</div>
              <h2 className="text-4xl md:text-5xl font-bold text-white">Orbital <span className="text-cyan-400">Vision</span></h2>
              <p className="text-slate-400 mt-4 max-w-xl">
                {t('vision_ai.description') || 'Implementamos algoritmos de Visión 3D, Reconocimiento Volumétrico y Gemelos Digitales sobre infraestructura NVIDIA Metropolis y Google Cloud Vision para aplicaciones industriales y urbanas.'}
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded text-xs font-mono text-slate-300">
                <span className="text-green-400">●</span> PRECISION: 99.9%
              </div>
              <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded text-xs font-mono text-slate-300">
                <span className="text-cyan-400">●</span> LATENCY: &lt;5ms
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Hardware Agnostic (El Ahorro) */}
            <div className="group bg-slate-900/40 border border-slate-800 p-8 hover:bg-slate-900 hover:border-cyan-500 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Move3d size={80} />
              </div>
              <div className="w-12 h-12 bg-cyan-500/10 rounded flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Box size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400">Retrofit de Inteligencia</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                No compre cámaras nuevas. Orbital Prime se despliega sobre su NVR actual vía RTSP/ONVIF. Reduzca el costo de implementación en un 70% frente a soluciones de hardware cerrado.
              </p>
            </div>

            {/* Card 2: Forensic Ledger (La Ley) */}
            <div className="group bg-slate-900/40 border border-slate-800 p-8 hover:bg-slate-900 hover:border-purple-500 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Scan size={80} />
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Component size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400">Cadena de Custodia Digital</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Cada alerta genera un hash inmutable. Trazabilidad total para fiscalía, aseguradoras y auditoría interna. Su evidencia es válida ante la ley.
              </p>
            </div>

            {/* Card 3: 3D Spatial Awareness (La Tecnología) */}
            <div className="group bg-slate-900/40 border border-slate-800 p-8 hover:bg-slate-900 hover:border-emerald-500 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Layers size={80} />
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Eye size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400">Analítica Volumétrica sin LiDAR</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                Entendimiento espacial 3D usando cámaras 2D estándar. Detección de anomalías, conteo de flujo y mapas de calor en coordenadas reales (X,Y,Z).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: SPACE & EARTH (REEMPLAZA A DEFENSE) --- */}
      <section id="earth" className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-slate-700 flex-1"></div>
            <span className="text-slate-500 font-mono text-sm tracking-[0.3em]">{t('earth_solutions.title') || 'SOLUCIONES AMBIENTALES'}</span>
            <div className="h-px bg-slate-700 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* SATELITAL / MONITOREO */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-cyan-500/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <Satellite className="w-10 h-10 text-cyan-500" />
                <span className="text-xs bg-cyan-900/20 text-cyan-400 px-2 py-1 rounded">SATELLITE DATA</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Sentinel Sat</h3>
              <p className="text-slate-400 text-sm mb-4">
                {t('earth_solutions.satellite') || 'Análisis de métricas ambientales mediante datos satelitales. Monitoreo de ecosistemas, agricultura y cambio climático desde órbita.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-500 font-mono">
                <li>+ MONITOREO MARINO</li>
                <li>+ AGRICULTURA PRECISA</li>
              </ul>
            </div>

            {/* INDUSTRIAL / TWIN AI */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-purple-500/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <Box className="w-10 h-10 text-purple-500" />
                <span className="text-xs bg-purple-900/20 text-purple-400 px-2 py-1 rounded">SIMULATION</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Omniverse Twin</h3>
              <p className="text-slate-400 text-sm mb-4">
                {t('earth_solutions.digital_twins') || 'Gemelos Digitales (Digital Twins) para infraestructuras industriales y urbanas. Simulamos escenarios para optimizar operaciones y prevenir problemas en entornos reales.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-500 font-mono">
                <li>+ SIMULACIÓN INDUSTRIAL</li>
                <li>+ MANTENIMIENTO PREDICTIVO</li>
              </ul>
            </div>

             {/* AMBIENTAL / PROTECCIÓN */}
             <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-emerald-500/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <Leaf className="w-10 h-10 text-emerald-500" />
                <span className="text-xs bg-emerald-900/20 text-emerald-400 px-2 py-1 rounded">ECOLOGICAL</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">EcoGuard</h3>
              <p className="text-slate-400 text-sm mb-4">
                {t('earth_solutions.ecoguard') || 'Monitoreo de biodiversidad y alertas tempranas para prevención de incendios forestales. IA para conservación de ecosistemas.'}
              </p>
              <ul className="space-y-2 text-xs text-slate-500 font-mono">
                <li>+ MONITOREO FORESTAL</li>
                <li>+ SEGUIMIENTO ECOLÓGICO</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION: GOVTECH --- */}
      <section id="gov" className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-slate-700 flex-1"></div>
            <span className="text-slate-500 font-mono text-sm tracking-[0.3em] uppercase">{t('govtech.title_tag') || 'GOVTECH'}</span>
            <div className="h-px bg-slate-700 flex-1"></div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('govtech.title') || 'GovTech & Servicios Públicos'}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              {t('govtech.description') || 'Soluciones para la administración pública y el bienestar social.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Health */}
            <div className="group bg-slate-900/40 border border-slate-800 p-8 hover:bg-slate-900 hover:border-cyan-500 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Activity size={80} />
              </div>
              <div className="w-12 h-12 bg-cyan-500/10 rounded flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{t('govtech.health_title') || 'Orbital Health'}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {t('govtech.health_description') || 'Plataforma de Salud Digital, Asistente Médico IA e Interoperabilidad.'}
              </p>
            </div>

            {/* Education */}
            <div className="group bg-slate-900/40 border border-slate-800 p-8 hover:bg-slate-900 hover:border-purple-500 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <GraduationCap size={80} />
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{t('govtech.education_title') || 'Orbital University'}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {t('govtech.education_description') || 'Educación Digital y Universidad Corporativa con Tutores IA.'}
              </p>
            </div>

            {/* Customer Service */}
            <div className="group bg-slate-900/40 border border-slate-800 p-8 hover:bg-slate-900 hover:border-green-500 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <MessageSquare size={80} />
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{t('govtech.service_title') || 'OmniChannel AI'}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {t('govtech.service_description') || 'Atención al ciudadano automatizada en WhatsApp, Web y Teléfono.'}
              </p>
            </div>

            {/* Audit */}
            <div className="group bg-slate-900/40 border border-slate-800 p-8 hover:bg-slate-900 hover:border-blue-500 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Search size={80} />
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{t('govtech.audit_title') || 'Forensic Audit'}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                {t('govtech.audit_description') || 'Auditoría Forense de Datos y Análisis de Mercado.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION: USE CASES B2B --- */}
      <section className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Despliegue Operativo</h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg">
              Soluciones específicas para sectores estratégicos con impacto inmediato en ROI y cumplimiento normativo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-cyan-500/50 transition-all group">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500/10 rounded flex items-center justify-center text-cyan-400">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">🏛️ Gobierno & Smart Cities</h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Detección de comportamientos atípicos en espacio público, gestión de tráfico y protección de infraestructura crítica.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-purple-500/50 transition-all group">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded flex items-center justify-center text-purple-400">
                  <Factory size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">🏭 Industria 4.0 & Minería</h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Control de EPP (Cascos/Chalecos), zonas de exclusión (Geofencing) y detección de fatiga en operadores.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-emerald-500/50 transition-all group">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-500/10 rounded flex items-center justify-center text-emerald-400">
                  <Store size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">🏬 Retail & Banca</h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Prevención de pérdidas, análisis de flujo de clientes y seguridad perimetral nocturna automatizada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: INFRASTRUCTURE MAP --- */}
      <InfrastructureMap />

      {/* --- CONTACT SECTION --- */}
      <section id="contacto" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">{t('contact.title') || 'Contacto & Soporte'}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {t('contact.description') || '¿Tiene preguntas sobre nuestra infraestructura o soluciones? Nuestro equipo de expertos está listo para ayudarle.'}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">{t('contact.form_title') || 'Formulario de Contacto'}</h3>
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                              
                // Obtener datos del formulario
                const formData = new FormData(e.target as HTMLFormElement);
                const nombre = formData.get('nombre') as string;
                const email = formData.get('email') as string;
                const asunto = formData.get('asunto') as string;
                const mensaje = formData.get('mensaje') as string;
                              
                // Mostrar estado de carga
                const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<div class="flex items-center gap-2"><div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Enviando...</div>';
                submitButton.disabled = true;
                              
                try {
                  // Enviar datos a la API
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      nombre,
                      email,
                      asunto,
                      mensaje
                    })
                  });
                                
                  const result = await response.json();
                                
                  if (result.success) {
                    // Mostrar mensaje de éxito
                    submitButton.innerHTML = originalText;
                    submitButton.classList.add('bg-emerald-600', 'hover:bg-emerald-500');
                    submitButton.innerHTML = '✅ ¡Mensaje Enviado!';
                                  
                    // Mostrar notificación
                    alert(result.message + '\n\n' + (result.details || '') + (result.fallback ? '\n\nSe abrirá tu cliente de correo.' : ''));
                                  
                    // Si es fallback, abrir cliente de correo
                    if (result.fallback && result.mailtoLink) {
                      window.location.href = result.mailtoLink;
                    }
                                  
                    // Resetear formulario después de 2 segundos
                    setTimeout(() => {
                      (e.target as HTMLFormElement).reset();
                      submitButton.classList.remove('bg-emerald-600', 'hover:bg-emerald-500');
                      submitButton.innerHTML = originalText;
                      submitButton.disabled = false;
                    }, 2000);
                  } else {
                    throw new Error(result.error);
                  }
                } catch (error) {
                  console.error('Error al enviar el formulario:', error);
                  submitButton.innerHTML = originalText;
                  submitButton.disabled = false;
                  alert('❌ Error al enviar el mensaje. Por favor inténtalo de nuevo.');
                }
              }}>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('contact.full_name') || 'Nombre Completo'}</label>
                  <input 
                    type="text" 
                    name="nombre"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white" 
                    placeholder={t('contact.name_placeholder') || 'Juan Pérez'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('contact.email') || 'Correo Electrónico'}</label>
                  <input 
                    type="email" 
                    name="email"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white" 
                    placeholder={t('contact.email_placeholder') || 'juan@empresa.com'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('contact.subject') || 'Asunto'}</label>
                  <input 
                    type="text" 
                    name="asunto"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white" 
                    placeholder={t('contact.subject_placeholder') || 'Consulta sobre soluciones empresariales'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">{t('contact.message') || 'Mensaje'}</label>
                  <textarea 
                    rows={5}
                    name="mensaje"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white" 
                    placeholder={t('contact.message_placeholder') || 'Escriba su mensaje aquí...'}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(8,145,178,0.5)]"
                >
                  {t('contact.send_message') || 'Enviar Mensaje'}
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">{t('contact.info_title') || 'Información de Contacto'}</h3>
              
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="bg-cyan-900/20 p-6 rounded-xl border border-cyan-800/50">
                    <Radio size={32} className="text-cyan-400 mx-auto mb-4" />
                    <h4 className="font-bold text-white text-lg mb-2">Contacto Directo</h4>
                    <p className="text-slate-400 text-sm mb-4">
                      {t('contact.description') || 'Complete el formulario y nuestro equipo se comunicará con usted pronto.'}
                    </p>
                    <p className="text-cyan-400 font-mono text-sm">
                      📧 alejandor@orbitalprime.com.co
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800">
                <h4 className="font-bold text-white mb-4">{t('contact.offices_title') || 'Oficinas'}</h4>
                <div className="space-y-3 text-sm text-slate-400">
                  <p><span className="text-cyan-400">Cali, Valle del Cauca - Colombia:</span> Edificio Empresarial, Piso 12</p>
                  <p><span className="text-cyan-400">Bogotá, D.C. - Colombia:</span> Zona Financiera, Torre Cúbica</p>
                  <p><span className="text-cyan-400">Miami, FL - USA:</span> Doral Executive Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CLOSING CTA SECTION --- */}
      <section id="demo-piloto" className="py-20 bg-gradient-to-br from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Habilite su Piloto Controlado
          </h2>
          
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
            Orbital Prime trabaja con cupos de integración limitados por trimestre 
            para garantizar la estabilidad operativa de nuestros socios.
          </p>

          <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">70%</div>
                <div className="text-sm text-slate-400">Reducción de costos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">&lt;24h</div>
                <div className="text-sm text-slate-400">Implementación piloto</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-400 mb-2">ISO 27001</div>
                <div className="text-sm text-slate-400">Cumplimiento forense</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <a 
              href="mailto:gerencia@orbitalprime.com.co?subject=Solicitud%20Piloto%20Corporativo&body=Nombre:%0AEmpresa/Entidad:%0ANúmero%20de%20Cámaras:%0A" 
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 px-10 py-5 font-bold text-lg rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_30px_rgba(8,145,178,0.6)] transform hover:scale-105"
            >
              Solicitar Validación de Proyecto
            </a>
            <p className="text-slate-500 text-sm mt-4">
              Respuesta técnica en &lt; 24 horas.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" /> SLA 99.9%
            </span>
            <span className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-500" /> Azure Government
            </span>
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-purple-500" /> NVIDIA A100
            </span>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-slate-950 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-bold tracking-tighter">ORBITAL <span className="text-cyan-400">PRIME</span></span>
              </div>
              <p className="text-slate-500 text-sm">
                {t('footer.description') || 'Sistemas de IA y cómputo predictivo para clínicas, gobierno y corporaciones en LATAM.'}
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">{t('footer.solutions') || 'Soluciones'}</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#earth" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.environmental') || 'Monitoreo Ambiental'}</a></li>
                <li><a href="#space" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.space') || 'Espacio & Satelital'}</a></li>
                <li><a href="#gov" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.govtech') || 'GovTech & Ciudad'}</a></li>
                <li><a href="#tecnologia" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.enterprise') || 'Empresas & Simulación'}</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">{t('footer.support') || 'Soporte'}</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#contacto" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.contact') || 'Contacto'}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.documentation') || 'Documentación'}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.api') || 'API'}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.status') || 'Estado del Sistema'}</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">{t('footer.legal') || 'Legal'}</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.terms') || 'Términos de Servicio'}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.privacy') || 'Política de Privacidad'}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.compliance') || 'Cumplimiento'}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">{t('footer.certifications') || 'Certificaciones'}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
                <Cpu className="w-4 h-4" /> NVIDIA INCEPTION
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-purple-400">
                <Server className="w-4 h-4" /> MICROSOFT AZURE
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-green-400">
                <ShieldCheck className="w-4 h-4" /> ISO 27001
              </div>
            </div>
            
            <div className="text-center md:text-right mt-4 md:mt-0">
              <p className="text-slate-500 text-sm font-mono mb-1">{t('footer.copyright') || 'SISTEMAS ORBITAL PRIME © 2026'}</p>
              <p className="text-slate-600 text-xs font-mono">{t('footer.rights') || 'TODOS LOS DERECHOS RESERVADOS'}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;