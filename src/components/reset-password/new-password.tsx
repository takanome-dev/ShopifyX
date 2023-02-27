import { useMutation, useQuery } from '@apollo/client';
import { Formik, Form } from 'formik';
import { CornerDownLeft, Key, Loader } from 'lucide-react';
import Link from 'next/link';
import * as Yup from 'yup';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { RESET_PASSWORD_MUTATION, VALIDATE_TOKEN_QUERY } from '@/gql/user';

import ResetSuccessfully from './reset-success';

const initialValues = {
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string().min(8).required(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Password must match'
  ),
});
interface RedeemUserPassword {
  redeemUserPasswordResetToken: {
    code: string;
    message: string;
  } | null;
}

interface ValidateUserToken {
  validateUserPasswordResetToken: {
    code: string;
    message: string;
  } | null;
}

interface Props {
  email: string;
  token: string;
}

export default function NewPassword({ email, token }: Props) {
  const { data: dataValidation } = useQuery<ValidateUserToken>(
    VALIDATE_TOKEN_QUERY,
    {
      variables: {
        email,
        token,
      },
    }
  );
  const [reset, { data, loading }] = useMutation<RedeemUserPassword | null>(
    RESET_PASSWORD_MUTATION
  );

  if (data?.redeemUserPasswordResetToken === null) return <ResetSuccessfully />;

  if (
    data?.redeemUserPasswordResetToken.code ||
    dataValidation?.validateUserPasswordResetToken?.code
  ) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="rounded-xl shadow-xl w-[500px] p-8 border-l-4 border-red-500">
          <p className="text-2xl font-semibold text-center">
            <span className="mr-2 text-red-500">Error:</span>
            {data?.redeemUserPasswordResetToken.message ||
              dataValidation?.validateUserPasswordResetToken?.message}
          </p>
          <Link
            href="/reset-password"
            className="flex items-center text-2xl justify-center mt-8 text-blue-500"
          >
            <CornerDownLeft />
            Re-request password reset
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (values: typeof initialValues) => {
    await reset({
      variables: {
        password: values.password,
        email,
        token,
      },
    });
  };

  return (
    <div className="min-h-[550px] flex items-center justify-center">
      <div className="rounded-xl shadow-xl w-[500px] p-8">
        <div className="mb-12">
          <h2 className="flex items-center justify-center pb-8 text-4xl font-semibold text-center">
            <span>Set New Password</span> <Key size={20} className="ml-4" />
          </h2>
          <p className="text-2xl text-center">
            Your new password must be different to previous used password
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="">
            <Input name="password" label="Password" />
            <Input name="confirmPassword" label="Confirm password" />
            <Button
              title={loading ? 'resetting the password...' : 'Reset Password'}
              className="w-full mt-8 justify-center"
              variant="primary"
              type="submit"
              size="lg"
              disabled={loading}
              iconClasses="animate-spin"
              Icon={loading ? Loader : undefined}
            />
          </Form>
        </Formik>
        <Link
          href="/login"
          className="flex items-center text-2xl justify-center mt-8 text-blue-500"
        >
          <CornerDownLeft />
          Back to log in
        </Link>
      </div>
    </div>
  );
}
