import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, Shield, Users, Clock, AlertTriangle, 
  Map, Server, Zap, HeartPulse, Landmark, 
  Lock, ChevronRight, FileSearch, DollarSign, Box,
  Globe, Eye, BarChart3, Radio, Database, Siren
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// --- TRADUCCIÓN (INGLÉS/ESPAÑOL) ---
const TRANSLATIONS = {
  en: {
    modes: { PRESIDENCY: 'PRESIDENCY (WAR ROOM)', HEALTH: 'MIN. HEALTH (ADRES)', SECURITY: 'MIN. DEFENSE', AUDIT: 'MIN. FINANCE (DIAN)' },
    status: { active: 'ONLINE', critical: 'CRITICAL', warning: 'WARNING' },
    infra: { azure: 'AZURE GOV CLOUD', nvidia: 'NVIDIA H100 GRID' }
  },
  es: {
    modes: { PRESIDENCY: 'PRESIDENCIA (SALA DE CRISIS)', HEALTH: 'MIN. SALUD (ADRES)', SECURITY: 'MIN. DEFENSA', AUDIT: 'MIN. HACIENDA (DIAN)' },
    status: { active: 'EN LÍNEA', critical: 'CRÍTICO', warning: 'ALERTA' },
    infra: { azure: 'NUBE SOBERANA AZURE', nvidia: 'IA NVIDIA RAPIDS' }
  }
};

