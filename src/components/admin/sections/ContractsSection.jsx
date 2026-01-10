'use client';

import { useLanguage } from '@/i18n/LanguageContext';

const ContractsSection = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ejecución Presupuestal */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-4">
            {t('admin_os.ejecucion_presupuestal') || 'EJECUCIÓN PRESUPUESTAL 2026'}
          </h3>
          <div className="text-3xl font-bold text-white mb-4">$1.130.000.000</div>
          <div className="space-y-2 text-sm">
            <div className="text-slate-300">{t('admin_os.pagado_fecha') || 'Pagado a la fecha: $0'}</div>
            <div className="text-slate-300">{t('admin_os.comprometido') || 'Comprometido: 100%'}</div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
              <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '5%' }}></div>
            </div>
            <div className="text-xs text-cyan-400 text-right">{t('admin_os.fase_inicio') || 'Fase: Inicio / Legalización'}</div>
          </div>
        </div>
        
        {/* Pólizas */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-4">
            {t('admin_os.polizas_garantias') || 'PÓLIZAS Y GARANTÍAS'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-cyan-400">{t('admin_os.concepto') || 'Concepto'}</th>
                  <th className="text-left py-2 text-cyan-400">{t('admin_os.estado') || 'Estado'}</th>
                  <th className="text-left py-2 text-cyan-400">{t('admin_os.vencimiento') || 'Vencimiento'}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-800/50">
                  <td className="py-2">{t('admin_os.cumplimiento') || 'Cumplimiento'}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-emerald-400/20 text-emerald-400 text-xs rounded">{t('admin_os.vigente') || 'VIGENTE'}</span>
                  </td>
                  <td className="py-2">31/Dic/2026</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="py-2">{t('admin_os.calidad_servicio') || 'Calidad del Servicio'}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-emerald-400/20 text-emerald-400 text-xs rounded">{t('admin_os.vigente') || 'VIGENTE'}</span>
                  </td>
                  <td className="py-2">30/Jun/2027</td>
                </tr>
                <tr>
                  <td className="py-2">{t('admin_os.salarios_prestaciones') || 'Salarios y Prestaciones'}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded">{t('admin_os.en_tramite') || 'EN TRÁMITE'}</span>
                  </td>
                  <td className="py-2">--/--/----</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Tabla Hitos */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
        <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-4">
          {t('admin_os.hitos_pago') || 'HITOS DE PAGO (ENTREGABLES)'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 text-cyan-400">{t('admin_os.hito') || 'Hito'}</th>
                <th className="text-left py-2 text-cyan-400">{t('admin_os.entregable') || 'Entregable'}</th>
                <th className="text-left py-2 text-cyan-400">{t('admin_os.valor') || 'Valor'}</th>
                <th className="text-left py-2 text-cyan-400">{t('admin_os.estado') || 'Estado'}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-800/50">
                <td className="py-2">{t('admin_os.pago_anticipado') || 'Pago Anticipado'}</td>
                <td className="py-2">{t('admin_os.plan_trabajo') || 'Plan de Trabajo Aprobado'}</td>
                <td className="py-2">30%</td>
                <td className="py-2">
                  <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded">{t('admin_os.pendiente') || 'PENDIENTE'}</span>
                </td>
              </tr>
              <tr>
                <td className="py-2">{t('admin_os.pago_mensual') || 'Pago Mensual 1'}</td>
                <td className="py-2">{t('admin_os.informe_operativo') || 'Informe Operativo Enero'}</td>
                <td className="py-2">10%</td>
                <td className="py-2 text-slate-500">{t('admin_os.bloqueado') || 'BLOQUEADO'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContractsSection;