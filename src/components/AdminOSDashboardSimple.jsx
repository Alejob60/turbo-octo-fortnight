'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, FileText, Target, Award, AlertTriangle } from 'lucide-react';

const AdminOSDashboardSimple = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  console.log('Rendering - Active section:', activeSection);

  const sections = [
    { id: 'dashboard', label: 'Dashboard General', icon: BarChart3 },
    { id: 'contratos', label: 'Gestión Contractual', icon: FileText },
    { id: 'competencia', label: 'Inteligencia Competitiva', icon: Target },
    { id: 'certificaciones', label: 'Certificaciones & Cloud', icon: Award },
    { id: 'alertas', label: 'Centro de Alertas', icon: AlertTriangle }
  ];

  const showSection = (sectionId) => {
    console.log('Button clicked - Changing to:', sectionId);
    setActiveSection(sectionId);
  };

  const renderContent = () => {
    const contentMap = {
      dashboard: (
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h2 className="text-xl font-bold mb-4">Dashboard General</h2>
          <p className="text-slate-300">Contenido del dashboard principal</p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-800 p-4 rounded">KPI 1</div>
            <div className="bg-slate-800 p-4 rounded">KPI 2</div>
            <div className="bg-slate-800 p-4 rounded">KPI 3</div>
          </div>
        </div>
      ),
      contratos: (
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h2 className="text-xl font-bold mb-4">Gestión Contractual</h2>
          <p className="text-slate-300">Contenido de gestión contractual</p>
          <div className="mt-4 p-4 bg-slate-800 rounded">
            Tabla de contratos y presupuestos
          </div>
        </div>
      ),
      competencia: (
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h2 className="text-xl font-bold mb-4">Inteligencia Competitiva</h2>
          <p className="text-slate-300">Análisis comparativo de mercado</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded">Proveedor A</div>
            <div className="bg-slate-800 p-4 rounded">Proveedor B</div>
            <div className="bg-slate-800 p-4 rounded">Proveedor C</div>
          </div>
        </div>
      ),
      certificaciones: (
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h2 className="text-xl font-bold mb-4">Certificaciones & Cloud</h2>
          <p className="text-slate-300">Certificaciones vigentes y servicios cloud</p>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between bg-slate-800 p-3 rounded">ISO 27001 - VIGENTE</div>
            <div className="flex justify-between bg-slate-800 p-3 rounded">SOC 2 - VIGENTE</div>
          </div>
        </div>
      ),
      alertas: (
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h2 className="text-xl font-bold mb-4">Centro de Alertas</h2>
          <p className="text-slate-300">Alertas del sistema</p>
          <div className="mt-4 space-y-3">
            <div className="bg-red-900/30 border border-red-500 p-3 rounded">Alerta crítica</div>
            <div className="bg-yellow-900/30 border border-yellow-500 p-3 rounded">Alerta media</div>
          </div>
        </div>
      )
    };

    return contentMap[activeSection] || contentMap.dashboard;
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black/80 border-r border-cyan-400/30 flex flex-col">
        <div className="p-5 border-b border-cyan-400/30 mb-5">
          <div className="text-2xl font-bold uppercase">
            ORBITAL<span className="text-cyan-400">PRIME</span>
          </div>
        </div>

        <div className="flex-1 space-y-1 px-2">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => showSection(section.id)}
                className={`w-full text-left p-4 flex items-center gap-3 text-sm font-semibold transition-all ${
                  activeSection === section.id 
                    ? 'bg-cyan-400/10 text-cyan-400 border-l-3 border-cyan-400' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-cyan-400'
                }`}
              >
                <IconComponent size={18} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-cyan-400/30">
          <div className="font-bold text-sm">{user?.name || 'Admin Palmira'}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="text-2xl font-bold">
            {sections.find(s => s.id === activeSection)?.label || 'Dashboard'}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminOSDashboardSimple;