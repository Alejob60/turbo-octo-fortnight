import React, { useState, useCallback } from 'react';
import { Eye, Zap, Shield, Activity, Menu, Search, Bell, Brain, ChevronDown, LayoutDashboard, Video, AlertTriangle, CheckCircle, TrendingUp, MapPin, Camera, Server, Database, Lock, Send, X, DollarSign, FileText, Stethoscope } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

// Componente de Card reutilizable
const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-xl p-6 relative overflow-hidden transition-all hover:border-slate-700 ${className}`}>
    {children}
  </div>
);

// Componente de Video Feed simulado
const VideoFeed = ({ camera, detection = null }) => (
  <div className="relative aspect-video bg-slate-900 rounded-lg border border-slate-700 overflow-hidden group">
    {/* Overlay de Simulación de Video */}
    <div className="absolute inset-0 bg-slate-800/50 flex items-center justify-center">
      <Video size={32} className="text-slate-600 opacity-50" />
    </div>
    
    {/* HUD de Cámara */}
    <div className="absolute top-2 left-2 flex items-center gap-2">
      <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded animate-pulse">REC</span>
      <span className="text-slate-200 text-xs font-mono drop-shadow-md">CAM-{camera.id} | {camera.location}</span>
    </div>
    
    {/* Bounding Box (IA Detection) */}
    {detection && (
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-24 border-2 ${detection.type === 'critical' ? 'border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'border-emerald-500'} rounded-sm`}>
        <div className={`absolute -top-6 left-0 ${detection.type === 'critical' ? 'bg-rose-500' : 'bg-emerald-500'} text-white text-[10px] font-bold px-1 py-0.5`}>
          {detection.label}
        </div>
      </div>
    )}
    
    {/* Overlay de Scanlines */}
    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
      background: `repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 2px
      )`
    }}></div>
  </div>
);

