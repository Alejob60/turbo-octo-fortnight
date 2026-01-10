'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  commandCenterSections, 
  systemStatus, 
  userProfile, 
  dashboardMetrics, 
  cameraFeeds, 
  initialChatMessages 
} from './CommandCenterConfig';
import { ToastProvider, addNotification } from './ToastNotification';
import { 
  BarChart3, 
  FileText, 
  Target, 
  Award, 
  AlertTriangle, 
  User, 
  Send,
  Activity,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

const CommandCenter = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isAlertActive, setIsAlertActive] = useState(false);

  // Demo notifications
  useEffect(() => {
    setTimeout(() => {
      addNotification({
        type: 'emergency',
        title: 'ALERTA DE SEGURIDAD',
        message: 'Movimiento sospechoso detectado en Sector Bancario. Cámaras 1 y 3 activadas.'
      });
    }, 3000);
  }, []);

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Análisis completado. No se detectaron amenazas en la zona.",
        "Alerta de seguridad en el sector C-5. Enviando unidades móviles.",
        "Patrón de tráfico anormal detectado. Reconfigurando semáforos.",
        "Sistema de reconocimiento facial activado. Buscando coincidencias.",
        "4 cámaras adicionales activadas en el perímetro."
      ];
      
      const aiMessage = {
        id: chatMessages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
    
    setInputMessage('');
  };

  const toggleAlert = () => {
    setIsAlertActive(!isAlertActive);
  };

  const renderDashboard = () => (
    <div className="dashboard-grid">
      {/* Métricas Izquierda */}
      <div className="glass-panel">
        <div className="panel-title">
          <span>{t('command_center.panels.city_status') || 'ESTADO DE CIUDAD'}</span>
        </div>
        
        {dashboardMetrics.map(metric => (
          <div key={metric.id} className="metric-card" style={{ borderLeftColor: `var(--${metric.color})` }}>
            <div className="metric-lbl">{t(metric.labelKey) || metric.id}</div>
            <div className="metric-val" style={{ color: metric.color === 'danger' ? 'var(--danger)' : '#fff' }}>
              {metric.value}
            </div>
            {metric.progress && (
              <div style={{ height: '3px', background: '#333', marginTop: '5px' }}>
                <div 
                  style={{ 
                    width: `${metric.progress}%`, 
                    height: '100%', 
                    background: `var(--${metric.color})` 
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Grilla de Cámaras (Centro) */}
      <div className="glass-panel">
        <div className="panel-title">
          <span>{t('command_center.panels.camera_feeds') || 'FEEDS DE CÁMARA'}</span>
        </div>
        
        <div className="video-grid">
          {cameraFeeds.map(camera => (
            <div key={camera.id} className="cam-feed">
              <div className="cam-overlay">CAM-{camera.id.toUpperCase()}</div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                {camera.location}
              </div>
              
              {/* Detections */}
              {camera.detections.map((detection, idx) => (
                <div 
                  key={idx}
                  className="detect-box"
                  style={{
                    left: `${detection.x}%`,
                    top: `${detection.y}%`,
                    width: `${detection.width}%`,
                    height: `${detection.height}%`,
                    borderColor: detection.type === 'suspicious' ? 'var(--danger)' : 'var(--primary)',
                    boxShadow: detection.type === 'suspicious' 
                      ? '0 0 10px var(--danger)' 
                      : '0 0 10px var(--primary)'
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '0',
                      background: detection.type === 'suspicious' ? 'var(--danger)' : 'var(--primary)',
                      color: '#000',
                      fontSize: '0.7rem',
                      padding: '2px 4px',
                      fontWeight: 'bold'
                    }}
                  >
                    {detection.type === 'suspicious' ? 'SOSPECHOSO' : 'PERSONA'} {detection.confidence}%
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Chat IA (Derecha) */}
      <div className="glass-panel">
        <div className="panel-title">
          <span>{t('command_center.panels.ai_assistant') || 'ASISTENTE IA'}</span>
        </div>
        
        <div className="chat-area">
          {chatMessages.map(message => (
            <div 
              key={message.id} 
              className={`msg ${message.sender}`}
            >
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '3px' }}>
                {message.timestamp.toLocaleTimeString()}
              </div>
              {message.text}
            </div>
          ))}
        </div>
        
        <div className="chat-input-box">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t('command_center.chat.placeholder') || "Escribe tu consulta..."}
          />
          <button className="btn-action" onClick={handleSendMessage}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderContracts = () => (
    <div className="glass-panel">
      <div className="panel-title">{t('command_center.sections.contracts') || 'GESTIÓN DE CONTRATOS'}</div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>{t('command_center.contracts.id') || 'ID'}</th>
            <th>{t('command_center.contracts.name') || 'Nombre'}</th>
            <th>{t('command_center.contracts.status') || 'Estado'}</th>
            <th>{t('command_center.contracts.value') || 'Valor'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CON-001</td>
            <td>Mantenimiento Vial</td>
            <td><span className="badge" style={{ background: 'rgba(0,255,136,0.2)', color: 'var(--success)' }}>ACTIVO</span></td>
            <td>$2.3M</td>
          </tr>
          <tr>
            <td>CON-002</td>
            <td>Limpieza Urbana</td>
            <td><span className="badge" style={{ background: 'rgba(255,255,0,0.2)', color: 'var(--warning)' }}>PENDIENTE</span></td>
            <td>$800K</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderCompetition = () => (
    <div className="glass-panel">
      <div className="panel-title">{t('command_center.sections.competition') || 'INTELIGENCIA COMPETITIVA'}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {[
          { name: 'Proveedor A', price: '$1.2M', rating: '4.2/5' },
          { name: 'Proveedor B', price: '$1.1M', rating: '3.8/5' },
          { name: 'Proveedor C', price: '$1.3M', rating: '4.5/5' }
        ].map((provider, idx) => (
          <div key={idx} className="metric-card">
            <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '5px' }}>
              {provider.name}
            </div>
            <div style={{ fontSize: '0.9rem' }}>Precio: {provider.price}</div>
            <div style={{ fontSize: '0.9rem' }}>Calificación: {provider.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="glass-panel">
      <div className="panel-title">{t('command_center.sections.certifications') || 'CERTIFICACIONES'}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div className="metric-card">
          <div style={{ color: 'var(--success)', fontWeight: 'bold' }}>ISO 27001</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--success)' }}>VIGENTE</div>
        </div>
        <div className="metric-card">
          <div style={{ color: 'var(--success)', fontWeight: 'bold' }}>SOC 2 Type II</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--success)' }}>VIGENTE</div>
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="glass-panel">
      <div className="panel-title">{t('command_center.sections.alerts') || 'CENTRO DE ALERTAS'}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ background: 'rgba(255,42,42,0.1)', borderLeft: '3px solid var(--danger)', padding: '15px' }}>
          <div style={{ color: 'var(--danger)', fontWeight: 'bold' }}>ALERTA CRÍTICA: Fallo en Nodo Central</div>
          <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>El nodo de procesamiento principal presenta fallos intermitentes</div>
        </div>
        <div style={{ background: 'rgba(255,204,0,0.1)', borderLeft: '3px solid var(--warning)', padding: '15px' }}>
          <div style={{ color: 'var(--warning)', fontWeight: 'bold' }}>ALERTA MEDIA: Actualización Pendiente</div>
          <div style={{ fontSize: '0.9rem', marginTop: '5px' }}>Versión del sistema desactualizada</div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch(activeSection) {
      case 'dashboard': return renderDashboard();
      case 'contracts': return renderContracts();
      case 'competition': return renderCompetition();
      case 'certifications': return renderCertifications();
      case 'alerts': return renderAlerts();
      default: return renderDashboard();
    }
  };

  return (
    <ToastProvider>
      <div className="command-center-container">
        {/* Alert Popup */}
        {isAlertActive && (
          <div className="alert-popup active">
            <h2 style={{ color: 'var(--danger)', marginBottom: '20px' }}>🚨 ALERTA DE SEGURIDAD CRÍTICA</h2>
            <p>Sistema de detección ha identificado actividad sospechosa en múltiples cámaras.</p>
            <button 
              onClick={toggleAlert}
              style={{ 
                background: 'var(--danger)', 
                color: 'white', 
                border: 'none', 
                padding: '10px 20px', 
                marginTop: '20px',
                cursor: 'pointer'
              }}
            >
              ACKNOWLEDGE
            </button>
          </div>
        )}

        {/* Simulate Alert Button */}
        <button 
          className="sim-btn" 
          onClick={toggleAlert}
          style={{
            position: 'fixed',
            top: '10px',
            right: '20px',
            zIndex: '5000',
            background: '#222',
            color: '#fff',
            padding: '5px 10px',
            border: '1px solid #555',
            cursor: 'pointer'
          }}
        >
          🔴 SIMULAR ALERTA
        </button>

        <div className="sidebar">
          <div className="logo-area">
            <div className="logo-text">ORBITAL<span>PRIME</span></div>
            <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '5px' }}>
              AI COMMAND CENTER v2.1
            </div>
          </div>

          {commandCenterSections.map(section => (
            <button
              key={section.id}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => showSection(section.id)}
            >
              {section.icon} {t(section.labelKey) || section.id}
              {section.badge && (
                <span style={{ 
                  background: 'var(--danger)', 
                  color: 'white', 
                  padding: '2px 6px', 
                  borderRadius: '4px', 
                  fontSize: '0.7rem', 
                  marginLeft: 'auto' 
                }}>
                  {section.badge}
                </span>
              )}
            </button>
          ))}

          <div className="user-profile">
            <div className="avatar"></div>
            <div>
              <div style={{ fontWeight: 'bold' }}>{userProfile.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#888' }}>{userProfile.level}</div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="top-bar">
            <div className="page-title" id="pageTitle">
              {t('command_center.title') || 'CENTRO DE OPERACIONES IA'}
            </div>
            <div className="system-status">
              ● {t('command_center.status.connected') || 'CONECTADO A AZURE GOV'} | 
              {t('command_center.status.latency') || 'LATENCIA'}: {systemStatus.latency} | 
              GPU: {systemStatus.gpu}
            </div>
          </div>

          <div id={activeSection} className="section active">
            {renderSection()}
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};

export default CommandCenter;