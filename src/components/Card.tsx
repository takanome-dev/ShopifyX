/* eslint-disable @typescript-eslint/no-unsafe-call */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaCartPlus, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import formatMoney from '@lib/formatMoney';

import { Product } from './types';

export default function Card({ product }: { product: Product }) {
  return (
    <div className="card">
      <Image
        src={product.photo}
        alt={product.name}
        width={400}
        height={350}
        layout="responsive"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
      />
      <div className="description">
        <Link href="#product">{product.name}</Link>
        <p className="desc">{product.description}</p>
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
