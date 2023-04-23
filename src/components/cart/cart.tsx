import { ShoppingCartIcon, ShoppingBag } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { ScrollArea } from '~/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { useCartItems } from '~/context/CartProvider';
import formatMoney from '~/utils/formatMoney';

import CartItem from './cart-item';

// TODO: drop pr-2 if cart items > 4
const Cart = () => {
  const { cartItems, subTotal } = useCartItems();

  // TODO: update product quantity when it's already in the cart

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cart-icon relative">
          <ShoppingBag className="text-slate-600 w-6 h-6 cursor-pointer" />
          {cartItems.length > 0 && (
            <p className="total-cart-items absolute -top-3 -right-3 bg-red-500 w-6 h-6 flex items-center justify-center text-white font-semibold rounded-full cursor-pointer">
              {cartItems.length}
            </p>
          )}
        </div>
      </SheetTrigger>
      <SheetContent position="right" size="content">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        <div className="">
          {cartItems?.length > 0 ? (
            <>
              <ScrollArea className="cart-items-scrollbar max-h-[510px] sm:max-h-[535px] pr-2 mt-4 overflow-auto">
                {cartItems.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </ScrollArea>
              <SheetFooter className="px-2 py-4 flex-col gap-4 sm:justify-between sm:items-center">
                <p className="">
                  SubTotal:{' '}
                  <span className="font-semibold">{formatMoney(subTotal)}</span>
                </p>
                <Button variant="primary" className="font-bold">
                  Proceed to checkout
                </Button>
              </SheetFooter>
            </>
          ) : (
            <div className="flex items-center justify-center flex-col h-[60vh]">
              <ShoppingCartIcon size={100} />
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-semibold mb-8">
                  Your cart is Empty
                </h3>
                <p className="text-xl">
                  looks like you haven&apos;t added anything to your cart yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default Cart;
