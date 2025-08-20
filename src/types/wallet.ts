export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: string | null;
  network: string | null;
  walletType: string | null;
  isConnecting: boolean;
  error: WalletError | null;
}

export interface WalletError {
  message: string;
  type: 'installation' | 'connection' | 'network';
  walletId?: string;
}

export interface WalletContextType extends WalletState {
  connect: (walletType: string) => Promise<void>;
  disconnect: () => void;
  changeWallet: () => Promise<void>;
  showConnectModal: boolean;
  openConnectModal: () => void;
  closeConnectModal: () => void;
  getDownloadUrl: (walletType: string) => string;
  switchToBlockDAG: () => Promise<void>;
}

export interface WalletProviderProps {
  children: React.ReactNode;
}



