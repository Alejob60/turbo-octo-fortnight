'use client';

import { TrendingDown, TrendingUp, MapPin } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const DashboardSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjeta Incidentes */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3">
            {t('admin_os.incidentes_24h') || 'Incidentes Detectados (24h)'}
          </h3>
          <div className="text-3xl font-bold text-white mb-2">12</div>
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <TrendingDown size={16} />
            <span>▼ 5% {t('admin_os.vs_ayer') || 'vs ayer'} ({t('admin_os.mejoria') || 'Mejoría'})</span>
          </div>
        </div>
        
        {/* Tarjeta Recaudo */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3">
            {t('admin_os.recaudado_coactiva') || 'Recaudado por Coactiva (IA)'}
          </h3>
          <div className="text-3xl font-bold text-white mb-2">$45M</div>
          <div className="flex items-center gap-2 text-sm text-cyan-400">
            <TrendingUp size={16} />
            <span>▲ $12M {t('admin_os.esta_semana') || 'esta semana'}</span>
          </div>
        </div>
        
        {/* Tarjeta Cámaras */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3">
            {t('admin_os.camaras_ia_activa') || 'Cámaras con IA Activa'}
          </h3>
          <div className="text-3xl font-bold text-white mb-2">98%</div>
          <div className="text-sm text-slate-400">196/200 {t('admin_os.operativas') || 'Operativas'}</div>
        </div>
      </div>
      
      <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-12 h-80 flex items-center justify-center">
        <div className="text-slate-600 text-center">
          <MapPin size={48} className="mx-auto mb-4" />
          <div className="text-lg font-mono">{t('admin_os.aqui_va_el_mapa') || '[AQUÍ VA EL MAPA DE LA CIUDAD EN TIEMPO REAL]'}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;