'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  Activity,
  Package,
  Users,
  Clock
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// Tipos de datos
interface Incident {
  id: string;
  producto: string;
  valor_fuga: number;
  fecha: string;
  estado: 'abierto' | 'cerrado';
  descripcion: string;
}

interface MisybotLog {
  id: string;
  timestamp: string;
  mensaje: string;
  nivel: 'info' | 'warning' | 'critical';
}

interface SentinelData {
  inventarioProtegido: number;
  fugaDetectada: number;
  valorRetenido: number;
  roi: number;
  historico: Array<{
    mes: string;
    perdidaSinBlindaje: number;
    perdidaConBlindaje: number;
  }>;
  topFugas: Array<{
    producto: string;
    valor: number;
  }>;
  logs: MisybotLog[];
}

// Datos iniciales simulados
const initialData: SentinelData = {
  inventarioProtegido: 4250000000, // 4.250.000.000 COP
  fugaDetectada: 6800000, // 6.800.000 COP
  valorRetenido: 18200000, // 18.200.000 COP
  roi: 342, // 342%
  historico: [
    { mes: 'Ene', perdidaSinBlindaje: 25, perdidaConBlindaje: 18 },
    { mes: 'Feb', perdidaSinBlindaje: 24, perdidaConBlindaje: 16 },
    { mes: 'Mar', perdidaSinBlindaje: 26, perdidaConBlindaje: 19 },
    { mes: 'Abr', perdidaSinBlindaje: 23, perdidaConBlindaje: 14 },
    { mes: 'May', perdidaSinBlindaje: 22, perdidaConBlindaje: 12 },
    { mes: 'Jun', perdidaSinBlindaje: 24, perdidaConBlindaje: 13 },
    { mes: 'Jul', perdidaSinBlindaje: 21, perdidaConBlindaje: 10 },
    { mes: 'Ago', perdidaSinBlindaje: 23, perdidaConBlindaje: 11 },
    { mes: 'Sep', perdidaSinBlindaje: 20, perdidaConBlindaje: 9 },
    { mes: 'Oct', perdidaSinBlindaje: 19, perdidaConBlindaje: 8 },
    { mes: 'Nov', perdidaSinBlindaje: 21, perdidaConBlindaje: 7 },
    { mes: 'Dic', perdidaSinBlindaje: 20, perdidaConBlindaje: 6 },
  ],
  topFugas: [
    { producto: 'Componentes electrónicos', valor: 4500000 },
    { producto: 'Herramientas industriales', valor: 3200000 },
    { producto: 'Materiales eléctricos', valor: 2800000 },
    { producto: 'Equipo de seguridad', valor: 2100000 },
    { producto: 'Maquinaria especializada', valor: 1900000 },
  ],
  logs: [
    { id: '1', timestamp: '2024-12-27 10:05:23', mensaje: 'Misybot detectó anomalía en Cámara 4', nivel: 'warning' },
    { id: '2', timestamp: '2024-12-27 10:04:45', mensaje: 'Ruta corregida en Vehículo TXZ-456', nivel: 'info' },
    { id: '3', timestamp: '2024-12-27 10:03:12', mensaje: 'Alerta de acceso no autorizado en Bodega A', nivel: 'critical' },
    { id: '4', timestamp: '2024-12-27 10:02:33', mensaje: 'Sistema de blindaje activado en Zona 3', nivel: 'info' },
    { id: '5', timestamp: '2024-12-27 10:01:56', mensaje: 'Análisis de comportamiento completado', nivel: 'info' },
    { id: '6', timestamp: '2024-12-27 10:00:44', mensaje: 'Detección de patrón inusual en inventario', nivel: 'warning' },
    { id: '7', timestamp: '2024-12-27 09:59:22', mensaje: 'Verificación de seguridad completada', nivel: 'info' },
    { id: '8', timestamp: '2024-12-27 09:58:17', mensaje: 'Sistema de IA detectó intento de manipulación', nivel: 'critical' },
  ],
};

// Componente de tarjeta de KPI
const KPICard = ({ 
  title, 
  value, 
  icon, 
  color,
  pulse = false
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  color: string;
  pulse?: boolean;
}) => (
  <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 transition-all duration-300 hover:border-slate-600">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${pulse ? 'animate-pulse' : ''}`} style={{ backgroundColor: color.replace('text-', 'bg-').replace('-500', '-900/20') }}>
        {icon}
      </div>
    </div>
  </div>
);

