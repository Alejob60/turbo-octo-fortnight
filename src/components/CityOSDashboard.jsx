import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { LogOut, User, Menu, X } from 'lucide-react';
import './CityOSDashboard.css';

const CityOSDashboard = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeMode, setActiveMode] = useState('security');
  const [selectedCamera, setSelectedCamera] = useState(5);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Efecto para manejar el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    handleResize(); // Ejecutar al cargar
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Inicializar mensajes con textos internacionalizados
    const initialMessage = {
      id: 1,
      text: t('dashboard.welcome_message') || 'Bienvenido, Alcalde. El sistema Orbital Prime está activo. Detecto 3 Alertas de Seguridad y 1 Congestión en Versalles. ¿Qué desea analizar?',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString()
    };
    setChatMessages([initialMessage]);
  }, [t]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Añadir mensaje del usuario
    const userMessage = {
      id: chatMessages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponses = [
        t('dashboard.ai_response_1') || 'Análisis completado. No se detectaron amenazas en la zona.',
        t('dashboard.ai_response_2') || 'Alerta de seguridad en el sector C-5. Enviando unidades móviles.',
        t('dashboard.ai_response_3') || 'Patrón de tráfico anormal detectado. Reconfigurando semáforos.',
        t('dashboard.ai_response_4') || 'Sistema de reconocimiento facial activado. Buscando coincidencias.',
        t('dashboard.ai_response_5') || '4 cámaras adicionales activadas en el perímetro.',
        t('dashboard.ai_response_6') || 'Análisis de comportamiento en tiempo real activado.'
      ];
      
      const aiMessage = {
        id: chatMessages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleLogout = async () => {
    await logout();
    // Redirigir al usuario a la página de login si es necesario
    window.location.href = '/login';
  };
  const [currentData, setCurrentData] = useState({
    overlay: t('dashboard.city_os.camera_overlay_security'),
    labels: [
      t('dashboard.city_os.kpi_labels.persons_detected'),
      t('dashboard.city_os.kpi_labels.potential_threats'),
      t('dashboard.city_os.kpi_labels.cinco_bandwidth')
    ],
    color: '#ef4444'
  });
  const [kpiValues, setKpiValues] = useState({
    val1: 'CALCULANDO...',
    val2: '0',
    val3: '12%'
  });
  const [logs, setLogs] = useState([
    { time: '10:00:05', message: t('dashboard.city_os.logs.initialized') }
  ]);
  const logContainerRef = useRef(null);

  const modes = {
    'security': {
      overlay: t('dashboard.city_os.camera_overlay_security'),
      labels: [
        t('dashboard.city_os.kpi_labels.persons_detected'),
        t('dashboard.city_os.kpi_labels.potential_threats'),
        t('dashboard.city_os.kpi_labels.cinco_bandwidth')
      ],
      logPrefix: 'VISION-AI',
      color: '#ef4444' // Rojo
    },
    'efficiency': {
      overlay: t('dashboard.city_os.camera_overlay_efficiency'),
      labels: [
        t('dashboard.city_os.kpi_labels.hours_saved'),
        t('dashboard.city_os.kpi_labels.false_positives'),
        t('dashboard.city_os.kpi_labels.active_cameras')
      ],
      logPrefix: 'AUTO-MONITOR',
      color: '#10b981' // Verde
    },
    'traffic': {
      overlay: t('dashboard.city_os.camera_overlay_traffic'),
      labels: [
        t('dashboard.city_os.kpi_labels.vehicles_hour'),
        t('dashboard.city_os.kpi_labels.traffic_violations'),
        t('dashboard.city_os.kpi_labels.avg_speed')
      ],
      logPrefix: 'TRAFFIC-FLOW',
      color: '#f59e0b' // Amarillo
    },
    'legal': {
      overlay: t('dashboard.city_os.camera_overlay_legal'),
      labels: [
        t('dashboard.city_os.kpi_labels.processed_cases'),
        t('dashboard.city_os.kpi_labels.redacted_bills'),
        t('dashboard.city_os.kpi_labels.time_savings')
      ],
      logPrefix: 'LEGAL-BOT',
      color: '#06b6d4' // Azul
    }
  };

  // Actualizar modo
  const setMode = (mode) => {
    setActiveMode(mode);
    setCurrentData(modes[mode]);
    
    // Actualizar KPI labels
    setKpiValues(prev => ({
      ...prev,
      val1: t('dashboard.city_os.kpi_calculating')
    }));
  };

  // Simular actualización de datos
  useEffect(() => {
    const interval = setInterval(() => {
      const config = modes[activeMode];
      
      // Actualizar KPIs
      if(activeMode === 'legal') {
        setKpiValues({
          val1: (Math.floor(Date.now() / 10000) % 5000).toLocaleString(),
          val2: Math.floor(Math.random() * 50),
          val3: (Math.random() * 100).toFixed(1) + '%'
        });
      } else {
        setKpiValues({
          val1: Math.floor(Math.random() * 2000).toLocaleString(),
          val2: Math.floor(Math.random() * 5),
          val3: Math.floor(Math.random() * 60) + " km/h"
        });
      }

      // Agregar log aleatorio
      const messages = [
        t('dashboard.city_os.logs.analyzing_frame'),
        t('dashboard.city_os.logs.syncing_database'),
        t('dashboard.city_os.logs.object_detected'),
        t('dashboard.city_os.logs.updating_metrics'),
        t('dashboard.city_os.logs.connection_stable')
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      
      setLogs(prev => [
        ...prev,
        { time, message: randomMsg }
      ].slice(-10)); // Mantener solo los últimos 10 logs
    }, 2000);

    return () => clearInterval(interval);
  }, [activeMode, modes, t]);

  // Asegurar que los logs se desplacen hacia abajo
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="city-os-dashboard flex flex-col h-screen">
      {/* HEADER */}
      <header className="dashboard-header bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 py-2 z-10">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden text-slate-400 hover:text-white p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </button>
          <div className="logo text-sm font-bold">
            ORBITAL<span className="text-cyan-400">PRIME</span> <span className="text-xs text-slate-500">| {t('dashboard.city_os.government_label')}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-slate-800/60 rounded-full bg-slate-950/50 backdrop-blur-md">
            <User size={12} className="text-slate-400" />
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">{user?.name || t('dashboard.user') || 'Usuario'}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-sm border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            title={t('dashboard.logout') || 'Cerrar sesión'}
          >
            <LogOut size={16} />
          </button>
          <div className="ml-2">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR (NAVIGATION) */}
        <nav 
          className={`fixed md:relative z-30 inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div className="menu-label text-sm font-bold text-cyan-400">{t('dashboard.city_os.menu.projects_label')}</div>
              <button 
                className="md:hidden text-slate-400 hover:text-white p-2"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-2">
            <button 
              className={`w-full text-left p-3 rounded-sm mb-2 transition-all ${
                activeMode === 'security' ? 'bg-blue-900/20 border-l-2 border-cyan-400 text-white' : 'text-slate-500 hover:bg-slate-800/50 hover:text-white'
              }`}
              onClick={() => {
                setMode('security');
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
            >
              <span className="title flex items-center gap-2">🛡️ {t('dashboard.city_os.modes.security')}</span>
              <span className="code text-xs text-slate-500 mt-1 block">{t('dashboard.city_os.modes.security_code')}</span>
            </button>

            <button 
              className={`w-full text-left p-3 rounded-sm mb-2 transition-all ${
                activeMode === 'efficiency' ? 'bg-blue-900/20 border-l-2 border-cyan-400 text-white' : 'text-slate-500 hover:bg-slate-800/50 hover:text-white'
              }`}
              onClick={() => {
                setMode('efficiency');
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
            >
              <span className="title flex items-center gap-2">👁️ {t('dashboard.city_os.modes.efficiency')}</span>
              <span className="code text-xs text-slate-500 mt-1 block">{t('dashboard.city_os.modes.efficiency_code')}</span>
            </button>

            <button 
              className={`w-full text-left p-3 rounded-sm mb-2 transition-all ${
                activeMode === 'traffic' ? 'bg-blue-900/20 border-l-2 border-cyan-400 text-white' : 'text-slate-500 hover:bg-slate-800/50 hover:text-white'
              }`}
              onClick={() => {
                setMode('traffic');
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
            >
              <span className="title flex items-center gap-2">🚦 {t('dashboard.city_os.modes.traffic')}</span>
              <span className="code text-xs text-slate-500 mt-1 block">{t('dashboard.city_os.modes.traffic_code')}</span>
            </button>

            <button 
              className={`w-full text-left p-3 rounded-sm transition-all ${
                activeMode === 'legal' ? 'bg-blue-900/20 border-l-2 border-cyan-400 text-white' : 'text-slate-500 hover:bg-slate-800/50 hover:text-white'
              }`}
              onClick={() => {
                setMode('legal');
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
            >
              <span className="title flex items-center gap-2">⚖️ {t('dashboard.city_os.modes.legal')}</span>
              <span className="code text-xs text-slate-500 mt-1 block">{t('dashboard.city_os.modes.legal_code')}</span>
            </button>
          </div>
        </nav>

        {/* Overlay para móviles */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 flex flex-col md:ml-0" style={{ marginLeft: sidebarOpen && window.innerWidth >= 768 ? '16rem' : '0' }}>
          <div className="flex-1 relative bg-black">
            {/* Selector de cámaras */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1 p-2 bg-black/70 rounded">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((camera) => (
                <button
                  key={camera}
                  onClick={() => setSelectedCamera(camera)}
                  className={`px-2 py-1 text-xs rounded ${
                    selectedCamera === camera ? 'bg-cyan-500/30 border border-cyan-400/20 text-cyan-400' : 'bg-white/10 text-gray-400 border border-white/20'
                  }`}
                >
                  CAM {camera}
                </button>
              ))}
            </div>
            
            {/* Visualización de cámara */}
            <div className="w-full h-full flex items-center justify-center p-4">
              <div className="w-full max-w-6xl h-full flex flex-col items-center justify-center">
                <div className="text-xl text-cyan-400 mb-4 font-mono">
                  {t('dashboard.camera_feed', { camera: selectedCamera.toString().padStart(2, '0') })}
                </div>
                <div className="w-full max-w-4xl h-3/4 border border-cyan-400/30 flex items-center justify-center relative">
                  <div className="absolute top-2 left-2 text-sm text-emerald-400 font-mono">
                    {t('dashboard.camera_resolution', { resolution: '4K', fps: 30 })} | {t('dashboard.night_vision', { status: 'ON' })}
                  </div>
                  <div className="absolute bottom-2 right-2 text-sm font-mono">
                    <span className={`${selectedCamera === 5 ? 'text-emerald-400' : 'text-red-500'}`}>
                      {t('dashboard.status')}: {selectedCamera === 5 ? t('dashboard.secure') : t('dashboard.monitoring')}
                    </span>
                  </div>
                  <div className="text-center">
                    📹 {t('dashboard.camera_active', { camera: selectedCamera })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="scan-line"></div>
            <div 
              className="overlay-ui absolute top-4 left-4 border-l-2 px-3 py-2 font-mono text-sm"
              style={{ borderLeftColor: currentData.color }}
            >
              {currentData.overlay}
            </div>
          </div>

          {/* PANEL DE DATOS Y REGISTROS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-900 border-t border-slate-800">
            {/* Chat Panel */}
            <div className="md:col-span-1">
              <div className="bg-slate-900/50 border border-slate-800 rounded-sm h-64 flex flex-col">
                <div className="p-3 border-b border-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-code-control">{t('dashboard.ai_assistant')}</span>
                </div>
                
                <div className="flex-grow p-3 overflow-y-auto max-h-40" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}>
                  {chatMessages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`text-xs ${msg.sender === 'ai' ? 'text-emerald-400' : 'text-slate-300'}`}
                      style={{
                        textAlign: msg.sender === 'user' ? 'right' : 'left',
                      }}
                    >
                      <span className="text-slate-500 mr-2">{msg.timestamp}</span>
                      {msg.text}
                    </div>
                  ))}
                </div>
                
                <div className="p-2 border-t border-slate-800">
                  <input
                    type="text"
                    className="w-full bg-transparent border border-slate-700 text-xs p-1 font-code-control text-white focus:outline-none focus:border-cyan-400"
                    placeholder={t('dashboard.chat_placeholder') || "Escriba su consulta a la IA..."}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && inputMessage.trim() !== '') {
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Metrics Panel */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-sm p-4">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-code-control">
                  {t('dashboard.traffic_title')}
                </div>
                <div className="text-xl font-bold font-code-control text-emerald-400">
                  {t('dashboard.traffic_value')}
                </div>
                <div className="chart-container" style={{
                  height: '40px',
                  marginTop: '10px',
                  padding: '5px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(0,242,255,0.2)',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '1px',
                }}>
                  {[60, 80, 70, 90, 65, 85, 75, 95].map((value, index) => (
                    <div 
                      key={index}
                      style={{
                        flex: 1,
                        height: `${value}%`,
                        background: `linear-gradient(to top, rgba(0, 242, 255, 0.8), rgba(0, 255, 157, 0.6))`,
                        borderRadius: '1px 1px 0 0',
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800 rounded-sm p-4">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-code-control">
                  {t('dashboard.security_title')}
                </div>
                <div 
                  className="text-xl font-bold font-code-control text-red-500"
                >
                  {t('dashboard.security_value')}
                </div>
                <div className="chart-container" style={{
                  height: '40px',
                  marginTop: '10px',
                  padding: '5px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(0,242,255,0.2)',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '1px',
                }}>
                  {[30, 20, 40, 10, 50, 15, 25, 5].map((value, index) => (
                    <div 
                      key={index}
                      style={{
                        flex: 1,
                        height: `${value}%`,
                        background: `linear-gradient(to top, rgba(255, 42, 42, 0.8), rgba(255, 0, 0, 0.6))`,
                        borderRadius: '1px 1px 0 0',
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-900/50 border border-slate-800 rounded-sm p-4">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-code-control">
                  {t('dashboard.cameras_title')}
                </div>
                <div 
                  className="text-xl font-bold font-code-control text-cyan-400"
                  style={{ color: currentData.color }}
                >
                  {t('dashboard.cameras_value')}
                </div>
                <div className="chart-container" style={{
                  height: '40px',
                  marginTop: '10px',
                  padding: '5px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(0,242,255,0.2)',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '1px',
                }}>
                  {[95, 90, 98, 85, 92, 88, 96, 94].map((value, index) => (
                    <div 
                      key={index}
                      style={{
                        flex: 1,
                        height: `${value}%`,
                        background: `linear-gradient(to top, rgba(0, 123, 255, 0.8), rgba(0, 81, 255, 0.6))`,
                        borderRadius: '1px 1px 0 0',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* LOGS (BOTTOM) */}
          <div className="bg-black border-t border-slate-800 p-3 font-code-control text-xs text-emerald-400 overflow-hidden flex-1">
            <div className="text-slate-500 mb-2 font-code-control">LOGS DEL SISTEMA</div>
            <div 
              ref={logContainerRef}
              className="flex-grow overflow-y-auto space-y-1 custom-scrollbar flex flex-col-reverse max-h-32"
            >
              {logs.map((log, index) => (
                <div key={index} className="py-1 border-b border-slate-900 opacity-80 text-xs">
                  <span className="text-white mr-2">{log.time}</span>
                  {log.message}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CityOSDashboard;