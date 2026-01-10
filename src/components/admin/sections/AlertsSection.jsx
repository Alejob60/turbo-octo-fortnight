'use client';

import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

const AlertsSection = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="bg-red-900/20 border border-red-500/50 rounded-sm p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-400 mt-1" size={20} />
          <div>
            <div className="font-bold text-red-400">{t('admin_os.alerta_critica') || 'ALERTA CRÍTICA'}: {t('admin_os.fallo_nodo') || 'Fallo en Nodo Central'}</div>
            <div className="text-sm text-slate-300 mt-1">{t('admin_os.nodo_procesamiento') || 'El nodo de procesamiento principal presenta fallos intermitentes'}</div>
            <div className="text-xs text-slate-500 mt-2">{t('admin_os.hace_15_minutos') || 'Hace 15 minutos'} • {t('admin_os.prioridad') || 'Prioridad'}: {t('admin_os.alta') || 'ALTA'}</div>
          </div>
        </div>
      </div>
      
      <div className="bg-orange-900/20 border border-orange-500/50 rounded-sm p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-orange-400 mt-1" size={20} />
          <div>
            <div className="font-bold text-orange-400">{t('admin_os.alerta_media') || 'ALERTA MEDIA'}: {t('admin_os.actualizacion_pendiente') || 'Actualización Pendiente'}</div>
            <div className="text-sm text-slate-300 mt-1">{t('admin_os.version_sistema') || 'Versión del sistema desactualizada'}</div>
            <div className="text-xs text-slate-500 mt-2">{t('admin_os.hace_2_horas') || 'Hace 2 horas'} • {t('admin_os.prioridad') || 'Prioridad'}: {t('admin_os.media') || 'MEDIA'}</div>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-sm p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-yellow-400 mt-1" size={20} />
          <div>
            <div className="font-bold text-yellow-400">{t('admin_os.alerta_baja') || 'ALERTA BAJA'}: {t('admin_os.uso_recursos') || 'Uso de Recursos'}</div>
            <div className="text-sm text-slate-300 mt-1">{t('admin_os.alto_consumo') || 'Alto consumo de CPU en servidores secundarios'}</div>
            <div className="text-xs text-slate-500 mt-2">{t('admin_os.hace_4_horas') || 'Hace 4 horas'} • {t('admin_os.prioridad') || 'Prioridad'}: {t('admin_os.baja') || 'BAJA'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsSection;