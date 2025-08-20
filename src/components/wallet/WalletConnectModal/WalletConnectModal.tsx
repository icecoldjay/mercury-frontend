import React, { useState } from 'react';
import Modal from '../../ui/Modal';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

const WalletConnectModal: React.FC<WalletConnectModalProps> = ({
  isOpen,
  onClose,
  onConnect,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleWalletSelect = async (walletType: string) => {
    setError(null);
    
    try {
      await onConnect(walletType);
    } catch (err: any) {
      setError(err.message || 'Connection failed');
    }
  };

  const wallets = [
    {
      id: 'metamask',
      name: 'MetaMask',
      subtitle: 'And other browser wallets',
      icon: '🦊',
      color: 'bg-orange-500',
      isInstalled: typeof window !== 'undefined' && window.ethereum?.isMetaMask,
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      subtitle: 'Mobile wallet',
      icon: '🔒',
      color: 'bg-blue-500',
      isInstalled: typeof window !== 'undefined' && (window.ethereum?.isTrust || window.trustwallet?.isTrust),
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      subtitle: 'Connect any wallet',
      icon: '🔗',
      color: 'bg-blue-600',
      isInstalled: true, // Always available
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <div className="text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-2">Connect Wallet</h2>
        <p className="text-dark-400 mb-8">To start using Mercury</p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Wallet Options */}
        <div className="space-y-3 mb-8">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleWalletSelect(wallet.id)}
              disabled={!wallet.isInstalled}
              className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors border ${
                wallet.isInstalled
                  ? 'bg-dark-700 hover:bg-dark-600 border-dark-600 hover:border-dark-500'
                  : 'bg-dark-800 border-dark-700 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${wallet.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                  {wallet.icon}
                </div>
                <div className="text-left">
                  <div className="text-white font-medium">{wallet.name}</div>
                  <div className="text-sm text-dark-400">{wallet.subtitle}</div>
                  {!wallet.isInstalled && (
                    <div className="text-xs text-red-400 mt-1">Not installed</div>
                  )}
                </div>
              </div>
              {wallet.isInstalled && (
                <svg className="w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="text-sm text-dark-400">
          By connecting, I accept Mercury's{' '}
          <a href="#" className="text-primary-500 hover:text-primary-400 underline">
            Terms of Service
          </a>
        </p>
      </div>
    </Modal>
  );
};

export default WalletConnectModal;
