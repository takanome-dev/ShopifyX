import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

interface LinkProps {
  name: string;
  path: string;
}

const HeaderLink: NextPage<LinkProps> = ({ path, name }) => (
  <Link href={`/${path}`}>
    <a className="m-8 text-3xl relative font-semibold text-gray-700 uppercase before:content-[''] before:h-1.5 before:w-0 before:bg-gradient-to-r before:from-cyan before:to-teal before:absolute before:left-0 before:mt-9 before:transition-all before:duration-[300ms] hover:before:w-full">
      {name}
    </a>
  </Link>
);

export default HeaderLink;
