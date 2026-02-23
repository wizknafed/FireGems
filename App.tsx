
import React, { useState } from 'react';
import { Page, AdminDecision } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [adminDecision, setAdminDecision] = useState<AdminDecision>('success');

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-orange-500 selection:text-white">
      {currentPage === 'login' ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Dashboard 
          adminDecision={adminDecision} 
          setAdminDecision={setAdminDecision} 
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default App;
