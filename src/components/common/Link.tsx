import Link from 'next/link';
import React from 'react';

interface LinkProps {
  path: string;
  title: string;
  // eslint-disable-next-line react/require-default-props
  className?: string | undefined;
}

const LinkComponent = (props: LinkProps) => {
  const { path, title, className } = props;

  const classes = `${className!} text-blue-500 text-2xl hover:underline`;

  return (
    <Link href={path}>
      <a className={classes}>{title}</a>
    </Link>
  );
};

export default LinkComponent;
