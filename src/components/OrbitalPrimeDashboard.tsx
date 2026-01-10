'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Activity, FileText, Target, AlertTriangle, 
  TrendingUp, TrendingDown, User, Cpu, Eye, 
  Shield, Zap, Server, Menu, X 
} from 'lucide-react';
import TerminalShell from './TerminalShell';

const OrbitalPrimeDashboard = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Efecto para manejar el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    handleResize(); // Ejecutar al cargar
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sections = [
    { id: 'dashboard', label: t('admin_os.dashboard'), icon: Activity },
    { id: 'contratos', label: t('admin_os.gestion_contractual'), icon: FileText },
    { id: 'competencia', label: t('admin_os.inteligencia_competitiva'), icon: Target },
    { id: 'alertas', label: t('admin_os.centro_alertas'), icon: AlertTriangle, badge: 3 }
  ];

  // --- RENDERIZADO DEL DASHBOARD PRINCIPAL ---
  const renderDashboard = () => (
    <div className="h-full flex flex-col gap-6">
      
      {/* KPI CARDS SUPERIORES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-sm flex items-center justify-between group hover:border-cyan-500/50 transition-all">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Incidentes (24h)</div>
            <div className="text-2xl font-bold text-white group-hover:text-cyan-400">12</div>
          </div>
          <AlertTriangle className="text-yellow-500 group-hover:animate-pulse" size={20} />
        </div>
        
        <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-sm flex items-center justify-between group hover:border-green-500/50 transition-all">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Recaudo IA</div>
            <div className="text-2xl font-bold text-white group-hover:text-green-400">$45M</div>
          </div>
          <TrendingUp className="text-green-500" size={20} />
        </div>
        
        <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-sm flex items-center justify-between group hover:border-purple-500/50 transition-all">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Cámaras Activas</div>
            <div className="text-2xl font-bold text-white group-hover:text-purple-400">196/200</div>
          </div>
          <Eye className="text-purple-500" size={20} />
        </div>

        <div className="bg-slate-900/50 border border-slate-700 p-4 rounded-sm flex items-center justify-between group hover:border-red-500/50 transition-all">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Amenazas</div>
            <div className="text-2xl font-bold text-white group-hover:text-red-400">0</div>
          </div>
          <Shield className="text-emerald-500" size={20} />
        </div>
      </div>

      {/* ÁREA DE CONTENIDO */}
      <div className="flex-1 bg-slate-950 border border-slate-800 rounded-sm p-6">
        <div className="h-full flex items-center justify-center text-slate-500">
          <div className="text-center">
            <Server className="mx-auto mb-4 text-slate-600" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Sistema de Visualización Táctica</h3>
            <p>Panel de control central de Orbital Prime</p>
            <p className="text-sm mt-2">Seleccione una sección del menú para navegar</p>
          </div>
        </div>
      </div>
    </div>
  );

  // --- RENDERIZADO DE OTRAS SECCIONES ---
  const renderSection = (sectionId: string) => {
    switch(sectionId) {
      case 'dashboard':
        return renderDashboard();
      case 'contratos':
        return (
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Gestión Contractual</h2>
            <p>Contenido de la sección de gestión contractual...</p>
          </div>
        );
      case 'competencia':
        return (
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Inteligencia Competitiva</h2>
            <p>Contenido de la sección de inteligencia competitiva...</p>
          </div>
        );
      case 'alertas':
        return (
          <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Centro de Alertas</h2>
            <p>Contenido de la sección de alertas...</p>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans flex flex-col md:flex-row">
      {/* SIDEBAR NAVEGACIÓN */}
      <div 
        className={`fixed md:relative z-30 inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-slate-900 rounded-full animate-pulse"></div>
              </div>
              <span className="text-lg font-bold">ORBITAL <span className="text-cyan-400">PRIME</span></span>
            </div>
            <button 
              className="md:hidden text-slate-400 hover:text-white p-2"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-2 text-xs text-slate-500 font-mono">
            ADMIN OS v2.1.4
          </div>
        </div>

        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => {
                    setActiveSection(section.id);
                    if (window.innerWidth < 768) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full text-left px-4 py-3 text-xs rounded-sm transition-all font-mono tracking-wider border border-slate-700 ${
                    activeSection === section.id
                      ? 'bg-cyan-900/30 border-cyan-500/50 text-cyan-400'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-cyan-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <section.icon size={14} />
                      {section.label}
                    </div>
                    {section.badge && (
                      <span className="bg-red-500 text-xs text-white px-1.5 py-0.5 rounded-full">
                        {section.badge}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* TERMINAL SHELL */}
        <div className="border-t border-slate-800">
          <TerminalShell />
        </div>

        {/* BOTÓN DE CIERRE DE SESIÓN */}
        <div className="p-2 border-t border-slate-800">
          <button
            onClick={async () => {
              try {
                await logout();
                window.location.href = '/';
              } catch (error) {
                console.error('Error during logout:', error);
                window.location.href = '/';
              }
            }}
            className="w-full text-left px-4 py-2 text-xs text-slate-400 hover:bg-slate-800/50 hover:text-cyan-400 transition-all font-mono tracking-wider border border-slate-700 rounded-sm"
          >
            <div className="flex items-center gap-2">
              <Zap size={14} />
              {t('admin_os.cerrar_sesion') || 'Cerrar Sesión'}
            </div>
          </button>
        </div>
      </div>

      {/* Overlay para móviles */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col md:ml-0" style={{ marginLeft: sidebarOpen ? '16rem' : '0' }}>
        {/* HEADER */}
        <header className="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-slate-400 hover:text-white p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-cyan-400">
                {sections.find(s => s.id === activeSection)?.label || 'DASHBOARD'}
              </h1>
              <div className="text-xs text-slate-500 font-mono">
                {user?.email || 'Usuario no identificado'} | {new Date().toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>CONEXIÓN SEGURO</span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 p-6 overflow-auto">
          {renderSection(activeSection)}
        </main>
      </div>
    </div>
  );
};

export default OrbitalPrimeDashboard;