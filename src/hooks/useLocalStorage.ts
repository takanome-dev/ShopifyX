import { useCallback } from 'react';

import { CartItem } from '@/interfaces/cart';

export default function useLocalStorage() {
  const getItemsFromStorage = useCallback(() => {
    let cartItems: CartItem[] = [];
    const cart = localStorage.getItem('cart');

    if (cart) {
      const items = JSON.parse(cart) as CartItem[];
      cartItems = items;
    }

    return cartItems;
  }, []);

  const setItemsToStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
  };

  return { getItemsFromStorage, setItemsToStorage };
}
