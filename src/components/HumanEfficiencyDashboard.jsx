'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Shield, AlertTriangle, DollarSign, Clock, CheckCircle, FileText, Users, TrendingUp, Calendar } from 'lucide-react';

const HumanEfficiencyDashboard = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCamera, setSelectedCamera] = useState(5);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: t('dashboard.welcome_message') || "Bienvenido, Alcalde. El sistema Orbital Prime está activo. Detecto 3 Alertas de Seguridad y 1 Congestión en Versalles. ¿Qué desea analizar?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [contractData, setContractData] = useState([
    { id: 'CON-001', name: 'Contrato Vialidad Municipal', status: 'active', progress: 85, deadline: '2025-03-15', department: 'Obras Públicas' },
    { id: 'CON-002', name: 'Contrato Limpieza Urbana', status: 'review', progress: 60, deadline: '2025-02-28', department: 'Servicios Públicos' },
    { id: 'CON-003', name: 'Contrato Seguridad Ciudadana', status: 'pending', progress: 30, deadline: '2025-04-10', department: 'Seguridad' },
    { id: 'CON-004', name: 'Contrato Educación Municipal', status: 'active', progress: 90, deadline: '2025-01-31', department: 'Educación' },
    { id: 'CON-005', name: 'Contrato Salud Pública', status: 'completed', progress: 100, deadline: '2024-12-31', department: 'Salud' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        t('dashboard.ai_response_1') || "Análisis completado. No se detectaron amenazas en la zona.",
        t('dashboard.ai_response_2') || "Alerta de seguridad en el sector C-5. Enviando unidades móviles.",
        t('dashboard.ai_response_3') || "Patrón de tráfico anormal detectado. Reconfigurando semáforos.",
        t('dashboard.ai_response_4') || "Sistema de reconocimiento facial activado. Buscando coincidencias.",
        t('dashboard.ai_response_5') || "4 cámaras adicionales activadas en el perímetro.",
        t('dashboard.ai_response_6') || "Análisis de comportamiento en tiempo real activado."
      ];
      
      const aiMessage = {
        id: chatMessages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
    
    setInputMessage('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-emerald-400';
      case 'review': return 'text-yellow-400';
      case 'pending': return 'text-orange-400';
      case 'completed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-400/20 border-emerald-400/30';
      case 'review': return 'bg-yellow-400/20 border-yellow-400/30';
      case 'pending': return 'bg-orange-400/20 border-orange-400/30';
      case 'completed': return 'bg-blue-400/20 border-blue-400/30';
      default: return 'bg-gray-400/20 border-gray-400/30';
    }
  };

  const currentData = {
    camera: selectedCamera,
    resolution: "1080p",
    fps: "30",
    nightVision: "ON",
    color: "#00f2ff"
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-['JetBrains_Mono']">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="text-sm font-bold text-cyan-400">
            {t('dashboard.control_center.gov_badge') || "ALCALDÍA PALMIRA"}
          </div>
          <div className="text-xs text-slate-400">
            {t('dashboard.control_center.system_status') || "SISTEMA EN LÍNEA"}
          </div>
          <div className="text-xs text-slate-400">
            {t('dashboard.control_center.node_location') || "NODO: CENTRO-SUR"}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-slate-800/60 rounded-full bg-slate-950/50 backdrop-blur-md">
            <span className="text-xs text-cyan-400">●</span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">{user?.name || t('dashboard.user') || 'Usuario'}</span>
          </div>
          <div className="text-xs text-slate-400">
            {currentTime.toLocaleString()}
          </div>
          <button
            onClick={() => router.push('/')}
            className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded-sm transition-colors"
          >
            {t('nav.logout') || "Cerrar Sesión"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-60px)]">
        {/* Left Sidebar - Content based on active tab */}
        <div className="w-1/2 p-4 flex flex-col gap-4">
          {/* Dynamic Content Panel */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-sm flex-1 p-4">
            {activeTab === 'overview' && (
              <>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">INTEGRACIÓN CINCO - VIGILANCIA</div>
                <div className="relative overflow-hidden h-full">
                  {/* Video Grid Container */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                    {/* Camera Feed 1 */}
                    <div className="bg-black border border-slate-700 relative flex items-center justify-center">
                      <div className="text-slate-600 text-lg">VISTA AÉREA - PARQUE</div>
                      {/* Detection Boxes */}
                      <div className="absolute border-2 border-cyan-400 w-12 h-20 top-[30%] left-[20%] shadow-lg shadow-cyan-400/50">
                        <div className="absolute -top-6 left-0 bg-cyan-400 text-black text-xs px-1 font-bold">PERSONA 98%</div>
                      </div>
                      <div className="absolute border-2 border-cyan-400 w-12 h-20 top-[50%] left-[70%] shadow-lg shadow-cyan-400/50">
                        <div className="absolute -top-6 left-0 bg-cyan-400 text-black text-xs px-1 font-bold">PERSONA 98%</div>
                      </div>
                      <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 text-xs text-green-400 font-mono">
                        CAM 01
                      </div>
                    </div>
                    
                    {/* Camera Feed 2 */}
                    <div className="bg-black border border-slate-700 relative flex items-center justify-center">
                      <div className="text-slate-600 text-lg">ENTRADA CALLE 30</div>
                      <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 text-xs text-green-400 font-mono">
                        CAM 02
                      </div>
                    </div>
                    
                    {/* Camera Feed 3 */}
                    <div className="bg-black border border-slate-700 relative flex items-center justify-center">
                      <div className="text-slate-600 text-lg">SECTOR BANCARIO</div>
                      {/* Orange Detection Box */}
                      <div className="absolute border-2 border-orange-400 w-16 h-24 top-[20%] left-[40%] shadow-lg shadow-orange-400/50">
                        <div className="absolute -top-6 left-0 bg-orange-400 text-black text-xs px-1 font-bold">SOSPECHOSO 87%</div>
                      </div>
                      <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 text-xs text-green-400 font-mono">
                        CAM 03
                      </div>
                    </div>
                    
                    {/* Camera Feed 4 */}
                    <div className="bg-black border border-slate-700 relative flex items-center justify-center">
                      <div className="text-slate-600 text-lg">ZONA CENTRO</div>
                      <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 text-xs text-green-400 font-mono">
                        CAM 04
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Overlay */}
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-400 font-mono">EN LÍNEA</span>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'contracts' && (
              <>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">GESTIÓN DE CONTRATOS</div>
                <div className="space-y-4">
                  <div className="text-sm text-slate-300 mb-3">Resumen de Contratos Activos</div>
                  
                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">Total Contratos</div>
                      <div className="text-xl font-bold text-cyan-400">142</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">En Ejecución</div>
                      <div className="text-xl font-bold text-emerald-400">89</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">Por Vencer</div>
                      <div className="text-xl font-bold text-yellow-400">12</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">Cumplidos</div>
                      <div className="text-xl font-bold text-blue-400">41</div>
                    </div>
                  </div>
                  
                  {/* Gráfica de distribución de contratos */}
                  <div className="bg-slate-900/50 p-4 rounded-sm border border-slate-700">
                    <div className="text-xs text-slate-400 mb-3">Distribución por Departamento</div>
                    <div className="space-y-3">
                      {[
                        { dept: 'Obras Públicas', count: 34, color: 'cyan', percentage: 24 },
                        { dept: 'Servicios Públicos', count: 28, color: 'emerald', percentage: 20 },
                        { dept: 'Seguridad', count: 25, color: 'red', percentage: 18 },
                        { dept: 'Educación', count: 22, color: 'blue', percentage: 15 },
                        { dept: 'Salud', count: 23, color: 'pink', percentage: 16 }
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">{item.dept}</span>
                            <span className="text-slate-400">{item.count} ({item.percentage}%)</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-${item.color}-400/60`}
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Gráfica de tendencia de contratos */}
                  <div className="bg-slate-900/50 p-4 rounded-sm border border-slate-700">
                    <div className="text-xs text-slate-400 mb-3">Tendencia de Contratos (últimos 6 meses)</div>
                    <div className="h-20 flex items-end gap-1 justify-center">
                      {[65, 72, 81, 78, 89, 95].map((value, index) => (
                        <div 
                          key={index}
                          className="flex-1 bg-gradient-to-t from-cyan-400/60 to-emerald-400/40 rounded-t-sm"
                          style={{ height: `${value}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>Ene</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Abr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>
                  
                  {/* Lista de contratos recientes */}
                  <div className="bg-slate-900/50 p-4 rounded-sm border border-slate-700">
                    <div className="text-xs text-slate-400 mb-3">Contratos Recientes</div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {[
                        { id: 'CON-001', name: 'Contrato Vialidad Municipal', status: 'active', progress: 85 },
                        { id: 'CON-002', name: 'Contrato Limpieza Urbana', status: 'review', progress: 60 },
                        { id: 'CON-003', name: 'Contrato Seguridad Ciudadana', status: 'pending', progress: 30 },
                        { id: 'CON-004', name: 'Contrato Educación Municipal', status: 'active', progress: 90 }
                      ].map((contract, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                          <div>
                            <div className="text-xs text-slate-300">{contract.name}</div>
                            <div className="text-xs text-slate-500">{contract.id}</div>
                          </div>
                          <div className="text-right">
                            <div className={`text-xs font-bold ${contract.status === 'active' ? 'text-emerald-400' : contract.status === 'review' ? 'text-yellow-400' : 'text-orange-400'}`}>
                              {contract.status === 'active' ? 'ACTIVO' : contract.status === 'review' ? 'REVISIÓN' : 'PENDIENTE'}
                            </div>
                            <div className="text-xs text-slate-400">{contract.progress}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'compliance' && (
              <>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">CUMPLIMIENTO DOCUMENTAL</div>
                <div className="space-y-4">
                  <div className="text-sm text-slate-300 mb-3">Estado de Revisión de Documentos</div>
                  
                  {/* KPI Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">Aprobados</div>
                      <div className="text-xl font-bold text-emerald-400">247</div>
                      <div className="text-xs text-slate-500">87%</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">Pendientes</div>
                      <div className="text-xl font-bold text-yellow-400">32</div>
                      <div className="text-xs text-slate-500">11%</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">Requieren Ajuste</div>
                      <div className="text-xl font-bold text-red-400">6</div>
                      <div className="text-xs text-slate-500">2%</div>
                    </div>
                  </div>
                  
                  {/* Gráfica de cumplimiento */}
                  <div className="bg-slate-900/50 p-4 rounded-sm border border-slate-700">
                    <div className="text-xs text-slate-400 mb-3">Tasa de Cumplimiento por Departamento</div>
                    <div className="space-y-4">
                      {[
                        { dept: 'Obras Públicas', compliance: 92, color: 'emerald' },
                        { dept: 'Servicios Públicos', compliance: 85, color: 'cyan' },
                        { dept: 'Seguridad', compliance: 78, color: 'yellow' },
                        { dept: 'Educación', compliance: 95, color: 'blue' },
                        { dept: 'Salud', compliance: 88, color: 'pink' }
                      ].map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300">{item.dept}</span>
                            <span className="text-slate-400">{item.compliance}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full bg-${item.color}-400/60`}
                              style={{ width: `${item.compliance}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Gráfica de tendencia de cumplimiento */}
                  <div className="bg-slate-900/50 p-4 rounded-sm border border-slate-700">
                    <div className="text-xs text-slate-400 mb-3">Tendencia de Cumplimiento (últimos 6 meses)</div>
                    <div className="h-20 flex items-end gap-1 justify-center">
                      {[78, 82, 85, 88, 90, 92].map((value, index) => (
                        <div 
                          key={index}
                          className="flex-1 bg-gradient-to-t from-emerald-400/60 to-cyan-400/40 rounded-t-sm"
                          style={{ height: `${value}%` }}
                        ></div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>Ene</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Abr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>
                  
                  {/* Lista de documentos recientes */}
                  <div className="bg-slate-900/50 p-4 rounded-sm border border-slate-700">
                    <div className="text-xs text-slate-400 mb-3">Documentos Recientes</div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {[
                        { id: 'DOC-001', name: 'Contrato Vialidad Municipal', status: 'approved', date: '2024-12-15' },
                        { id: 'DOC-002', name: 'Limpieza Urbana - Fase 2', status: 'pending', date: '2024-12-14' },
                        { id: 'DOC-003', name: 'Seguridad Ciudadana', status: 'adjustment', date: '2024-12-13' },
                        { id: 'DOC-004', name: 'Educación Inicial', status: 'approved', date: '2024-12-12' },
                        { id: 'DOC-005', name: 'Salud Pública', status: 'approved', date: '2024-12-11' }
                      ].map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                          <div>
                            <div className="text-xs text-slate-300">{doc.name}</div>
                            <div className="text-xs text-slate-500">{doc.id} • {new Date(doc.date).toLocaleDateString()}</div>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded ${
                            doc.status === 'approved' ? 'bg-emerald-400/20 text-emerald-400' :
                            doc.status === 'pending' ? 'bg-yellow-400/20 text-yellow-400' :
                            'bg-red-400/20 text-red-400'
                          }`}>
                            {doc.status === 'approved' ? 'APROBADO' : 
                             doc.status === 'pending' ? 'PENDIENTE' : 'AJUSTE'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {activeTab === 'efficiency' && (
              <>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">EFICIENCIA HUMANA</div>
                <div className="space-y-3">
                  <div className="text-sm text-slate-300 mb-2">Métricas de Desempeño</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">Funcionarios Activos</div>
                      <div className="text-xl font-bold text-cyan-400">1,247</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">Productividad Promedio</div>
                      <div className="text-xl font-bold text-emerald-400">87%</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">Tasa Asistencia</div>
                      <div className="text-xl font-bold text-blue-400">94%</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-sm border border-slate-700">
                      <div className="text-xs text-slate-400 mb-1">Evaluaciones Completadas</div>
                      <div className="text-xl font-bold text-purple-400">1,123</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-slate-400 mb-2">Eficiencia por Departamento</div>
                    <div className="space-y-3">
                      {[
                        { name: 'Obras Públicas', efficiency: 92, color: 'cyan' },
                        { name: 'Servicios Públicos', efficiency: 85, color: 'emerald' },
                        { name: 'Seguridad', efficiency: 78, color: 'red' },
                        { name: 'Educación', efficiency: 95, color: 'blue' },
                        { name: 'Salud', efficiency: 88, color: 'pink' }
                      ].map((dept, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-xs text-slate-300">{dept.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-${dept.color}-400/60`}
                                style={{ width: `${dept.efficiency}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold w-8">{dept.efficiency}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar - Dashboard Content */}
        <div className="w-1/2 p-4 flex flex-col gap-4">
          {/* Tabs */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-sm">
            <div className="flex border-b border-slate-700">
              {[
                { id: 'overview', label: t('dashboard.control_center.modules.vision') || "ORBITAL VISION", icon: Shield },
                { id: 'contracts', label: t('dashboard.control_center.modules.flow') || "CONTRATOS", icon: FileText },
                { id: 'compliance', label: t('dashboard.control_center.modules.sentinel') || "CUMPLIMIENTO", icon: CheckCircle },
                { id: 'efficiency', label: t('dashboard.control_center.modules.efficiency') || "EFICIENCIA", icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 p-3 text-xs border-r border-slate-700 last:border-r-0 transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-slate-700/50 text-cyan-400' 
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mx-auto mb-1" />
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="p-4">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-4">
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                        {t('dashboard.traffic_title') || "TRÁFICO EN TIEMPO REAL"}
                      </div>
                      <div className="text-xl font-bold text-emerald-400">
                        {t('dashboard.traffic_value') || "8,420 VEHÍCULOS"}
                      </div>
                      <div className="h-10 mt-2 bg-slate-800 rounded-sm flex items-end gap-px p-1">
                        {[60, 80, 70, 90, 65, 85, 75, 95].map((value, index) => (
                          <div 
                            key={index}
                            className="flex-1 bg-gradient-to-t from-cyan-400/80 to-emerald-400/60 rounded-sm"
                            style={{ height: `${value}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-4">
                      <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                        {t('dashboard.security_title') || "INCIDENTES DE SEGURIDAD"}
                      </div>
                      <div className="text-xl font-bold text-red-400">
                        {t('dashboard.security_value') || "3 ALERTAS CRÍTICAS"}
                      </div>
                      <div className="h-10 mt-2 bg-slate-800 rounded-sm flex items-end gap-px p-1">
                        {[30, 20, 40, 10, 50, 15, 25, 5].map((value, index) => (
                          <div 
                            key={index}
                            className="flex-1 bg-gradient-to-t from-red-400/80 to-red-600/60 rounded-sm"
                            style={{ height: `${value}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                      {t('dashboard.cameras_title') || "ACTIVIDAD DE CÁMARAS"}
                    </div>
                    <div className="text-xl font-bold text-cyan-400">
                      {t('dashboard.cameras_value') || "487/500 ACTIVAS"}
                    </div>
                    <div className="h-10 mt-2 bg-slate-800 rounded-sm flex items-end gap-px p-1">
                      {[95, 90, 98, 85, 92, 88, 96, 94].map((value, index) => (
                        <div 
                          key={index}
                          className="flex-1 bg-gradient-to-t from-blue-400/80 to-cyan-400/60 rounded-sm"
                          style={{ height: `${value}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'contracts' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-cyan-400">
                      {t('dashboard.control_center.modules.flow') || "CONTRATOS GUBERNAMENTALES"}
                    </h3>
                    <div className="text-xs text-slate-400">
                      {contractData.length} {t('dashboard.alerts.items') || "ítems"}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {contractData.map((contract) => (
                      <div key={contract.id} className={`p-3 border rounded-sm ${getStatusBg(contract.status)}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-sm font-medium">{contract.name}</div>
                            <div className="text-xs text-slate-400">{contract.id} • {contract.department}</div>
                          </div>
                          <div className={`text-xs font-medium ${getStatusColor(contract.status)}`}>
                            {contract.status.toUpperCase()}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-slate-400">Progreso</span>
                          <span className="text-xs font-bold">{contract.progress}%</span>
                        </div>
                        
                        <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                          <div 
                            className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${contract.progress}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Vence: {new Date(contract.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'compliance' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-cyan-400">
                    {t('dashboard.control_center.modules.sentinel') || "CUMPLIMIENTO DOCUMENTAL"}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-slate-400">CUMPLIDOS</span>
                      </div>
                      <div className="text-2xl font-bold text-emerald-400">247</div>
                      <div className="text-xs text-slate-500">de 285 documentos</div>
                    </div>
                    
                    <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs text-slate-400">PENDIENTES</span>
                      </div>
                      <div className="text-2xl font-bold text-yellow-400">38</div>
                      <div className="text-xs text-slate-500">por revisar</div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-4">
                    <h4 className="text-xs text-slate-400 uppercase mb-3">ÚLTIMAS REVISIONES</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Contrato Vialidad Municipal</span>
                        <span className="text-emerald-400">Aprobado</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Limpieza Urbana - Fase 2</span>
                        <span className="text-yellow-400">En revisión</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Seguridad Ciudadana</span>
                        <span className="text-red-400">Requiere ajustes</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'efficiency' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-cyan-400">
                    {t('dashboard.control_center.modules.efficiency') || "EFICIENCIA HUMANA"}
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-slate-400">FUNCIONARIOS</span>
                      </div>
                      <div className="text-2xl font-bold text-cyan-400">1,247</div>
                      <div className="text-xs text-slate-500">activos</div>
                    </div>
                    
                    <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-slate-400">PRODUCTIVIDAD</span>
                      </div>
                      <div className="text-2xl font-bold text-emerald-400">87%</div>
                      <div className="text-xs text-slate-500">promedio</div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/50 border border-slate-700 rounded-sm p-4">
                    <h4 className="text-xs text-slate-400 uppercase mb-3">DEPARTAMENTOS CLAVE</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Obras Públicas', efficiency: 92, color: 'from-cyan-400 to-emerald-400' },
                        { name: 'Servicios Públicos', efficiency: 85, color: 'from-blue-400 to-cyan-400' },
                        { name: 'Seguridad', efficiency: 78, color: 'from-emerald-400 to-teal-400' },
                        { name: 'Educación', efficiency: 95, color: 'from-purple-400 to-pink-400' }
                      ].map((dept, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">{dept.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full bg-gradient-to-r ${dept.color}`}
                                style={{ width: `${dept.efficiency}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-bold w-8">{dept.efficiency}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Panel */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-sm flex flex-col h-80">
            <div className="p-3 border-b border-slate-700 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold">
                {t('dashboard.ai_assistant') || "ASISTENTE ORBITAL"}
              </span>
            </div>
            
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {chatMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`text-xs ${
                    msg.sender === 'ai' ? 'text-emerald-400' : 'text-slate-300'
                  }`}
                >
                  <span className="text-slate-500 mr-2">{msg.timestamp}</span>
                  {msg.text}
                </div>
              ))}
            </div>
            
            <div className="p-2 border-t border-slate-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 bg-slate-700 border border-slate-600 text-xs p-2 focus:outline-none focus:border-cyan-400 rounded-sm"
                  placeholder={t('dashboard.chat_placeholder') || "Escriba su consulta a la IA..."}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && inputMessage.trim() !== '') {
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-3 py-2 bg-cyan-400/20 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/30 transition-colors text-xs rounded-sm"
                >
                  {t('dashboard.control_center.modules.config') || "Enviar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanEfficiencyDashboard;