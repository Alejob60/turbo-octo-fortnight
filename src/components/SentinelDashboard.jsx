import React, { useState, useEffect } from 'react';
import { 
  Shield, AlertTriangle, DollarSign, TrendingUp, 
  Activity, Eye, BarChart3, Zap, Radio, Database, 
  Globe, EyeIcon, BarChart2, Terminal
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

// Datos simulados para el dashboard
const initialData = {
  // KPIs
  inventoryProtection: 2450000000, // $2.450.000.000 millones COP
  realTimeLeak: 125000000, // $125.000.000 millones COP
  valueRetained: 1875000000, // $1.875.000.000 millones COP
  serviceROI: 76.5, // 76.5%

  // Datos para la gráfica "El Escudo"
  shieldData: [
    { month: 'Ene', trend: 4200, actual: 3800 },
    { month: 'Feb', trend: 4100, actual: 3750 },
    { month: 'Mar', trend: 4300, actual: 3900 },
    { month: 'Abr', trend: 4500, actual: 4000 },
    { month: 'May', trend: 4700, actual: 4100 },
    { month: 'Jun', trend: 4800, actual: 4200 },
    { month: 'Jul', trend: 5000, actual: 4300 },
  ],

  // Datos para el radar de fugas (Pareto)
  leakData: [
    { product: 'Medicamentos', attempts: 1250 },
    { product: 'Equipos médicos', attempts: 980 },
    { product: 'Insumos quirúrgicos', attempts: 750 },
    { product: 'Vacunas', attempts: 620 },
    { product: 'Materiales de laboratorio', attempts: 480 },
  ],

  // Logs de Misybot
  misybotLogs: [
    { id: 1, message: 'Misybot detectó anomalía en Cámara 4', time: '10:24:15', type: 'warning' },
    { id: 2, message: 'Ruta corregida en Vehículo TXZ-456', time: '10:23:42', type: 'info' },
    { id: 3, message: 'Alerta de temperatura en almacén B7', time: '10:22:33', type: 'critical' },
    { id: 4, message: 'Análisis predictivo completado', time: '10:21:55', type: 'info' },
    { id: 5, message: 'Acceso no autorizado bloqueado', time: '10:20:18', type: 'critical' },
  ]
};

// Componente de KPIs
const KPICards = ({ data }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const kpiData = [
    {
      title: 'Inventario Bajo Protección',
      value: formatCurrency(data.inventoryProtection),
      icon: Shield,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'Fuga Detectada en Tiempo Real',
      value: formatCurrency(data.realTimeLeak),
      icon: AlertTriangle,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
      pulse: true
    },
    {
      title: 'Valor Retenido (Ahorro)',
      value: formatCurrency(data.valueRetained),
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10'
    },
    {
      title: 'ROI del Servicio',
      value: `${data.serviceROI}%`,
      icon: TrendingUp,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div 
            key={index} 
            className={`bg-slate-900/50 border border-slate-800 p-6 rounded-lg ${kpi.bgColor} hover:border-slate-600 transition-all duration-300 group`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${kpi.bgColor} group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
            <div className={`text-2xl font-bold text-white mb-2 ${kpi.pulse ? 'animate-pulse' : ''}`}>
              {kpi.value}
            </div>
            <div className="text-sm text-slate-400 font-medium">
              {kpi.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Componente de la gráfica "El Escudo"
const ShieldChart = ({ data }) => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg mb-8">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Shield className="w-5 h-5 text-cyan-400" />
        El Escudo - Pérdida vs Proyección
      </h3>
      <div className="h-80 min-h-[300px] min-w-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value}M`} />
            <Tooltip 
              formatter={(value) => [`${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value)} COP`, 'Valor']}
              labelFormatter={(label) => `Mes: ${label}`}
              contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '4px', color: 'white' }}
            />
            {/* Línea de tendencia histórica sin blindaje */}
            <Area 
              type="monotone" 
              dataKey="trend" 
              stroke="#9CA3AF" 
              fill="none" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Tendencia Histórica sin Blindaje"
            />
            {/* Línea de pérdida real con blindaje */}
            <Area 
              type="monotone" 
              dataKey="actual" 
              stroke="#10B981" 
              fill="#10B98120" 
              strokeWidth={2}
              name="Pérdida Real con Blindaje"
            />
          </AreaChart>
        </ResponsiveContainer>
        {/* Etiqueta flotante */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-lg px-4 py-2">
          <span className="text-emerald-400 font-bold text-sm">CAPITAL SALVADO POR SENTINEL</span>
        </div>
      </div>
    </div>
  );
};

// Componente del radar de fugas (Pareto)
const LeakRadar = ({ data }) => {
  const maxAttempts = Math.max(...data.map(item => item.attempts));
  
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg mb-8">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <BarChart2 className="w-5 h-5 text-rose-400" />
        Radar de Fugas - Top 5 Productos con Intentos de Robo
      </h3>
      <div className="h-80 min-h-[300px] min-w-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="horizontal"
            data={data}
            margin={{ top: 20, right: 30, left: 100, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" stroke="#9CA3AF" />
            <YAxis 
              dataKey="product" 
              type="category" 
              stroke="#9CA3AF" 
              width={90}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => [value, 'Intentos']}
              contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '4px', color: 'white' }}
            />
            <Bar dataKey="attempts" name="Intentos de Robo">
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.attempts / maxAttempts > 0.8 ? '#EF4444' : '#F59E0B'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Componente de logs de Misybot
const MisybotLogs = ({ logs }) => {
  const getLogIcon = (type) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default: return <Radio className="w-4 h-4 text-cyan-500" />;
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-amber-400';
      default: return 'text-cyan-400';
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Terminal className="w-5 h-5 text-green-400" />
        Feed de Inteligencia Artificial - Misybot Logs
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {logs.map((log) => (
          <div 
            key={log.id} 
            className="flex items-start gap-3 p-3 bg-slate-800/30 rounded border border-slate-700 hover:bg-slate-800/50 transition-colors"
          >
            <div className={getLogColor(log.type)}>
              {getLogIcon(log.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-300">{log.message}</p>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              {log.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente principal del dashboard
const SentinelDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(initialData);

  // Simular actualización de datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        realTimeLeak: prev.realTimeLeak + Math.random() * 1000000 - 500000, // Variación pequeña
        misybotLogs: [
          ...prev.misybotLogs.slice(1),
          {
            id: prev.misybotLogs.length + 1,
            message: `Nuevo evento detectado: ${Math.random() > 0.5 ? 'Anomalía' : 'Acceso'} en ${Math.random() > 0.5 ? 'Cámara' : 'Puerta'} ${Math.floor(Math.random() * 10) + 1}`,
            time: new Date().toLocaleTimeString('es-CO', { hour12: false }),
            type: Math.random() > 0.8 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'info'
          }
        ]
      }));
    }, 5000); // Actualizar cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Visión General', icon: Globe },
    { id: 'protection', label: 'Protección', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'logs', label: 'Logs IA', icon: Terminal }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <KPICards data={data} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ShieldChart data={data.shieldData} />
              <LeakRadar data={data.leakData} />
            </div>
          </div>
        );
      case 'protection':
        return (
          <div>
            <KPICards data={data} />
            <ShieldChart data={data.shieldData} />
          </div>
        );
      case 'analytics':
        return (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ShieldChart data={data.shieldData} />
              <LeakRadar data={data.leakData} />
            </div>
            <MisybotLogs logs={data.misybotLogs} />
          </div>
        );
      case 'logs':
        return <MisybotLogs logs={data.misybotLogs} />;
      default:
        return <KPICards data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Sentinel Dashboard</h1>
          <p className="text-slate-400">Visualización de fugas de dinero y ROI de seguridad logística</p>
        </div>

        {/* Pestañas de navegación */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-white border-b-2 border-cyan-500'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Contenido de las pestañas */}
        <div className="transition-all duration-300">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SentinelDashboard;