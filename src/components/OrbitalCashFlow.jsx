import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { 
  Banknote, TrendingUp, Users, Clock, ArrowUpRight, 
  MessageCircle, Send, CheckCircle2, Phone, ShieldCheck,
  Wallet, BarChart3, ChevronRight, Zap
} from 'lucide-react';

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';



// --- DATOS SINTÉTICOS (Reales en estructura, seguros en identidad) ---

// Simulamos una cartera de clientes morosos típica de una empresa mediana

const PORTFOLIO_DATA = [
  { 
    id: 1, 
    client: "DISTRIBUIDORA DEL SUR S.A.S.", 
    debt: 45000000, 
    days_overdue: 45,
    probability: 92,
    channel: "WHATSAPP",
    status: "PENDIENTE",
    ai_strategy: "Ofrecer 5% de descuento por pago hoy antes de 4 PM."
  },
  { 
    id: 2, 
    client: "CLÍNICA VETERINARIA SAN FRANCISCO", 
    debt: 12500000, 
    days_overdue: 30,
    probability: 85,
    channel: "EMAIL",
    status: "PENDIENTE",
    ai_strategy: "Recordatorio amable de vencimiento + Link de pago Wompi."
  },
  { 
    id: 3, 
    client: "INVERSIONES Y CONSTRUCCIONES 'EL ROBLE'", 
    debt: 85000000, 
    days_overdue: 90,
    probability: 65,
    channel: "LEGAL",
    status: "RIESGO",
    ai_strategy: "Generar notificación pre-jurídica automática."
  },
  { 
    id: 4, 
    client: "COMERCIALIZADORA LA 14 (SUCURSAL)", 
    debt: 8400000, 
    days_overdue: 15,
    probability: 98,
    channel: "WHATSAPP",
    status: "PENDIENTE",
    ai_strategy: "Saludo automático agente Misybot."
  }
];



const CHART_DATA = [
  { name: 'Sem 1', standard: 10, ai_boost: 12 },
  { name: 'Sem 2', standard: 15, ai_boost: 25 },
  { name: 'Sem 3', standard: 20, ai_boost: 45 }, // La IA acelera el cobro
  { name: 'Sem 4', standard: 22, ai_boost: 68 },
  { name: 'Sem 5', standard: 25, ai_boost: 90 },
];



// --- COMPONENTES UI ---



