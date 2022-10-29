/* eslint-disable react/require-default-props */
import Link from 'next/link';
import React, { forwardRef } from 'react';
import { IconType } from 'react-icons/lib';

interface LinkProps {
  path: string;
  title: string;
  className?: string | undefined;
  Icon?: IconType;
  variant?: 'primary' | 'secondary';
}

// TODO: change palette color from cyan to primary and teal to secondary
const VARIANTS = {
  primary:
    'border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20',
  secondary: 'border hover:bg-gray-100 shadow-md shadow-gray-500',
  inherit: '',
};

const ButtonLink = forwardRef(
  (props: LinkProps, ref: React.LegacyRef<HTMLAnchorElement> | undefined) => {
    const { path, title, className, variant, Icon, ...rest } = props;

    const classes = `px-4 py-6 text-3xl flex items-center rounded-lg font-semibold ${
      VARIANTS[variant ?? 'primary']
    } ${className!}`;

    return (
      <Link href={path}>
        <a ref={ref} className={classes} {...rest}>
          <span>{title}</span>
          {Icon && <Icon size={20} className="ml-4" />}
        </a>
      </Link>
    );
  }
);

export default ButtonLink;
