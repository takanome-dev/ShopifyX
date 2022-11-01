import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { CartItem, CartInitialValues } from './types';

interface Props {
  children: React.ReactNode;
}

const initialState: CartInitialValues = {
  cartItems: [],
  subTotal: 0,
  addToCart: () => null,
  updateSubTotal: () => null,
};

const CartContext = createContext(initialState);

export default function CartProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState(0);

  const calculateSubTotal = useCallback((items: CartItem[]) => {
    const totalPrices = items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
    setSubTotal(totalPrices);
  }, []);

  const handleSubTotal = useCallback(
    (quantity: number, productId: number) => {
      const items = cartItems;
      const product = items.find((item) => item.product.id === productId);
      product!.quantity = quantity;

      calculateSubTotal(items);
      setCartItems(items);
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
      updateSubTotal: handleSubTotal,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems, subTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartItems = () => useContext(CartContext);
