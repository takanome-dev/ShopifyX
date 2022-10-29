/* eslint-disable react/require-default-props */
import React, { forwardRef } from 'react';
import { IconType } from 'react-icons/lib';

// @ts-ignore
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  Icon?: IconType;
  title: string;
  iconClasses?: string;
  iconPosition?: 'start' | 'end';
  size: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  type?: 'submit' | 'reset' | 'button';
}

const SIZES = {
  xs: 'px-3 py-3 text-2xl',
  sm: 'px-4 py-5 text-2xl',
  md: 'px-5 py-6 text-2xl',
  lg: 'px-6 py-6 text-3xl',
};

// TODO: change palette color from cyan to primary and teal to secondary
const VARIANTS = {
  primary:
    'border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20',
  secondary: 'border hover:bg-gray-100 shadow-md shadow-gray-500',
  inherit: '',
};

// TODO: replace cyan2 with cyan and move cyan to primary color
const Button = forwardRef(
  (props: ButtonProps, ref: React.LegacyRef<HTMLButtonElement> | undefined) => {
    const {
      Icon,
      title,
      iconPosition = 'end',
      size,
      iconClasses,
      className,
      variant = 'inherit',
      ...rest
    } = props;

    const classes = `${className!} ${SIZES[size]} ${
      VARIANTS[variant]
    } rounded-lg font-semibold cursor-pointer flex items-center disabled:opacity-50 disabled:pointer-events-none`;

    return (
      // eslint-disable-next-line react/button-has-type
      <button className={classes} ref={ref} {...rest}>
        {Icon && iconPosition === 'start' && (
          <Icon size={18} className={`mr-4 ${iconClasses!}`} />
        )}
        <span>{title}</span>
        {Icon && iconPosition === 'end' && (
          <Icon size={18} className={`ml-4 ${iconClasses!}`} />
        )}
      </button>
    );
  }
);

export default Button;
