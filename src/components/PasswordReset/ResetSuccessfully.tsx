import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { TbArrowBack } from 'react-icons/tb';

import Link from '@components/common/Link';

import Button from '../common/Button';

const ResetSuccessfully = () => (
  <div className="min-h-[500px] flex items-center justify-center">
    <div className="rounded-xl shadow-xl w-[500px] p-8">
      <div className="mb-12">
        <h2 className="flex items-center justify-center pb-8 text-4xl font-semibold text-center">
          <span>Password Reset </span>{' '}
          <FiCheckCircle size={20} className="ml-4 text-green-500" />
        </h2>
        <p className="text-2xl text-center">
          Your password has been successfully reset. Please, use your new
          password to logging in.
        </p>
      </div>
      <Button
        title="Continue"
        className="w-full mt-8 border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20"
        type="button"
        size="sm"
      />
      <Link
        path="/login"
        title="Back to log in"
        className="flex items-center justify-center mt-8"
        Icon={TbArrowBack}
      />
    </div>
  </div>
);

export default ResetSuccessfully;
