import { NextPage } from 'next';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface ButtonProps {
  Icon: IconType;
  title: string;
  bgColor?: string;
  color?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// TODO: replace cyan2 with cyan and move cyan to primary color
const Button: NextPage<ButtonProps> = ({
  bgColor = 'bg-gradient-to-r from-cyan to-teal',
  color = 'text-gray-700',
  Icon,
  title,
  type = 'button',
  disabled = false,
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    disabled={disabled}
    className={`py-4 px-12 border-none ${color} ${bgColor} hover:opacity-90 rounded-lg mt-8 text-3xl font-semibold flex items-center cursor-pointer shadow-lg shadow-cyan2-500/30`}
  >
    {title}
    {Icon && <Icon size={20} className={`${color} ml-4`} />}
  </button>
);

export default Button;
