import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export default function ResetSuccessfully() {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="rounded-xl shadow-xl w-[500px] p-8">
        <div className="mb-12">
          <h2 className="flex items-center justify-center pb-8 text-4xl font-semibold text-center">
            <span>Password Reset </span>{' '}
            <CheckCircle size={20} className="ml-4 text-green-500" />
          </h2>
          <p className="text-2xl text-center">
            Your password has been successfully reset. Please, use your new
            password to log in.
          </p>
        </div>
        <Link
          href="/login"
          className={buttonVariants({
            variant: 'default',
          })}
        >
          <ArrowRight />
          Continue
        </Link>
      </div>
    </div>
  );
}
