
import React, { useState } from 'react';
import { DIAMOND_PACKAGES } from '../constants';
import { DiamondPackage } from '../types';

interface TopUpPageProps {
  systemSuccess: boolean;
}

export const TopUpPage: React.FC<TopUpPageProps> = ({ systemSuccess }) => {
  const [selectedPackage, setSelectedPackage] = useState<DiamondPackage | null>(null);
  const [uid, setUid] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle');

  const handleTopUp = () => {
    if (!uid) return;
    setIsProcessing(true);
    setStatus('idle');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setStatus(systemSuccess ? 'success' : 'fail');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  };

  const closeOverlay = () => {
    if (isProcessing) return;
    setSelectedPackage(null);
    setStatus('idle');
    setProgress(0);
    setUid('');
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-4xl font-black font-orbitron text-white mb-2 italic tracking-tighter">SELECT DIAMOND BUNDLE</h2>
        <p className="text-slate-400 font-medium">Enter your Free Fire UID and choose a pack to initiate instant top-up.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {DIAMOND_PACKAGES.map((pkg) => (
          <div 
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg)}
            className="group relative glass rounded-[2.5rem] p-8 cursor-pointer hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(6,182,212,0.25)] transition-all duration-500 transform hover:-translate-y-3 active:scale-95 overflow-hidden"
          >
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            
            <div className="absolute top-5 right-5 bg-cyan-500/10 text-cyan-400 text-[10px] font-black px-3 py-1 rounded-full border border-cyan-500/20 z-20 backdrop-blur-md">
              PREMIUM
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-48 h-48 mb-6 relative flex items-center justify-center">
                {/* Intense Background Glow */}
                <div className="absolute inset-0 bg-cyan-600/20 blur-[40px] rounded-full scale-75 group-hover:scale-110 group-hover:bg-cyan-500/30 transition-all duration-700"></div>
                
                {/* Diamond with Radial Mask to hide checkers */}
                <img 
                  src={pkg.image} 
                  alt={`${pkg.amount} Diamonds`} 
                  className="w-full h-full object-contain relative z-10 transition-all duration-700 group-hover:scale-110"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 65%)',
                    maskImage: 'radial-gradient(circle, black 35%, transparent 65%)',
                    filter: 'contrast(1.1) brightness(1.1) drop-shadow(0 0 20px rgba(6, 182, 212, 0.4))',
                    mixBlendMode: 'screen'
                  }}
                />
              </div>

              <h3 className="font-orbitron text-4xl font-black text-white mb-1 tracking-tighter drop-shadow-lg">{pkg.amount}</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Diamonds</p>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>
              
              <div className="flex items-center justify-center w-full">
                <span className="text-emerald-400 font-black text-xs uppercase tracking-widest bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 animate-pulse">
                  {pkg.bonus}
                </span>
              </div>
            </div>
            
            <div className="mt-8 w-full bg-white/5 group-hover:bg-cyan-500 text-slate-400 group-hover:text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all duration-300 text-center border border-white/5 group-hover:border-cyan-400 shadow-xl">
              Initiate Top-Up
            </div>
          </div>
        ))}
      </div>

      {/* Top-up Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={closeOverlay}></div>
          <div className="relative w-full max-w-lg glass rounded-[3rem] p-10 shadow-[0_0_100px_rgba(6,182,212,0.2)] animate-in fade-in zoom-in slide-in-from-bottom-20 duration-500 overflow-hidden border-white/20">
            
            <button 
              onClick={closeOverlay}
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-all hover:rotate-90 z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {status === 'idle' && !isProcessing && (
              <>
                <div className="text-center mb-10">
                  <div className="w-40 h-40 mx-auto mb-6 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-cyan-500/30 blur-[50px] rounded-full animate-pulse"></div>
                    <img 
                      src={selectedPackage.image} 
                      className="w-full h-full object-contain relative z-10"
                      style={{
                        WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
                        maskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
                        mixBlendMode: 'screen'
                      }}
                    />
                  </div>
                  <h3 className="font-orbitron text-3xl font-black text-white mb-3 italic tracking-tighter uppercase">Authorize Link</h3>
                  <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 shadow-inner">
                    <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-ping"></span>
                    <span className="text-xs font-black text-cyan-400 uppercase tracking-[0.2em]">{selectedPackage.amount} Units Detected</span>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="relative group">
                    <label className="block text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-3 px-2">Player Identification (UID)</label>
                    <input 
                      type="text" 
                      placeholder="ENTER UID..."
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-3xl px-8 py-6 text-2xl font-orbitron tracking-[0.3em] text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-center placeholder:text-slate-800 shadow-2xl"
                    />
                  </div>

                  <button 
                    onClick={handleTopUp}
                    disabled={!uid}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 disabled:from-slate-900 disabled:to-slate-900 disabled:text-slate-700 hover:from-cyan-500 hover:to-blue-600 text-white font-black py-6 rounded-3xl transition-all shadow-[0_15px_30px_rgba(6,182,212,0.3)] hover:shadow-cyan-500/50 uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-4 active:scale-95"
                  >
                    <span>Confirm Link</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {isProcessing && (
              <div className="text-center py-16">
                <div className="mb-12 relative inline-block">
                  <svg className="animate-spin h-32 w-32 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-10" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
                    <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-orbitron font-black text-xl text-cyan-400">
                    {progress}%
                  </div>
                </div>
                
                <h4 className="font-orbitron text-2xl font-black text-white mb-6 italic uppercase tracking-widest">Injecting Packets...</h4>
                
                <div className="w-full bg-white/5 rounded-full h-4 mb-10 overflow-hidden p-1 border border-white/10 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 h-full transition-all duration-75 ease-linear rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <div className="space-y-3">
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">By-passing Server Firewall</p>
                   <p className="text-cyan-500/60 text-[9px] font-mono tracking-widest uppercase">Target: UID-{uid}</p>
                </div>
              </div>
            )}

            {!isProcessing && status !== 'idle' && (
              <div className="text-center py-12 animate-in zoom-in duration-500">
                <div className={`w-32 h-32 mx-auto rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl transform rotate-12 ${status === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-emerald-500/20' : 'bg-red-500/20 text-red-500 border border-red-500/40 shadow-red-500/20'}`}>
                   {status === 'success' ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                     </svg>
                   ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   )}
                </div>

                <h4 className={`font-orbitron text-4xl font-black mb-6 uppercase italic tracking-tighter ${status === 'success' ? 'text-emerald-400' : 'text-red-500'}`}>
                  {status === 'success' ? 'LINK COMPLETE' : 'INJECTION FAILED'}
                </h4>
                
                <p className="text-slate-400 font-medium mb-12 px-4 leading-relaxed tracking-wide text-sm">
                  {status === 'success' 
                    ? `Transmission successful. ${selectedPackage.amount} diamonds have been dispatched to UID: ${uid}. Verify in-game.` 
                    : `Fatal Error: Transaction intercepted by internal gateway. Error code: LEVEL IS TOO HIGH.`}
                </p>

                <button 
                  onClick={closeOverlay}
                  className="w-full bg-white/5 border border-white/10 hover:bg-white/20 text-white font-black py-5 rounded-[2rem] transition-all uppercase tracking-[0.3em] text-[10px] active:scale-95 shadow-2xl"
                >
                  Terminate Session
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
