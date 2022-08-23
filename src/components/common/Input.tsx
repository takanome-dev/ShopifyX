import { NextPage } from 'next';
import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
// import { TiWarning } from 'react-icons/ti';
import styled from 'styled-components';

/**
 * For more input transition
 * See {@link https://www.youtube.com/watch?v=3AK3vspZvvM&t=280s}
 */

const InputStyles = styled.div`
  margin: 1rem 0;
  /* display: block; */

  label {
    font-size: 1.5rem;
    position: relative;
  }

  input {
    padding: 1rem 1.5rem;
    border: 1px solid var(--lightGray);
    border-radius: 0.8rem;
    font-size: 1.5rem;
    outline: none;
    color: var(--gray);
    width: 100%;
    transition: border 0.3s ease;

    &:focus {
      transition-delay: 0.1s;
      border-color: var(--cyan);
    }

    &:focus + span {
      top: -1.3rem;
      left: 1rem;
      font-size: 1.2rem;
      color: var(--black);
      background: #fff;
      padding: 0 1rem;
    }

    ::-webkit-file-upload-button {
      background: var(--linear);
      border: none;
      padding: 1rem;
      color: var(--black);
      border-radius: 0.5rem;
      font-weight: 600;
      margin-right: 1rem;
      cursor: pointer;
    }
  }

  span {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--lightestGray);
    transition: all 0.3s ease;
  }

  .error {
    display: flex;
    align-items: center;
    color: var(--red);
    font-size: 1.3rem;
    margin-top: 1rem;

    svg {
      margin-right: 1rem;
    }
  }
`;

type Props = {
  name: string;
  label?: string;
  type?: string;
  error?: string;
};

const Input: NextPage<Props> = ({ label, name, type = 'text', error }) => (
  <InputStyles>
    <label htmlFor={name}>
      <input type={type} name={name} id={name} />
      <span>{label}</span>
    </label>
    {error && (
      <p className="error">
        <MdErrorOutline color="var(--red)" size={20} />
        Error message
      </p>
    )}
  </InputStyles>
);

export default Input;
