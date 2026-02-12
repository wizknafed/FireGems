
import React, { useState, useEffect } from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, onLogout }) => {
  const [balance, setBalance] = useState<string>('0.00');

  useEffect(() => {
    // Generate random balance between 10,000 and 250,000
    const randomVal = Math.floor(Math.random() * (250000 - 10000 + 1)) + 10000;
    const cents = (Math.random() * 0.99).toFixed(2);
    setBalance(new Intl.NumberFormat('en-US').format(randomVal) + cents.substring(1));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="sticky top-0 z-50 glass border-b border-white/10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate(View.HOME)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12L12 4L18 12L12 20L6 12Z" /><path d="M12 4V20" /></svg>
            </div>
            <h1 className="font-orbitron text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              FIREGEMS
            </h1>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden sm:flex items-center gap-4">
              <button 
                onClick={() => onNavigate(View.HOME)}
                className={`text-sm font-semibold transition-colors ${currentView === View.HOME ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
              >
                TOP-UP
              </button>
            </div>

            {/* Wallet Balance Card */}
            <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-xl flex items-center gap-3 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
              <div className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none">Available Funds</span>
                <span className="text-emerald-400 font-orbitron font-bold text-sm leading-tight">${balance}</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate(View.ADMIN)}
              className={`flex items-center gap-2 group transition-all px-3 py-1.5 rounded-full ${currentView === View.ADMIN ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/50' : 'text-slate-400 hover:text-white'}`}
            >
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/20">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
              </div>
              <span className="text-sm font-semibold hidden md:inline">PROFILE</span>
            </button>
            <button 
              onClick={onLogout}
              className="text-xs text-red-400/80 hover:text-red-400 transition-colors uppercase tracking-widest font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-slate-500 text-sm">
        <p className="font-orbitron tracking-widest text-[10px] uppercase opacity-50">© 2024 FIREGEMS NETWORK • V1.0.5</p>
      </footer>
    </div>
  );
};
