import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import { LogOut, User, Menu, X } from 'lucide-react';
import './ControlCenterDashboard.css';

const ControlCenterDashboard = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [activeModule, setActiveModule] = useState('vision');
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

  const handleLogout = async () => {
    await logout();
    // Redirigir al usuario a la página de login si es necesario
    window.location.href = '/login';
  };
  const [peopleCount, setPeopleCount] = useState(8420);
  const [criticalAlerts, setCriticalAlerts] = useState(0);
  const [logs, setLogs] = useState([
    { time: '10:00:01', message: t('dashboard.control_center.logs.initialized') }
  ]);
  const logContainerRef = useRef(null);
  const [selectedCamera, setSelectedCamera] = useState(5);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

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

  // Módulos del dashboard
  const modules = [
    { id: 'vision', icon: '👁️', label: t('dashboard.control_center.modules.vision'), title: 'ORBITAL VISION' },
    { id: 'flow', icon: '🚦', label: t('dashboard.control_center.modules.flow'), title: 'ORBITAL FLOW' },
    { id: 'sentinel', icon: '⛈️', label: t('dashboard.control_center.modules.sentinel'), title: 'ORBITAL SENTINEL' },
    { id: 'legal', icon: '⚖️', label: t('dashboard.control_center.modules.legal'), title: 'ORBITAL LEGAL' },
    { id: 'config', icon: '⚙️', label: t('dashboard.control_center.modules.config'), title: t('dashboard.control_center.modules.config_title') }
  ];

  // Simular actualización de datos
  useEffect(() => {
    const interval = setInterval(() => {
      // Actualizar conteo de personas
      setPeopleCount(prev => prev + Math.floor(Math.random() * 5));
      
      // Ocasionalmente actualizar alertas
      if (Math.random() > 0.9) {
        setCriticalAlerts(prev => Math.floor(Math.random() * 3));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simular logs
  useEffect(() => {
    const logMessages = [
      t('dashboard.control_center.logs.face_recognition'),
      t('dashboard.control_center.logs.lpr_scan'),
      t('dashboard.control_center.logs.behavior_analysis'),
      t('dashboard.control_center.logs.object_detection'),
      t('dashboard.control_center.logs.database_sync'),
      t('dashboard.control_center.logs.weather_alert'),
      t('dashboard.control_center.logs.legal_doc'),
      t('dashboard.control_center.logs.ssl_verified')
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      const randomLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      
      setLogs(prev => [
        ...prev,
        { time, message: `> ${randomLog}` }
      ].slice(-10)); // Mantener solo los últimos 10 logs
    }, 3000);

    return () => clearInterval(interval);
  }, [t]);

  // Asegurar que los logs se desplacen hacia abajo
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="min-h-screen bg-control-center text-white font-sans flex flex-col h-screen">
      
      {/* HEADER */}
      <header className="bg-panel-control border-b border-slate-800 flex items-center justify-between px-4 py-2 z-10">
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden text-slate-400 hover:text-white p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </button>
          <div className="text-sm font-bold font-code-control">
            ORBITAL<span className="text-blue-600">PRIME</span>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 px-2 py-1 rounded text-xs">
            {t('dashboard.control_center.gov_badge')}
          </div>
        </div>
        <div className="text-xs font-code-control text-emerald-400 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.5)]"></div>
          {t('dashboard.control_center.system_status')} | {t('dashboard.control_center.node_location')}
        </div>
        
        {/* Botón de logout */}
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
        {/* SIDEBAR */}
        <nav 
          className={`fixed md:relative z-30 inset-y-0 left-0 w-64 bg-panel-control border-r border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div className="text-sm font-bold text-cyan-400">MÓDULOS</div>
              <button 
                className="md:hidden text-slate-400 hover:text-white p-2"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-2">
            {modules.map((module) => (
              <div
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id);
                  if (window.innerWidth < 768) {
                    setSidebarOpen(false);
                  }
                }}
                className={`p-3 cursor-pointer flex items-center gap-3 rounded-sm transition-all ${
                  activeModule === module.id
                    ? 'bg-blue-900/20 border-l-2 border-cyan-400 text-white'
                    : 'text-slate-500 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <span className="text-lg">{module.icon}</span>
                <span className="text-sm font-medium font-code-control">{module.label}</span>
              </div>
            ))}
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
          <div className="flex-1 p-4 flex flex-col gap-4">
            {/* Selector de cámaras */}
            <div className="flex flex-wrap gap-1 p-2 bg-black/70 rounded max-w-xs">
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
            
            <div className="flex-grow bg-black border border-slate-800 rounded-sm relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              {/* Visualización de cámara */}
              <div style={{
                width: '100%',
                height: '100%',
                background: '#000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(0,10,20,0.8) 0%, rgba(0,0,0,1) 100%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    color: '#00f2ff',
                    marginBottom: '20px',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {t('dashboard.camera_feed', { camera: selectedCamera.toString().padStart(2, '0') })}
                  </div>
                  <div style={{
                    width: '80%',
                    height: '60%',
                    border: '1px solid rgba(0, 242, 255, 0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'rgba(0, 242, 255, 0.3)',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      fontSize: '0.8rem',
                      color: '#00ff9d',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {t('dashboard.camera_resolution', { resolution: '4K', fps: 30 })} | {t('dashboard.night_vision', { status: 'ON' })}
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      fontSize: '0.8rem',
                      color: selectedCamera === 5 ? '#00ff9d' : '#ff2a2a',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {t('dashboard.status')}: {selectedCamera === 5 ? t('dashboard.secure') : t('dashboard.monitoring')}
                    </div>
                    <div>
                      📹 {t('dashboard.camera_active', { camera: selectedCamera })}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* HUD Overlay */}
              <div className="absolute inset-0 pointer-events-none border border-cyan-400/20 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"></div>
              <div className="absolute top-5 left-5 bg-black/80 border-l-2 border-cyan-400 px-3 py-2 text-xs font-code-control">
                {t('dashboard.control_center.camera_location')}
              </div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-red-500 transform -translate-x-1/2 -translate-y-1/2 animate-pulse animate-scan-target">
                <div className="absolute -top-5 left-0 bg-red-500 text-black text-xs font-bold px-1 py-0.5 font-code-control">
                  {t('dashboard.control_center.tracking_id')}
                </div>
              </div>
            </div>
          </div>

          {/* PANEL DE DATOS Y REGISTROS */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 bg-slate-900 border-t border-slate-800">
            {/* Chat Panel */}
            <div className="lg:col-span-1">
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
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div className="text-xl font-bold font-code-control text-red-500">
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
              
              <div className="bg-slate-900/50 border border-cyan-400/30 rounded-sm p-4">
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-code-control">
                  {t('dashboard.cameras_title')}
                </div>
                <div className="text-xl font-bold font-code-control text-cyan-400">
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

          {/* LOG PANEL */}
          <div className="bg-black border-t border-slate-800 p-3 font-code-control text-xs text-emerald-400 overflow-hidden flex-1">
            <div className="text-slate-500 mb-2 font-code-control">{t('dashboard.control_center.logs_title')}</div>
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

export default ControlCenterDashboard;