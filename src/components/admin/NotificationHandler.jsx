'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { useToast } from '../ToastNotification';

const NotificationHandler = () => {
  const { t } = useLanguage();
  const { addNotification } = useToast();

  // Demo notifications logic
  useEffect(() => {
    const timeouts = [
      setTimeout(() => addNotification({
        type: 'emergency',
        title: t('admin_os.alerta_seguridad') || 'ALERTA DE SEGURIDAD',
        message: t('admin_os.movimiento_sospechoso') || 'Movimiento sospechoso detectado en Zona Bancaria. Cámaras 3 y 4 activadas.'
      }), 2000),
      setTimeout(() => addNotification({
        type: 'budget',
        title: t('admin_os.recuperacion_automatica') || 'RECUPERACIÓN AUTOMÁTICA',
        message: t('admin_os.sistema_coactivo') || 'Sistema Coactivo IA recuperó $1.8M en impuestos morosos.',
        amount: t('admin_os.amount_1800000') || '+$1,800,000'
      }), 6000),
      setTimeout(() => addNotification({
        type: 'success',
        title: t('admin_os.contrato_finalizado') || 'CONTRATO FINALIZADO',
        message: t('admin_os.contrato_mantenimiento') || 'Contrato de mantenimiento vial completado 3 días antes del plazo.'
      }), 10000),
      setTimeout(() => addNotification({
        type: 'warning',
        title: t('admin_os.documento_pendiente') || 'DOCUMENTO PENDIENTE',
        message: t('admin_os.informe_seguridad') || 'Informe trimestral de Seguridad requiere actualización inmediata.'
      }), 14000)
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [addNotification, t]);

  return null; // Este componente no renderiza nada visible
};

export default NotificationHandler;