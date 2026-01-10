import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, TrendingUp, ArrowUpRight, CheckCircle2, 
  Clock, Zap, FileText, Smartphone, ShieldCheck, 
  Building2, Users, ChevronRight, BarChart3, MessageCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';

// --- DATOS SIMULADOS PARA LA DEMO (MODIFICA ESTO CON NOMBRES REALES MAÑANA) ---
const REVENUE_STREAMS = [
  { id: 1, source: "Cartera Vencida > 90 Días", amount: 154000000, potential: "Alta", risk: "Medio" },
  { id: 2, source: "Glosas EPS (Facturación)", amount: 85500000, potential: "Muy Alta", risk: "Bajo" },
  { id: 3, source: "Clientes Inactivos (Churn)", amount: 42000000, potential: "Media", risk: "Alto" },
];

const CLIENTS_DB = [
  { id: 1, name: "DISTRIBUIDORA DEL SUR S.A.", debt: 45000000, status: "Contactado", probability: 92, ai_strategy: "Ofrecer 5% de descuento por pago hoy antes de 4 PM." },
  { id: 2, name: "CLÍNICA SAN PEDRO (GLOSAS)", debt: 128000000, status: "Análisis IA", probability: 85, ai_strategy: "Recordatorio amable de vencimiento + Link de pago Wompi." },
  { id: 3, name: "SUPERMERCADO LA 14", debt: 15600000, status: "Pendiente", probability: 78, ai_strategy: "Saludo automático agente Misybot." },
  { id: 4, name: "CONSTRUCTORA VALLE REAL", debt: 62000000, status: "Pre-Jurídico", probability: 60, ai_strategy: "Generar notificación pre-jurídica automática." },
];

const CHART_DATA = [
  { name: 'Sem 1', organic: 10, ai_powered: 15 },
  { name: 'Sem 2', organic: 15, ai_powered: 35 },
  { name: 'Sem 3', organic: 18, ai_powered: 60 },
  { name: 'Sem 4', organic: 20, ai_powered: 95 },
];

// --- COMPONENTES ---

const StatCard = ({ label, value, sub, icon: Icon, color }) => (
  <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl relative overflow-hidden group hover:border-gray-600 transition-all shadow-lg">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon size={80} />
    </div>
    <div className="flex items-center gap-3 mb-2">
      <div className={`p-2.5 rounded-lg bg-gray-900 ${color} bg-opacity-20`}>
        <Icon size={20} className={color.replace('text-', 'text-')} />
      </div>
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
    <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
      <TrendingUp size={12} className="text-emerald-500" /> {sub}
    </div>
  </div>
);

