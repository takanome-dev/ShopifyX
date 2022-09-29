import Link from 'next/link';
import React from 'react';

export default function Pagination() {
  return (
    <div className="w-[300px] grid grid-cols-[repeat(5,_auto)] rounded-2xl my-12 mx-auto overflow-hidden border border-gray-300">
      <Link href="/#">
        <a className="p-4 text-2xl border-r border-r-gray-300">⬅️ Prev</a>
      </Link>
      <p className="p-4 text-2xl border-r border-r-gray-300">1</p>
      <p className="p-4 text-2xl border-r border-r-gray-300">..</p>
      <p className="p-4 text-2xl border-r border-r-gray-300">10</p>
      <Link href="/#">
        <a className="p-4 text-2xl">➡️ Next</a>
      </Link>
    </div>
  );
}
