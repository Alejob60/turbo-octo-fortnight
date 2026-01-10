import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import AuditDashboard from './AuditDashboard';
import ControlCenterDashboard from './ControlCenterDashboard';
import CityOSDashboard from './CityOSDashboard';
import HumanEfficiencyDashboard from './HumanEfficiencyDashboard';

const DashboardTabs = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('city-os'); // Por defecto el nuevo dashboard
  const { user, logout } = useAuth();
  
  const handleLogout = async () => {
    await logout();
    // Redirigir al usuario a la página de login si es necesario
    window.location.href = '/login';
  };

  const tabs = [
    { id: 'city-os', label: 'City OS Dashboard', component: CityOSDashboard },
    { id: 'control-center', label: 'Integración CINCO', component: ControlCenterDashboard },
    { id: 'human-efficiency', label: t('dashboard.control_center.modules.efficiency') || 'Eficiencia Humana', component: HumanEfficiencyDashboard },
    { id: 'audit', label: t('dashboard.title'), component: AuditDashboard }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || CityOSDashboard;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Barra de pestañas */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Botón de logout */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-slate-800/60 rounded-full bg-slate-950/50 backdrop-blur-md">
            <User size={12} className="text-slate-400" />
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">{user?.name || 'Usuario'}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-sm border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            title={t('dashboard.logout') || 'Cerrar sesión'}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Contenido del dashboard activo */}
      <div className="h-screen">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default DashboardTabs;