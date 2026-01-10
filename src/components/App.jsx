import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Activity, ChevronRight, Zap, Server, Globe } from 'lucide-react';
import LoginModal from './LoginModal'; // ASEGÚRATE QUE ESTA RUTA SEA CORRECTA
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

// --- COMPONENTES UI ---

const StatusBadge = ({ label, status = "on" }) => (
  <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-slate-800/60 rounded-full bg-slate-950/50 backdrop-blur-md">
    <div className={`w-1.5 h-1.5 rounded-full ${status === 'on' ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-amber-500'}`} />
    <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">{label}</span>
  </div>
);

const ServiceCard = ({ icon: Icon, title, subtitle, description, features }) => (
  <motion.div 
    whileHover={{ scale: 1.01, borderColor: 'rgba(6,182,212,0.5)' }}
    className="relative p-8 border border-slate-800 bg-gradient-to-b from-slate-900/20 to-[#050505] backdrop-blur-sm group overflow-hidden rounded-sm flex flex-col h-full"
  >
    {/* Glow Effect on Hover */}
    <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="p-3 bg-cyan-950/30 border border-cyan-900/50 rounded-sm text-cyan-400">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <span className="text-[10px] font-mono text-cyan-300/70 border border-cyan-900/30 bg-cyan-950/20 px-3 py-1 uppercase tracking-widest rounded-full">{subtitle}</span>
    </div>
    
    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight relative z-10">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed mb-8 relative z-10 flex-grow">{description}</p>
    
    {/* Lista de características */}
    <ul className="space-y-3 mb-8 relative z-10">
      {features.map((feature, idx) => (
        <li key={idx} className="text-xs text-slate-300 font-mono flex items-center gap-2">
          <ChevronRight size={12} className="text-cyan-500" /> {feature}
        </li>
      ))}
    </ul>

    <div className="mt-auto flex items-center text-cyan-400 text-xs font-bold tracking-widest opacity-80 group-hover:opacity-100 transition-all relative z-10">
      <span>INITIALIZE PROTOCOL</span>
      <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
    </div>
  </motion.div>
);

