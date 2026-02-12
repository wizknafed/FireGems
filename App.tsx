
import React, { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { Layout } from './components/Layout';
import { TopUpPage } from './components/TopUpPage';
import { AdminPanel } from './components/AdminPanel';
import { View, AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isLoggedIn: false,
    user: null,
    isAdmin: true, // For this demo, logged in = admin
    topupSuccessful: true
  });

  const [currentView, setCurrentView] = useState<View>(View.HOME);

  // Persistence (optional, but nice for "backend stored locally" feel)
  useEffect(() => {
    const saved = localStorage.getItem('firegems_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // We only restore the topup setting for this specific request
      setState(prev => ({ ...prev, topupSuccessful: parsed.topupSuccessful }));
    }
  }, []);

  const handleLogin = (user: string) => {
    setState(prev => ({ ...prev, isLoggedIn: true, user }));
  };

  const handleLogout = () => {
    setState({
      isLoggedIn: false,
      user: null,
      isAdmin: false,
      topupSuccessful: state.topupSuccessful // keep setting
    });
    setCurrentView(View.HOME);
  };

  const toggleSuccess = (val: boolean) => {
    const newState = { ...state, topupSuccessful: val };
    setState(newState);
    localStorage.setItem('firegems_state', JSON.stringify({ topupSuccessful: val }));
  };

  if (!state.isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={setCurrentView} 
      onLogout={handleLogout}
    >
      {currentView === View.HOME ? (
        <TopUpPage systemSuccess={state.topupSuccessful} />
      ) : (
        <AdminPanel 
          user={state.user || 'Unknown'} 
          systemSuccess={state.topupSuccessful} 
          onToggle={toggleSuccess} 
        />
      )}
    </Layout>
  );
};

export default App;
