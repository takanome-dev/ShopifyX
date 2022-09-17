import { NextPage } from 'next';
import React from 'react';
import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

const ButtonStyles = styled.button`
  padding: 1rem 3rem;
  /* border: 1px solid ${(props) => props.color}; */
  border: none;
  color: ${(props) => props.color};
  background: ${(props) => props.bgColor};
  border-radius: 0.8rem;
  /* align-self: center; why */
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-left: 1rem;
  }

  ${({ disabled }: { disabled: boolean }) =>
    disabled && 'pointer-events: none;opacity:0.6;'}
`;

interface ButtonProps {
  Icon: IconType;
  title: string;
  bgColor?: string;
  color?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

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
    className={`py-4 px-12 border-none ${color} ${bgColor} rounded-lg mt-8 text-3xl font-semibold flex items-center cursor-pointer`}
  >
    {title}
    {Icon && <Icon size={20} className={`${color} ml-4`} />}
  </button>
);

export default Button;