// --- APP PRINCIPAL ---

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [formData, setFormData] = useState({
    accessId: '',
    corporateEntity: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const { t } = useLanguage();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Enviar datos al backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'alejandro@orbitalprime.com.co'
        })
      });
      
      if (response.ok) {
        setSubmitMessage('Solicitud enviada con éxito. Nos pondremos en contacto contigo pronto.');
        // Resetear formulario
        setFormData({
          accessId: '',
          corporateEntity: '',
          email: ''
        });
      } else {
        throw new Error('Error al enviar la solicitud');
      }
    } catch (error) {
      setSubmitMessage('Error al enviar la solicitud. Por favor inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Efecto de scroll suave para los anclajes
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-cyan-500/30 selection:text-black overflow-x-hidden">
      
      {/* BACKGROUND FX */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#030303]/90 to-[#030303] pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[100px] pointer-events-none" />

      {/* NAVBAR VERSIÓN MINIMALISTA (SOLO ESTADO) */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/80 bg-[#030303]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#030303]/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <div className="relative">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="text-cyan-400 relative z-10 transition-transform group-hover:scale-110">
                <path d="M20 5L35 30H5L20 5Z" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="20" cy="20" r="4" fill="white" />
              </svg>
              <div className="absolute inset-0 bg-cyan-400 blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
            </div>
            <span className="font-bold tracking-[0.25em] text-xs md:text-sm hidden sm:block text-slate-100">
              ORBITAL PRIME <span className="text-slate-600">:: SYS.ZERO</span>
            </span>
          </div>

          {/* DERECHA: ESTADO Y BOTÓN DE IDIOMA */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <div className="hidden sm:flex gap-3">
              <StatusBadge label={t('nav.nvidia_cores_active')} status="on" />
              <div className="hidden md:block">
                 <StatusBadge label={t('nav.azure_secure')} status="on" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-32 pt-12">
            <div>
              <div className="inline-flex items-center gap-4 mb-4">
                <div className="text-cyan-400 font-mono font-bold text-sm tracking-widest">ORBITAL PRIME</div>
                <div className="h-6 w-px bg-slate-800" />
                <StatusBadge label="SYSTEM" status="on" />
                <StatusBadge label="NEURAL-NET" status="on" />
                <StatusBadge label="SECURE" status="on" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold max-w-3xl leading-tight">
                <span className="text-white">{t('app.hero_title')}</span> <br />
                <span className="text-cyan-400">{t('app.hero_subtitle')}</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mt-6 max-w-2xl">
                {t('app.hero_description')} <span className="text-cyan-400 font-bold">{t('app.hero_ai')}</span>.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-w-fit">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-cyan-500/30"
              >
                {t('app.system_access')}
              </button>
              <div className="text-center md:text-right">
                <p className="text-xs text-slate-500 font-mono tracking-widest">
                  <span className="text-cyan-400">NVIDIA</span> INCEPTION • <span className="text-cyan-400">AZURE</span> GOV
                </p>
              </div>
            </div>
          </header>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y border-slate-800/50 py-12">
            {[
              { value: "< 20ms", label: t('app.stats_latency') },
              { value: "99.99%", label: t('app.stats_uptime') },
              { value: "T-IER 4", label: t('app.stats_security') },
              { value: t('app.stats_region_value'), label: t('app.stats_region') },
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-2xl font-mono text-white mb-1">{stat.value}</div>
                <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* SERVICES */}
          <div className="mb-32">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-4">
              <span className="w-2 h-8 bg-cyan-500" />
              {t('app.suite_title')}
            </h2>
            <p className="text-slate-500 mb-12 text-sm font-mono">
              {t('app.suite_description')}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <ServiceCard 
                icon={Activity}
                title="Orbital Vision"
                subtitle="SEGURIDAD CIUDADANA"
                description="Transformamos cámaras convencionales en sensores inteligentes. Detección de rostros, placas y comportamientos anómalos en tiempo real."
                features={["Código PAA: 666-669"]}
              />
              <ServiceCard 
                icon={Zap}
                title="Orbital Flow"
                subtitle="MOVILIDAD INTELIGENTE"
                description="Análisis de movilidad y detección automática de infracciones. Optimización de semáforos y reducción de congestión sin agentes en vía."
                features={["Código PAA: 3160"]}
              />
              <ServiceCard 
                icon={Globe}
                title="Orbital Legal"
                subtitle="ADMINISTRACIÓN PÚBLICA"
                description="IA Generativa para la redacción masiva de cobros coactivos y respuestas a derechos de petición. Su despacho jurídico, automatizado."
                features={["Código PAA: 1908"]}
              />
              <ServiceCard 
                icon={Shield}
                title="Orbital Sentinel"
                subtitle="GESTIÓN DEL RIESGO"
                description="Monitoreo ambiental temprano (DGRD). Vigilancia de niveles de ríos y detección de humo en laderas mediante visión artificial."
                features={["Código PAA: 2169"]}
              />
              <ServiceCard 
                icon={Server}
                title="API Gateway CINCO"
                subtitle="INTEROPERABILIDAD"
                description='Módulo de interoperabilidad diseñado para alimentar el software "CINCO" con data procesada. Somos el motor de IA de su centro de control.'
                features={["Proyecto: 1796"]}
              />
              <ServiceCard 
                icon={Cpu}
                title={t('app.suite_orbital_data_title')}
                subtitle={t('app.suite_orbital_data_subtitle')}
                description={t('app.suite_orbital_data_description')}
                features={[t('app.suite_orbital_data_feature')]}
              />
            </div>
          </div>

          {/* PARTNERS */}
          <div className="mb-32">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <span className="w-2 h-8 bg-cyan-500" />
              {t('app.technology_partners')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-slate-800 bg-gradient-to-b from-slate-900/20 to-[#050505] backdrop-blur-sm p-8 text-center rounded-sm">
                <div className="text-4xl mb-4">VIDIA</div>
                <h3 className="text-xl font-bold text-white mb-2">NVIDIA</h3>
                <p className="text-slate-400 text-sm">{t('app.nvidia_program')}</p>
              </div>
              
              <div className="border border-slate-800 bg-gradient-to-b from-slate-900/20 to-[#050505] backdrop-blur-sm p-8 text-center rounded-sm">
                <div className="text-4xl mb-4">FT</div>
                <h3 className="text-xl font-bold text-white mb-2">Microsoft</h3>
                <p className="text-slate-400 text-sm">{t('app.microsoft_program')}</p>
              </div>
              
              <div className="border border-slate-800 bg-gradient-to-b from-slate-900/20 to-[#050505] backdrop-blur-sm p-8 text-center rounded-sm">
                <div className="text-4xl mb-4">LE</div>
                <h3 className="text-xl font-bold text-white mb-2">Google</h3>
                <p className="text-slate-400 text-sm">{t('app.google_program')}</p>
              </div>
            </div>
          </div>

          {/* FOOTER FORM */}
          <div className="max-w-3xl mx-auto border border-slate-800 bg-gradient-to-b from-slate-900/20 to-[#050505] backdrop-blur-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            
            <h3 className="text-2xl font-bold mb-6 font-mono">{t('app.init_partnership')}</h3>
            <p className="text-slate-400 mb-8 text-sm">
              {t('app.partnership_desc')}
            </p>

            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="accessId" 
                  placeholder={t('app.access_id_placeholder')} 
                  value={formData.accessId}
                  onChange={handleChange}
                  className="bg-[#050505] border border-slate-800 p-4 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 outline-none text-white font-mono w-full" 
                />
                <input 
                  type="text" 
                  name="corporateEntity" 
                  placeholder={t('app.corporate_entity_placeholder')} 
                  value={formData.corporateEntity}
                  onChange={handleChange}
                  className="bg-[#050505] border border-slate-800 p-4 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 outline-none text-white font-mono w-full" 
                />
              </div>
              <input 
                type="email" 
                name="email" 
                placeholder={t('app.email_channel_placeholder')} 
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#050505] border border-slate-800 p-4 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 outline-none text-white font-mono" 
              />
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-bold p-4 border border-cyan-500/30 transition-colors tracking-widest text-sm flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div> {t('app.transmit_request')}...
                  </>
                ) : (
                  <>
                    <Zap size={16} /> {t('app.transmit_request')}
                  </>
                )}
              </button>
              
              {submitMessage && (
                <div className={`mt-4 p-3 rounded-sm text-center text-sm ${submitMessage.includes('éxito') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

        </div>
      </main>
      
      {/* FOOTER */}
      <footer className="border-t border-slate-900/50 py-12 text-center text-xs text-slate-600 font-mono">
        <p>{t('app.footer_copyright')}</p>
        <p className="mt-2">{t('app.footer_location')}</p>
      </footer>
      
      {/* MODAL DE LOGIN */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}