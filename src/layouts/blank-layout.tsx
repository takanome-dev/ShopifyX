import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const BlankLayout: NextPage<Props> = ({ children }) => (
  <>
    <header className="sticky top-0 pt-4">
      <Link href="/" className="flex items-center gap-2 ml-16">
        <Image src="/logo.svg" alt="ShopifyX logo" width={36} height={36} />
        <span className="text-3xl font-semibold text-slate-700">
          Shopify
          <small className="from-primary to-secondary bg-clip-text text-transparent bg-gradient-to-b text-4xl">
            X
          </small>
        </span>
      </Link>
    </header>
    <main className="max-w-screen-xl px-8 mx-auto my-12">{children}</main>
  </>
);

export default BlankLayout;
