import { createConfig, http } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';
import { createWeb3Modal } from '@web3modal/wagmi/react';

// WalletConnect project ID (you can get one from https://cloud.walletconnect.com/)
const projectId = 'bae92cdc0d575b3d8e86816a59e12bb7';

// BlockDAG Stage Network Configuration
const blockdagStage = {
  id: 1043,
  name: 'BlockDAG',
  network: 'blockdag',
  nativeCurrency: {
    decimals: 18,
    name: 'BlockDAG',
    symbol: 'BDAG',
  },
  rpcUrls: {
    default: { http: ['https://rpc-stage.devdomain123.com'] },
    public: { http: ['https://rpc-stage.devdomain123.com'] },
  },
  blockExplorers: {
    default: { name: 'BlockDAG Explorer', url: 'https://explorer.devdomain123.com' },
  },
} as const;

const metadata = {
  name: 'Mercury',
  description: 'DeFi lending and borrowing platform',
  url: 'https://mercury.com',
  icons: ['https://mercury.com/favicon.ico'],
};

export const config = createConfig({
  chains: [blockdagStage],
  transports: {
    [blockdagStage.id]: http(),
  },
  connectors: [
    injected({
      target: 'metaMask',
    }),
    injected({
      target: 'trustWallet',
    }),
    walletConnect({
      projectId,
      metadata,
    }),
  ],
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  metadata,
});

export { blockdagStage };
