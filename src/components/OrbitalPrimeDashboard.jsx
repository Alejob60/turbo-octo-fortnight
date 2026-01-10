'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { 
  Activity, Shield, DollarSign, Brain, Bell, 
  Menu, Search, ChevronDown, LayoutDashboard, 
  Stethoscope, Globe, FileText, Send, X, 
  AlertTriangle, CheckCircle, TrendingUp, MapPin,
  Camera, Eye, Lock, Server, Database, Video
} from 'lucide-react';

// --- COMPONENTES UI REUTILIZABLES ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-xl p-6 relative overflow-hidden transition-all hover:border-slate-700 ${className}`}>
    {children}
  </div>
);

const Metric = ({ title, value, change, trend, icon: Icon, color, t }) => (
  <Card>
    <div className={`absolute top-4 right-4 p-2 rounded-lg bg-${color}-500/10 text-${color}-400 shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
      <Icon size={20} />
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t(title)}</p>
    <h3 className="text-3xl font-bold text-white mt-2 font-mono tracking-tighter">{value}</h3>
    <div className="flex items-center gap-2 mt-4">
      <span className={`text-xs font-bold px-2 py-0.5 rounded ${trend === 'up' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
        {change}
      </span>
      <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
    </div>
  </Card>
);

// --- VISTA: ORBITAL HEALTH (Hospitales) ---
const HealthView = ({ t }) => (
  <div className="space-y-6 animate-in fade-in zoom-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Metric title="dashboard.health.icu_occupancy" value="82%" change="+4%" trend="up" icon={Activity} color="rose" t={t} />
      <Metric title="dashboard.health.claim_recovery" value="$1.2B" change="+15%" trend="up" icon={DollarSign} color="emerald" t={t} />
      <Metric title="dashboard.health.ia_triage" value="45 ms" change="-12%" trend="up" icon={Brain} color="purple" t={t} />
      <Metric title="dashboard.health.active_patients" value="3,402" change="+2%" trend="down" icon={Stethoscope} color="cyan" t={t} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
          <Activity size={18} className="text-cyan-400" />
          {t('dashboard.health.vital_signs')}
        </h3>
        {/* Gráfico Simulado */}
        <div className="h-64 flex items-end justify-between gap-1 px-2 border-b border-slate-800 pb-4">
          {[40, 65, 45, 80, 55, 70, 40, 60, 75, 50, 85, 60, 45, 70, 55, 30, 60, 80, 50, 65].map((h, i) => (
            <div key={i} className="w-full bg-cyan-500/10 rounded-t hover:bg-cyan-400 transition-all relative group">
              <div 
                className="absolute bottom-0 w-full bg-cyan-500 rounded-t shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                style={{ height: `${h}%` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
          <span>00:00</span><span>{t('dashboard.health.continuous_monitoring')}</span><span>23:59</span>
        </div>
      </Card>

      <Card>
        <h3 className="text-white font-bold mb-4 text-sm uppercase flex items-center gap-2">
            <Server size={16} className="text-emerald-400"/> {t('dashboard.health.clinical_storage')}
        </h3>
        <div className="space-y-6">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-xs">{t('dashboard.health.hl7_records')}</span>
                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle size={10}/> {t('dashboard.health.encrypted')}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                    <div className="bg-emerald-500 h-1.5 rounded-full w-[75%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                </div>
                <p className="text-xs text-slate-500 font-mono text-right">340 TB / 500 TB</p>
            </div>

             <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-xs">{t('dashboard.health.dicom_images')}</span>
                    <span className="text-cyan-400 text-xs font-bold flex items-center gap-1"><Database size={10}/> {t('dashboard.health.redundant')}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                    <div className="bg-cyan-500 h-1.5 rounded-full w-[45%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                </div>
                <p className="text-xs text-slate-500 font-mono text-right">120 TB / 1 PB</p>
            </div>
        </div>
      </Card>
    </div>
  </div>
);

// --- VISTA: ORBITAL VISION (Cámaras y Seguridad) ---
const VisionView = ({ t }) => (
  <div className="space-y-6 animate-in fade-in zoom-in duration-500">
    {/* Métricas de Seguridad */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Metric title="dashboard.vision.active_cameras" value="1,240" change="100%" trend="up" icon={Camera} color="cyan" t={t} />
      <Metric title="dashboard.vision.intrusion_alerts" value="3" change="-80%" trend="up" icon={AlertTriangle} color="rose" t={t} />
      <Metric title="dashboard.vision.face_recognitions" value="14k" change="+500" trend="up" icon={Eye} color="blue" t={t} />
    </div>

    {/* GRID DE CÁMARAS (CCTV) */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((cam) => (
            <div key={cam} className="relative aspect-video bg-slate-900 rounded-lg border border-slate-700 overflow-hidden group">
                {/* Overlay de Simulación de Video */}
                <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
                    <Video size={32} className="text-slate-600 opacity-50" />
                </div>
                
                {/* HUD de Cámara */}
                <div className="absolute top-2 left-2 flex items-center gap-2">
                    <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">{t('dashboard.vision.rec')}</span>
                    <span className="text-slate-200 text-xs font-mono drop-shadow-md">CAM-0{cam} | {t('dashboard.vision.basement')} {cam}</span>
                </div>
                
                {/* Bounding Box (IA Detection) */}
                {cam === 2 && (
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-24 border-2 border-rose-500 rounded-sm shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                        <div className="absolute -top-6 left-0 bg-rose-500 text-white text-[10px] font-bold px-1 py-0.5">
                            {t('dashboard.vision.unauthorized')}
                        </div>
                     </div>
                )}
                 {cam === 1 && (
                     <div className="absolute top-1/3 left-1/3 w-12 h-12 border-2 border-emerald-500 rounded-sm">
                        <div className="absolute -top-6 left-0 bg-emerald-500 text-slate-900 text-[10px] font-bold px-1 py-0.5">
                            {t('dashboard.vision.personnel')}
                        </div>
                     </div>
                )}
            </div>
        ))}
      </div>

      {/* Panel de Eventos */}
      <Card>
        <h3 className="text-white font-bold mb-4 text-sm uppercase flex items-center gap-2">
            <Bell size={16} className="text-rose-400"/> {t('dashboard.vision.event_log')}
        </h3>
        <div className="space-y-3">
            {[
                { time: "10:42:15", event: t('dashboard.vision.access_denied'), type: "crit" },
                { time: "10:40:00", event: t('dashboard.vision.vehicle_identified'), type: "info" },
                { time: "10:35:22", event: t('dashboard.vision.abandoned_object'), type: "warn" },
                { time: "10:30:10", event: t('dashboard.vision.guard_round_complete'), type: "success" },
            ].map((ev, i) => (
                <div key={i} className="flex gap-3 text-xs border-b border-slate-800 pb-2">
                    <span className="font-mono text-slate-500">{ev.time}</span>
                    <span className={`font-medium ${
                        ev.type === 'crit' ? 'text-rose-400' : 
                        ev.type === 'warn' ? 'text-yellow-400' :
                        ev.type === 'success' ? 'text-emerald-400' : 'text-slate-300'
                    }`}>{ev.event}</span>
                </div>
            ))}
        </div>
      </Card>
    </div>
  </div>
);

// --- VISTA: ORBITAL AUDIT (Finanzas y Almacenamiento Seguro) ---
const AuditView = ({ t }) => (
  <div className="space-y-6 animate-in fade-in zoom-in duration-500">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Metric title="dashboard.audit.paa_execution" value="45%" change="+5%" trend="up" icon={FileText} color="blue" t={t} />
      <Metric title="dashboard.audit.fiscal_savings" value="$450M" change="+120M" trend="up" icon={TrendingUp} color="emerald" t={t} />
      <Metric title="dashboard.audit.fraud_alerts" value="0" change={t('dashboard.audit.safe')} trend="up" icon={Shield} color="cyan" t={t} />
      <Metric title="dashboard.audit.active_contracts" value="128" change={t('dashboard.audit.active')} trend="neutral" icon={FileText} color="purple" t={t} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 text-sm uppercase">{t('dashboard.audit.forensic_audit')}</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                <thead className="text-xs text-slate-200 uppercase bg-slate-950/50">
                    <tr>
                    <th className="px-4 py-3 rounded-l-lg">{t('dashboard.audit.id')}</th>
                    <th className="px-4 py-3">{t('dashboard.audit.rubro')}</th>
                    <th className="px-4 py-3">{t('dashboard.audit.amount')}</th>
                    <th className="px-4 py-3">{t('dashboard.audit.ia_validation')}</th>
                    <th className="px-4 py-3 rounded-r-lg">{t('dashboard.audit.integrity')}</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                    { id: "CT-001", ent: t('dashboard.audit.ia_training'), money: "$699M", status: t('dashboard.audit.approved'), color: "text-emerald-400", hash: "Valid" },
                    { id: "CT-045", ent: t('dashboard.audit.cctv_surveillance'), money: "$343M", status: t('dashboard.audit.risk'), color: "text-yellow-400", hash: "Valid" },
                    { id: "CT-089", ent: t('dashboard.audit.infrastructure'), money: "$1.2B", status: t('dashboard.audit.critical'), color: "text-rose-400 animate-pulse", hash: "Check" },
                    ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                        <td className="px-4 py-3 text-white">{row.ent}</td>
                        <td className="px-4 py-3 font-mono">{row.money}</td>
                        <td className={`px-4 py-3 font-bold text-xs ${row.color}`}>{row.status}</td>
                        <td className="px-4 py-3">
                            <span className="flex items-center gap-1 text-xs text-cyan-400 font-mono bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900">
                                <Lock size={10} /> {t('dashboard.audit.hash_ok')}
                            </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Card>

        {/* WIDGET: ALMACENAMIENTO AUDITABLE (BLOCKCHAIN) */}
        <Card className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border-cyan-500/30 shadow-[0_0_30px_-10px_rgba(6,182,212,0.1)]">
            <h3 className="text-white font-bold mb-4 text-sm uppercase flex items-center gap-2">
                <Lock size={16} className="text-cyan-400"/> {t('dashboard.audit.secure_warehouse')}
            </h3>
            <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-xs">{t('dashboard.audit.distributed_audit')}</span>
                        <span className="text-cyan-400 text-xs font-bold">BLOCKCHAIN</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                        <div className="bg-cyan-500 h-2 rounded-full w-[98%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">12,450/12,700 {t('dashboard.audit.active_nodes')}</p>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-xs">{t('dashboard.audit.encryption')}</span>
                        <span className="text-emerald-400 text-xs font-bold">AES-256</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                        <div className="bg-emerald-500 h-2 rounded-full w-[100%]"></div>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">{t('dashboard.audit.key')}: SHA-384</p>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-xs">{t('dashboard.audit.lifetime')}</span>
                        <span className="text-purple-400 text-xs font-bold">{t('dashboard.audit.immutable')}</span>
                    </div>
                    <div className="text-2xl font-bold font-mono text-white text-center my-2">∞</div>
                    <p className="text-xs text-slate-500 font-mono text-center">{t('dashboard.audit.non_corruptible_data')}</p>
                </div>
            </div>
        </Card>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---
export default function OrbitalPrimeDashboard() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('health');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', text: t('dashboard.system_online') },
    { role: 'ai', text: t('dashboard.welcome_message') }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    setChatMessages([...chatMessages, { role: 'user', text: inputMsg }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', text: `${t('dashboard.processing_request')}: "${inputMsg}"... ${t('dashboard.analysis_complete')}` }]);
    }, 1000);
    setInputMsg('');
  };

  const tabs = [
    { id: 'health', label: t('dashboard.tabs.health'), icon: Activity },
    { id: 'vision', label: t('dashboard.tabs.vision'), icon: Eye },
    { id: 'audit', label: t('dashboard.tabs.audit'), icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-slate-900 flex overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`border-r border-slate-800 bg-slate-950/50 backdrop-blur transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center justify-between lg:justify-center lg:px-6 border-b border-slate-800">
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              <div className="w-4 h-4 bg-slate-950 rounded-full animate-pulse"></div>
            </div>
            {isSidebarOpen && (
              <span className="hidden lg:block text-xl font-bold tracking-tighter ml-3">
                ORBITAL <span className="text-cyan-400">PRIME</span>
              </span>
            )}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-slate-400 hover:text-white p-2"
            >
              <Menu size={20} />
            </button>
          </div>
          
          <nav className="flex-1 mt-8 px-3">
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
                  <span className={isSidebarOpen ? 'block' : 'hidden'}>{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
          
          <div className="p-4 border-t border-slate-800">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
              <LayoutDashboard size={20} />
              <span className={isSidebarOpen ? 'block' : 'hidden'}>{t('dashboard.control_panel')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-20 flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold font-mono">
                {activeTab === 'health' && t('dashboard.sectors.health')}
                {activeTab === 'vision' && t('dashboard.sectors.vision')}
                {activeTab === 'audit' && t('dashboard.sectors.audit')}
              </h1>
              <p className="text-slate-400 text-sm font-mono">
                {activeTab === 'health' && t('dashboard.sectors.health_subtitle')}
                {activeTab === 'vision' && t('dashboard.sectors.vision_subtitle')}
                {activeTab === 'audit' && t('dashboard.sectors.audit_subtitle')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder={t('dashboard.search_placeholder')}
                className="bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-64"
              />
            </div>
            
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold font-mono">
                AI
              </div>
              <span className="text-sm font-mono hidden md:block">{t('dashboard.role_director')}</span>
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* VISTAS */}
            <div className="transition-all duration-300">
              {activeTab === 'health' && <HealthView t={t} />}
              {activeTab === 'vision' && <VisionView t={t} />}
              {activeTab === 'audit' && <AuditView t={t} />}
            </div>
          </div>
        </div>

        {/* CHAT ASISTENTE IA */}
        <div className={`border-t border-slate-800 bg-slate-900/80 backdrop-blur-lg transition-all duration-300 ${isChatOpen ? 'h-80' : 'h-16'}`}>
          <div className="flex items-center justify-between p-4 border-b border-slate-800 cursor-pointer" onClick={() => setIsChatOpen(!isChatOpen)}>
            <h3 className="font-bold flex items-center gap-2">
              <Brain className="text-cyan-400" size={18} />
              {isChatOpen ? t('dashboard.ai_assistant') : t('dashboard.ai_assistant_short')}
            </h3>
            <ChevronDown size={18} className={`transition-transform ${isChatOpen ? 'rotate-180' : ''}`} />
          </div>
          
          {isChatOpen && (
            <>
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
                  placeholder={t('dashboard.chat_placeholder')}
                  className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <button 
                  onClick={handleSend}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg font-bold transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}