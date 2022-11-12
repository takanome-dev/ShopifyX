/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useField, useFormikContext } from 'formik';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import InputError from './InputError';

/**
 * For more information about the input transition
 * @css see {@link https://www.youtube.com/watch?v=3AK3vspZvvM&t=280s}
 * @tailwind see {@link https://www.youtube.com/watch?v=nJzKi6oIvBA}
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  isPassword?: boolean;
}

const Input: NextPage<InputProps> = ({
  label,
  error,
  type,
  isPassword = false,
  ...props
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [field, meta] = useField(props);
  const { values, setFieldValue } = useFormikContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { type: inputType, name, value } = e.currentTarget;

    if (inputType === 'file') {
      value = e.currentTarget.files?.[0] as any;
    }

    setFieldValue(name, value);
  };

  const togglePasswordVisible = () => setPasswordVisible(!passwordVisible);

  const errorMessage = error || (meta.touched && meta.error);

  return (
    <div className="relative my-6">
      <div
        className={`flex items-center justify-between border-2 ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        } rounded-xl`}
      >
        <input
          {...field}
          {...props}
          id={props.name}
          type={isPassword ? (passwordVisible ? 'text' : 'password') : type}
          className="peer py-4 px-6 placeholder-transparent text-2xl outline-none text-gray-700 w-full transition-all duration-[300ms] ease-in-out focus:delay-100 focus:border-cyan focus:ring-2 focus:ring-cyan file:border-none file:p-4 file:rounded-lg file:font-semibold file:mr-5 file:cursor-pointer file:bg-gradient-to-r file:from-cyan file:to-teal hover:file:opacity-80 file:text-gray-700"
          value={
            props.name !== 'image' ? (values as any)[props.name] : undefined
          }
          onChange={handleChange}
        />
        {isPassword ? (
          passwordVisible ? (
            <button
              type="button"
              className="p-3 rounded-full hover:bg-gray-100"
              onClick={togglePasswordVisible}
            >
              <AiOutlineEye size={20} />
            </button>
          ) : (
            <button
              type="button"
              className="p-3 rounded-full hover:bg-gray-100"
              onClick={togglePasswordVisible}
            >
              <AiOutlineEyeInvisible size={20} />
            </button>
          )
        ) : null}
      </div>
      <label
        className={`text-xl ${
          errorMessage ? 'text-red-500' : 'text-gray-600'
        } absolute left-6 bg-white px-3 -top-3.5 transition-all duration-[300ms] ease-in-out peer-placeholder-shown:text-2xl peer-placeholder-shown:bg-transparent peer-placeholder-shown:top-5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-gray-400`}
        htmlFor={props.name}
      >
        {label}
      </label>
      <InputError error={errorMessage} />
    </div>
  );
};

export default Input;
