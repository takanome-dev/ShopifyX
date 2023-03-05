import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Favorite from '@/components/favorite';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useCartItems } from '@/context/CartProvider';
import { Product } from '@/interfaces/product';
import formatMoney from '@/utils/formatMoney';

interface Props {
  product: any;
  // product: Product;
}

export default function Card({ product }: Props) {
  const { addToCart } = useCartItems();

  return (
    <div className="card relative border border-slate-300 rounded-lg p-4">
      <div className="relative h-96">
        <Image
          src={product.photo}
          alt={product.name}
          className="card-image w-full h-full object-cover rounded-lg"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
        />
        {/* <Image
          src={product.photo?.image?.publicUrlTransformed}
          alt={product.name}
          className="card-image w-full object-cover rounded-lg"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
        /> */}
        <Favorite className="" />
      </div>
      <div className="flex flex-col px-4 mt-4">
        <Link
          href={`/products/${product.id}`}
          className="card-title w-full mb-3 overflow-hidden text-3xl font-semibold text-ellipsis whitespace-nowrap"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-between">
          <p className="card-price text-xl font-semibold">
            {formatMoney(product.price)}
          </p>
          <p
            className={`card-stock ${
              product.stock > 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {product.stock > 0 ? 'In stock' : 'Out of stock'}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Link href="/" className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/assets/avatar.png" alt="User avatar" />
              <AvatarFallback>N/A</AvatarFallback>
            </Avatar>
            <p className="flex flex-col">
              <small className="text-slate-400 -mb-1">seller</small>
              <span className="text-base text-blue-600">@takanome</span>
            </p>
          </Link>
          <Button
            className="card-add-btn bg-transparent px-2 rounded-full"
            onClick={() => addToCart({ product, quantity: 1 })}
          >
            <ShoppingCart className="text-slate-700 w-6 h-6 cursor-pointer" />
          </Button>
        </div>
      </div>
    </div>
  );
}
