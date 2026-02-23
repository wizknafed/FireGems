
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGIN_CREDENTIALS } from '../constants';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (username === LOGIN_CREDENTIALS.user && password === LOGIN_CREDENTIALS.pass) {
        onLoginSuccess();
      } else {
        setError('Invalid secure credentials.');
        setIsLoading(false);
      }
    }, 400); 
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden bg-[#050505]">
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[100px] -top-64 -left-64 pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -bottom-64 -right-64 pointer-events-none"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
        className="relative z-10 w-full max-w-md p-10 glass rounded-[2rem] shadow-2xl border border-white/5"
      >
        <div className="text-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-orange-600 rounded-2xl shadow-xl shadow-orange-600/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </motion.div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1 uppercase italic">firegems login</h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Authorized Access Required</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-orange-500/50 outline-none transition-all text-white placeholder-gray-600 font-medium"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-orange-500/50 outline-none transition-all text-white placeholder-gray-600 font-medium"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-[11px] font-black text-red-500 text-center uppercase tracking-wider"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full py-4 font-black text-white ff-gradient rounded-xl shadow-lg shadow-orange-600/10 transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-xs mt-2"
          >
            {isLoading ? 'Decrypting...' : 'Establish Link'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
