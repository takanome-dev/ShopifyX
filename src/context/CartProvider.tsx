/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useAuthContext } from './AuthProvider';
import { CartItem, CartInitialValues } from './types';

interface Props {
  children: React.ReactNode;
}

const initialState: CartInitialValues = {
  cartItems: [],
  subTotal: 0,
  addToCart: () => null,
  onUpdateItem: () => null,
};

const CartContext = createContext(initialState);

export default function CartProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const { user } = useAuthContext();

  const calculateSubTotal = useCallback((items: CartItem[]) => {
    const totalPrices = items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
    setSubTotal(totalPrices);
  }, []);

  useEffect(() => {
    if (user) {
      // TODO: set cart items to local storage
      setCartItems(user?.cart as CartItem[]);
      calculateSubTotal(user?.cart as CartItem[]);
    }
  }, [user]);

  const handleUpdateItem = useCallback(
    (quantity: number, productId: string) => {
      // TODO: find a nice and more efficient way to do this!!!
      const cartItem = cartItems.find((item) => item.product.id === productId);
      const items = cartItems.filter((item) => item.product.id !== productId);
      const newCartItems = [...items, { ...cartItem!, quantity }];

      calculateSubTotal(newCartItems);
      setCartItems(newCartItems);
    },
    [cartItems]
  );

  const handleAddToCart = useCallback(
    (item: CartItem) => {
      const items = [...cartItems, item];

      calculateSubTotal(items);
      setCartItems(items);
    },
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      subTotal,
      addToCart: handleAddToCart,
      onUpdateItem: handleUpdateItem,
    }),
    [cartItems, subTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartItems = () => useContext(CartContext);
