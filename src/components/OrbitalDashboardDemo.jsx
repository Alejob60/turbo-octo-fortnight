'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { 
  Activity, Shield, DollarSign, Brain, Bell, 
  Menu, Search, ChevronDown, LayoutDashboard, 
  Stethoscope, Globe, FileText, Send, X, 
  AlertTriangle, CheckCircle, TrendingUp, MapPin,
  Languages
} from 'lucide-react';

// --- COMPONENTES UI REUTILIZABLES ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-900/50 border border-slate-800 backdrop-blur-sm rounded-xl p-6 relative overflow-hidden ${className}`}>
    {children}
  </div>
);

const Metric = ({ title, value, change, trend, icon: Icon, color }) => (
  <Card>
    <div className={`absolute top-4 right-4 p-2 rounded-lg bg-${color}-500/10 text-${color}-400`}>
      <Icon size={20} />
    </div>
    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</p>
    <h3 className="text-3xl font-bold text-white mt-2 font-mono">{value}</h3>
    <div className="flex items-center gap-2 mt-4">
      <span className={`text-xs font-bold px-2 py-0.5 rounded ${trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
        {change}
      </span>
      <span className="text-slate-500 text-xs">vs. mes anterior</span>
    </div>
  </Card>
);

const ProgressBar = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs mb-1">
      <span className="text-slate-300">{label}</span>
      <span className="text-slate-400 font-mono">{value}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-2">
      <div 
        className={`bg-${color}-500 h-2 rounded-full transition-all duration-1000`} 
        style={{ width: `${value}%`, boxShadow: `0 0 10px rgba(6, 182, 212, 0.5)` }}
      ></div>
    </div>
  </div>
);

// --- VISTA: ORBITAL HEALTH (Hospitales) ---
const HealthView = ({ t }) => (
  <div className="space-y-6 animate-in fade-in zoom-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Metric title={t('dashboard.kpi.bed_occupancy') || "Ocupación UCI"} value="82%" change="+4%" trend="up" icon={Activity} color="rose" />
      <Metric title={t('dashboard.kpi.revenue_recovery') || "Glosas Recuperadas"} value="$1.2B" change="+15%" trend="up" icon={DollarSign} color="emerald" />
      <Metric title={t('dashboard.kpi.triage_wait') || "Tiempo Espera Urg."} value="45 min" change="-12%" trend="up" icon={Stethoscope} color="blue" />
      <Metric title={t('dashboard.kpi.active_patients') || "Pacientes Activos"} value="3,402" change="+2%" trend="down" icon={Brain} color="cyan" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
          <Activity size={18} className="text-cyan-400" />
          {t('dashboard.monitoring.vital_signs') || "Monitoreo de Signos Vitales (Tiempo Real)"}
        </h3>
        {/* Gráfico Simulado */}
        <div className="h-64 flex items-end justify-between gap-2 px-2">
          {[40, 65, 45, 80, 55, 70, 40, 60, 75, 50, 85, 60].map((h, i) => (
            <div key={i} className="w-full bg-cyan-500/20 rounded-t hover:bg-cyan-500/40 transition-all relative group">
              <div 
                className="absolute bottom-0 w-full bg-cyan-500 rounded-t" 
                style={{ height: `${h}%` }}
              ></div>
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-700">
                Pabellón {i+1}: {h}%
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-4 font-mono">
          <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span>
        </div>
      </Card>

      <Card>
        <h3 className="text-white font-bold mb-4">{t('dashboard.alerts.clinical_ai') || "Alertas Clínicas IA"}</h3>
        <div className="space-y-4">
          {[
            { msg: t('dashboard.alerts.sepsis_risk') || "Riesgo Sepsis - Cama 402", time: "2 min", type: "critical" },
            { msg: t('dashboard.alerts.low_inventory') || "Inventario Bajo - Insulina", time: "15 min", type: "warning" },
            { msg: t('dashboard.alerts.patient_escape') || "Fuga Paciente Psiquiatría", time: "1h", type: "critical" },
            { msg: t('dashboard.alerts.audit_complete') || "Auditoría Automática Finalizada", time: "2h", type: "success" },
          ].map((alert, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-slate-600 transition-colors cursor-pointer">
              {alert.type === 'critical' && <AlertTriangle size={16} className="text-rose-500 mt-1" />}
              {alert.type === 'warning' && <AlertTriangle size={16} className="text-yellow-500 mt-1" />}
              {alert.type === 'success' && <CheckCircle size={16} className="text-emerald-500 mt-1" />}
              <div>
                <p className="text-sm text-slate-200">{alert.msg}</p>
                <p className="text-xs text-slate-500 font-mono">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

// --- VISTA: ORBITAL EARTH (Territorio/Seguridad) ---
const EarthView = ({ t }) => (
  <div className="space-y-6 animate-in fade-in zoom-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="col-span-2 relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded animate-pulse flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span> LIVE
          </span>
        </div>
        <h3 className="text-white font-bold mb-2">{t('dashboard.earth.heatmap') || "Mapa de Calor Territorial"}</h3>
        <p className="text-slate-400 text-xs mb-6">{t('dashboard.earth.source') || "Fuente: Sentinel-2 & Drones Tácticos"}</p>
        
        {/* Mapa Simulado */}
        <div className="h-[300px] w-full bg-slate-800 rounded-lg relative overflow-hidden border border-slate-700 grid grid-cols-12 grid-rows-6 gap-0.5 opacity-80">
          {Array.from({ length: 72 }).map((_, i) => (
            <div 
              key={i} 
              className={`
                ${[14, 15, 26, 27].includes(i) ? 'bg-rose-500/60 animate-pulse' : ''} 
                ${[40, 41, 52].includes(i) ? 'bg-yellow-500/40' : 'bg-slate-900/40'}
              `}
            ></div>
          ))}
          <div className="absolute bottom-4 left-4 bg-slate-900/90 p-3 rounded border border-slate-700 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs text-slate-300"><div className="w-3 h-3 bg-rose-500 rounded-sm"></div> {t('dashboard.earth.deforestation_alert') || "Alerta Deforestación"}</div>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-1"><div className="w-3 h-3 bg-yellow-500 rounded-sm"></div> {t('dashboard.earth.flood_risk') || "Riesgo Inundación"}</div>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <Metric title={t('dashboard.earth.fnecer_projects') || "Proyectos FNCER"} value="14" change="+2" trend="up" icon={Globe} color="emerald" />
        <Card>
          <h3 className="text-white font-bold mb-4 text-sm uppercase">{t('dashboard.earth.infrastructure_status') || "Estado de Infraestructura"}</h3>
          <ProgressBar label={t('dashboard.earth.electric_grid') || "Red Eléctrica Nacional"} value={98} color="emerald" />
          <ProgressBar label={t('dashboard.earth.monitored_roads') || "Vías 4G Monitoreadas"} value={85} color="cyan" />
          <ProgressBar label={t('dashboard.earth.dam_levels') || "Niveles Embalses"} value={42} color="yellow" />
          <ProgressBar label={t('dashboard.earth.perimeter_security') || "Seguridad Perimetral"} value={100} color="blue" />
        </Card>
      </div>
    </div>
  </div>
);

// --- VISTA: ORBITAL AUDIT (Gobierno/Finanzas) ---
const AuditView = ({ t }) => (
  <div className="space-y-6 animate-in fade-in zoom-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Metric title={t('dashboard.audit.paa_execution') || "Ejecución PAA"} value="45%" change="+5%" trend="up" icon={FileText} color="blue" />
      <Metric title={t('dashboard.audit.ai_savings') || "Ahorro por IA"} value="$450M" change="+120M" trend="up" icon={TrendingUp} color="emerald" />
      <Metric title={t('dashboard.audit.active_contracts') || "Contratos Activos"} value="128" change="0" trend="neutral" icon={FileText} color="purple" />
      <Metric title={t('dashboard.audit.fiscal_risk') || "Riesgo Fiscal"} value={t('dashboard.audit.low') || "Bajo"} change="-2 Pts" trend="up" icon={Shield} color="cyan" />
    </div>

    <Card>
      <h3 className="text-white font-bold mb-6">{t('dashboard.audit.forensic_audit') || "Auditoría Forense en Tiempo Real"}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-400">
          <thead className="text-xs text-slate-200 uppercase bg-slate-800/50">
            <tr>
              <th className="px-6 py-3 rounded-l-lg">{t('dashboard.audit.contract_id') || "ID Contrato"}</th>
              <th className="px-6 py-3">{t('dashboard.audit.entity') || "Entidad"}</th>
              <th className="px-6 py-3">{t('dashboard.audit.amount') || "Monto"}</th>
              <th className="px-6 py-3">{t('dashboard.audit.ai_status') || "Estado IA"}</th>
              <th className="px-6 py-3 rounded-r-lg">{t('dashboard.audit.action') || "Acción"}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "CT-2026-001", ent: "MinTIC", money: "$699M", status: t('dashboard.audit.validated') || "Validado", color: "text-emerald-400" },
              { id: "CT-2026-045", ent: t('dashboard.audit.psychiatric_hospital') || "Hosp. Psiquiátrico", money: "$343M", status: t('dashboard.audit.medium_risk') || "Riesgo Medio", color: "text-yellow-400" },
              { id: "CT-2026-089", ent: "MinVivienda", money: "$1.2B", status: t('dashboard.audit.anomaly') || "Anomalía", color: "text-rose-400 animate-pulse" },
              { id: "CT-2026-102", ent: t('dashboard.audit.mani_mayor') || "Alcaldía Maní", money: "$85M", status: t('dashboard.audit.validated') || "Validado", color: "text-emerald-400" },
            ].map((row, i) => (
              <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono">{row.id}</td>
                <td className="px-6 py-4 text-white">{row.ent}</td>
                <td className="px-6 py-4 font-mono">{row.money}</td>
                <td className={`px-6 py-4 font-bold ${row.color}`}>{row.status}</td>
                <td className="px-6 py-4">
                  <button className="text-cyan-400 hover:text-cyan-300 text-xs font-bold border border-cyan-500/30 px-3 py-1 rounded">
                    {t('dashboard.audit.view_detail') || "VER DETALLE"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
export default function OrbitalDashboardDemo() {
  const { t, language, toggleLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('health');
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', text: t('dashboard.welcome.system_online') || 'Orbital Cortex v4.0 Online. Analizando datos en tiempo real.' },
    { role: 'ai', text: t('dashboard.welcome.message') || 'Bienvenido, Director. He detectado una anomalía del 5% en el presupuesto del MinVivienda hoy. ¿Desea ver el reporte detallado?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    setChatMessages([...chatMessages, { role: 'user', text: inputMsg }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', text: `${t('dashboard.chat.analyzing') || 'Analizando solicitud:'} "${inputMsg}"... ${t('dashboard.chat.updated') || 'Datos actualizados en el Dashboard.'}` }]);
    }, 1000);
    setInputMsg('');
  };

  const tabs = [
    { id: 'health', label: t('dashboard.tabs.health') || 'SALUD', icon: Activity },
    { id: 'earth', label: t('dashboard.tabs.earth') || 'TIERRA', icon: Globe },
    { id: 'audit', label: t('dashboard.tabs.audit') || 'AUDITORÍA', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur flex flex-col justify-between hidden sm:flex">
        <div>
          <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
            {/* LOGO SIMPLIFICADO */}
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              <div className="w-4 h-4 bg-slate-950 rounded-full animate-pulse"></div>
            </div>
            <span className="hidden lg:block ml-3 text-xl font-bold tracking-tighter">
              ORBITAL <span className="text-cyan-400">PRIME</span>
            </span>
          </div>
          
          <nav className="mt-8 px-3">
            <div className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="hidden lg:block font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={toggleLanguage}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            <Languages size={20} />
            <span className="hidden lg:block font-medium">
              {language === 'es' ? 'ENGLISH' : 'ESPAÑOL'}
            </span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER MOBILE */}
        <header className="sm:hidden border-b border-slate-800 bg-slate-950/50 backdrop-blur p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-slate-950 rounded-full animate-pulse"></div>
              </div>
              <span className="text-lg font-bold">ORBITAL PRIME</span>
            </div>
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50"
            >
              <Languages size={20} />
            </button>
          </div>
        </header>

        {/* HEADER DESKTOP */}
        <header className="hidden sm:flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur">
          <div>
            <h1 className="text-2xl font-bold">
              {t('dashboard.title') || 'Dashboard Orbital Prime'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              {t('dashboard.subtitle') || 'Sistema de monitoreo en tiempo real'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder={t('dashboard.search.placeholder') || "Buscar..."}
                className="bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-64"
              />
            </div>
            
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50">
              <Bell size={20} />
            </button>
            
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
            >
              <Languages size={18} />
              <span className="font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
            </button>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* TABS MOBILE */}
            <div className="sm:hidden mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === tab.id 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <tab.icon size={16} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* VISTAS */}
            <div className="transition-all duration-300">
              {activeTab === 'health' && <HealthView t={t} />}
              {activeTab === 'earth' && <EarthView t={t} />}
              {activeTab === 'audit' && <AuditView t={t} />}
            </div>
          </div>
        </div>

        {/* CHAT ASISTENTE IA */}
        {isChatOpen && (
          <div className="border-t border-slate-800 bg-slate-900/80 backdrop-blur-lg">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h3 className="font-bold flex items-center gap-2">
                <Brain className="text-cyan-400" size={18} />
                {t('dashboard.ai_assistant') || 'Asistente Orbital IA'}
              </h3>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="h-64 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-cyan-500/20 text-white' 
                      : msg.role === 'system'
                        ? 'bg-slate-800 text-slate-400 text-xs'
                        : 'bg-slate-800/50 text-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('dashboard.chat.placeholder') || "Escriba su consulta..."}
                className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button 
                onClick={handleSend}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg font-bold transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}