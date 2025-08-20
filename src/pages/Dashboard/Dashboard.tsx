import React from 'react';
import Balance from '../../components/dashboard/Balance/Balance';
import CollateralAssets from '../../components/dashboard/CollateralAssets/CollateralAssets';
import USDCBalance from '../../components/dashboard/USDCBalance/USDCBalance';
import PositionSummary from '../../components/dashboard/PositionSummary/PositionSummary';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Balance />
            <CollateralAssets />
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            <USDCBalance />
            <PositionSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



