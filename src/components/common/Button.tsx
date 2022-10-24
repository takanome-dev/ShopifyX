/* eslint-disable react/require-default-props */
import React, { forwardRef } from 'react';
import { IconType } from 'react-icons/lib';

interface ButtonProps {
  Icon?: IconType;
  color?: string;
  title: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string | undefined;
  iconPosition?: 'left' | 'right';
  size: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: React.MouseEventHandler<HTMLButtonElement | undefined>;
}

const SIZES = {
  xs: 'px-3 py-3 text-2xl',
  sm: 'px-4 py-5 text-2xl',
  md: 'px-5 py-6 text-2xl',
  lg: 'px-6 py-6 text-3xl',
};

// TODO: replace cyan2 with cyan and move cyan to primary color
const Button = forwardRef(
  (props: ButtonProps, ref: React.LegacyRef<HTMLButtonElement> | undefined) => {
    const {
      Icon,
      color = 'text-gray-700',
      title,
      type = 'button',
      className,
      disabled = false,
      iconPosition = 'right',
      size,
      onClick,
      ...rest
    } = props;

    const classes = `rounded-lg font-semibold cursor-pointer flex items-center ${className!} ${
      SIZES[size]
    } ${
      disabled
        ? 'opacity-50 pointer-events-none'
        : 'opacity-100 pointer-events-auto'
    }`;

    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        disabled={disabled}
        className={classes}
        onClick={onClick}
        ref={ref}
        {...rest}
      >
        {Icon && iconPosition === 'left' && (
          <Icon size={18} className={`mr-4 ${color}`} />
        )}
        <span>{title}</span>
        {Icon && iconPosition === 'right' && (
          <Icon size={18} className={`mr-4 ${color}`} />
        )}
      </button>
    );
  }
);

export default Button;
