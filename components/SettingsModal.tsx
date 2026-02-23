
import React from 'react';
import { motion } from 'framer-motion';
import { AdminDecision } from '../types';

interface SettingsModalProps {
  onClose: () => void;
  adminDecision: AdminDecision;
  setAdminDecision: (decision: AdminDecision) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, adminDecision, setAdminDecision }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        // FIXED: Using max-w-md (448px) for a more compact modal size
        className="w-full max-w-md glass rounded-[2rem] overflow-hidden shadow-2xl border border-white/5"
      >
        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <h3 className="text-sm font-black tracking-widest uppercase italic">Logic Controller</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <button 
              onClick={() => setAdminDecision('success')}
              className={`w-full p-5 rounded-xl border transition-all text-left flex items-center justify-between group ${
                adminDecision === 'success' 
                ? 'bg-orange-500/10 border-orange-500/50 ring-2 ring-orange-500/20' 
                : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex gap-4 items-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${adminDecision === 'success' ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                  <div className="font-black text-[10px] uppercase tracking-widest italic">Pass Payload</div>
                  <p className="text-[9px] text-gray-500 font-bold uppercase mt-0.5">Direct injection sequence enabled.</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => setAdminDecision('reject')}
              className={`w-full p-5 rounded-xl border transition-all text-left flex items-center justify-between group ${
                adminDecision === 'reject' 
                ? 'bg-red-500/10 border-red-500/50 ring-2 ring-red-500/20' 
                : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex gap-4 items-center">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${adminDecision === 'reject' ? 'bg-red-500 text-white' : 'bg-white/5 text-gray-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                </div>
                <div>
                  <div className="font-black text-[10px] uppercase tracking-widest italic">Force Rejection</div>
                  <p className="text-[9px] text-gray-500 font-bold uppercase mt-0.5">Intercept with "High Level" error.</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="p-6 bg-black/20 border-t border-white/5">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 transition-colors rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-orange-600/20"
          >
            Update System Logic
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsModal;
