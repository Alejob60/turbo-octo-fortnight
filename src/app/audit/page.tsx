import dynamic from 'next/dynamic';

const AuditDashboard = dynamic(() => import('@/components/AuditDashboard'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-white">Loading Dashboard...</p></div>,
});

const AuditPage = () => {
  return <AuditDashboard />;
};

export default AuditPage;