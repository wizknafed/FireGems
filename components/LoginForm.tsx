
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (user: string, pass: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin(username, password);
    } else {
      setError('Invalid system credentials. Access denied.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mb-6 shadow-[0_0_40px_rgba(6,182,212,0.4)] transform hover:rotate-6 transition-transform">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12L12 4L18 12L12 20L6 12Z" /><path d="M12 4V20" /></svg>
          </div>
          <h1 className="font-orbitron text-4xl font-black text-white tracking-tighter mb-2 italic">FIREGEMS</h1>
          <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-xs">Diamond Acquisition Interface</p>
        </div>

        <div className="glass p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-black text-cyan-400 uppercase tracking-widest mb-2 px-1">Access Key ID</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="system_admin"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-cyan-400 uppercase tracking-widest mb-2 px-1">Security Token</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold py-3 px-4 rounded-xl text-center animate-bounce">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg hover:shadow-cyan-500/25 uppercase tracking-widest text-sm"
            >
              Establish Connection
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-center text-slate-600 text-[10px] uppercase font-bold tracking-widest">
          Authorized Personnel Only • IP: 192.168.1.254
        </p>
      </div>
    </div>
  );
};
