import React from 'react';
import { BsEnvelopeOpen } from 'react-icons/bs';
import { IoIosSend } from 'react-icons/io';
import { TbArrowBack } from 'react-icons/tb';

import ButtonLink from '@components/common/ButtonLink';
import Link from '@components/common/Link';

export default function VerifyEmail({ email }: { email: string }) {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="rounded-xl shadow-xl w-[500px] p-8">
        <div className="mb-12">
          <h2 className="flex items-center justify-center pb-8 text-4xl font-semibold text-center">
            <span>Check your email</span>{' '}
            <IoIosSend size={20} className="ml-4" />
          </h2>
          <p className="text-2xl text-center">
            We sent a password reset link to{' '}
            <span className="font-semibold">{email}</span>
          </p>
        </div>
        <ButtonLink
          path={`mailto:${email}`}
          title="Open Emails"
          Icon={BsEnvelopeOpen}
          className="justify-center"
        />
        <p className="mt-10 text-2xl text-center">
          Didn&apos;t receive the email?{' '}
          <Link
            path="/reset-password"
            title="Request a new one"
            className="text-blue-500"
          />
        </p>
        <Link
          path="/login"
          title="Back to log in"
          className="flex items-center justify-center mt-8 text-blue-500"
          Icon={TbArrowBack}
        />
      </div>
    </div>
  );
}
