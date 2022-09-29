import React from 'react';

import Button from '@components/common/Button';

const CardOrderHeader = () => (
  <div className="flex items-center justify-between p-8">
    <div className="flex items-center gap-x-20">
      <div>
        <h2 className="mb-2 text-2xl font-semibold">Order Number</h2>
        <p className="text-2xl text-gray-400">QUIWWOJDNS884904</p>
      </div>
      <div>
        <h2 className="mb-2 text-2xl font-semibold">Date Placed</h2>
        <p className="text-2xl text-gray-400">
          {new Date().toLocaleDateString()}
        </p>
      </div>
      <div>
        <h2 className="mb-2 text-2xl font-semibold">Total Amount</h2>
        <p className="text-2xl font-semibold">$20.000</p>
      </div>
    </div>
    <div>
      <Button
        title="View Order"
        className="px-4 py-5 text-2xl transition border hover:bg-gray-100"
      />
    </div>
  </div>
);

export default CardOrderHeader;
