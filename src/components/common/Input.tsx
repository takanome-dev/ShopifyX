/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useField } from 'formik';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { MdErrorOutline } from 'react-icons/md';
// import { TiWarning } from 'react-icons/ti';
import styled from 'styled-components';

/**
 * For more information about the input transition
 * See {@link https://www.youtube.com/watch?v=3AK3vspZvvM&t=280s}
 */

const InputStyles = styled.div`
  margin: 1.5rem 0;
  /* display: block; */

  input {
    padding: 1rem 1.5rem;
    /* border: 1px solid var(--lightGray); */
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

    &:focus + span,
    &.dirty + span {
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

  .label {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
  }

  .error {
    display: flex;
    align-items: center;
    color: var(--red);
    font-size: 1.3rem;
    margin-top: 0.5rem;

    svg {
      margin-right: 1rem;
    }
  }
`;

const LabelStyles = styled.label`
  font-size: 1.5rem;
  position: relative;

  input {
    ${({ error }: { error: string }) =>
      error
        ? 'border: 1px solid var(--red);'
        : 'border: 1px solid var(--lightGray);'}
  }

  .label {
    ${({ error }: { error: string }) =>
      error ? 'color: var(--red);' : 'color: var(--lightestGray);'}
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  error?: string;
}

const Input: NextPage<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((el) => {
      el.addEventListener('blur', (e) => {
        if (e.target?.value) {
          e.target?.classList.add('dirty');
        } else {
          e.target?.classList.remove('dirty');
        }
      });
    });
  }, []);

  return (
    <InputStyles>
      <LabelStyles
        htmlFor={props.name}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error={(meta.error && meta.touched) as any}
      >
        <input {...field} {...props} />
        <span className="label">{label}</span>
      </LabelStyles>
      {meta.touched && meta.error && (
        <p className="error">
          <MdErrorOutline color="var(--red)" size={20} />
          {meta.error}
        </p>
      )}
    </InputStyles>
  );
};

export default Input;
