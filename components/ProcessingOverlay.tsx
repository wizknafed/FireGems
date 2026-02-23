
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ProcessingState } from '../types';

interface ProcessingOverlayProps {
  state: ProcessingState;
  onClose: () => void;
  onStart: (uid: string) => void;
}

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ state, onClose, onStart }) => {
  const [uidInput, setUidInput] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    // UID must be 8 to 10 characters long
    if (uidInput.length < 8 || uidInput.length > 10) {
      setError('Error UID not found');
      return;
    }
    onStart(uidInput);
  };

  const overlayVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants: Variants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring" as const, damping: 25, stiffness: 400 } 
    },
    exit: { scale: 0.95, opacity: 0 }
  };

  return (
    <motion.div 
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
    >
      <motion.div 
        variants={contentVariants}
        // FIXED: Using max-w-md (448px) instead of non-standard max-md to ensure normal sizing
        className="w-full max-w-md glass rounded-[2rem] p-8 relative border border-white/5 shadow-2xl overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {state.status === 'input_uid' && (
            <motion.div 
              key="input"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-600/10 mx-auto mb-6 flex items-center justify-center border border-orange-500/20 glow-orange">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-orange-500"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h3 className="text-xl font-black mb-1 tracking-tighter uppercase italic">Player UID</h3>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-8">Ready for {state.selectedPackage?.amount} Diamonds</p>
              
              <div className="space-y-4">
                <input 
                  autoFocus
                  type="text" 
                  value={uidInput}
                  onChange={(e) => {
                    setUidInput(e.target.value.replace(/\D/g, ''));
                    setError('');
                  }}
                  placeholder="PLAYER ID"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-orange-500/50 outline-none transition-all text-center text-2xl font-black tracking-[0.2em] italic placeholder-gray-800"
                />
                
                {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{error}</p>}
                
                <div className="flex gap-3 pt-2">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 rounded-xl font-black uppercase tracking-widest text-[10px] text-gray-500 border border-white/5"
                  >
                    Cancel
                  </motion.button>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStart}
                    className="flex-1 py-3.5 ff-gradient rounded-xl font-black uppercase tracking-widest text-[10px] text-white shadow-lg shadow-orange-600/10"
                  >
                    Send Topup
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {state.status === 'processing' && (
            <motion.div 
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-4"
            >
              <div className="relative w-28 h-28 mx-auto mb-8">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[4px] border-orange-500/10 border-t-orange-500 rounded-full" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.img
                    animate={{ scale: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    src="https://files.catbox.moe/zag3yr.jpg" 
                    className="w-14 h-14 object-cover diamond-mask mix-blend-screen"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-black mb-2 tracking-tighter uppercase italic">Sending Diamonds...</h3>
              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-6">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3.5, ease: "easeInOut" }}
                  className="bg-orange-500 h-full rounded-full"
                />
              </div>

              <div className="space-y-1 font-mono text-[9px] text-gray-600 text-left bg-black/40 p-4 rounded-xl border border-white/5">
                <p>Establishing SSH tunnel...</p>
                <p>Verifying target account: {state.uid}</p>
                <p className="text-orange-500 animate-pulse">Routing diamond packets...</p>
              </div>
            </motion.div>
          )}

          {state.status === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {state.error ? (
                <>
                  <div className="w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-6 flex items-center justify-center text-red-500 border border-red-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                  </div>
                  <h3 className="text-xl font-black mb-3 text-red-500 uppercase italic">Error</h3>
                  <p className="text-gray-500 text-[10px] font-bold uppercase mb-8 leading-relaxed italic">{state.error}</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-green-500/10 rounded-full mx-auto mb-6 flex items-center justify-center text-green-500 border border-green-500/20 shadow-xl shadow-green-500/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-green-500 uppercase italic">Sent successfully</h3>
                  <p className="text-gray-500 text-[10px] font-bold uppercase mb-8 italic">
                    {state.selectedPackage?.amount} Diamonds sent to {state.uid}
                  </p>
                  <div className="mb-8 p-3 bg-white/5 rounded-xl border border-white/5">
                     <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest">ORDER ID: FG-{Math.floor(Math.random()*900000+100000)}</p>
                  </div>
                </>
              )}

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-full py-3.5 bg-white text-black hover:bg-gray-200 transition-colors rounded-xl font-black uppercase tracking-[0.2em] text-[10px]"
              >
                Done
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ProcessingOverlay;
