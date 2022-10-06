/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import Button from './common/Button';
import CartProduct from './Product/CartProduct';

interface CartProps {
  handleClose: () => void;
  cartOpen: boolean;
}

// TODO: drop pr-2 if cart items > 4
const Cart = ({ handleClose, cartOpen }: CartProps) => (
  <>
    <div
      className={`inset-0 z-10 transition ease-in-out bg-gray-900 ${
        cartOpen ? 'fixed bg-opacity-40' : 'bg-opacity-0 hidden'
      }`}
      onClick={handleClose}
    />
    <div
      className={`fixed top-0 right-0 z-10 w-1/3 h-full p-8 overflow-hidden transition duration-300 ease-in-out bg-white shadow-2xl ${
        cartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-semibold">My Cart</h2>
        <button
          type="button"
          className="p-4 rounded-full hover:bg-gray-100"
          onClick={handleClose}
        >
          <AiOutlineClose size={20} />
        </button>
      </div>
      <div className="cart-items-scrollbar max-h-[84%] pr-2 mt-4 overflow-y-auto">
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
        <CartProduct />
      </div>
      <div className="absolute bottom-0 w-[92%] p-4 bg-white">
        <div className="flex items-center justify-between">
          <p className="text-2xl">
            SubTotal: <span className="text-2xl font-semibold">$20,000</span>
          </p>
          <Button
            title="Proceed to checkout"
            className="border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20"
            size="sm"
          />
        </div>
      </div>
    </div>
  </>
);
export default Cart;
