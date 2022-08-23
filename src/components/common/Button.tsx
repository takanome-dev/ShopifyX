import { NextPage } from 'next';
import React from 'react';
import { IconType } from 'react-icons/lib';
import styled from 'styled-components';

type ButtonProps = {
  color: string;
  bgColor: string;
};

const ButtonStyles = styled.button.attrs((props: ButtonProps) => ({
  color: props.color,
  bgColor: props.bgColor,
}))`
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
`;

type Props = {
  Icon: IconType;
  title: string;
  bgColor?: string;
  color?: string;
};

const Button: NextPage<Props> = ({
  bgColor = 'var(--linear)',
  color = 'var(--black)',
  Icon,
  title,
}) => (
  <ButtonStyles type="button" color={color} bgColor={bgColor}>
    {title}
    {Icon && <Icon size={20} color={color} />}
  </ButtonStyles>
);

export default Button;
