import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import { config } from './config/wagmi';
import { WalletProvider } from './context/WalletContext';
import Header from './components/layout/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <Router>
            <div className="min-h-screen bg-dark-900">
              <Header />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </Router>
        </WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;



