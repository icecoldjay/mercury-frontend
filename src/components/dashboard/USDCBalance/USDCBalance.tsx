import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { mockUSDCBalance } from '../../../mocks/dashboardData';

const USDCBalance: React.FC = () => {
  return (
    <Card title="USDC Wallet Balance">
      <div className="space-y-4">
        <div className="text-2xl font-bold text-white">$ {mockUSDCBalance.balance}</div>
        
        <div className="flex space-x-3">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() => console.log('Supply USDC clicked')}
          >
            + Supply USDC
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => console.log('Borrow USDC clicked')}
          >
            + Borrow USDC
          </Button>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="text-dark-400">
            Net Borrow APR <span className="text-white">{mockUSDCBalance.netBorrowAPR}</span>
          </div>
          <div className="text-dark-400">
            Net Supply APR <span className="text-white">{mockUSDCBalance.netSupplyAPR}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default USDCBalance;
