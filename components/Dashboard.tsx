
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminDecision, ProcessingState, Package } from '../types';
import { PACKAGES } from '../constants';
import ProcessingOverlay from './ProcessingOverlay';
import SettingsModal from './SettingsModal';

interface DashboardProps {
  adminDecision: AdminDecision;
  setAdminDecision: (decision: AdminDecision) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ adminDecision, setAdminDecision, onLogout }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [processState, setProcessState] = useState<ProcessingState>({
    status: 'idle',
    uid: '',
    selectedPackage: null
  });

  // Generate fake recent orders locally
  const recentOrders = useMemo(() => {
    return Array.from({ length: 3 }).map((_, i) => ({
      id: `FG-${Math.floor(Math.random() * 900000 + 100000)}`,
      uid: Math.floor(Math.random() * 900000000 + 100000000).toString(),
      amount: PACKAGES[Math.floor(Math.random() * PACKAGES.length)].amount,
      status: 'SUCCESS'
    }));
  }, []);

  const handleSelectPackage = (pkg: Package) => {
    setProcessState({
      ...processState,
      status: 'input_uid',
      selectedPackage: pkg
    });
  };

  const handleStartProcessing = (uid: string) => {
    setProcessState({
      ...processState,
      status: 'processing',
      uid
    });

    setTimeout(() => {
      setProcessState(prev => ({
        ...prev,
        status: 'result',
        error: adminDecision === 'reject' ? 'Level is too high' : undefined
      }));
    }, 3500);
  };

  const resetProcess = () => {
    setProcessState({
      status: 'idle',
      uid: '',
      selectedPackage: null
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#050505]"
    >
      <header className="sticky top-0 z-40 bg-[#050505]/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <span className="text-lg font-black tracking-tighter uppercase italic">fire<span className="text-orange-500">gems</span></span>
          </div>

          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white border border-white/5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </motion.button>
            <div className="h-4 w-[1px] bg-white/10" />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="px-4 py-2 text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all text-gray-400 hover:text-white"
            >
              Exit
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <motion.h2 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-black mb-1 tracking-tighter uppercase italic"
          >
            Free Fire <span className="text-orange-500">Topup</span>
          </motion.h2>
          <p className="text-gray-500 text-sm font-medium italic">Select your desired diamond package below.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((pkg, idx) => (
            <motion.div 
              key={pkg.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative glass rounded-[1.5rem] p-6 border border-white/5 hover:border-orange-500/30 transition-all cursor-pointer overflow-hidden"
              onClick={() => handleSelectPackage(pkg)}
            >
              <div className="relative mb-6 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center glow-blue transition-all group-hover:scale-110">
                  <img 
                    src="https://files.catbox.moe/zag3yr.jpg" 
                    alt="Diamond" 
                    className="w-16 h-16 object-cover diamond-mask mix-blend-screen"
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-black mb-1 text-white tracking-tighter italic">{pkg.amount}</h3>
                <p className="text-orange-500 font-black text-[9px] uppercase tracking-[0.2em] mb-4">{pkg.bonus}</p>
                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{pkg.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Orders Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass border border-white/5 rounded-[1.5rem] p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">Orders</span>
          </div>
          
          <div className="space-y-3">
            {recentOrders.map((order, idx) => (
              <div key={idx} className="flex flex-wrap items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
                <div className="flex gap-4 items-center">
                  <div className="text-[9px] font-mono text-gray-600 tracking-tighter uppercase">{order.id}</div>
                  <div className="h-3 w-[1px] bg-white/10" />
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-tight">UID: {order.uid}</div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="text-[10px] font-black text-orange-500 italic uppercase">{order.amount} Diamonds</div>
                  <div className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-md text-[8px] font-black text-green-500 tracking-widest uppercase">
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {showSettings && (
          <SettingsModal 
            onClose={() => setShowSettings(false)} 
            adminDecision={adminDecision} 
            setAdminDecision={setAdminDecision} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {processState.status !== 'idle' && (
          <ProcessingOverlay 
            key="overlay"
            state={processState} 
            onClose={resetProcess} 
            onStart={handleStartProcessing} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