// --- DATOS MAESTROS (FUSIÓN NACIONAL + DATOS REALES DE TUS ARCHIVOS) ---
const DATA_MODES = {
  // NIVEL 1: VISIÓN NACIONAL (Para el Presidente)
  PRESIDENCY: {
    id: 'PRESIDENCY',
    themeColor: '#FFD700', // Dorado
    title: "SALA DE CRISIS: REPÚBLICA DE COLOMBIA",
    sector: "VISIÓN ESTRATÉGICA UNIFICADA",
    kpis: [
      { label: "EJECUCIÓN PND", value: "42%", trend: "ALERTA BAJA", status: "warning", icon: Activity },
      { label: "RECUPERACIÓN", value: "$12.4T", trend: "ACTIVOS SAE/DIAN", status: "good", icon: DollarSign },
      { label: "ORDEN PÚBLICO", value: "CRÍTICO", trend: "CAUCA / CATATUMBO", status: "critical", icon: Shield },
      { label: "RIESGO SALUD", value: "MEDIO", trend: "INTERVENCIÓN EPS", status: "neutral", icon: HeartPulse },
    ],
    alerts: [
      { type: "CRITICAL", msg: "Seguridad Nacional: Movimiento inusual en Frontera Norte.", time: "VIVO", source: "SATELITAL" },
      { type: "WARNING", msg: "Energía: Embalses al 32% (Riesgo Racionamiento).", time: "-1h", source: "XM-GRID" },
      { type: "INFO", msg: "Tierras: 50.000 Hectáreas tituladas este mes.", time: "-4h", source: "AGENCIA-TIERRAS" },
    ],
    chartData: [
      { time: 'Ene', value: 40 }, { time: 'Feb', value: 45 }, { time: 'Mar', value: 35 },
      { time: 'Abr', value: 50 }, { time: 'May', value: 65 }, { time: 'Jun', value: 80 },
    ]
  },

  // NIVEL 2: SALUD (Con tus datos reales de I.E.M. y Hospitales de Pasto)
  HEALTH: {
    id: 'HEALTH',
    themeColor: '#06b6d4', // Cyan
    title: "ORBITAL HEALTH: GESTIÓN CLÍNICA",
    sector: "PILOTO: RED PÚBLICA (PASTO/NARIÑO)", 
    kpis: [
      { label: "DESANGRE SOAT", value: "$400B", trend: "DETECTADO NACIONAL", status: "critical", icon: DollarSign },
      { label: "OCUPACIÓN UCI", value: "94%", trend: "HOSP. SAN PEDRO", status: "warning", icon: HeartPulse }, // Dato real archivo
      { label: "COBERTURA PAE", value: "98%", trend: "I.E.M. LIBERTAD", status: "good", icon: Box }, // Dato real archivo
      { label: "INTEROPERABILIDAD", value: "ACTIVE", trend: "OPENEMR + MIRTH", status: "good", icon: Server },
    ],
    alerts: [
      { type: "CRITICAL", msg: "Alerta Epidemiológica: I.E.M. NORMAL SUPERIOR. 15 casos fiebre detectados.", time: "VIVO", source: "BIO-SENSOR" },
      { type: "WARNING", msg: "Faltante Farmacia: Insulina NPH en Hospital San Pedro.", time: "-20m", source: "INV-AI" }, // Dato real
      { type: "INFO", msg: "Auditoría ADRES: Cobros duplicados detectados en Clínica Los Andes.", time: "-2h", source: "FRAUD-AI" },
    ],
    chartData: [
      { time: '08:00', value: 45 }, { time: '10:00', value: 80 }, { time: '12:00', value: 95 },
      { time: '14:00', value: 70 }, { time: '16:00', value: 85 }, { time: '18:00', value: 60 },
    ]
  },

  // NIVEL 3: SEGURIDAD (Con tus datos reales de JAC Pasto)
  SECURITY: {
    id: 'SECURITY',
    themeColor: '#3b82f6', // Azul
    title: "ORBITAL DEFENSE: SEGURIDAD CIUDADANA",
    sector: "PILOTO: COMUNA 6 (TAMASAGRA)",
    kpis: [
      { label: "ALERTA JAC", value: "MIJITAYO", trend: "BOTÓN PÁNICO", status: "critical", icon: Siren }, // Dato real archivo
      { label: "TIEMPO RESPUESTA", value: "3m 12s", trend: "-45s (POLICÍA)", status: "good", icon: Zap },
      { label: "CÁMARAS", value: "98%", trend: "LORENZO DE ALDANA", status: "good", icon: Eye }, // Dato real archivo
      { label: "PUNTOS CALIENTES", value: "3", trend: "PARQUE INFANTIL", status: "warning", icon: Map },
    ],
    alerts: [
      { type: "CRITICAL", msg: "Botón de Pánico: Pdte. RAMIRO LOPEZ (JAC Mijitayo Bajo).", time: "VIVO", source: "CIVIL-APP" }, // Dato real
      { type: "WARNING", msg: "Aglomeración: Parque SANTA ISABEL (Posible riña).", time: "-5m", source: "VISION-AI" }, // Dato real
      { type: "INFO", msg: "Dron desplegado: Coordenadas Niza I - Sector Comercial.", time: "-12m", source: "DRONE-OPS" },
    ],
    chartData: [
      { time: '06:00', value: 20 }, { time: '09:00', value: 60 }, { time: '12:00', value: 45 },
      { time: '15:00', value: 50 }, { time: '18:00', value: 95 }, { time: '21:00', value: 85 },
    ]
  },

  // NIVEL 4: HACIENDA/AUDITORÍA (Con tus datos reales de Empresas Pasto)
  AUDIT: {
    id: 'AUDIT',
    themeColor: '#10b981', // Verde
    title: "FISCAL OPTIMIZER: HACIENDA INTELIGENTE",
    sector: "OBJETIVO: EVASIÓN Y LAVADO",
    kpis: [
      { label: "POTENCIAL RECAUDO", value: "$12.5B", trend: "DETECTADO", status: "good", icon: DollarSign },
      { label: "GRANDES CONTRIB.", value: "142", trend: "BAJO LA LUPA", status: "neutral", icon: FileSearch },
      { label: "BRECHA FISCAL", value: "15%", trend: "REDUCIBLE", status: "warning", icon: Activity },
      { label: "NITs BLOQUEADOS", value: "12", trend: "EMPRESAS FACHADA", status: "good", icon: Lock },
    ],
    alerts: [
      { type: "CRITICAL", msg: "Alerta Fiscal: 'ARQUITECTURA E ING. DEL SUR' (NIT 900554268). Activos vs Contratos.", time: "VIVO", source: "AZURE-TAX" }, // Dato real archivo
      { type: "WARNING", msg: "Evasión ICA: 'A TODA HORA S.A.' (ATH). Múltiples sedes sin registro.", time: "-30m", source: "NIT-SCAN" }, // Dato real archivo
      { type: "INFO", msg: "Optimización: 500 oficios de cobro generados para Contadores.", time: "-3h", source: "AUTO-MAIL" },
    ],
    chartData: [
      { time: 'Q1', value: 15 }, { time: 'Q2', value: 25 }, { time: 'Q3', value: 40 }, { time: 'Q4', value: 90 },
    ]
  }
};

