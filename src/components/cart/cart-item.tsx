import { Heart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { useCartItems } from '@/context/CartProvider';
import { Product } from '@/interfaces/product';
import formatMoney from '@/utils/formatMoney';

import { Button, buttonVariants } from '../ui/button';

interface CartItemProps {
  item: {
    product: Product;
    quantity: number;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { product } = item;
  const { onUpdateItem, onDeleteItem } = useCartItems();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleSetQuantity = (value: number, productId: string) => {
    setQuantity(value);
    onUpdateItem(value, productId);
  };

  return (
    <div className="cart-item grid grid-cols-[60px_1fr] gap-x-6 border border-slate-100 shadow-xs p-4 rounded-lg mb-4 ">
      <div className="overflow-hidden rounded-lg w-20 h-20">
        <Image
          // src={product.photo}
          src={product.photo.image.publicUrlTransformed}
          alt={product.name}
          width={100}
          height={100}
          className="cart-item-img object-cover w-full h-full"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-between flex-wrap">
          <Link
            href={`products/${product.id}`}
            className="cart-item-name text-xl w-60 truncate font-semibold hover:underline"
          >
            {product.name}
          </Link>
          <p className="cart-item-price text-xl font-semibold">
            {formatMoney(product.price * quantity)}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center rounded-lg">
            <Button
              variant="outline"
              size="default"
              onClick={() => handleSetQuantity(quantity - 1, product.id)}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span
              className={buttonVariants({
                size: 'default',
                className: '!bg-transparent hover:bg-transparent',
              })}
            >
              {quantity}
            </span>
            <Button
              variant="outline"
              size="default"
              onClick={() => handleSetQuantity(quantity + 1, product.id)}
              disabled={quantity >= product.stock}
            >
              +
            </Button>
          </div>
          <div className="flex items-center gap-x-4">
            <Button variant="ghost" size="sm">
              <Heart className="w-6 h-6 text-slate-500" />
            </Button>
            <span className='relative before:absolute before:content-[""] before:w-[2px] before:h-6 before:bg-slate-100 before:-top-3 before:bottom-0' />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteItem(product.id)}
            >
              <Trash2 className="w-6 h-6 text-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
