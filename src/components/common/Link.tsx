/* eslint-disable react/require-default-props */
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface LinkProps {
  path: string;
  title: string;
  className?: string | undefined;
  Icon?: IconType;
}

const LinkComponent = (props: LinkProps) => {
  const { path, title, className, Icon } = props;

  const classes = `${className!} text-blue-500 text-2xl hover:underline`;

  return (
    <Link href={path}>
      <a className={classes}>
        {Icon && <Icon size={18} className="mr-4 text-gray-700" />}
        <span>{title}</span>
      </a>
    </Link>
  );
};

export default LinkComponent;