// --- COMPONENTES UI ---

const KpiCard = ({ item, color }) => (
  <motion.div 
    key={item.label}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-[#0a0a0a] border border-slate-800 p-6 rounded-sm relative overflow-hidden group hover:border-slate-600 transition-colors"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 rounded-sm bg-slate-900 text-slate-300 group-hover:text-white transition-colors">
        <item.icon size={24} style={{ color: item.status !== 'neutral' ? color : undefined }} />
      </div>
      <span className={`text-[10px] font-mono px-2 py-1 rounded border tracking-wider ${
        item.status === 'good' ? 'border-green-900 text-green-500 bg-green-950/30' : 
        item.status === 'critical' ? 'border-red-900 text-red-500 bg-red-950/30' : 
        item.status === 'warning' ? 'border-amber-900 text-amber-500 bg-amber-950/30' : 
        'border-slate-800 text-slate-500'
      }`}>
        {item.trend}
      </span>
    </div>
    <div className="text-4xl font-bold text-white font-mono tracking-tight mb-2">{item.value}</div>
    <div className="text-[11px] text-slate-500 uppercase tracking-[0.2em]">{item.label}</div>
    <div className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-700 group-hover:w-full" style={{ backgroundColor: color }} />
  </motion.div>
);

const AlertRow = ({ alert, color }) => (
  <motion.div 
    initial={{ x: -10, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className="flex items-start gap-4 p-4 border-b border-slate-900/50 hover:bg-slate-900/40 transition-colors cursor-pointer group"
  >
    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
      alert.type === 'CRITICAL' ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 
      alert.type === 'WARNING' ? 'bg-amber-500' : 'bg-blue-500'
    }`} />
    <div className="flex-1">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-[9px] font-bold px-1.5 py-0.5 border rounded ${
          alert.type === 'CRITICAL' ? 'border-red-900 text-red-500 bg-red-950/20' : 
          alert.type === 'WARNING' ? 'border-amber-900 text-amber-500 bg-amber-950/20' : 'border-blue-900 text-blue-500 bg-blue-950/20'
        }`}>
          {alert.type}
        </span>
        <span className="text-[10px] text-slate-600 font-mono">{alert.time}</span>
      </div>
      <p className="text-sm text-slate-300 leading-snug font-mono font-light group-hover:text-white transition-colors">
        {alert.msg}
      </p>
      <div className="text-[10px] text-slate-600 mt-2 font-mono flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
        <span style={{color: color}} className="flex items-center gap-1"><Database size={10}/> SRC: {alert.source}</span>
      </div>
    </div>
  </motion.div>
);

// --- APP PRINCIPAL ---

export default function GovernmentDashboard() {
  const [activeMode, setActiveMode] = useState('PRESIDENCY'); 
  const [lang, setLang] = useState('es'); 
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  const currentData = DATA_MODES[activeMode];
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-hidden flex selection:bg-cyan-500/30">
      
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-72 border-r border-slate-800 bg-[#050505] flex flex-col z-20 transition-all duration-300">
        
        {/* LOGO */}
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800 bg-slate-950/50">
           <div className="relative group cursor-pointer">
             <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
             <div className="relative w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-cyan-400">
               <Globe size={24} />
             </div>
           </div>
           <div className="ml-4 hidden lg:block">
             <span className="font-bold tracking-[0.2em] text-xs text-white block">ORBITAL PRIME</span>
             <span className="text-[9px] text-slate-500 font-mono tracking-widest block mt-1">NATIONAL GRID</span>
           </div>
        </div>

        {/* MENÚ DE MÓDULOS */}
        <nav className="flex-1 py-8 space-y-2 px-3">
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest px-4 mb-2 hidden lg:block">Government Modules</div>
          {Object.keys(DATA_MODES).map((mode) => (
            <button 
              key={mode} 
              onClick={() => setActiveMode(mode)}
              className={`w-full flex items-center gap-4 px-4 py-4 text-xs font-medium rounded-sm transition-all group relative overflow-hidden ${
                activeMode === mode 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-500 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <div 
                className="w-2 h-2 rounded-full absolute left-2" 
                style={{ backgroundColor: DATA_MODES[mode].themeColor }}
              />
              <div className="ml-4 flex items-center gap-3">
                {mode === 'PRESIDENCY' && <Landmark size={20} />}
                {mode === 'HEALTH' && <HeartPulse size={20} />}
                {mode === 'SECURITY' && <Shield size={20} />}
                {mode === 'AUDIT' && <FileSearch size={20} />}
                <span className="hidden lg:block">{t.modes[mode]}</span>
              </div>
              <ChevronRight 
                size={16} 
                className={`ml-auto transition-transform group-hover:translate-x-1 hidden lg:block ${
                  activeMode === mode ? 'text-cyan-400' : ''
                }`} 
              />
            </button>
          ))}
        </nav>

        {/* FOOTER DE IDIOMA */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-slate-600 font-mono">
              {currentTime}
            </div>
            <div className="flex gap-2">
              {['es', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-[10px] rounded border transition-all ${
                    lang === l 
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
                      : 'border-slate-700 text-slate-500 hover:border-slate-500'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* PANEL PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER DEL MODO ACTIVO */}
        <header 
          className="h-20 border-b border-slate-800 bg-[#050505]/80 backdrop-blur-xl flex items-center justify-between px-8"
          style={{ borderBottomColor: currentData.themeColor }}
        >
          <div>
            <h1 className="text-xl font-bold text-white font-mono">{currentData.title}</h1>
            <p className="text-sm text-slate-500 font-mono">{currentData.sector}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm font-mono text-slate-400">{t.infra.azure}</div>
              <div className="text-xs font-mono text-slate-600">{t.infra.nvidia}</div>
            </div>
            <div 
              className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,215,0,0.6)]"
              style={{ backgroundColor: currentData.themeColor }}
            />
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* KPIs */}
            <section>
              <h2 className="text-lg font-bold mb-6 font-mono text-slate-300">INDICADORES CLAVE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentData.kpis.map((item, idx) => (
                  <KpiCard key={idx} item={item} color={currentData.themeColor} />
                ))}
              </div>
            </section>

            {/* GRÁFICA Y ALERTAS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* GRÁFICA DE TENDENCIA */}
              <div className="lg:col-span-2 bg-[#0a0a0a] border border-slate-800 p-6 rounded-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-white font-mono">TENDENCIA DE RIESGO</h3>
                  <div className="text-sm text-slate-500 font-mono">ÚLTIMO MES</div>
                </div>
                <div className="h-80 min-h-[300px] min-w-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tick={{ fill: '#9CA3AF' }} />
                      <YAxis stroke="#9CA3AF" fontSize={12} tick={{ fill: '#9CA3AF' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#111827', 
                          borderColor: '#1F2937', 
                          borderRadius: '4px',
                          color: 'white'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={currentData.themeColor} 
                        fill={`${currentData.themeColor}80`} 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ALERTAS EN VIVO */}
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-sm flex flex-col">
                <div className="p-6 border-b border-slate-800">
                  <h3 className="font-bold text-white font-mono flex items-center gap-2">
                    <Radio className="animate-pulse" style={{ color: currentData.themeColor }} size={18} /> 
                    ALERTAS EN VIVO
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence>
                    {currentData.alerts.map((alert, idx) => (
                      <AlertRow key={idx} alert={alert} color={currentData.themeColor} />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}