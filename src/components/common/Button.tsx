import { NextPage } from 'next';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface ButtonProps {
  Icon?: IconType;
  title: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string | undefined;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

// TODO: replace cyan2 with cyan and move cyan to primary color
const Button: NextPage<ButtonProps> = ({
  Icon,
  title,
  type = 'button',
  className,
  disabled = false,
  iconPosition = 'right',
  size,
}) => {
  const padding =
    size === 'sm'
      ? 'px-4 py-5 text-2xl'
      : size === 'md'
      ? 'px-5 py-6 text-2xl'
      : 'px-6 py-6 text-3xl';

  const classes = `${className!} ${padding} rounded-lg font-semibold cursor-pointer flex items-center`;

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={classes}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={18} className="mr-4 text-gray-700" />
      )}
      <span>{title}</span>
      {Icon && iconPosition === 'right' && (
        <Icon size={18} className="ml-4 text-gray-700" />
      )}
    </button>
  );
};

export default Button;
