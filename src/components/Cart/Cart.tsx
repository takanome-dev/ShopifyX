/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { GiShoppingCart } from 'react-icons/gi';

import Button from '@common/Button';
import { useCartItems } from '@context/CartProvider';
import formatMoney from '@lib/formatMoney';

import CartItem from './CartItem';

interface CartProps {
  handleClose: () => void;
  cartOpen: boolean;
}

// TODO: drop pr-2 if cart items > 4
const Cart = ({ handleClose, cartOpen }: CartProps) => {
  const { cartItems, subTotal } = useCartItems();

  return (
    <>
      <div
        className={`cart-overlay inset-0 z-10 transition ease-in-out bg-gray-900 ${
          cartOpen ? 'fixed bg-opacity-40' : 'bg-opacity-0 hidden'
        }`}
        onClick={handleClose}
      />
      <div
        className={`cart fixed top-0 right-0 z-10 w-1/3 h-full p-8 overflow-hidden transition duration-300 ease-in-out bg-white shadow-2xl ${
          cartOpen ? 'translate-x-0 block' : 'translate-x-full hidden'
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="cart-title text-4xl font-semibold">My Cart</h2>
          <button
            type="button"
            className="cart-btn-close p-4 rounded-full hover:bg-gray-100"
            onClick={handleClose}
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
        {cartItems?.length > 0 ? (
          <>
            <div className="cart-items-scrollbar max-h-[84%] pr-2 mt-4 overflow-auto">
              {cartItems.map((item) => (
                <CartItem
                  key={item.product.id}
                  product={item.product}
                  initialQuantity={item.quantity}
                />
              ))}
            </div>
            <div className="absolute bottom-0 w-[92%] p-4 bg-white border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-2xl">
                  SubTotal:{' '}
                  <span className="text-2xl font-semibold">
                    {formatMoney(subTotal)}
                  </span>
                </p>
                <Button
                  title="Proceed to checkout"
                  className="border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20"
                  size="sm"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-col h-[60vh]">
            <GiShoppingCart size={150} />
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-semibold mb-8">
                Your cart is Empty
              </h3>
              <p className="text-2xl">
                looks like you haven&apos;t added anything to your cart yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Cart;
