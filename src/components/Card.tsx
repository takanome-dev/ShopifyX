import React from 'react';
import { Product } from './types';
import Link from 'next/link';
import { FaCartPlus, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import formatMoney from '@/lib/formatMoney';

export default function Card({ product }: { product: Product }) {
  return (
    <div className="card">
      <img src={product.photo} alt={product.name} />
      <div className="description">
        <Link href="#product">{product.name}</Link>
        <p>{product.description}</p>
        <p className="price">{formatMoney(product.price)}</p>
      </div>
      <div className="buttons">
        <div className="edit">
          {/* <span>edit</span> */}
          <FaPencilAlt size={20} color="var(--shipGray)" />
        </div>
        <div className="add">
          {/* <span>Add To Cart</span> */}
          <FaCartPlus size={20} color="var(--shipGray)" />
        </div>
        <div className="delete">
          {/* <span>Delete</span> */}
          <FaTrashAlt size={20} color="var(--red)" />
        </div>
      </div>
    </div>
  );
}
