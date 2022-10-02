import React from 'react';
import { MdOutlineMail } from 'react-icons/md';
import { TbArrowBack } from 'react-icons/tb';

import Link from '@components/common/Link';

import Button from '../common/Button';

const VerifyEmail = () => (
  <div className="min-h-[500px] flex items-center justify-center">
    <div className="rounded-xl shadow-xl w-[500px] p-8">
      <div className="mb-12">
        <h2 className="flex items-center justify-center pb-8 text-4xl font-semibold text-center">
          <span>Check your email</span>{' '}
          <MdOutlineMail size={20} className="ml-4" />
        </h2>
        <p className="text-2xl text-center">
          We sent a password reset link to{' '}
          <span className="font-semibold">takanomedev221@gmail.com</span>
        </p>
      </div>
      <Button
        title="Open email app"
        className="w-full mt-8 border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20"
        type="button"
        size="sm"
      />
      <p className="mt-10 text-2xl text-center">
        Didn&apos;t receive the email?{' '}
        <Link path="/login" title="Click to resend" />
      </p>
      <Link
        path="/login"
        title="Back to log in"
        className="flex items-center justify-center mt-8"
        Icon={TbArrowBack}
      />
    </div>
  </div>
);

export default VerifyEmail;