// Componente de log
const LogItem = ({ log }: { log: MisybotLog }) => {
  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'critical': return 'text-rose-400';
      case 'warning': return 'text-amber-400';
      default: return 'text-slate-400';
    }
  };

  const getNivelBg = (nivel: string) => {
    switch (nivel) {
      case 'critical': return 'bg-rose-900/30 border-rose-900/50';
      case 'warning': return 'bg-amber-900/30 border-amber-900/50';
      default: return 'bg-slate-900/30 border-slate-700';
    }
  };

  return (
    <div className={`border-l-4 p-3 ${getNivelBg(log.nivel)}`}>
      <div className="flex justify-between items-start">
        <span className={`text-xs font-mono ${getNivelColor(log.nivel)}`}>
          {log.timestamp}
        </span>
        <span className={`text-xs px-2 py-1 rounded ${getNivelColor(log.nivel)}`}>
          {log.nivel.toUpperCase()}
        </span>
      </div>
      <p className="text-slate-300 text-sm mt-1">{log.mensaje}</p>
    </div>
  );
};

const SentinelDashboard = () => {
  const [data, setData] = useState<SentinelData>(initialData);
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');
  
  // Formateador de moneda COP
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Formateador de porcentaje
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="text-emerald-400" size={32} />
          <h1 className="text-3xl font-bold text-white">Sentinel Dashboard</h1>
        </div>
        <p className="text-slate-400">Visualización de seguridad logística y retorno de inversión</p>
      </div>

      {/* Sección 1: Tarjetas de Impacto (KPIs Superiores) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Inventario Bajo Protección"
          value={formatCurrency(data.inventarioProtegido)}
          icon={<Package className="text-emerald-400" size={24} />}
          color="text-emerald-400"
        />
        <KPICard
          title="Fuga Detectada en Tiempo Real"
          value={formatCurrency(data.fugaDetectada)}
          icon={<AlertTriangle className="text-rose-500" size={24} />}
          color="text-rose-500"
          pulse={data.fugaDetectada > 0}
        />
        <KPICard
          title="Valor Retenido (Ahorro)"
          value={formatCurrency(data.valorRetenido)}
          icon={<DollarSign className="text-emerald-400" size={24} />}
          color="text-emerald-400"
        />
        <KPICard
          title="ROI del Servicio"
          value={formatPercentage(data.roi)}
          icon={<TrendingUp className="text-emerald-400" size={24} />}
          color="text-emerald-400"
        />
      </div>

      {/* Sección 2: Gráfica de "El Escudo" */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="text-emerald-400" size={20} />
            El Escudo - Comparativa de Pérdidas
          </h2>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-slate-400 border-dashed border-b"></div>
              <span className="text-slate-400">Sin Blindaje</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-emerald-400"></div>
              <span className="text-slate-400">Con Blindaje</span>
            </div>
          </div>
        </div>
        <div className="h-80 min-h-[300px] min-w-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.historico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="mes" 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }} 
              />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fill: '#94a3b8' }}
                tickFormatter={(value) => `${value}M`}
              />
              <Tooltip 
                formatter={(value) => [`${value}M COP`, 'Perdida']}
                labelFormatter={(label) => `Mes: ${label}`}
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #334155',
                  borderRadius: '0.5rem',
                  color: '#e2e8f0'
                }}
              />
              {/* Área entre las dos líneas */}
              <Area
                type="monotone"
                dataKey="perdidaSinBlindaje"
                stroke="none"
                fill="url(#colorGradient)"
                fillOpacity={0.1}
                name="Capital Salvado"
              />
              {/* Línea de tendencia sin blindaje */}
              <Area
                type="monotone"
                dataKey="perdidaSinBlindaje"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none"
                name="Sin Blindaje"
              />
              {/* Línea de pérdida con blindaje */}
              <Area
                type="monotone"
                dataKey="perdidaConBlindaje"
                stroke="#10b981"
                strokeWidth={2}
                fill="none"
                name="Con Blindaje"
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Etiqueta flotante */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-emerald-900/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-emerald-700/50">
            <span className="text-emerald-300 font-bold text-lg">CAPITAL SALVADO POR SENTINEL</span>
          </div>
        </div>
      </div>

      {/* Sección 3: Radar de Fugas y Feed de Inteligencia */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar de Fugas (Pareto) */}
        <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="text-rose-500" size={20} />
            Top 5 Productos con Mayor Fuga
          </h2>
          <div className="h-80 min-h-[300px] min-w-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="horizontal"
                data={data.topFugas}
                margin={{ top: 20, right: 30, left: 100, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8' }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <YAxis 
                  type="category" 
                  dataKey="producto" 
                  stroke="#94a3b8" 
                  tick={{ fill: '#94a3b8' }}
                  width={90}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(Number(value)), 'Valor']}
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '0.5rem',
                    color: '#e2e8f0'
                  }}
                />
                <Bar dataKey="valor" name="Valor de Fuga">
                  {data.topFugas.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? '#ef4444' : index === 1 ? '#f87171' : '#fb7185'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sección 4: Feed de Inteligencia Artificial (Misybot Logs) */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="text-emerald-400" size={20} />
            Feed de Inteligencia
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data.logs.map((log) => (
              <LogItem key={log.id} log={log} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentinelDashboard;