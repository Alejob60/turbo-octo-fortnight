'use client';

import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { 
  Activity, Shield, Users, Clock, AlertTriangle, 
  Map, Server, Zap, HeartPulse, Landmark, 
  Lock, FileSearch, DollarSign, Box,
  Globe, Menu
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useLanguage } from '@/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

// --- TIPOS DE INTERFAZ ---

interface KpiItem {
  label_en: string;
  label_es: string;
  value: string;
  trend: string;
  status: 'good' | 'warning' | 'neutral' | 'critical';
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
}

interface AlertItem {
  type: 'CRITICAL' | 'WARNING' | 'INFO';
  msg_en: string;
  msg_es: string;
  time: string;
  source: string;
}





// --- COMPONENTES UI ---

const KpiCard = ({ item, color }: { item: KpiItem; color: string }) => {
  const lang = typeof window !== 'undefined' ? (window.location.pathname.includes('/es') ? 'es' : 'en') : 'en';
  
  return (
    <motion.div 
      key={item.label_en}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0a0a0a] border border-slate-800 p-5 rounded-sm relative overflow-hidden group hover:border-slate-700 transition-colors"
    >
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 rounded-sm bg-slate-900 text-slate-300">
          <item.icon size={20} style={{ color: item.status !== 'neutral' ? color : undefined }} />
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
          item.status === 'good' ? 'border-green-900 text-green-500 bg-green-900/10' : 
          item.status === 'warning' ? 'border-amber-900 text-amber-500 bg-amber-900/10' : 
          item.status === 'critical' ? 'border-red-900 text-red-500 bg-red-900/10' :
          'border-slate-800 text-slate-500'
        }`}>
          {item.trend}
        </span>
      </div>
      <div className="text-3xl font-bold text-white font-mono tracking-tight">{item.value}</div>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">
        {lang === 'en' ? item.label_en : item.label_es}
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" style={{ backgroundColor: color }} />
    </motion.div>
  );
};

const AlertRow = ({ alert, color }: { alert: AlertItem; color: string }) => {
  const lang = typeof window !== 'undefined' ? (window.location.pathname.includes('/es') ? 'es' : 'en') : 'en';
  
  return (
    <motion.div 
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex items-start gap-4 p-4 border-b border-slate-900 hover:bg-slate-900/30 transition-colors cursor-pointer group"
    >
      <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
        alert.type === 'CRITICAL' ? 'bg-red-500 animate-pulse' : 
        alert.type === 'WARNING' ? 'bg-amber-500' : 'bg-blue-500'
      }`} />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className={`text-[9px] font-bold px-1.5 py-0.5 border rounded ${
            alert.type === 'CRITICAL' ? 'border-red-900 text-red-500 bg-red-950' : 
            alert.type === 'WARNING' ? 'border-amber-900 text-amber-500 bg-amber-950' : 'border-blue-900 text-blue-500 bg-blue-950'
          }`}>
            {alert.type}
          </span>
          <span className="text-[10px] text-slate-600 font-mono">{alert.time}</span>
        </div>
        <p className="text-sm text-slate-300 leading-snug font-mono">
          {lang === 'en' ? alert.msg_en : alert.msg_es}
        </p>
        <div className="text-[10px] text-slate-600 mt-2 font-mono flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span style={{color: color}}>SRC: {alert.source}</span>
        </div>
      </div>
    </motion.div>
  );
};

// --- DASHBOARD PRINCIPAL ---

export default function AuditDashboard() {
  const [activeMode, setActiveMode] = useState<keyof typeof DATA_MODES>('HEALTH'); 
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    // Redirigir al usuario a la página de login si es necesario
    window.location.href = '/login';
  };
  
  // Data modes - Definidos como constantes para mantener los tipos correctos
  const DATA_MODES = {
    HEALTH: {
      id: 'HEALTH' as const,
      themeColor: '#06b6d4', // Cyan
      title: t('dashboard.mode_titles.HEALTH'),
      sector: t('dashboard.mode_sectors.HEALTH'),
      kpis: [
        { label_en: t('dashboard.kpi.revenueAtRisk'), label_es: t('dashboard.kpi.revenueAtRisk'), value: "$42M", trend: t('dashboard.alert.detected'), status: "warning" as const, icon: DollarSign },
        { label_en: t('dashboard.kpi.bedTurnover'), label_es: t('dashboard.kpi.bedTurnover'), value: "4.2h", trend: "-1.5h", status: "good" as const, icon: Clock },
        { label_en: t('dashboard.kpi.triageAccuracy'), label_es: t('dashboard.kpi.triageAccuracy'), value: "99.8%", trend: t('dashboard.alert.aiValidated'), status: "good" as const, icon: HeartPulse },
        { label_en: t('dashboard.kpi.noShowRate'), label_es: t('dashboard.kpi.noShowRate'), value: "2.1%", trend: "-15%", status: "good" as const, icon: Users },
      ],
      alerts: [
        { type: "CRITICAL" as const, msg_en: t('dashboard.alerts.critical_billing_mismatch'), msg_es: t('dashboard.alerts.critical_billing_mismatch'), time: t('dashboard.alerts.live_time'), source: "BILLING-AI" },
        { type: "WARNING" as const, msg_en: t('dashboard.alerts.warning_bed_capacity'), msg_es: t('dashboard.alerts.warning_bed_capacity'), time: "-10m", source: "PREDICT-CORE" },
        { type: "INFO" as const, msg_en: t('dashboard.alerts.info_auto_appointment'), msg_es: t('dashboard.alerts.info_auto_appointment'), time: "-2h", source: "SCHEDULER" },
      ],
      chartData: [
        { time: '06:00', value: 60 }, { time: '08:00', value: 75 },
        { time: '10:00', value: 85 }, { time: '12:00', value: 92 },
        { time: '14:00', value: 80 }, { time: '16:00', value: 70 },
      ]
    },
    GOV: {
      id: 'GOV' as const,
      themeColor: '#10b981', // Emerald
      title: t('dashboard.mode_titles.GOV'),
      sector: t('dashboard.mode_sectors.GOV'),
      kpis: [
        { label_en: t('dashboard.kpi.preventedIncidents'), label_es: t('dashboard.kpi.preventedIncidents'), value: "14", trend: t('dashboard.alert.today'), status: "good" as const, icon: Shield },
        { label_en: t('dashboard.kpi.responseLatency'), label_es: t('dashboard.kpi.responseLatency'), value: "92s", trend: "-30s", status: "good" as const, icon: Zap },
        { label_en: t('dashboard.kpi.hotspotsActive'), label_es: t('dashboard.kpi.hotspotsActive'), value: "3", trend: t('dashboard.alert.monitoring'), status: "warning" as const, icon: Map },
        { label_en: t('dashboard.kpi.cameraCoverage'), label_es: t('dashboard.kpi.cameraCoverage'), value: "98%", trend: t('dashboard.alert.optimal'), status: "good" as const, icon: Server },
      ],
      alerts: [
        { type: "CRITICAL" as const, msg_en: t('dashboard.alerts.critical_weapons_signature'), msg_es: t('dashboard.alerts.critical_weapons_signature'), time: t('dashboard.alerts.live_time'), source: "VISION-AI" },
        { type: "WARNING" as const, msg_en: t('dashboard.alerts.warning_crowd_gathering'), msg_es: t('dashboard.alerts.warning_crowd_gathering'), time: "-5m", source: "BEHAVIOR-AI" },
        { type: "INFO" as const, msg_en: t('dashboard.alerts.info_patrol_rerouted'), msg_es: t('dashboard.alerts.info_patrol_rerouted'), time: "-12m", source: "CMD-CENTER" },
      ],
      chartData: [
        { time: 'Mon', value: 45 }, { time: 'Tue', value: 55 },
        { time: 'Wed', value: 40 }, { time: 'Thu', value: 70 },
        { time: 'Fri', value: 85 }, { time: 'Sat', value: 60 },
      ]
    },
    FINTECH: {
      id: 'FINTECH' as const,
      themeColor: '#8b5cf6', // Violet
      title: t('dashboard.mode_titles.FINTECH'),
      sector: t('dashboard.mode_sectors.FINTECH'),
      kpis: [
        { label_en: t('dashboard.kpi.fraudBlocked'), label_es: t('dashboard.kpi.fraudBlocked'), value: "$850k", trend: t('dashboard.alert.last24h'), status: "good" as const, icon: Lock },
        { label_en: t('dashboard.kpi.txVolume'), label_es: t('dashboard.kpi.txVolume'), value: "12.4k/s", trend: "+15%", status: "neutral" as const, icon: Activity },
        { label_en: t('dashboard.kpi.falsePositives'), label_es: t('dashboard.kpi.falsePositives'), value: "0.01%", trend: t('dashboard.alert.low'), status: "good" as const, icon: Zap },
        { label_en: t('dashboard.kpi.apiLatency'), label_es: t('dashboard.kpi.apiLatency'), value: "14ms", trend: t('dashboard.alert.stable'), status: "good" as const, icon: Server },
      ],
      alerts: [
        { type: "CRITICAL" as const, msg_en: t('dashboard.alerts.critical_botnet_attack'), msg_es: t('dashboard.alerts.critical_botnet_attack'), time: t('dashboard.alerts.live_time'), source: "SEC-OPS" },
        { type: "WARNING" as const, msg_en: t('dashboard.alerts.warning_transaction_spike'), msg_es: t('dashboard.alerts.warning_transaction_spike'), time: "-20s", source: "FRAUD-MODEL" },
        { type: "INFO" as const, msg_en: t('dashboard.alerts.info_sovereign_cloud'), msg_es: t('dashboard.alerts.info_sovereign_cloud'), time: "-1h", source: "AZURE-GOV" },
      ],
      chartData: [
        { time: '00:00', value: 20 }, { time: '04:00', value: 25 },
        { time: '08:00', value: 85 }, { time: '12:00', value: 90 },
        { time: '16:00', value: 75 }, { time: '20:00', value: 60 },
      ]
    },
    AUDIT: {
      id: 'AUDIT' as const,
      themeColor: '#f59e0b', // Color Oro/Alerta
      // CAMBIO CLAVE AQUÍ: Usamos la terminología de la noticia
      title: t('dashboard.mode_titles.AUDIT'), 
      sector: t('dashboard.mode_sectors.AUDIT'),
      kpis: [
        // Estos KPIs responden directamente a lo que busca Petro (plata perdida)
        { label_en: t('dashboard.kpi.processAnomalies'), label_es: t('dashboard.kpi.processAnomalies'), value: "HIGH", trend: t('dashboard.alert.detected'), status: "critical" as const, icon: AlertTriangle },
        { label_en: t('dashboard.kpi.ghostAssets'), label_es: t('dashboard.kpi.ghostAssets'), value: "14", trend: t('dashboard.alert.highRisk'), status: "warning" as const, icon: Box }, 
        { label_en: t('dashboard.kpi.dataMismatch'), label_es: t('dashboard.kpi.dataMismatch'), value: "$12.5B", trend: t('dashboard.alert.recoverable'), status: "critical" as const, icon: DollarSign },
        { label_en: t('dashboard.kpi.leakageDetected'), label_es: t('dashboard.kpi.leakageDetected'), value: "98%", trend: t('dashboard.alert.monitoring'), status: "good" as const, icon: Activity },
      ],
      alerts: [
        // Usamos datos reales de tus Excels de Pasto para simular el hallazgo
        { type: "CRITICAL" as const, msg_en: t('dashboard.alerts.critical_billing_mismatch'), msg_es: t('dashboard.alerts.critical_billing_mismatch'), time: t('dashboard.alerts.live_time'), source: "AI-FORENSIC" },
        { type: "WARNING" as const, msg_en: t('dashboard.alerts.warning_bed_capacity'), msg_es: t('dashboard.alerts.warning_bed_capacity'), time: "-1h", source: "CONTRACT-BOT" },
        { type: "INFO" as const, msg_en: t('dashboard.alerts.info_auto_appointment'), msg_es: t('dashboard.alerts.info_auto_appointment'), time: "-3h", source: "AUTO-REP" },
      ],
      chartData: [
        { time: 'Jan', value: 120 }, { time: 'Feb', value: 250 },
        { time: 'Mar', value: 400 }, { time: 'Apr', value: 650 },
        { time: 'May', value: 900 }, { time: 'Jun', value: 1200 },
      ]
    }
  };

  const currentData = DATA_MODES[activeMode];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-hidden flex flex-col">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/80 bg-[#030303]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#030303]/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <div className="relative">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="text-cyan-400 relative z-10 transition-transform group-hover:scale-110">
                <path d="M20 5L35 30H5L20 5Z" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="2"/>
                <circle cx="20" cy="20" r="4" fill="white" />
              </svg>
              <div className="absolute inset-0 bg-cyan-400 blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
            </div>
            <span className="font-bold tracking-[0.25em] text-xs md:text-sm hidden sm:block text-slate-100">
              ORBITAL PRIME <span className="text-slate-600">:: DASHBOARD</span>
            </span>
          </div>

          {/* DERECHA: ESTADO Y BOTÓN DE IDIOMA */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher />
            <div className="hidden sm:flex gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-slate-800/60 rounded-full bg-slate-950/50 backdrop-blur-md">
                <div className={`w-1.5 h-1.5 rounded-full ${activeMode === 'HEALTH' ? 'bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-amber-500'}`} />
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">{t('dashboard.neural_net')}</span>
              </div>
              <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-slate-800/60 rounded-full bg-slate-950/50 backdrop-blur-md">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">{t('dashboard.secure')}</span>
              </div>
            </div>
            
            {/* Botón de logout */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-slate-800/60 rounded-full bg-slate-950/50 backdrop-blur-md">
                <User size={12} className="text-slate-400" />
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">{user?.name || 'Usuario'}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-sm border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                title={t('dashboard.logout') || 'Cerrar sesión'}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex flex-1 overflow-hidden pt-16"> {/* pt-16 para compensar el navbar fijo */}
        {/* SIDEBAR */}
        <aside className={`w-16 lg:w-64 border-r border-slate-800 bg-[#050505] flex flex-col z-20 transition-all ${isSidebarOpen ? 'lg:translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed lg:static h-full lg:h-auto inset-y-0`}>
          <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800">
             <div className="w-8 h-8 bg-slate-900 border border-slate-800 rounded flex items-center justify-center" style={{ color: currentData.themeColor }}>
               {activeMode === 'HEALTH' ? <HeartPulse size={18} /> : activeMode === 'GOV' ? <Shield size={18} /> : activeMode === 'FINTECH' ? <Landmark size={18} /> : <FileSearch size={18} />}
             </div>
             <span className="ml-3 font-bold tracking-[0.2em] text-[10px] hidden lg:block text-slate-200 uppercase">
               {t(`dashboard.mode_labels.${activeMode}`)} OS
             </span>
          </div>

          <nav className="flex-1 py-6 space-y-2 px-2">
            {[
              { id: 'live', icon: Activity, label: t('dashboard.nav.liveOperations') },
              { id: 'intel', icon: activeMode === 'AUDIT' ? DollarSign : (activeMode === 'HEALTH' ? Users : activeMode === 'GOV' ? Map : Globe), label: activeMode === 'AUDIT' ? t('dashboard.nav.revenueRecovery') : (activeMode === 'HEALTH' ? t('dashboard.nav.patientFlow') : activeMode === 'GOV' ? t('dashboard.nav.geospatial') : t('dashboard.nav.globalTx')) },
              { id: 'infra', icon: Server, label: t('dashboard.nav.infrastructure') },
              { id: 'reports', icon: FileSearch, label: t('dashboard.nav.autoReports') },
            ].map((item) => (
              <button key={item.id} className="w-full flex items-center gap-4 px-4 py-3 text-xs font-medium rounded-sm text-slate-500 hover:text-white hover:bg-slate-900 transition-all group">
                <item.icon size={18} className="group-hover:text-white transition-colors" style={{color: activeMode === item.id ? currentData.themeColor : undefined}} />
                <span className="hidden lg:block tracking-widest">{item.label}</span>
              </button>
            ))}
          </nav>
          
          {/* INDICADOR DE MODO */}
          <div className="p-4 border-t border-slate-800 hidden lg:block">
             <div className="text-[9px] text-slate-600 font-mono mb-2 uppercase tracking-widest">{t('dashboard.status.module')}</div>
             <div className="flex gap-2">
                {['HEALTH', 'GOV', 'FINTECH', 'AUDIT'].map(mode => (
                   <div key={mode} className={`w-2 h-2 rounded-full ${activeMode === mode ? 'bg-cyan-500 animate-pulse' : 'bg-slate-800'}`} />
                ))}
             </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col relative h-screen lg:h-auto overflow-hidden">
          
          {/* HEADER CON PESTAÑAS CAMBIANTES */}
          <header className="h-16 border-b border-slate-800 bg-[#030303]/90 backdrop-blur flex items-center justify-between px-6 z-10">
            <div className="flex items-center">
              {/* Botón de menú para móviles */}
              <button 
                className="lg:hidden mr-4 p-2 rounded-sm border border-slate-700 text-slate-400 hover:text-white"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-sm md:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  {currentData.title}
                </h1>
                <span className="text-[9px] font-mono text-slate-500 tracking-widest">
                  {currentData.sector}
                </span>
              </div>
            </div>
            
            {/* EL SELECTOR DE MODO (LAS "PESTAÑAS") */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-900/50 rounded-sm p-1 border border-slate-800">
                {[
                  { id: 'HEALTH', icon: HeartPulse, label: t('dashboard.modes.health') },
                  { id: 'GOV', icon: Shield, label: t('dashboard.modes.gov') },
                  { id: 'FINTECH', icon: Landmark, label: t('dashboard.modes.fintech') },
                  { id: 'AUDIT', icon: FileSearch, label: t('dashboard.modes.audit') }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setActiveMode(mode.id as keyof typeof DATA_MODES)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-wider transition-all ${
                      activeMode === mode.id 
                      ? 'bg-slate-800 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <mode.icon size={12} className={activeMode === mode.id ? 'text-cyan-400' : ''} />
                    <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:block text-right">
              <div className="text-xs font-bold text-white font-mono">{currentTime}</div>
              <div className="text-[9px] text-green-500 font-mono tracking-wider">{t('dashboard.encryption_on')}</div>
            </div>
          </header>

          {/* CONTENIDO PRINCIPAL */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              
              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentData.kpis.map((item: KpiItem, index: number) => (
                  <KpiCard key={index} item={item} color={currentData.themeColor} />
                ))}
              </div>
              
              {/* GRÁFICO Y ALERTAS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* GRÁFICO */}
                <div className="bg-[#0a0a0a] border border-slate-800 p-6 rounded-sm">
                  <h3 className="text-sm font-bold text-white mb-4 tracking-tight">{t('dashboard.chart_labels.patientFlowEfficiency')}</h3>
                  <div className="h-80 min-h-[300px] min-w-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={currentData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                        <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                        <YAxis stroke="#94a3b8" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#0a0a0a', 
                            borderColor: '#334155', 
                            borderRadius: '4px',
                            color: 'white'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={currentData.themeColor} 
                          fill={`${currentData.themeColor}40`} 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* ALERTAS */}
                <div className="bg-[#0a0a0a] border border-slate-800 rounded-sm overflow-hidden">
                  <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white tracking-tight">{t('dashboard.nav.autoReports')}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                      <span className="text-[10px] text-slate-500 font-mono">{t('dashboard.status.active')}</span>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-slate-900">
                    {currentData.alerts.map((alert: AlertItem, index: number) => (
                      <AlertRow key={index} alert={alert} color={currentData.themeColor} />
                    ))}
                  </div>
                </div>
                
              </div>
              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}