'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { BarChart3, FileText, Target, Award, AlertTriangle, User } from 'lucide-react';

const AdminSidebar = ({ activeSection, onNavigate, user }) => {
  const { t } = useLanguage();

  const sections = [
    { id: 'dashboard', label: t('admin_os.dashboard_general') || 'Dashboard General', icon: BarChart3 },
    { id: 'contratos', label: t('admin_os.gestion_contractual') || 'Gestión Contractual', icon: FileText },
    { id: 'competencia', label: t('admin_os.inteligencia_competitiva') || 'Inteligencia Competitiva', icon: Target },
    { id: 'certificaciones', label: t('admin_os.certificaciones_cloud') || 'Certificaciones & Cloud', icon: Award },
    { id: 'alertas', label: t('admin_os.centro_alertas') || 'Centro de Alertas', icon: AlertTriangle, badge: 3 }
  ];

  return (
    <div className="w-64 bg-[#030303]/80 border-r border-slate-800/80 backdrop-blur-xl flex flex-col">
      {/* Logo Header */}
      <div className="p-5 border-b border-slate-800/80 mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none" className="text-cyan-400">
              <path d="M20 5L35 30H5L20 5Z" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="20" cy="20" r="4" fill="white" />
            </svg>
            <div className="absolute inset-0 bg-cyan-400 blur-md opacity-40"></div>
          </div>
          <div>
            <div className="font-bold tracking-[0.25em] text-xs text-slate-100">
              ORBITAL PRIME <span className="text-slate-600">:: SYS.ZERO</span>
            </div>
          </div>
        </div>
        <div className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{t('admin_os.govtech_solutions') || 'GOVTECH SOLUTIONS'}</div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-1 px-2">
        {sections.map((section) => {
          const IconComponent = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm transition-all ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500' 
                  : 'text-slate-400 hover:bg-slate-800/30 hover:text-cyan-400 hover:border-l-2 hover:border-slate-700'
              }`}
            >
              <IconComponent size={16} className="text-current" />
              <span className="font-mono tracking-wider text-xs">{section.label}</span>
              {section.badge && (
                <span className="ml-auto bg-red-500/20 text-red-400 text-[9px] font-mono tracking-widest px-2 py-1 rounded-full border border-red-500/30">
                  {section.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800/80 flex items-center gap-3">
        <div className="relative">
          <div className="w-8 h-8 bg-slate-800 rounded-full border border-cyan-400/30 flex items-center justify-center">
            <User size={16} className="text-cyan-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border border-[#030303]"></div>
        </div>
        <div>
          <div className="font-mono text-[10px] font-bold tracking-widest text-slate-200 uppercase">
            {user?.name || t('admin_os.admin_palmira') || 'ADMIN PALMIRA'}
          </div>
          <div className="text-[9px] text-slate-500 font-mono tracking-widest">{t('admin_os.director_ti') || 'DIRECTOR TI'}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;