// Sub-dashboard: ORBITAL VISION
const VisionDashboard = ({ t }) => {
  const cameras = [
    { id: 1, location: 'Centro', status: 'active' },
    { id: 2, location: 'Norte', status: 'active' },
    { id: 3, location: 'Sur', status: 'active' },
    { id: 4, location: 'Este', status: 'active' }
  ];

  const events = [
    { time: "10:42:15", event: t('dashboard.vision.access_denied'), type: "crit" },
    { time: "10:40:00", event: t('dashboard.vision.vehicle_identified'), type: "info" },
    { time: "10:35:22", event: t('dashboard.vision.abandoned_object'), type: "warn" },
    { time: "10:30:10", event: t('dashboard.vision.guard_round_complete'), type: "success" }
  ];

  return (
    <div className="space-y-6">
      {/* Métricas de Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-900/30 to-slate-900/30 border-cyan-500/30">
          <div className="flex items-center justify-between mb-4">
            <Camera size={24} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold">LIVE</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.vision.active_cameras')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">1,240</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              +100%
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-rose-900/30 to-slate-900/30 border-rose-500/30">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle size={24} className="text-rose-400" />
            <span className="text-rose-400 text-xs font-bold">ALERT</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.vision.intrusion_alerts')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">3</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              -80%
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <Eye size={24} className="text-blue-400" />
            <span className="text-blue-400 text-xs font-bold">AI</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.vision.face_recognitions')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">14k</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              +500
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <Database size={24} className="text-purple-400" />
            <span className="text-purple-400 text-xs font-bold">DB</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.vision.data_storage')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">89%</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
              CRITICAL
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>
      </div>

      {/* GRID DE CÁMARAS (CCTV) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {cameras.map((cam, index) => (
            <VideoFeed 
              key={cam.id} 
              camera={cam} 
              detection={index === 1 ? { type: 'critical', label: t('dashboard.vision.unauthorized') } : null}
            />
          ))}
        </div>

        {/* Panel de Eventos */}
        <Card>
          <h3 className="text-white font-bold mb-4 text-sm uppercase flex items-center gap-2">
            <Bell size={16} className="text-rose-400"/> {t('dashboard.vision.event_log')}
          </h3>
          <div className="space-y-3">
            {events.map((ev, i) => (
              <div key={i} className="flex gap-3 text-xs border-b border-slate-800 pb-2">
                <span className="font-mono text-slate-500">{ev.time}</span>
                <span className={`font-medium ${
                  ev.type === 'crit' ? 'text-rose-400' : 
                  ev.type === 'warn' ? 'text-yellow-400' :
                  ev.type === 'success' ? 'text-emerald-400' : 'text-slate-300'
                }`}>{ev.event}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// Sub-dashboard: ORBITAL FLOW (usando ReactFlow)
const FlowMap = ({ t }) => {
  return (
    <div className="space-y-6">
      <Card className="h-96 relative overflow-hidden">
        <h3 className="text-white font-bold mb-4 text-sm uppercase flex items-center gap-2">
          <Zap size={16} className="text-cyan-400"/> {t('dashboard.flow.traffic_network')}
        </h3>
        
        {/* Simulación de ReactFlow - Mapa de Tráfico */}
        <div className="relative w-full h-full bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden">
          {/* Overlay de Scanlines para el mapa */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            background: `repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.05),
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px,
              transparent 2px
            )`
          }}></div>
          
          {/* Nodos de tráfico simulados */}
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-cyan-500/20 border-2 border-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="absolute -bottom-6 text-xs text-cyan-400 font-mono">Calle 30</span>
          </div>
          
          <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="absolute -bottom-6 text-xs text-emerald-400 font-mono">Cra 15</span>
          </div>
          
          <div className="absolute top-3/4 left-3/4 w-12 h-12 bg-rose-500/20 border-2 border-rose-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.3)]">
            <div className="w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
            <span className="absolute -bottom-6 text-xs text-rose-400 font-mono">Av. Cali</span>
          </div>
          
          {/* Conexiones simuladas */}
          <div className="absolute top-1/4 left-1/4 w-1/4 h-0.5 bg-cyan-500/30 transform rotate-45 origin-left" style={{transform: 'rotate(45deg)'}}></div>
          <div className="absolute top-1/2 left-1/2 w-1/4 h-0.5 bg-emerald-500/30 transform -rotate-45 origin-left" style={{transform: 'rotate(-45deg)'}}></div>
          
          {/* Flujo de datos animado */}
          <div className="absolute top-1/4 left-1/4 w-20 h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent animate-pulse" style={{transform: 'rotate(45deg)'}}></div>
        </div>
      </Card>

      {/* Métricas de Flujo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-cyan-900/30 to-slate-900/30 border-cyan-500/30">
          <div className="flex items-center justify-between mb-4">
            <Zap size={24} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold">FLOW</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.flow.traffic_load')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">78%</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
              +12%
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/30 to-slate-900/30 border-emerald-500/30">
          <div className="flex items-center justify-between mb-4">
            <Server size={24} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold">SERVER</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.flow.active_nodes')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">1,240</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              +5%
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp size={24} className="text-purple-400" />
            <span className="text-purple-400 text-xs font-bold">OPT</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.flow.optimization')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">94%</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              +3%
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Sub-dashboard: ORBITAL LEGAL (Finanzas)
const LegalDashboard = ({ t }) => {
  const contracts = [
    { id: "CT-001", entity: t('dashboard.legal.ia_training'), amount: "$699M", status: t('dashboard.legal.approved'), color: "text-emerald-400", integrity: "Valid" },
    { id: "CT-045", entity: t('dashboard.legal.cctv_surveillance'), amount: "$343M", status: t('dashboard.legal.risk'), color: "text-yellow-400", integrity: "Valid" },
    { id: "CT-089", entity: t('dashboard.legal.infrastructure'), amount: "$1.2B", status: t('dashboard.legal.critical'), color: "text-rose-400 animate-pulse", integrity: "Check" },
  ];

  return (
    <div className="space-y-6">
      {/* Métricas Legales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp size={24} className="text-blue-400" />
            <span className="text-blue-400 text-xs font-bold">PAA</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.legal.paa_execution')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">45%</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              +5%
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/30 to-slate-900/30 border-emerald-500/30">
          <div className="flex items-center justify-between mb-4">
            <Shield size={24} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold">FISCAL</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.legal.fiscal_savings')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">$450M</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              +120M
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/30 to-slate-900/30 border-cyan-500/30">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle size={24} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold">FRAUD</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.legal.fraud_alerts')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">0</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              {t('dashboard.legal.safe')}
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <FileText size={24} className="text-purple-400" />
            <span className="text-purple-400 text-xs font-bold">CONTRACTS</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.legal.active_contracts')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">128</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400">
              {t('dashboard.legal.active')}
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>
      </div>

      {/* Tabla de Contratos */}
      <Card>
        <h3 className="text-white font-bold mb-6 text-sm uppercase">{t('dashboard.legal.forensic_audit')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-400">
            <thead className="text-xs text-slate-200 uppercase bg-slate-950/50">
              <tr>
                <th className="px-4 py-3 rounded-l-lg">{t('dashboard.legal.id')}</th>
                <th className="px-4 py-3">{t('dashboard.legal.entity')}</th>
                <th className="px-4 py-3">{t('dashboard.legal.amount')}</th>
                <th className="px-4 py-3">{t('dashboard.legal.status')}</th>
                <th className="px-4 py-3 rounded-r-lg">{t('dashboard.legal.integrity')}</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((row, i) => (
                <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs">{row.id}</td>
                  <td className="px-4 py-3 text-white">{row.entity}</td>
                  <td className="px-4 py-3 font-mono">{row.amount}</td>
                  <td className={`px-4 py-3 font-bold text-xs ${row.color}`}>{row.status}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs text-cyan-400 font-mono bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900">
                      <Lock size={10} /> {t('dashboard.legal.hash_ok')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Widget de Almacenamiento Legal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-white font-bold mb-4 text-sm uppercase flex items-center gap-2">
            <Lock size={16} className="text-cyan-400"/> {t('dashboard.legal.secure_warehouse')}
          </h3>
          <div className="space-y-4">
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-xs">{t('dashboard.legal.distributed_audit')}</span>
                <span className="text-cyan-400 text-xs font-bold">BLOCKCHAIN</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                <div className="bg-cyan-500 h-2 rounded-full w-[98%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              </div>
              <p className="text-xs text-slate-500 font-mono">12,450/12,700 {t('dashboard.legal.active_nodes')}</p>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-xs">{t('dashboard.legal.encryption')}</span>
                <span className="text-emerald-400 text-xs font-bold">AES-256</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                <div className="bg-emerald-500 h-2 rounded-full w-[100%]"></div>
              </div>
              <p className="text-xs text-slate-500 font-mono">{t('dashboard.legal.key')}: SHA-384</p>
            </div>

            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-xs">{t('dashboard.legal.lifetime')}</span>
                <span className="text-purple-400 text-xs font-bold">{t('dashboard.legal.immutable')}</span>
              </div>
              <div className="text-2xl font-bold font-mono text-white text-center my-2">∞</div>
              <p className="text-xs text-slate-500 font-mono text-center">{t('dashboard.legal.non_corruptible_data')}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border-cyan-500/30 shadow-[0_0_30px_-10px_rgba(6,182,212,0.1)]">
          <h3 className="text-white font-bold mb-4 text-sm uppercase flex items-center gap-2">
            <Shield size={16} className="text-emerald-400"/> {t('dashboard.legal.compliance_status')}
          </h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold font-mono text-emerald-400 mb-2">98.7%</div>
              <div className="text-slate-400 text-xs">{t('dashboard.legal.compliance_rate')}</div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div className="bg-emerald-500 h-3 rounded-full w-[98.7%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div className="text-center">
              <div className="text-slate-500 text-xs font-mono">AZ-2024-001 • {t('dashboard.legal.last_audit')}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Sub-dashboard: ORBITAL HEALTH (Social)
const HealthDashboard = ({ t }) => {
  return (
    <div className="space-y-6">
      {/* Métricas de Salud */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-rose-900/30 to-slate-900/30 border-rose-500/30">
          <div className="flex items-center justify-between mb-4">
            <Activity size={24} className="text-rose-400" />
            <span className="text-rose-400 text-xs font-bold">ICU</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.health.icu_occupancy')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">82%</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
              +4%
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/30 to-slate-900/30 border-emerald-500/30">
          <div className="flex items-center justify-between mb-4">
            <DollarSign size={24} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold">CLAIMS</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.health.claim_recovery')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">$1.2B</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              +15%
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <Brain size={24} className="text-purple-400" />
            <span className="text-purple-400 text-xs font-bold">IA</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.health.ia_triage')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">45ms</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              -12%
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/30 to-slate-900/30 border-cyan-500/30">
          <div className="flex items-center justify-between mb-4">
            <Stethoscope size={24} className="text-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold">PATIENTS</span>
          </div>
          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{t('dashboard.health.active_patients')}</h3>
          <h2 className="text-2xl font-bold text-white font-mono">3,402</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
              +2%
            </span>
            <span className="text-slate-500 text-xs font-mono">{t('dashboard.real_time')}</span>
          </div>
        </Card>
      </div>

      {/* Gráfico de Signos Vitales */}
      <Card>
        <h3 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-wider">
          <Activity size={18} className="text-cyan-400" />
          {t('dashboard.health.vital_signs')}
        </h3>
        {/* Gráfico Simulado */}
        <div className="h-64 flex items-end justify-between gap-1 px-2 border-b border-slate-800 pb-4">
          {[40, 65, 45, 80, 55, 70, 40, 60, 75, 50, 85, 60, 45, 70, 55, 30, 60, 80, 50, 65].map((h, i) => (
            <div key={i} className="w-full bg-cyan-500/10 rounded-t hover:bg-cyan-400 transition-all relative group">
              <div 
                className="absolute bottom-0 w-full bg-cyan-500 rounded-t shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                style={{ height: `${h}%` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
          <span>00:00</span><span>{t('dashboard.health.continuous_monitoring')}</span><span>23:59</span>
        </div>
      </Card>

      {/* Almacenamiento Clínico */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="text-white font-bold mb-4 text-sm uppercase flex items-center gap-2">
            <Server size={16} className="text-emerald-400"/> {t('dashboard.health.clinical_storage')}
          </h3>
          <div className="space-y-6">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-xs">{t('dashboard.health.hl7_records')}</span>
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1"><CheckCircle size={10}/> {t('dashboard.health.encrypted')}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                <div className="bg-emerald-500 h-1.5 rounded-full w-[75%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
              <p className="text-xs text-slate-500 font-mono text-right">340 TB / 500 TB</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-xs">{t('dashboard.health.dicom_images')}</span>
                <span className="text-cyan-400 text-xs font-bold flex items-center gap-1"><Database size={10}/> {t('dashboard.health.redundant')}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
                <div className="bg-cyan-500 h-1.5 rounded-full w-[45%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              </div>
              <p className="text-xs text-slate-500 font-mono text-right">120 TB / 1 PB</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/40 to-slate-950/40 border-emerald-500/30 shadow-[0_0_30px_-10px_rgba(16,185,129,0.1)]">
          <h3 className="text-white font-bold mb-4 text-sm uppercase flex items-center gap-2">
            <Shield size={16} className="text-emerald-400"/> {t('dashboard.health.patient_privacy')}
          </h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold font-mono text-emerald-400 mb-2">100%</div>
              <div className="text-slate-400 text-xs">{t('dashboard.health.compliance')}</div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div className="bg-emerald-500 h-3 rounded-full w-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div className="text-center">
              <div className="text-slate-500 text-xs font-mono">HIPAA • {t('dashboard.health.certified')}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Componente principal del dashboard
export default function OrbitalCityOS() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('vision');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', text: t('dashboard.system_online') },
    { role: 'ai', text: t('dashboard.welcome_message') }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    setChatMessages([...chatMessages, { role: 'user', text: inputMsg }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', text: `${t('dashboard.processing_request')}: "${inputMsg}"... ${t('dashboard.analysis_complete')}` }]);
    }, 1000);
    setInputMsg('');
  };

  const tabs = [
    { id: 'vision', label: t('dashboard.tabs.vision'), icon: Eye },
    { id: 'flow', label: t('dashboard.tabs.flow'), icon: Zap },
    { id: 'legal', label: t('dashboard.tabs.legal'), icon: Shield },
    { id: 'health', label: t('dashboard.tabs.health'), icon: Activity }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'vision': return <VisionDashboard t={t} />;
      case 'flow': return <FlowMap t={t} />;
      case 'legal': return <LegalDashboard t={t} />;
      case 'health': return <HealthDashboard t={t} />;
      default: return <VisionDashboard t={t} />;
    }
  };

  const getActiveTabTitle = () => {
    switch (activeTab) {
      case 'vision': return t('dashboard.sectors.vision');
      case 'flow': return t('dashboard.sectors.flow');
      case 'legal': return t('dashboard.sectors.legal');
      case 'health': return t('dashboard.sectors.health');
      default: return t('dashboard.sectors.vision');
    }
  };

  const getActiveTabSubtitle = () => {
    switch (activeTab) {
      case 'vision': return t('dashboard.sectors.vision_subtitle');
      case 'flow': return t('dashboard.sectors.flow_subtitle');
      case 'legal': return t('dashboard.sectors.legal_subtitle');
      case 'health': return t('dashboard.sectors.health_subtitle');
      default: return t('dashboard.sectors.vision_subtitle');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans selection:bg-cyan-500 selection:text-slate-900 flex overflow-hidden">
      {/* SIDEBAR */}
      <aside className={`border-r border-slate-800 bg-slate-950/50 backdrop-blur transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full flex flex-col">
          <div className="h-20 flex items-center justify-between lg:justify-center lg:px-6 border-b border-slate-800">
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              <div className="w-4 h-4 bg-slate-950 rounded-full animate-pulse"></div>
            </div>
            {isSidebarOpen && (
              <span className="hidden lg:block text-xl font-bold tracking-tighter ml-3">
                ORBITAL <span className="text-cyan-400">CITY OS</span>
              </span>
            )}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-slate-400 hover:text-white p-2"
            >
              <Menu size={20} />
            </button>
          </div>
          
          <nav className="flex-1 mt-8 px-3">
            <div className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className={isSidebarOpen ? 'block' : 'hidden'}>{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
          
          <div className="p-4 border-t border-slate-800">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
              <LayoutDashboard size={20} />
              <span className={isSidebarOpen ? 'block' : 'hidden'}>{t('dashboard.control_panel')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-20 flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold font-mono">
                {getActiveTabTitle()}
              </h1>
              <p className="text-slate-400 text-sm font-mono">
                {getActiveTabSubtitle()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder={t('dashboard.search_placeholder')}
                className="bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent w-64"
              />
            </div>
            
            <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold font-mono">
                AI
              </div>
              <span className="text-sm font-mono hidden md:block">{t('dashboard.role_director')}</span>
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* VISTAS */}
            <div className="transition-all duration-300">
              {renderActiveTab()}
            </div>
          </div>
        </div>

        {/* CHAT ASISTENTE IA */}
        <div className={`border-t border-slate-800 bg-slate-900/80 backdrop-blur-lg transition-all duration-300 ${isChatOpen ? 'h-80' : 'h-16'}`}>
          <div className="flex items-center justify-between p-4 border-b border-slate-800 cursor-pointer" onClick={() => setIsChatOpen(!isChatOpen)}>
            <h3 className="font-bold flex items-center gap-2">
              <Brain className="text-cyan-400" size={18} />
              {isChatOpen ? t('dashboard.ai_assistant') : t('dashboard.ai_assistant_short')}
            </h3>
            <ChevronDown size={18} className={`transition-transform ${isChatOpen ? 'rotate-180' : ''}`} />
          </div>
          
          {isChatOpen && (
            <>
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-cyan-500/20 text-white' 
                        : msg.role === 'system'
                          ? 'bg-slate-800 text-slate-400 text-xs'
                          : 'bg-slate-800/50 text-slate-200'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('dashboard.chat_placeholder')}
                  className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
                <button 
                  onClick={handleSend}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg font-bold transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}