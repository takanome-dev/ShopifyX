import { gql, useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import * as Yup from 'yup';

import Button from './common/Button';
import Input from './common/Input';
import Link from './common/Link';
import { User } from './types';

interface CreateUserMutation {
  createUser: Omit<User, 'password'>;
}

const initialValues = {
  username: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  username: Yup.string().min(4).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      data: { username: $username, email: $email, password: $password }
    ) {
      id
      username
      email
    }
  }
`;

const Register = () => {
  const router = useRouter();
  const [createUser, { loading, error }] =
    useMutation<CreateUserMutation>(CREATE_USER_MUTATION);

  if (error) {
    // TODO: add toast error message and handle input color
    console.log({ Error: error?.message });
  }

  const handleSubmit = async (values: typeof initialValues) => {
    await createUser({
      variables: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    });
    return router.replace('/products');
  };

  return (
    <div className="min-h-[550px] flex items-center justify-center">
      <div className="rounded-xl shadow-xl w-[500px] p-8">
        <div className="mb-12">
          <h2 className="pb-4 text-4xl font-semibold text-center">Register</h2>
          <p className="text-xl text-center">
            Create an account and start shopping 🛒
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="">
            <Input name="username" label="Username" />
            <Input name="email" label="Email" error={error?.message} />
            <Input name="password" label="Password" />
            <Button
              title="Sign up"
              className="w-full mt-8 border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20"
              type="submit"
              size="lg"
              disabled={loading}
            />
          </Form>
        </Formik>
        <p className="mt-10 text-2xl text-center">
          Already have an account?{' '}
          <Link path="/login" title="Sign in instead" />
        </p>
        <div className="relative flex flex-col items-center mt-8">
          <p className="mb-4 bg-white px-4 text-2xl before:content-[''] before:w-full before:h-1 before:bg-gray-200 before:absolute before:left-0 before:top-3 before:-z-10">
            or
          </p>
          <div className="flex gap-2">
            <span className="p-4 rounded-full cursor-pointer hover:bg-gray-200">
              <FaGoogle size={20} className="text-gray-700" />
            </span>
            <span className="p-4 rounded-full cursor-pointer hover:bg-gray-200">
              <FaGithub size={20} className="text-gray-700" />
            </span>
            <span className="p-4 rounded-full cursor-pointer hover:bg-gray-200">
              <FaTwitter size={20} className="text-gray-700" />
            </span>
            <span className="p-4 rounded-full cursor-pointer hover:bg-gray-200">
              <FaFacebook size={20} className="text-gray-700" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
