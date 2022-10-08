/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextPage } from 'next';
import React from 'react';
import { IconType } from 'react-icons/lib';

import useRippleEffect from '@hooks/useRippleEffect';

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
  const { coords, isRippling, handleCoords } = useRippleEffect();

  const padding =
    size === 'sm'
      ? 'px-4 py-5 text-2xl'
      : size === 'md'
      ? 'px-5 py-6 text-2xl'
      : 'px-6 py-6 text-3xl';

  const classes = `${className!} ${padding} relative rounded-lg font-semibold cursor-pointer flex items-center justify-center overflow-hidden`;

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={classes}
      onClick={handleCoords}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={18} className="mr-4 text-gray-700" />
      )}
      {isRippling ? (
        <span
          className={`absolute w-8 h-8 bg-gray-200 block content-[''] rounded-full opacity-10 animate-ripple left-${coords.x} top-${coords.y}`}
        />
      ) : (
        ''
      )}
      <span className="relative z-10">{title}</span>
      {Icon && iconPosition === 'right' && (
        <Icon size={18} className="ml-4 text-gray-700" />
      )}
    </button>
  );
};

export default Button;
