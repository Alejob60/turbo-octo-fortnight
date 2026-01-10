'use client';

import React, { useState, useEffect } from 'react';
import { 
  Activity, ShieldCheck, GraduationCap, Search, 
  Server, Cpu, Globe, ChevronRight, Menu,
  Satellite, Crosshair, MessageSquare, Box, 
  Scan, Layers, Eye, Move3d, Component, Radio, X, Wifi, Lock, Shield
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import Login from '@/components/auth/Login';
import InfrastructureMap from '@/components/InfrastructureMap';

const LandingPage = () => {
  const { t } = useLanguage();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // --- LÓGICA DEL HERO DINÁMICO (Typewriter Effect) ---
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const messages = [
    "Mejorar la Calidad de Vida.",
    "Defender la Soberanía Nacional.",
    "Predecir el Futuro con Datos Satelitales.",
    "Revolucionar la Salud Pública.",
    "Automatizar Operaciones Militares."
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % messages.length;
      const fullText = messages[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
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
                <p className="text-slate-400 text-sm font-mono">Acceso a GovTech</p>
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
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#defense" className="hover:text-cyan-400 transition-colors px-3 py-2 text-xs font-bold tracking-widest uppercase">Defense</a>
                <a href="#space" className="hover:text-cyan-400 transition-colors px-3 py-2 text-xs font-bold tracking-widest uppercase">Space</a>
                <a href="#gov" className="hover:text-cyan-400 transition-colors px-3 py-2 text-xs font-bold tracking-widest uppercase">GovTech</a>
                <a href="#tecnologia" className="hover:text-cyan-400 transition-colors px-3 py-2 text-xs font-bold tracking-widest uppercase">Enterprise</a>
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-none border border-cyan-400 text-xs font-bold transition-all shadow-[0_0_15px_rgba(8,145,178,0.5)] uppercase">
                  Acceso Seguro
                </button>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-400 hover:text-white p-2">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pb-24 overflow-hidden flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-800/50 mb-8 bg-slate-900/50 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-cyan-400 text-xs font-mono tracking-widest uppercase">SYSTEMS ONLINE: V.4.0.2</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Alta Tecnología para <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 min-h-[80px] block">
              {text}
              <span className="animate-blink text-white">|</span>
            </span>
          </h1>
          
          <p className="mt-8 max-w-2xl mx-auto text-xl text-slate-400 mb-10 leading-relaxed">
            Desde la <strong>salud rural</strong> hasta la <strong>defensa aeroespacial</strong>. <br/>
            Construimos la infraestructura crítica que potencia naciones y protege vidas.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-slate-950 px-8 py-4 font-bold hover:bg-cyan-50 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide">
              Explorar Divisiones
              <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setShowLoginModal(true)}
              className="border border-slate-700 text-slate-300 px-8 py-4 font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <Crosshair className="w-5 h-5" />
              Acceso GovTech
            </button>
          </div>
        </div>

        {/* Efecto de Red Global de Fondo */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
      </div>

      {/* --- SECTION: ORBITAL DEFENSE & SPACE (LO NUEVO) --- */}
      <section id="defense" className="py-20 bg-slate-950 border-t border-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-slate-700 flex-1"></div>
            <span className="text-slate-500 font-mono text-sm tracking-[0.3em]">DIVISIONES ESTRATÉGICAS</span>
            <div className="h-px bg-slate-700 flex-1"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* MILITAR / DRONES */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-red-500/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <Crosshair className="w-10 h-10 text-red-500" />
                <span className="text-xs bg-red-900/20 text-red-400 px-2 py-1 rounded">RESTRICTED</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Orbital Defense</h3>
              <p className="text-slate-400 text-sm mb-4">
                IA Táctica para drones autónomos y sistemas de defensa. Automatización de reconocimiento y neutralización de amenazas en territorio hostil.
              </p>
              <ul className="space-y-2 text-xs text-slate-500 font-mono">
                <li>+ SWARM INTELLIGENCE</li>
                <li>+ TARGET ACQUISITION</li>
              </ul>
            </div>

            {/* ESPACIO / SATÉLITES */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-cyan-500/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <Satellite className="w-10 h-10 text-cyan-500" />
                <span className="text-xs bg-cyan-900/20 text-cyan-400 px-2 py-1 rounded">SATELLITE DATA</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Sentinel Sat</h3>
              <p className="text-slate-400 text-sm mb-4">
                Análisis de métricas mediante datos satelitales. Predicción de crecimiento de ecosistemas marítimos y monitoreo de cambio climático desde órbita.
              </p>
              <ul className="space-y-2 text-xs text-slate-500 font-mono">
                <li>+ MARITIME ANALYTICS</li>
                <li>+ CROP PREDICTION</li>
              </ul>
            </div>

             {/* ENTERPRISE / TWIN AI */}
             <div className="bg-slate-900/50 border border-slate-800 p-8 hover:border-purple-500/50 transition-all group">
              <div className="flex justify-between items-start mb-6">
                <Box className="w-10 h-10 text-purple-500" />
                <span className="text-xs bg-purple-900/20 text-purple-400 px-2 py-1 rounded">SIMULATION</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Omniverse Twin</h3>
              <p className="text-slate-400 text-sm mb-4">
                Gemelos Digitales (Digital Twins) para infraestructuras críticas. Simulamos escenarios de crisis en entornos virtuales antes de que ocurran en la realidad.
              </p>
              <ul className="space-y-2 text-xs text-slate-500 font-mono">
                <li>+ INDUSTRIAL METAVERSE</li>
                <li>+ PREDICTIVE MAINTENANCE</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION: GOVTECH (LO QUE YA TENÍAMOS) --- */}
      <section id="gov" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Infraestructura Civil & Gobierno</h2>
            <p className="text-slate-400">Soluciones desplegadas para la administración pública y el bienestar social.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Health */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/30 transition-all">
              <Activity className="w-8 h-8 text-cyan-500 mb-4" />
              <h4 className="text-lg font-bold mb-2">Orbital Health</h4>
              <p className="text-sm text-slate-400">Red Nacional de Salud, Copiloto Médico IA e Interoperabilidad.</p>
            </div>

            {/* Education */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-yellow-500/30 transition-all">
              <GraduationCap className="w-8 h-8 text-yellow-500 mb-4" />
              <h4 className="text-lg font-bold mb-2">Orbital University</h4>
              <p className="text-sm text-slate-400">Soberanía Educativa y Universidad Corporativa con Tutores IA.</p>
            </div>

            {/* Customer Service */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-green-500/30 transition-all">
              <MessageSquare className="w-8 h-8 text-green-500 mb-4" />
              <h4 className="text-lg font-bold mb-2">OmniChannel AI</h4>
              <p className="text-sm text-slate-400">Atención ciudadana automatizada en WhatsApp, Web y Teléfono.</p>
            </div>

            {/* Audit */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/30 transition-all">
              <Search className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="text-lg font-bold mb-2">Forensic Audit</h4>
              <p className="text-sm text-slate-400">Auditoría Forense de Datos e Inteligencia Competitiva.</p>
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
            <h2 className="text-3xl font-bold mb-4 text-white">Contacto & Soporte</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              ¿Tiene preguntas sobre nuestra infraestructura o soluciones? Nuestro equipo de expertos está listo para ayudarle.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Formulario de Contacto</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white" 
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white" 
                    placeholder="juan@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Asunto</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white" 
                    placeholder="Consulta sobre soluciones gubernamentales"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Mensaje</label>
                  <textarea 
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white" 
                    placeholder="Escriba su mensaje aquí..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-3 px-6 rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(8,145,178,0.5)]"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-900/30 p-3 rounded-lg text-cyan-400">
                    <Radio size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Soporte Técnico</h4>
                    <p className="text-slate-400 text-sm">Atención 24/7 para clientes con soluciones implementadas</p>
                    <p className="text-cyan-400 text-sm mt-1">soporte@orbitalprime.com.co</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-900/30 p-3 rounded-lg text-purple-400">
                    <Server size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Ventas & Negocios</h4>
                    <p className="text-slate-400 text-sm">Solicite una demostración o cotización de nuestras soluciones</p>
                    <p className="text-purple-400 text-sm mt-1">ventas@orbitalprime.com.co</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-900/30 p-3 rounded-lg text-green-400">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Seguridad & Cumplimiento</h4>
                    <p className="text-slate-400 text-sm">Consultas sobre estándares de seguridad y certificaciones</p>
                    <p className="text-green-400 text-sm mt-1">seguridad@orbitalprime.com.co</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800">
                <h4 className="font-bold text-white mb-4">Oficinas</h4>
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
                Sistemas de IA de grado militar y cómputo predictivo para clínicas, gobierno y corporaciones en LATAM.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Soluciones</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#defense" className="text-slate-400 hover:text-cyan-400 transition-colors">Defensa & Seguridad</a></li>
                <li><a href="#space" className="text-slate-400 hover:text-cyan-400 transition-colors">Espacio & Satelital</a></li>
                <li><a href="#gov" className="text-slate-400 hover:text-cyan-400 transition-colors">GovTech & Ciudad</a></li>
                <li><a href="#tecnologia" className="text-slate-400 hover:text-cyan-400 transition-colors">Empresas & Simulación</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Soporte</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#contacto" className="text-slate-400 hover:text-cyan-400 transition-colors">Contacto</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Documentación</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">API</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Estado del Sistema</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Términos de Servicio</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Cumplimiento</a></li>
                <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Certificaciones</a></li>
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
                <ShieldCheck className="w-4 h-4" /> GOV. COMPLIANT
              </div>
            </div>
            
            <div className="text-center md:text-right mt-4 md:mt-0">
              <p className="text-slate-500 text-sm font-mono mb-1">SISTEMAS ORBITAL PRIME © 2026</p>
              <p className="text-slate-600 text-xs font-mono">TODOS LOS DERECHOS RESERVADOS</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;