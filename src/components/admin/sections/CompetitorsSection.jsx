'use client';

import { useLanguage } from '@/i18n/LanguageContext';

const CompetitorsSection = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
      <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-4">
        {t('admin_os.analisis_comparativo') || 'ANÁLISIS COMPARATIVO DE MERCADO'}
      </h3>
      <div className="text-slate-400">
        <p className="mb-4">{t('admin_os.monitor_competencia') || 'Monitor de competencia en tiempo real...'}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 p-4 rounded">
            <div className="text-cyan-400 text-sm font-bold mb-2">{t('admin_os.proveedor_a') || 'Proveedor A'}</div>
            <div className="text-xs text-slate-400">{t('admin_os.precio_12m') || 'Precio: $1.2M'}</div>
            <div className="text-xs text-slate-400">{t('admin_os.calificacion_42') || 'Calificación: 4.2/5'}</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded">
            <div className="text-cyan-400 text-sm font-bold mb-2">{t('admin_os.proveedor_b') || 'Proveedor B'}</div>
            <div className="text-xs text-slate-400">{t('admin_os.precio_11m') || 'Precio: $1.1M'}</div>
            <div className="text-xs text-slate-400">{t('admin_os.calificacion_38') || 'Calificación: 3.8/5'}</div>
          </div>
          <div className="bg-slate-800/50 p-4 rounded">
            <div className="text-cyan-400 text-sm font-bold mb-2">{t('admin_os.proveedor_c') || 'Proveedor C'}</div>
            <div className="text-xs text-slate-400">{t('admin_os.precio_13m') || 'Precio: $1.3M'}</div>
            <div className="text-xs text-slate-400">{t('admin_os.calificacion_45') || 'Calificación: 4.5/5'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorsSection;