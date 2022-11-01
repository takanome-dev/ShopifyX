/* eslint-disable react/require-default-props */
import Link from 'next/link';
import React, { forwardRef } from 'react';
import { IconType } from 'react-icons/lib';

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  path: string;
  title: string;
  className?: string | undefined;
  Icon?: IconType;
  disabled?: boolean;
  iconPosition?: 'start' | 'end';
}

const LinkComponent = forwardRef(
  (props: LinkProps, ref: React.LegacyRef<HTMLAnchorElement> | undefined) => {
    const { path, title, className, disabled, iconPosition, Icon, ...rest } =
      props;
    const classes = `hover:underline ${className!}`;
    // TODO: disabled buttons

    return (
      <Link href={path}>
        <a ref={ref} className={classes} {...rest}>
          {Icon && iconPosition === 'start' && (
            <Icon size={18} className="mr-4 text-gray-500" />
          )}
          <span>{title}</span>
          {Icon && iconPosition === 'end' && (
            <Icon size={18} className="mr-4 text-gray-500" />
          )}
        </a>
      </Link>
    );
  }
);

export default LinkComponent;
