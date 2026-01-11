import dynamic from 'next/dynamic';

const SentinelDashboard = dynamic(() => import('@/components/SentinelDashboard'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-slate-900 flex items-center justify-center"><p className="text-white">Loading Dashboard...</p></div>,
});

const SentinelPage = () => {
  return <SentinelDashboard />;
};

export default SentinelPage;