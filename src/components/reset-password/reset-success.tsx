import { FiCheckCircle } from 'react-icons/fi';
import { TbArrowRight } from 'react-icons/tb';

import ButtonLink from '@/components/common/ButtonLink';

export default function ResetSuccessfully() {
  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <div className="rounded-xl shadow-xl w-[500px] p-8">
        <div className="mb-12">
          <h2 className="flex items-center justify-center pb-8 text-4xl font-semibold text-center">
            <span>Password Reset </span>{' '}
            <FiCheckCircle size={20} className="ml-4 text-green-500" />
          </h2>
          <p className="text-2xl text-center">
            Your password has been successfully reset. Please, use your new
            password to log in.
          </p>
        </div>
        <ButtonLink
          path="/login"
          title="Continue"
          className="justify-center"
          Icon={TbArrowRight}
        />
      </div>
    </div>
  );
}
