import React from 'react';

import Button from './common/Button';

const Orders = () => (
  <div>
    <h1 className="mb-4 text-5xl font-bold">Order History</h1>
    <p className="mb-8 text-2xl text-gray-500">
      Check status of recent orders, manage returns and discover similar
      products
    </p>
    <div className="mt-12 border rounded-xl">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-x-20">
          <div>
            <h2>Order Number</h2>
            <p>Lorem ipsum </p>
          </div>
          <div>
            <h2>Order Number</h2>
            <p>Lorem ipsum </p>
          </div>
          <div>
            <h2>Order Number</h2>
            <p>Lorem ipsum </p>
          </div>
        </div>
        <div>
          <Button title="View Order" className="border" />
        </div>
      </div>
    </div>
  </div>
);

export default Orders;
