'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { ToastProvider } from '../ToastNotification';
import NotificationHandler from './NotificationHandler';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import DashboardSection from './sections/DashboardSection';
import ContractsSection from './sections/ContractsSection';
import CompetitorsSection from './sections/CompetitorsSection';
import CertificationsSection from './sections/CertificationsSection';
import AlertsSection from './sections/AlertsSection';

const AdminOSDashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Demo notifications logic will be handled by a separate component inside ToastProvider

  const renderActiveSection = () => {
    switch(activeSection) {
      case 'dashboard': return <DashboardSection />;
      case 'contratos': return <ContractsSection />;
      case 'competencia': return <CompetitorsSection />;
      case 'certificaciones': return <CertificationsSection />;
      case 'alertas': return <AlertsSection />;
      default: return <DashboardSection />;
    }
  };

  return (
    <ToastProvider>
      <NotificationHandler />
      <div className="flex h-screen bg-[#030303] text-white font-sans selection:bg-cyan-500/30 selection:text-black overflow-hidden">
        
        {/* BACKGROUND FX */}
        <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-[#030303]/90 to-[#030303] pointer-events-none" />
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-cyan-500/5 blur-[100px] pointer-events-none" />

        <AdminSidebar 
          activeSection={activeSection} 
          onNavigate={setActiveSection} 
          user={user} 
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          <AdminHeader activeSection={activeSection} />
          
          <div className="flex-1 overflow-y-auto p-6 relative z-10">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};

export default AdminOSDashboard;