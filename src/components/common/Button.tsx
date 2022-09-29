import { NextPage } from 'next';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface ButtonProps {
  Icon?: IconType;
  title: string;
  bgColor?: string;
  color?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string | undefined;
  iconPosition?: 'left' | 'right';
}

// bgColor = 'bg-gradient-to-r from-cyan to-teal',
// color = 'text-gray-700',
// TODO: replace cyan2 with cyan and move cyan to primary color
const Button: NextPage<ButtonProps> = ({
  Icon,
  title,
  type = 'button',
  className,
  disabled = false,
  iconPosition = 'right',
}) => {
  const classes = `${className!} px-12 rounded-lg text-3xl font-semibold cursor-pointer`;
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={classes}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={20} className="mr-4 text-gray-700" />
      )}
      {title}
      {Icon && iconPosition === 'right' && (
        <Icon size={20} className="ml-4 text-gray-700" />
      )}
    </button>
  );
};

export default Button;
