import { CornerDownLeft, Send, MailOpen } from 'lucide-react';
import Link from 'next/link';

export default function VerifyEmail({ email }: { email: string }) {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="rounded-xl shadow-xl w-[500px] p-8">
        <div className="mb-12">
          <h2 className="flex items-center justify-center pb-8 text-4xl font-semibold text-center">
            <span>Check your email</span> <Send size={20} className="ml-4" />
          </h2>
          <p className="text-2xl text-center">
            We sent a password reset link to{' '}
            <span className="font-semibold">{email}</span>
          </p>
        </div>
        <Link href={`mailto:${email}`} className="justify-center">
          <MailOpen />
          Open Emails
        </Link>
        <p className="mt-10 text-2xl text-center">
          Didn&apos;t receive the email?{' '}
          <Link href="/reset-password" className="text-blue-500 text-2xl">
            Request a new one
          </Link>
        </p>
        <Link
          href="/login"
          className="flex items-center justify-center mt-8 text-blue-500 text-2xl"
        >
          <CornerDownLeft />
          Back to log in
        </Link>
      </div>
    </div>
  );
}
