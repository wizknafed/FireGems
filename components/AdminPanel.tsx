
import React from 'react';

interface AdminPanelProps {
  systemSuccess: boolean;
  onToggle: (val: boolean) => void;
  user: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ systemSuccess, onToggle, user }) => {
  return (
    <div className="animate-in slide-in-from-left-5 fade-in duration-500">
      <div className="mb-12">
        <h2 className="text-4xl font-black font-orbitron text-white mb-2 italic">ADMIN CONTROL CENTER</h2>
        <p className="text-slate-400 font-medium uppercase tracking-widest text-[10px]">Secure Gateway Management • User: {user}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="lg:col-span-1">
          <div className="glass rounded-[2.5rem] p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-cyan-500 to-blue-600 -z-10"></div>
            <div className="flex flex-col items-center pt-8">
              <div className="w-24 h-24 rounded-[2rem] bg-slate-900 border-4 border-[#0a0a0c] overflow-hidden mb-4 shadow-2xl">
                 <img src="https://picsum.photos/seed/admin/200/200" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-orbitron text-2xl font-black text-white uppercase italic tracking-tighter">{user}</h3>
              <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6 px-3 py-1 bg-cyan-500/10 rounded-full">System Architect</p>
              
              <div className="w-full space-y-4 pt-4 border-t border-white/5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 uppercase font-bold">Clearance Level</span>
                  <span className="text-white font-mono">GOD_MODE</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 uppercase font-bold">Session ID</span>
                  <span className="text-white font-mono text-[10px]">AUTH-09X-221</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 uppercase font-bold">Uptime</span>
                  <span className="text-emerald-400 font-mono">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-[2.5rem] p-8">
             <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
               </div>
               <div>
                 <h3 className="text-xl font-black text-white italic">GATEWAY PROTOCOLS</h3>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Manage real-time transaction validation</p>
               </div>
             </div>

             <div className="space-y-8">
               <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-colors group">
                 <div className="max-w-md">
                   <h4 className="text-white font-black text-sm uppercase mb-1 tracking-widest flex items-center gap-2">
                     Global Success Rate
                     {systemSuccess ? (
                       <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">ACTIVE</span>
                     ) : (
                       <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded">BLOCKED</span>
                     )}
                   </h4>
                   <p className="text-xs text-slate-400 leading-relaxed font-medium">
                     When disabled, all incoming top-up requests will be automatically flagged and rejected by the security engine.
                   </p>
                 </div>
                 
                 <button 
                  onClick={() => onToggle(!systemSuccess)}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 focus:outline-none ${systemSuccess ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-700'}`}
                 >
                   <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${systemSuccess ? 'translate-x-9' : 'translate-x-1'}`} />
                 </button>
               </div>

               <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/10 opacity-60">
                 <h4 className="text-red-400 font-black text-xs uppercase mb-3 tracking-[0.2em]">Active Override Message</h4>
                 <div className="bg-[#0a0a0c] p-4 rounded-xl border border-red-500/20 text-red-500 font-mono text-xs italic tracking-widest">
                   "level is too high"
                 </div>
                 <p className="text-[10px] text-slate-600 mt-3 font-bold uppercase tracking-widest">System default message for blocked transactions</p>
               </div>
             </div>
          </div>

          <div className="glass rounded-[2.5rem] p-8 border-dashed border-white/5 flex flex-col items-center justify-center text-center">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <p className="text-xs text-slate-600 font-bold uppercase tracking-widest">Additional admin modules coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};
