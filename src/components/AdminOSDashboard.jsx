'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, FileText, Target, Award, AlertTriangle, MapPin, TrendingUp, TrendingDown, User, Calendar } from 'lucide-react';
import { ToastProvider } from './ToastNotification';
import NotificationHandler from './NotificationHandler';
import TerminalShell from './TerminalShell';

const AdminOSDashboard = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Debug logging
  console.log('Active section:', activeSection);

  // Demo notifications for AdminOS Dashboard will be handled by a separate component inside ToastProvider

  const sections = [
    { id: 'dashboard', label: t('admin_os.dashboard_general') || 'Dashboard General', icon: BarChart3 },
    { id: 'contratos', label: t('admin_os.gestion_contractual') || t('admin_os.gestion_contractual'), icon: FileText },
    { id: 'competencia', label: t('admin_os.inteligencia_competitiva') || t('admin_os.inteligencia_competitiva'), icon: Target },
    { id: 'certificaciones', label: t('admin_os.certificaciones_cloud') || t('admin_os.certificaciones_cloud'), icon: Award },
    { id: 'alertas', label: t('admin_os.centro_alertas') || t('admin_os.centro_alertas'), icon: AlertTriangle, badge: 3 }
  ];

  const showSection = (sectionId) => {
    console.log('Changing to section:', sectionId);
    setActiveSection(sectionId);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-6">
          <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3">
            {t('admin_os.camaras_ia_activa') || 'Cámaras con IA Activa'}
          </h3>
          <div className="text-3xl font-bold text-white mb-2">98%</div>
          <div className="text-sm text-slate-400">196/200 {t('admin_os.operativas') || 'Operativas'}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Feed */}
        <div className="lg:col-span-2 bg-slate-900/50 border border-slate-700 rounded-sm p-4">
          <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3">
            {t('admin_os.video_feed') || 'VIDEO FEED EN TIEMPO REAL'}
          </h3>
          <div className="relative aspect-video bg-black rounded-sm flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-cyan-400 font-mono text-sm mb-2">{t('admin_os.transmision_en_vivo') || 'TRANSMISIÓN EN VIVO'}</div>
                <div className="text-slate-500 text-xs">{t('admin_os.camara_principal') || 'CÁMARA PRINCIPAL - ZONA BANCARIA'}</div>
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-mono">
              {t('admin_os.en_vivo') || 'EN VIVO'}
            </div>
          </div>
        </div>
        
        {/* Agent Cameras List */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-4">
          <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3">
            {t('admin_os.camaras_por_agente') || 'CÁMARAS POR AGENTE'}
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((id) => (
              <div key={id} className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-sm font-mono">{t('admin_os.agente') || 'AGENTE'} {id}</span>
                </div>
                <div className="text-xs text-slate-400">{t('admin_os.camara') || 'CÁMARA'} {id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContratos = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <td className="py-2">{t('admin_os.fecha_vencimiento_1') || '31/Dic/2026'}</td>
                </tr>
                <tr className="border-b border-slate-800/50">
                  <td className="py-2">{t('admin_os.calidad_servicio') || 'Calidad del Servicio'}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-emerald-400/20 text-emerald-400 text-xs rounded">{t('admin_os.vigente') || 'VIGENTE'}</span>
                  </td>
                  <td className="py-2">{t('admin_os.fecha_vencimiento_2') || '30/Jun/2027'}</td>
                </tr>
                <tr>
                  <td className="py-2">{t('admin_os.salarios_prestaciones') || 'Salarios y Prestaciones'}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-yellow-400/20 text-yellow-400 text-xs rounded">{t('admin_os.en_tramite') || 'EN TRÁMITE'}</span>
                  </td>
                  <td className="py-2">{t('admin_os.fecha_pendiente') || '--/--/----'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
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

  const renderCompetencia = () => (
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

  const renderCertificaciones = () => (
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

  const renderAlertas = () => (
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

  const renderSection = () => {
    switch(activeSection) {
      case 'dashboard': return renderDashboard();
      case 'contratos': return renderContratos();
      case 'competencia': return renderCompetencia();
      case 'certificaciones': return renderCertificaciones();
      case 'alertas': return renderAlertas();
      default: return renderDashboard();
    }
  };

  return (
    <ToastProvider>
      <NotificationHandler />
      <div className="flex h-screen bg-[#030303] text-white font-sans selection:bg-cyan-500/30 selection:text-black overflow-hidden">
        
        {/* BACKGROUND FX */}
        <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#030303]/90 to-[#030303] pointer-events-none" />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[100px] pointer-events-none" />
      {/* Sidebar */}
      <div className="w-64 bg-[#030303]/80 border-r border-slate-800/80 backdrop-blur-xl flex flex-col">
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

        <div className="flex-1 space-y-1 px-2">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => showSection(section.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm transition-all ${
                  activeSection === section.id 
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

        <TerminalShell />
        
        <div className="p-4 border-t border-slate-800/80 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-slate-800 rounded-full border border-cyan-400/30 flex items-center justify-center">
                <User size={16} className="text-cyan-400" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border border-[#030303]"></div>
            </div>
            <div>
              <div className="font-mono text-[10px] font-bold tracking-widest text-slate-200 uppercase">
                {user?.name || t('admin_os.admin_palmira') || 'ADMIN PALMIRA'}</div>
              <div className="text-[9px] text-slate-500 font-mono tracking-widest">{t('admin_os.director_ti') || 'DIRECTOR TI'}</div>
            </div>
          </div>
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
            {t('admin_os.cerrar_sesion') || 'CERRAR SESIÓN'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <div className="p-6 border-b border-slate-800/80 flex justify-between items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-1">
              <div className="text-cyan-400 font-mono font-bold text-sm tracking-widest">{t('admin_os.admin_os') || 'ADMIN OS'}</div>
              <div className="h-4 w-px bg-slate-800" />
              <div className="text-[10px] text-slate-500 font-mono tracking-widest border border-slate-800/60 px-2 py-0.5 rounded-full">{t('admin_os.sys_active') || 'SYS.ACTIVE'}</div>
              <div className="text-[10px] text-slate-500 font-mono tracking-widest border border-slate-800/60 px-2 py-0.5 rounded-full">{t('admin_os.net_online') || 'NET.ONLINE'}</div>
            </div>
            <h1 className="text-2xl font-bold">
              <span className="text-white">{sections.find(s => s.id === activeSection)?.label || t('admin_os.dashboard') || 'Dashboard'}</span>
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

        <div className="flex-1 overflow-y-auto p-6 relative z-10">
          {renderSection()}
        </div>
      </div>
    </div>
    </ToastProvider>
  );
};

export default AdminOSDashboard;