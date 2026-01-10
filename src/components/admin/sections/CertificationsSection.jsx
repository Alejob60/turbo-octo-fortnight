'use client';

import { useLanguage } from '@/i18n/LanguageContext';

const CertificationsSection = () => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
        <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-4">
          {t('admin_os.certificaciones_vigentes') || 'CERTIFICACIONES VIGENTES'}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded">
            <span className="text-sm">{t('admin_os.iso_27001') || 'ISO 27001'}</span>
            <span className="px-2 py-1 bg-emerald-400/20 text-emerald-400 text-xs rounded">{t('admin_os.vigente') || 'VIGENTE'}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded">
            <span className="text-sm">{t('admin_os.soc_2_type_ii') || 'SOC 2 Type II'}</span>
            <span className="px-2 py-1 bg-emerald-400/20 text-emerald-400 text-xs rounded">{t('admin_os.vigente') || 'VIGENTE'}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
        <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-4">
          {t('admin_os.servicios_cloud') || 'SERVICIOS EN LA NUBE'}
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded">
            <span className="text-sm">{t('admin_os.azure_government') || 'Azure Government'}</span>
            <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded">{t('admin_os.activo') || 'ACTIVO'}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded">
            <span className="text-sm">{t('admin_os.aws_govcloud') || 'AWS GovCloud'}</span>
            <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded">{t('admin_os.configurando') || 'CONFIGURANDO'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsSection;