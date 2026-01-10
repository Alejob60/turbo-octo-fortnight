'use client';

import { useLanguage } from '@/i18n/LanguageContext';

const AdminHeader = ({ activeSection }) => {
  const { t } = useLanguage();
  
  // Mapping ID to Label logic can be handled here or passed down
  const getTitle = () => {
    // Simple switch or object map based on activeSection
    const titles = {
        dashboard: t('admin_os.dashboard_general') || 'Dashboard General',
        contratos: t('admin_os.gestion_contractual') || 'Gestión Contractual',
        competencia: t('admin_os.inteligencia_competitiva') || 'Inteligencia Competitiva',
        certificaciones: t('admin_os.certificaciones_cloud') || 'Certificaciones & Cloud',
        alertas: t('admin_os.centro_alertas') || 'Centro de Alertas',
    }
    return titles[activeSection] || t('admin_os.dashboard') || 'Dashboard';
  };

  return (
    <div className="p-6 border-b border-slate-800/80 flex justify-between items-center">
      <div>
        <div className="inline-flex items-center gap-3 mb-1">
          <div className="text-cyan-400 font-mono font-bold text-sm tracking-widest">{t('admin_os.admin_os') || 'ADMIN OS'}</div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="text-[10px] text-slate-500 font-mono tracking-widest border border-slate-800/60 px-2 py-0.5 rounded-full">{t('admin_os.sys_active') || 'SYS.ACTIVE'}</div>
          <div className="text-[10px] text-slate-500 font-mono tracking-widest border border-slate-800/60 px-2 py-0.5 rounded-full">{t('admin_os.net_online') || 'NET.ONLINE'}</div>
        </div>
        <h1 className="text-2xl font-bold">
          <span className="text-white">{getTitle()}</span>
        </h1>
      </div>
      <div className="text-right">
        <div className="text-[10px] text-slate-500 font-mono tracking-widest mb-1">
          <span className="text-cyan-400">NVIDIA</span> {t('admin_os.cores_active') || 'CORES: ACTIVE'} • <span className="text-cyan-400">AZURE</span> GOV: {t('admin_os.secure') || 'SECURE'}
        </div>
        <div className="text-xs text-emerald-400 font-mono">
          ● {t('admin_os.sistema_operativo') || 'SISTEMA OPERATIVO'} | {t('admin_os.latencia') || 'LATENCIA'}: 14ms | AZURE GOV: {t('admin_os.online') || 'ONLINE'}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;