const KpiCard = ({ title, value, sub, icon: Icon, color }) => (
  <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-lg relative overflow-hidden group hover:border-slate-600 transition-all">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon size={64} />
    </div>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2 rounded bg-slate-900 ${color} bg-opacity-20`}>
        <Icon size={20} className={color.replace('text-', 'text-')} />
      </div>
      <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{title}</span>
    </div>
    <div className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
    <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
      <TrendingUp size={12} className="text-emerald-500" /> {sub}
    </div>
  </div>
);



// --- DASHBOARD PRINCIPAL ---



export default function OrbitalCashFlow() {

  const [selectedClient, setSelectedClient] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  const formatCOP = (val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);

  const totalRecoverable = PORTFOLIO_DATA.reduce((acc, item) => acc + item.debt, 0);

  const executeAI = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccessMsg("Gestión iniciada: Mensajes enviados a 4 deudores.");
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-hidden flex flex-col selection:bg-emerald-500/30">
      
      {/* HEADER: SOLO NEGOCIOS */}
      <header className="h-16 border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600 rounded flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Zap size={20} fill="white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">ORBITAL CASH-FLOW</h1>
            <div className="text-[10px] text-emerald-400 font-mono tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
              AGENTE DE COBRANZA IA: ACTIVO
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
             <div className="text-[10px] text-slate-500 font-mono uppercase">Liquidez Proyectada</div>
             <div className="text-sm font-bold text-white font-mono">{formatCOP(totalRecoverable * 0.85)}</div>
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-bold text-white transition-colors flex items-center gap-2">
            <Wallet size={14} /> CONECTAR BANCOS
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar">
        
        {/* COLUMNA IZQUIERDA: VISUALIZACIÓN DE DINERO */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KpiCard 
              title="Cartera Recuperable" 
              value={formatCOP(totalRecoverable)} 
              sub="Disponible para gestión inmediata" 
              icon={Banknote} 
              color="text-emerald-500" 
            />
            <KpiCard 
              title="Recuperado esta Semana" 
              value={formatCOP(42500000)} 
              sub="+15% vs Semana anterior" 
              icon={CheckCircle2} 
              color="text-blue-500" 
            />
            <KpiCard 
              title="Velocidad de Cobro" 
              value="-12 Días" 
              sub="Reducción de cartera vencida" 
              icon={Clock} 
              color="text-amber-500" 
            />
          </div>

          {/* GRÁFICA DE PROYECCIÓN */}
          <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-lg flex-1 min-h-[300px] flex flex-col shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 size={16} className="text-emerald-500"/> PROYECCIÓN DE FLUJO DE CAJA
                </h3>
                <p className="text-xs text-slate-500 mt-1">Comparativa: Cobro Tradicional vs. Orbital AI</p>
              </div>
              <div className="flex gap-4 text-[10px] font-mono">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-600"></div> TRADICIONAL</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> CON IA</div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA}>
                <defs>
                  <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="standard" stroke="#475569" strokeWidth={2} fillOpacity={1} fill="transparent" />
                <Area type="monotone" dataKey="ai_boost" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* LISTA DE OPORTUNIDADES */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Users size={16} className="text-amber-500"/> LISTA PRIORITARIA DE COBRO
              </h3>
              <span className="text-[10px] bg-emerald-950/30 text-emerald-400 px-2 py-1 rounded border border-emerald-900/50">
                IA SCORING: ALTA PROBABILIDAD
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#020617] text-xs uppercase text-slate-500 font-mono">
                  <tr>
                    <th className="p-4 font-medium">Cliente</th>
                    <th className="p-4 text-right font-medium">Deuda Total</th>
                    <th className="p-4 text-center font-medium">Días Mora</th>
                    <th className="p-4 text-center font-medium">Prob. Pago</th>
                    <th className="p-4 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {PORTFOLIO_DATA.map((client) => (
                    <tr 
                      key={client.id} 
                      onClick={() => setSelectedClient(client)}
                      className={`cursor-pointer hover:bg-slate-800/50 transition-colors ${selectedClient?.id === client.id ? 'bg-emerald-900/10 border-l-2 border-l-emerald-500' : ''}`}
                    >
                      <td className="p-4 font-bold text-slate-200">{client.client}</td>
                      <td className="p-4 text-right font-mono text-emerald-100">{formatCOP(client.debt)}</td>
                      <td className="p-4 text-center text-slate-400">{client.days_overdue}</td>
                      <td className="p-4 text-center">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${client.probability > 90 ? 'text-emerald-400 bg-emerald-950/30' : 'text-amber-400 bg-amber-950/30'}`}>
                          {client.probability}%
                        </span>
                      </td>
                      <td className="p-4 text-center text-slate-500">
                        <ChevronRight size={16} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: PANEL DE ACCIÓN (MISYBOT) */}
        <div className="lg:col-span-1">
          <div className="bg-[#0f172a] border border-slate-800 rounded-lg p-6 h-full flex flex-col shadow-2xl sticky top-6">
            
            {/* ESTADO GLOBAL */}
            <div className="mb-6 p-4 rounded bg-slate-900/50 border border-slate-800">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs text-slate-400 uppercase font-bold">Estado del Agente</span>
                 <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-xs font-mono text-emerald-400">ACTIVO</span>
                 </div>
               </div>
               <div className="text-sm font-bold text-white mb-1">MISYBOT v2.1</div>
               <div className="text-xs text-slate-500">IA de cobranza predictiva</div>
            </div>

            {/* ACCIÓN PRINCIPAL */}
            <div className="mb-6">
              <button 
                onClick={executeAI}
                disabled={processing}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-lg font-bold text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-500/30 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    EJECUTANDO...
                  </>
                ) : (
                  <>
                    <Zap size={20} fill="white" />
                    EJECUTAR COBRANZA INTELIGENTE
                  </>
                )}
              </button>
              
              {successMsg && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-emerald-950/30 border border-emerald-800 rounded text-emerald-400 text-center text-sm"
                >
                  {successMsg}
                </motion.div>
              )}
            </div>

            {/* CLIENTE SELECCIONADO */}
            <div className="flex-1">
              <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-400"/> GESTIÓN DEUDOR
              </h3>
              
              {selectedClient ? (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-800">
                    <div className="font-bold text-white text-sm mb-2">{selectedClient.client}</div>
                    <div className="text-emerald-400 font-bold font-mono">{formatCOP(selectedClient.debt)}</div>
                    <div className="text-xs text-slate-500 mt-1">Deuda vencida: {selectedClient.days_overdue} días</div>
                  </div>
                  
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-800">
                    <div className="text-xs text-slate-400 uppercase mb-2 font-bold">Estrategia IA</div>
                    <div className="text-sm text-slate-300">{selectedClient.ai_strategy}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-xs font-bold text-white transition-colors flex items-center justify-center gap-2">
                      <MessageCircle size={14} /> {selectedClient.channel}
                    </button>
                    <button className="py-3 px-4 bg-blue-600 hover:bg-blue-500 rounded text-xs font-bold text-white transition-colors flex items-center justify-center gap-2">
                      <Phone size={14} /> LLAMAR
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-center p-8">
                  <div>
                    <Users size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Selecciona un cliente de la lista</p>
                    <p className="text-xs mt-1">para gestionar su cobro</p>
                  </div>
                </div>
              )}
            </div>

            {/* CANALES DE COMUNICACIÓN */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-400 uppercase mb-3 font-bold">Canales Activos</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 bg-slate-900/50 rounded border border-slate-800 text-center">
                  <MessageCircle size={16} className="mx-auto mb-1 text-emerald-400" />
                  <div className="text-[10px] font-bold text-white">WHATSAPP</div>
                  <div className="text-[8px] text-slate-500">98%</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded border border-slate-800 text-center">
                  <Send size={16} className="mx-auto mb-1 text-blue-400" />
                  <div className="text-[10px] font-bold text-white">EMAIL</div>
                  <div className="text-[8px] text-slate-500">92%</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded border border-slate-800 text-center">
                  <Phone size={16} className="mx-auto mb-1 text-amber-400" />
                  <div className="text-[10px] font-bold text-white">VOICE</div>
                  <div className="text-[8px] text-slate-500">87%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}