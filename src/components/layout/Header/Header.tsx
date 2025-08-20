import React, { useState, useEffect } from 'react';
import { useWallet } from '../../../context/WalletContext';
import Button from '../../ui/Button';
import WalletConnectModal from '../../wallet/WalletConnectModal/WalletConnectModal';
import Toast from '../../ui/Toast/Toast';

const Header: React.FC = () => {
  const { 
    isConnected, 
    address, 
    network, 
    walletType,
    disconnect, 
    changeWallet, 
    showConnectModal, 
    openConnectModal, 
    closeConnectModal,
    connect,
    isConnecting,
    getDownloadUrl,
    switchToBlockDAG
  } = useWallet();
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('info');
  const [showToast, setShowToast] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getWalletDisplayName = (type: string) => {
    switch (type) {
      case 'io.metamask':
        return 'MetaMask';
      case 'com.trustwallet.app':
        return 'Trust Wallet';
      case 'walletConnect':
        return 'WalletConnect';
      default:
        return 'Wallet';
    }
  };

  const handleWalletClick = () => {
    if (isConnected) {
      setShowWalletMenu(!showWalletMenu);
    } else {
      openConnectModal();
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowWalletMenu(false);
    showSuccessToast('Wallet disconnected successfully');
  };

  const handleChangeWallet = async () => {
    await changeWallet();
    setShowWalletMenu(false);
  };

  const handleSwitchNetwork = async () => {
    try {
      await switchToBlockDAG();
      showSuccessToast('Switched to BlockDAG network');
    } catch (error) {
      showErrorToast('Failed to switch network. Please switch manually in your wallet.');
    }
  };

  const handleWalletConnect = async (walletType: string) => {
    try {
      await connect(walletType);
      // Don't show success toast here - let the connection state handle it
    } catch (error: any) {
      if (error.type === 'installation') {
        window.open(getDownloadUrl(walletType), '_blank');
        showErrorToast(`${walletType} is not installed. Please install it first.`);
      } else {
        showErrorToast(error.message || 'Connection failed');
      }
    }
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
  };

  const showErrorToast = (message: string) => {
    setToastMessage(message);
    setToastType('error');
    setShowToast(true);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  // Show success toast when connection succeeds
  useEffect(() => {
    if (isConnected && address && !isConnecting) {
      showSuccessToast(`Connected to ${getWalletDisplayName(walletType || 'wallet')} successfully`);
    }
  }, [isConnected, address, isConnecting, walletType]);

  return (
    <>
      <header className="bg-dark-900 border-b border-dark-700 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-white font-semibold text-xl">Mercury</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-primary-500 font-medium">Dashboard</a>
              <a href="#" className="text-dark-400 hover:text-white transition-colors">Markets</a>
            </nav>
          </div>

          {/* Right side - Wallet Connection */}
          <div className="flex items-center space-x-4">
            {/* Network Selector */}
            <div className="hidden md:flex items-center space-x-2 bg-dark-800 rounded-lg px-3 py-2">
              <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
              <span className="text-white text-sm">{network || 'BlockDAG'}</span>
              {isConnected && network !== 'BlockDAG Stage' && (
                <button
                  onClick={handleSwitchNetwork}
                  className="text-xs text-yellow-400 hover:text-yellow-300 underline"
                >
                  Switch
                </button>
              )}
            </div>

            {/* Balance Display */}
            <div className="hidden md:block text-white text-sm">
              0.0000
            </div>

            {/* Wallet Connection */}
            <div className="relative">
              {isConnected ? (
                <div>
                  <Button
                    variant="ghost"
                    onClick={handleWalletClick}
                    className="flex items-center space-x-2"
                    disabled={isConnecting}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-white text-sm">{formatAddress(address!)}</span>
                      <span className="text-dark-400 text-xs">{getWalletDisplayName(walletType!)}</span>
                    </div>
                    <svg className="w-4 h-4 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>

                  {/* Wallet Menu Dropdown */}
                  {showWalletMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg z-50">
                      <div className="py-1">
                        <button
                          onClick={handleChangeWallet}
                          className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-dark-700"
                        >
                          Change Wallet
                        </button>
                        <button
                          onClick={handleDisconnect}
                          className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-700"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleWalletClick}
                  size="md"
                  disabled={isConnecting}
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              )}
            </div>

            {/* Toggle Switch */}
            <div className="hidden md:flex items-center">
              <div className="w-12 h-6 bg-dark-700 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={showConnectModal}
        onClose={closeConnectModal}
        onConnect={handleWalletConnect}
      />

      {/* Toast Notifications */}
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={closeToast}
      />
    </>
  );
};

export default Header;
