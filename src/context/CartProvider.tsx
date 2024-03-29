/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import useLocalStorage from '@/hooks/useLocalStorage';
import { CartInitialValues, CartItem } from '@/interfaces/cart';

interface Props {
  children: React.ReactNode;
}

const initialState: CartInitialValues = {
  cartItems: [],
  subTotal: 0,
  addToCart: () => null,
  onUpdateItem: () => null,
  onDeleteItem: () => null,
};

const CartContext = createContext(initialState);

export default function CartProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const { user } = useCurrentUser();
  const { getItemsFromStorage, setItemsToStorage } = useLocalStorage();

  const calculateSubTotal = useCallback((items: CartItem[]) => {
    const totalPrices = items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
    setSubTotal(totalPrices);
  }, []);

  useEffect(() => {
    if (user) {
      const items =
        getItemsFromStorage().length > 0
          ? getItemsFromStorage()
          : (user?.cart as CartItem[]);
      setItemsToStorage(items);
      setCartItems(items);
      calculateSubTotal(items);
    } else {
      const items = getItemsFromStorage();
      setCartItems(items);
      calculateSubTotal(items);
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
      setItemsToStorage(newCartItems);
    },
    [cartItems]
  );

  const handleAddToCart = useCallback(
    (item: CartItem) => {
      const foundItem = cartItems.find(
        ({ product }) => product.id === item.product.id
      );

      let newCartItems: CartItem[] = [];

      if (!foundItem) {
        newCartItems = [...cartItems, item];
      } else {
        newCartItems = cartItems.map((cartItem) => {
          if (cartItem.product.id === foundItem.product.id) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
      }

      calculateSubTotal(newCartItems);
      setCartItems(newCartItems);
      setItemsToStorage(newCartItems);
    },
    [cartItems, subTotal]
  );

  const handleDeleteItem = (productId: string) => {
    const newCartItems = cartItems.filter(
      ({ product }) => product.id !== productId
    );
    setCartItems(newCartItems);
    calculateSubTotal(newCartItems);
    setItemsToStorage(newCartItems);
  };

  const value = useMemo(
    () => ({
      cartItems,
      subTotal,
      addToCart: handleAddToCart,
      onUpdateItem: handleUpdateItem,
      onDeleteItem: handleDeleteItem,
    }),
    [cartItems, subTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCartItems = () => useContext(CartContext);
