import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useBalance, 
  useChainId,
  useSwitchChain 
} from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { WalletContextType, WalletProviderProps, WalletError } from '../../types/wallet';
import { blockdagStage } from '../../config/wagmi';

const WALLET_DOWNLOADS: { [key: string]: string } = {
  metamask: 'https://metamask.io/download/',
  trustwallet: 'https://trustwallet.com/browser-extension',
  walletconnect: 'https://walletconnect.com/',
};

const WALLET_ID_MAPPING: { [key: string]: string } = {
  metamask: 'io.metamask',
  trustwallet: 'trustWallet',
  walletconnect: 'walletConnect',
};

// Extend Window interface for wallet providers
declare global {
  interface Window {
    ethereum?: any;
    trustwallet?: any;
  }
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectionError, setConnectionError] = useState<WalletError | null>(null);
  const [attemptingConnection, setAttemptingConnection] = useState(false);
  const { open } = useWeb3Modal();

  // Wagmi hooks
  const { address, isConnected, connector } = useAccount();
  const { connect: wagmiConnect, connectors, isPending: isConnectPending } = useConnect({
    mutation: {
      onSuccess: () => {
        setConnectionError(null);
        setAttemptingConnection(false);
        setShowConnectModal(false);
      },
      onError: (error) => {
        setConnectionError({
          message: error.message,
          type: error.message.includes('wallet not installed') ? 'installation' : 'connection',
        });
        setAttemptingConnection(false);
      },
    },
  });
  const { disconnect } = useDisconnect();
  const { data: balanceData } = useBalance({ address });
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  // Check for existing connection on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const savedNetwork = localStorage.getItem('walletNetwork');
    const savedWalletType = localStorage.getItem('walletType');
    
    if (savedAddress && savedNetwork && savedWalletType && !isConnected) {
      // Try to reconnect with saved wallet type
      const connector = connectors.find(c => c.id === savedWalletType);
      if (connector) {
        wagmiConnect({ connector });
      }
    }
  }, [isConnected, connectors, wagmiConnect]);

  // Switch to BlockDAG network when connected to wrong network
  useEffect(() => {
    if (isConnected && chainId && chainId !== blockdagStage.id) {
      switchToBlockDAG();
    }
  }, [isConnected, chainId]);

  const switchToBlockDAG = useCallback(async () => {
    try {
      await switchChainAsync({ chainId: blockdagStage.id });
    } catch (error) {
      console.error('Failed to switch to BlockDAG network:', error);
      setConnectionError({
        message: 'Please switch to BlockDAG network in your wallet',
        type: 'network',
      });
    }
  }, [switchChainAsync]);

  const connectWallet = useCallback(async (walletType: string) => {
    if (attemptingConnection) return;

    setConnectionError(null);
    setAttemptingConnection(true);

    try {
      // Special handling for Trust Wallet when MetaMask is also installed
      if (walletType === 'trustwallet' && window.ethereum?.isMetaMask && window.trustwallet?.ethereum) {
        // Store original ethereum provider
        const originalEthereum = window.ethereum;
        
        // Set Trust Wallet as the ethereum provider
        window.ethereum = window.trustwallet.ethereum;
        
        const injectedConnector = connectors.find(c => c.id === 'injected');
        if (injectedConnector) {
          try {
            await wagmiConnect({ connector: injectedConnector });
            return;
          } catch (connectError) {
            // Restore original provider on error
            window.ethereum = originalEthereum;
            throw connectError;
          }
        }
      }

      // Special handling for MetaMask when Trust Wallet is also installed
      if (walletType === 'metamask' && window.ethereum?.isTrust && window.ethereum?.isMetaMask) {
        // Store original ethereum provider
        const originalEthereum = window.ethereum;
        
        // Force MetaMask to be the primary provider
        if (window.ethereum.providers) {
          const metamaskProvider = window.ethereum.providers.find((p: any) => p.isMetaMask && !p.isTrust);
          if (metamaskProvider) {
            window.ethereum = metamaskProvider;
          }
        }
        
        const injectedConnector = connectors.find(c => c.id === 'injected');
        if (injectedConnector) {
          try {
            await wagmiConnect({ connector: injectedConnector });
            return;
          } catch (connectError) {
            // Restore original provider on error
            window.ethereum = originalEthereum;
            throw connectError;
          }
        }
      }



      // Special handling for WalletConnect - open Web3Modal
      if (walletType === 'walletconnect') {
        open();
        setAttemptingConnection(false);
        return;
      }

      // Standard connection flow for other wallets
      const resolvedConnectorId = WALLET_ID_MAPPING[walletType] || walletType;
      const connector = connectors.find(c => c.id === resolvedConnectorId);

      if (!connector) {
        throw new Error(`Wallet connector not found: ${walletType}`);
      }

      // Check for wallet availability
      if (walletType === 'trustwallet') {
        if (!window.trustwallet?.isTrust && !window.ethereum?.isTrust) {
          throw {
            message: 'Trust Wallet not detected. Please install it first.',
            type: 'installation',
          };
        }
      } else if (walletType === 'metamask') {
        if (!window.ethereum?.isMetaMask) {
          throw {
            message: 'MetaMask not detected. Please install it first.',
            type: 'installation',
          };
        }
      }

      await wagmiConnect({ connector });

      // Save to localStorage
      if (address) {
        localStorage.setItem('walletAddress', address);
        localStorage.setItem('walletNetwork', chainId?.toString() || blockdagStage.id.toString());
        localStorage.setItem('walletBalance', balanceData?.formatted || '0');
        localStorage.setItem('walletType', connector.id);
      }

    } catch (error: any) {
      setConnectionError({
        message: error.message,
        type: error.type || 'connection',
        walletId: walletType,
      });
      setAttemptingConnection(false);
    }
  }, [wagmiConnect, connectors, attemptingConnection, address, chainId, balanceData]);

  const disconnectWallet = useCallback(() => {
    disconnect();
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletNetwork');
    localStorage.removeItem('walletBalance');
    localStorage.removeItem('walletType');
    setConnectionError(null);
    setAttemptingConnection(false);
  }, [disconnect]);

  const changeWallet = useCallback(async () => {
    disconnectWallet();
    setShowConnectModal(true);
  }, [disconnectWallet]);

  const openConnectModal = useCallback(() => {
    setShowConnectModal(true);
  }, []);

  const closeConnectModal = useCallback(() => {
    setShowConnectModal(false);
    setConnectionError(null);
  }, []);

  const getDownloadUrl = useCallback((walletType: string) => {
    return WALLET_DOWNLOADS[walletType] || WALLET_DOWNLOADS.metamask;
  }, []);

  const getNetworkName = useCallback(() => {
    if (chainId === blockdagStage.id) {
      return 'BlockDAG';
    }
    return 'BlockDAG';
  }, [chainId]);

  const value: WalletContextType = {
    isConnected,
    address: address || null,
    balance: balanceData?.formatted || null,
    network: getNetworkName(),
    walletType: connector?.id || null,
    isConnecting: attemptingConnection || isConnectPending,
    error: connectionError,
    showConnectModal,
    connect: connectWallet,
    disconnect: disconnectWallet,
    changeWallet,
    openConnectModal,
    closeConnectModal,
    getDownloadUrl,
    switchToBlockDAG,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

