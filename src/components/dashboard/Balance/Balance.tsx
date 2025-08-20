import React from 'react';
import Card from '../../ui/Card';

const Balance: React.FC = () => {
  return (
    <Card title="Balance">
      <div className="space-y-2">
        <div className="text-3xl font-bold text-white">$ 0.0000</div>
        <div className="text-lg text-dark-400">$0.00</div>
      </div>
    </Card>
  );
};

export default Balance;
