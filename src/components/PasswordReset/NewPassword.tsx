import { gql, useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import React from 'react';
import { FaKey } from 'react-icons/fa';
import { TbArrowBack } from 'react-icons/tb';
import * as Yup from 'yup';

import LinkComponent from '@components/common/Link';

import Button from '../common/Button';
import Input from '../common/Input';

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
  code: 'FAILURE' | 'TOKEN_EXPIRED' | 'TOKEN_REDEEMED';
  message: string;
}

interface Props {
  email: string;
  token: string;
}

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function NewPassword({ email, token }: Props) {
  const [reset, { data, loading, error }] =
    useMutation<RedeemUserPassword | null>(RESET_PASSWORD_MUTATION);

  console.log({ data, loading, error });

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
            <span>Set New Password</span> <FaKey size={20} className="ml-4" />
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
              title="Reset Password"
              className="w-full mt-8 justify-center"
              variant="primary"
              type="submit"
              size="lg"
            />
          </Form>
        </Formik>
        <LinkComponent
          path="/login"
          title="Back to log in"
          className="flex items-center justify-center mt-8 text-blue-500"
          Icon={TbArrowBack}
        />
      </div>
    </div>
  );
}
