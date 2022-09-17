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
  align-self: center;
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

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  title: string;
  bgColor?: string;
  color?: string;
  disabled?: boolean;
}

const Button: NextPage<ButtonProps> = ({
  bgColor = 'var(--linear)',
  color = 'var(--black)',
  Icon,
  title,
  type = 'button',
  disabled = false,
}) => (
  <ButtonStyles type={type} color={color} bgColor={bgColor} disabled={disabled}>
    {title}
    {Icon && <Icon size={20} color={color} />}
  </ButtonStyles>
);

export default Button;
