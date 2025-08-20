export interface CollateralAsset {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  walletBalance: string;
  protocolBalance: string;
  price: number;
  collateralFactor: number;
}

export interface PositionSummary {
  collateralValue: string;
  liquidationPoint: string;
  borrowCapacity: string;
  availableToBorrow: string;
  healthFactor: number;
}

export interface USDCBalance {
  balance: string;
  netBorrowAPR: string;
  netSupplyAPR: string;
}

export const mockCollateralAssets: CollateralAsset[] = [
  {
    id: '1',
    name: 'Chainlink',
    symbol: 'LINK',
    logo: '🔗',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 15.50,
    collateralFactor: 0.65,
  },
  {
    id: '2',
    name: 'Coinbase Wrapped BTC',
    symbol: 'cbBTC',
    logo: '₿',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 45000,
    collateralFactor: 0.75,
  },
  {
    id: '3',
    name: 'Compound',
    symbol: 'COMP',
    logo: 'C',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 85.20,
    collateralFactor: 0.60,
  },
  {
    id: '4',
    name: 'Ether',
    symbol: 'ETH',
    logo: 'Ξ',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 3200,
    collateralFactor: 0.80,
  },
  {
    id: '5',
    name: 'Lido Wrapped Staked ETH',
    symbol: 'wstETH',
    logo: 'Ξ',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 3250,
    collateralFactor: 0.75,
  },
  {
    id: '6',
    name: 'Staked deUSD',
    symbol: 'sdeUSD',
    logo: '$',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 1.00,
    collateralFactor: 0.70,
  },
  {
    id: '7',
    name: 'Uniswap',
    symbol: 'UNI',
    logo: '🦄',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 12.50,
    collateralFactor: 0.65,
  },
  {
    id: '8',
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    logo: '₿',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 45000,
    collateralFactor: 0.75,
  },
  {
    id: '9',
    name: 'Wrapped eETH',
    symbol: 'weETH',
    logo: 'Ξ',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 3200,
    collateralFactor: 0.80,
  },
  {
    id: '10',
    name: 'deUSD',
    symbol: 'deUSD',
    logo: '$',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 1.00,
    collateralFactor: 0.70,
  },
  {
    id: '11',
    name: 'tBTC v2',
    symbol: 'tBTC',
    logo: '₿',
    walletBalance: '0.0000',
    protocolBalance: '0.0000',
    price: 45000,
    collateralFactor: 0.75,
  },
];

export const mockPositionSummary: PositionSummary = {
  collateralValue: '0.0000 USDC',
  liquidationPoint: '0.0000 USDC',
  borrowCapacity: '0.0000 USDC',
  availableToBorrow: '0.0000 USDC',
  healthFactor: 1.25,
};

export const mockUSDCBalance: USDCBalance = {
  balance: '0.0000',
  netBorrowAPR: '3.65%',
  netSupplyAPR: '3.41%',
};

export const mockStETHAsset = {
  name: 'Lido Staked ETH',
  symbol: 'stETH',
  logo: 'Ξ',
  walletBalance: '0.0000',
  protocolBalance: '0.0000',
  description: 'Rebasing tokens are automatically wrapped when supplied to Compound to enable yield on protocol balances.',
};