export default function OrbitalRevenue() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [processing, setProcessing] = useState(false);

  const formatCOP = (val) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  const totalOpportunity = REVENUE_STREAMS.reduce((acc, curr) => acc + curr.amount, 0);

  const handleActivate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  const executeAI = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      // Aquí iría la lógica real de ejecución de IA
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white font-sans overflow-hidden flex flex-col selection:bg-emerald-500/30">
      
      {/* HEADER: VENTA DE SERVICIO */}
      <header className="h-16 border-b border-gray-800 bg-[#0b0f19]/90 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-900/40">
            <Zap size={24} fill="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">ORBITAL REVENUE</h1>
            <div className="text-[10px] text-emerald-400 font-mono tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
              SISTEMA DE RECUPERACIÓN INTELIGENTE
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="text-right">
             <div className="text-[10px] text-gray-500 font-mono uppercase font-bold">Oportunidad Detectada</div>
             <div className="text-lg font-bold text-emerald-400 font-mono">{formatCOP(totalOpportunity)}</div>
          </div>
          <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2">
            <Wallet size={16} /> CONECTAR CUENTAS
          </button>
        </div>
      </header>

      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto">
        
        {/* COLUMNA 1 & 2: EL DINERO VISIBLE */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* KPIs DE IMPACTO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
              label="Flujo Recuperable" 
              value={formatCOP(totalOpportunity)} 
              sub="Disponible en 30 días" 
              icon={Wallet} 
              color="text-emerald-500" 
            />
            <StatCard 
              label="Tasa de Éxito IA" 
              value="87.4%" 
              sub="vs 12% Cobro Manual" 
              icon={CheckCircle2} 
              color="text-blue-500" 
            />
            <StatCard 
              label="Velocidad de Caja" 
              value="48 Horas" 
              sub="Tiempo promedio de respuesta" 
              icon={Clock} 
              color="text-amber-500" 
            />
          </div>

          {/* GRÁFICA DE PROYECCIÓN (TU PROMESA) */}
          <div className="bg-[#111827] border border-gray-800 p-8 rounded-xl shadow-xl flex flex-col min-h-[350px]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 size={20} className="text-emerald-500"/> PROYECCIÓN DE LIQUIDEZ (ENERO 2026)
                </h3>
                <p className="text-sm text-gray-500 mt-1">Comparativa: Cobranza Tradicional vs. Orbital AI</p>
              </div>
            </div>
            
            <div className="flex-1 w-full h-full min-h-[300px] min-w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA}>
                  <defs>
                    <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOrg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#030712', borderColor: '#374151', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="organic" stroke="#64748b" strokeWidth={2} fillOpacity={1} fill="url(#colorOrg)" name="Tradicional" />
                  <Area type="monotone" dataKey="ai_powered" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorAi)" name="Con IA Orbital" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LISTA DE OBJETIVOS (TUS CLIENTES REALES) */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden flex flex-col shadow-xl">
            <div className="p-5 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Users size={18} className="text-amber-500"/> LISTA DE RECUPERACIÓN PRIORITARIA
              </h3>
              <span className="text-[10px] bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-full border border-emerald-800 font-bold">
                IA SCORING: ALTA PROBABILIDAD
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0b0f19] text-xs uppercase text-gray-500 font-mono">
                  <tr>
                    <th className="p-5 font-bold">Cliente / Deudor</th>
                    <th className="p-5 text-right font-bold">Monto Deuda</th>
                    <th className="p-5 text-center font-bold">Probabilidad</th>
                    <th className="p-5 text-center font-bold">Estado</th>
                    <th className="p-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {CLIENTS_DB.map((client) => (
                    <tr 
                      key={client.id} 
                      onClick={() => setSelectedClient(client)}
                      className={`cursor-pointer hover:bg-gray-800/60 transition-colors ${selectedClient?.id === client.id ? 'bg-emerald-900/10 border-l-4 border-l-emerald-500' : ''}`}
                    >
                      <td className="p-5">
                        <div className="font-bold text-white text-sm">{client.name}</div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <Building2 size={12}/> Sector Privado
                        </div>
                      </td>
                      <td className="p-5 text-right font-mono font-bold text-emerald-200 text-sm">{formatCOP(client.debt)}</td>
                      <td className="p-5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{width: `${client.probability}%`}}></div>
                          </div>
                          <span className="text-xs font-bold text-emerald-500">{client.probability}%</span>
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                          client.status === 'Contactado' ? 'bg-blue-900/30 text-blue-400 border-blue-800' : 
                          client.status === 'Análisis IA' ? 'bg-amber-900/30 text-amber-400 border-amber-800' :
                          'bg-gray-800 text-gray-400 border-gray-700'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="p-5 text-center text-gray-500">
                        <ChevronRight size={18} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* COLUMNA 3: EL GENERADOR DE DINERO (PANEL DE ACCIÓN) */}
        <div className="lg:col-span-1">
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 h-full flex flex-col shadow-2xl sticky top-8">
            
            {/* ESTADO GLOBAL */}
            <div className="mb-6 p-4 rounded-lg bg-gray-900/50 border border-gray-800">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-xs text-gray-400 uppercase font-bold">Estado del Sistema</span>
                 <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                   <span className="text-xs text-emerald-400 font-mono">ACTIVO</span>
                 </div>
               </div>
               <div className="text-sm text-white font-bold">AGENTE DE COBRANZA IA</div>
               <div className="text-xs text-gray-500 mt-1">Procesando cartera en tiempo real</div>
            </div>

            {/* ACCIONES RÁPIDAS */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Zap size={16} className="text-amber-500"/> ACCIONES RÁPIDAS
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-gray-900/50 hover:bg-emerald-900/30 border border-gray-800 rounded-lg text-xs text-gray-300 hover:text-emerald-400 transition-all flex flex-col items-center gap-1.5">
                  <ShieldCheck size={16} />
                  <span>Validar</span>
                </button>
                <button className="p-3 bg-gray-900/50 hover:bg-emerald-900/30 border border-gray-800 rounded-lg text-xs text-gray-300 hover:text-emerald-400 transition-all flex flex-col items-center gap-1.5">
                  <Smartphone size={16} />
                  <span>WhatsApp</span>
                </button>
                <button className="p-3 bg-gray-900/50 hover:bg-emerald-900/30 border border-gray-800 rounded-lg text-xs text-gray-300 hover:text-emerald-400 transition-all flex flex-col items-center gap-1.5">
                  <FileText size={16} />
                  <span>Acuerdo</span>
                </button>
                <button className="p-3 bg-gray-900/50 hover:bg-emerald-900/30 border border-gray-800 rounded-lg text-xs text-gray-300 hover:text-emerald-400 transition-all flex flex-col items-center gap-1.5">
                  <ArrowUpRight size={16} />
                  <span>Reenviar</span>
                </button>
              </div>
            </div>

            {/* CLIENTE SELECCIONADO */}
            <div className="mb-6 flex-1">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Users size={16} className="text-blue-500"/> CLIENTE SELECCIONADO
              </h3>
              
              {selectedClient ? (
                <div className="flex-1 bg-[#0f172a] rounded-xl p-5 border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300 overflow-y-auto custom-scrollbar">
                  
                  {/* CABECERA CON PERFIL DE RIESGO */}
                  <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-800">
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">{selectedClient.name}</h3>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">ID: {90023000 + selectedClient.id} • SECTOR: RETAIL</p>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Score de Riesgo</div>
                      <div className={`text-2xl font-bold ${selectedClient.probability > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {selectedClient.probability}/100
                      </div>
                    </div>
                  </div>

                  {/* 1. EL CEREBRO: POR QUÉ LA IA DICE ESTO (XAI LAYER) */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                      <p className="text-[10px] text-emerald-400 uppercase font-bold mb-3 flex items-center gap-2">
                        <Zap size={12} className="animate-pulse"/> ANÁLISIS DE COMPORTAMIENTO (IA)
                      </p>
                      
                      {/* Simulación de Análisis de Datos no estructurados */}
                      <div className="space-y-3">
                        
                        {/* Análisis de Sentimiento */}
                        <div>
                          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                            <span>Análisis de Sentimiento (Último Contacto)</span>
                            <span className={selectedClient.probability > 80 ? "text-emerald-400" : "text-red-400"}>
                              {selectedClient.probability > 80 ? "NEUTRAL / RECEPTIVO" : "HOSTIL / EVASIVO"}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${selectedClient.probability > 80 ? "bg-emerald-500" : "bg-red-500"}`} 
                              style={{width: `${selectedClient.probability}%`}}
                            ></div>
                          </div>
                        </div>

                        {/* Patrones de Pago */}
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="bg-slate-950 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block">Día Habitual de Pago</span>
                            <span className="text-white font-mono">Viernes (PM)</span>
                          </div>
                          <div className="bg-slate-950 p-2 rounded border border-slate-800">
                            <span className="text-slate-500 block">Canal Preferido</span>
                            <span className="text-white font-mono">WhatsApp</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* 2. LA ESTRATEGIA GENERATIVA (NLP) */}
                    <div className="bg-gradient-to-br from-emerald-900/10 to-slate-900 p-4 rounded-lg border border-emerald-900/30 relative">
                      <div className="absolute top-2 right-2">
                         <Smartphone size={14} className="text-emerald-600 opacity-50"/>
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Next Best Action (Sugerido por IA)</p>
                      <p className="text-sm text-slate-200 leading-relaxed font-light italic">
                        "{selectedClient.ai_strategy}"
                      </p>
                      <div className="mt-3 flex gap-2">
                         <span className="text-[9px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700">Modelo: GPT-4o</span>
                         <span className="text-[9px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700">Confianza: High</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. RESUMEN FINANCIERO Y ACCIONES */}
                  <div className="mt-auto pt-4 border-t border-slate-800">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-slate-400">Deuda Total:</span>
                      <span className="text-white font-bold font-mono">{formatCOP(selectedClient.debt)}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 mt-4">
                      <button 
                        onClick={executeAI}
                        disabled={processing}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all"
                      >
                        {processing ? (
                          <span className="animate-pulse">NEGOCIANDO AUTOMÁTICAMENTE...</span>
                        ) : (
                          <><MessageCircle size={16} /> EJECUTAR GUION DE COBRO IA</>
                        )}
                      </button>
                      <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded border border-slate-700 flex items-center justify-center gap-2">
                        <FileText size={12} /> VER EXPEDIENTE LEGAL (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 p-6 border-2 border-dashed border-gray-800 rounded-xl bg-slate-900/20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 rounded-full"></div>
                    <ArrowUpRight size={48} className="mb-4 text-slate-500 relative z-10" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">ESPERANDO SELECCIÓN</p>
                  <p className="text-[10px] text-slate-600 mt-2 max-w-[180px]">
                    Seleccione un cliente para activar el motor de análisis predictivo.
                  </p>
                </div>
              )}
            </div>

            {/* SIMULACIÓN DE ACTIVACIÓN */}
            <div className="mt-auto">
              <button 
                onClick={handleActivate}
                disabled={isSimulating}
                className={`w-full py-3.5 text-center text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                  isSimulating 
                    ? 'bg-amber-600/80 text-white' 
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/30'
                }`}
              >
                {isSimulating ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    PROCESANDO...
                  </>
                ) : (
                  <>
                    <Zap size={18} fill="white" />
                    ACTIVAR ORBITAL AI
                  </>
                )}
              </button>
              <p className="text-[10px] text-gray-500 text-center mt-2.5">
                {isSimulating 
                  ? "Iniciando agentes de cobranza inteligente..." 
                  : "Desbloquea el 87% de tasa de éxito en cobranza"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}