import React from 'react';
import Card from '../../ui/Card';
import { mockPositionSummary } from '../../../mocks/dashboardData';

const PositionSummary: React.FC = () => {
  const getHealthFactorColor = (healthFactor: number) => {
    if (healthFactor >= 1.5) return 'text-green-400';
    if (healthFactor >= 1.2) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthFactorStatus = (healthFactor: number) => {
    if (healthFactor >= 1.5) return 'Safe';
    if (healthFactor >= 1.2) return 'Warning';
    return 'Danger';
  };

  return (
    <Card title="Position Summary">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-dark-400">Collateral Value:</span>
          <span className="text-white">{mockPositionSummary.collateralValue}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-dark-400">Liquidation Point:</span>
          <span className="text-white">{mockPositionSummary.liquidationPoint}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-dark-400">Borrow Capacity:</span>
          <span className="text-white">{mockPositionSummary.borrowCapacity}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-dark-400">Available to Borrow:</span>
          <span className="text-white">{mockPositionSummary.availableToBorrow}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-dark-400">Health Factor:</span>
          <span className={`font-medium ${getHealthFactorColor(mockPositionSummary.healthFactor)}`}>
            {mockPositionSummary.healthFactor} ({getHealthFactorStatus(mockPositionSummary.healthFactor)})
          </span>
        </div>
      </div>
    </Card>
  );
};

export default PositionSummary;
