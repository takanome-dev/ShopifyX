import { gql, useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import { FaKey } from 'react-icons/fa';
import { TbArrowBack } from 'react-icons/tb';
import * as Yup from 'yup';

import LinkComponent from '@components/common/Link';

import Button from '../common/Button';
import Input from '../common/Input';

import NewPassword from './NewPassword';
import VerifyEmail from './VerifyEmail';

interface ResetMutationType {
  sendUserPasswordResetLink: boolean;
}

const initialValues = {
  email: '',
};

export const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

export default function ResetPassword() {
  const [userMail, setUserMail] = useState('');
  const { token, email } = useRouter().query;

  const [resetPassword, { data, loading, error }] =
    useMutation<ResetMutationType>(REQUEST_RESET_MUTATION);

  // TODO: validate input
  console.log({ data, loading, error });

  if (token && email) {
    return <NewPassword email={email as string} token={token as string} />;
  }

  if (userMail && data?.sendUserPasswordResetLink) {
    return <VerifyEmail email={userMail} />;
  }

  const handleSubmit = async (values: typeof initialValues) => {
    setUserMail(values.email);
    await resetPassword({
      variables: {
        email: values.email,
      },
    });
  };

  return (
    <div className="min-h-[550px] flex items-center justify-center">
      <div className="rounded-xl shadow-xl w-[500px] p-8">
        <div className="mb-12">
          <h2 className="flex items-center justify-center pb-8 text-4xl font-semibold text-center">
            <span>Reset Password</span> <FaKey size={20} className="ml-4" />
          </h2>
          <p className="text-2xl text-center">
            Please enter your email address below to reset your password
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="">
            <Input name="email" label="Email" />
            <Button
              title={loading ? 'Resetting the password...' : 'Reset Password'}
              className="w-full mt-8 justify-center"
              variant="primary"
              type="submit"
              size="lg"
              disabled={loading}
              iconClasses="animate-spin"
              Icon={loading ? BiLoader : undefined}
            />
          </Form>
        </Formik>
        <LinkComponent
          path="/login"
          title="Back to log in"
          className="flex items-center text-2xl justify-center mt-8 text-blue-500"
          Icon={TbArrowBack}
          iconPosition="start"
        />
      </div>
    </div>
  );
}
