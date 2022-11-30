import { Product } from './product';

export interface CartItem {
  __typename?: string;
  product: Product;
  quantity: number;
}

export interface CartInitialValues {
  cartItems: CartItem[];
  subTotal: number;
  addToCart: (item: CartItem) => void | null;
  onUpdateItem: (quantity: number, productId: string) => void | null;
  onDeleteItem: (productId: string) => void | null;
}
