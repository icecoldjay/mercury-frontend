import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { mockCollateralAssets, mockStETHAsset } from '../../../mocks/dashboardData';

const CollateralAssets: React.FC = () => {
  return (
    <Card title="Collateral Asset">
      <div className="space-y-4">
        {/* Assets Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left py-3 text-sm font-medium text-dark-400">Collateral Asset</th>
                <th className="text-right py-3 text-sm font-medium text-dark-400">Protocol Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700">
              {mockCollateralAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-dark-700/50">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-dark-600 rounded-full flex items-center justify-center text-sm">
                        {asset.logo}
                      </div>
                      <div>
                        <div className="text-white font-medium">{asset.symbol}</div>
                        <div className="text-sm text-dark-400">{asset.walletBalance} in wallet</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-white">{asset.protocolBalance}</span>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 text-green-400 hover:bg-green-400/10"
                        >
                          +
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 text-red-400 hover:bg-red-400/10"
                        >
                          -
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Other Assets Section */}
        <div className="mt-6 p-4 bg-dark-700/50 rounded-lg">
          <p className="text-sm text-dark-400 mb-4">
            {mockStETHAsset.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-dark-600 rounded-full flex items-center justify-center text-sm">
                {mockStETHAsset.logo}
              </div>
              <div>
                <div className="text-white font-medium">{mockStETHAsset.symbol}</div>
                <div className="text-sm text-dark-400">{mockStETHAsset.walletBalance} in wallet</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white">{mockStETHAsset.protocolBalance}</span>
              <Button
                variant="primary"
                size="sm"
                className="text-xs"
              >
                + Supply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CollateralAssets;
