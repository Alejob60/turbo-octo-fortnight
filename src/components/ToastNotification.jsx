'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, X, DollarSign, ShieldAlert, TrendingUp } from 'lucide-react';

const ToastNotification = ({ notification, onDismiss }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'emergency': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'budget': return DollarSign;
      case 'warning': return ShieldAlert;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getColors = (type) => {
    switch(type) {
      case 'emergency': 
        return {
          bg: 'bg-red-900/90 border-red-500/50',
          text: 'text-red-400',
          icon: 'text-red-400'
        };
      case 'success': 
        return {
          bg: 'bg-emerald-900/90 border-emerald-500/50',
          text: 'text-emerald-400',
          icon: 'text-emerald-400'
        };
      case 'budget': 
        return {
          bg: 'bg-cyan-900/90 border-cyan-500/50',
          text: 'text-cyan-400',
          icon: 'text-cyan-400'
        };
      case 'warning': 
        return {
          bg: 'bg-yellow-900/90 border-yellow-500/50',
          text: 'text-yellow-400',
          icon: 'text-yellow-400'
        };
      default: 
        return {
          bg: 'bg-slate-900/90 border-slate-500/50',
          text: 'text-slate-400',
          icon: 'text-slate-400'
        };
    }
  };

  const colors = getColors(notification.type);
  const IconComponent = getIcon(notification.type);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`fixed bottom-4 right-4 z-50 w-72 border backdrop-blur-sm rounded-sm shadow-lg ${colors.bg}`}
    >
      <div className="p-3">
        <div className="flex items-start gap-2">
          <div className={`mt-0.5 ${colors.icon}`}>
            <IconComponent size={16} />
          </div>
          
          <div className="flex-1">
            <div className={`font-bold text-xs ${colors.text} mb-1`}>
              {notification.title}
            </div>
            <div className="text-xs text-slate-300">
              {notification.message}
            </div>
            
            {notification.amount && (
              <div className="mt-1 flex items-center gap-1">
                <TrendingUp size={12} className="text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400">
                  {notification.amount}
                </span>
              </div>
            )}
            
            <div className="text-[10px] text-slate-500 mt-1">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
          
          <button 
            onClick={() => onDismiss(notification.id)}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ToastProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(newNotification.id);
    }, 5000);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Demo notifications for testing
  useEffect(() => {
    // Emergency alert
    setTimeout(() => {
      addNotification({
        type: 'emergency',
        title: 'ALERTA CRÍTICA',
        message: 'Fallo detectado en nodo central de procesamiento. Requiere atención inmediata.'
      });
    }, 3000);
    
    // Budget recovery
    setTimeout(() => {
      addNotification({
        type: 'budget',
        title: 'RECUPERACIÓN DE PRESUPUESTO',
        message: 'Coactiva IA ha recuperado $2.3M en pagos pendientes.',
        amount: '+$2,300,000'
      });
    }, 8000);
    
    // Success notification
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'CONTRATO CUMPLIDO',
        message: 'Contrato de limpieza urbana completado exitosamente.'
      });
    }, 12000);
    
    // Warning notification
    setTimeout(() => {
      addNotification({
        type: 'warning',
        title: 'INCUMPLIMIENTO DETECTADO',
        message: 'Proveedor XYZ presenta retraso en entrega de equipamiento.'
      });
    }, 16000);
  }, []);

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map(notification => (
            <ToastNotification
              key={notification.id}
              notification={notification}
              onDismiss={dismissNotification}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

// Exportar el proveedor y una función para agregar notificaciones
const ToastContext = React.createContext();

const ToastProviderWithRef = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(newNotification.id);
    }, 5000);
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Demo notifications for testing
  useEffect(() => {
    // Emergency alert
    setTimeout(() => {
      addNotification({
        type: 'emergency',
        title: 'ALERTA CRÍTICA',
        message: 'Fallo detectado en nodo central de procesamiento. Requiere atención inmediata.'
      });
    }, 3000);
    
    // Budget recovery
    setTimeout(() => {
      addNotification({
        type: 'budget',
        title: 'RECUPERACIÓN DE PRESUPUESTO',
        message: 'Coactiva IA ha recuperado $2.3M en pagos pendientes.',
        amount: '+$2,300,000'
      });
    }, 8000);
    
    // Success notification
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'CONTRATO CUMPLIDO',
        message: 'Contrato de limpieza urbana completado exitosamente.'
      });
    }, 12000);
    
    // Warning notification
    setTimeout(() => {
      addNotification({
        type: 'warning',
        title: 'INCUMPLIMIENTO DETECTADO',
        message: 'Proveedor XYZ presenta retraso en entrega de equipamiento.'
      });
    }, 16000);
  }, []);

  return (
    <ToastContext.Provider value={{ addNotification }}>
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map(notification => (
            <ToastNotification
              key={notification.id}
              notification={notification}
              onDismiss={dismissNotification}
            />
          ))}
        </AnimatePresence>
      </div>
      {children}
    </ToastContext.Provider>
  );
};

// Función para usar fuera del contexto
const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { ToastProviderWithRef as ToastProvider, useToast };
export default ToastNotification;