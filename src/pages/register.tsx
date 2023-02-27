import { Formik, Form } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import * as Yup from 'yup';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Link from '@/components/common/Link';
import useAuth from '@/hooks/useAuth';

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

const RegisterPage = () => {
  const [error, setError] = useState<string | undefined>();

  const router = useRouter();
  const { register, login, registerLoading: loading } = useAuth();

  const handleSubmit = async (values: typeof initialValues) => {
    await Promise.all([
      await register({
        variables: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      }),
      await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      }),
    ]);

    // TODO: Handle errors

    // const errorMessage =
    //   registerError || response[0].data.message
    //     ? 'Sorry, this email is already taken'
    //     : undefined;

    // setError(errorMessage);

    // if (!errorMessage) {
    router.replace('/products').catch(console.log);
    // }
  };
  return (
    <>
      <Head>
        <title>ClickToBuy | Register</title>
      </Head>
      <div className="register-page min-h-[550px] flex items-center justify-center">
        <div className="rounded-xl shadow-xl w-[500px] p-8">
          <div className="register-header mb-12">
            <h2 className="pb-4 text-4xl font-semibold text-center">
              Register
            </h2>
            <p className="text-xl text-center">
              Create an account and start shopping 🛒
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="register-form">
              <Input name="username" label="Username" />
              <Input name="email" label="Email" error={error} />
              <Input name="password" label="Password" isPassword />
              <Button
                title={loading ? 'Signing up...' : 'Sign up'}
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
          <p className="mt-10 text-2xl text-center">
            Already have an account?{' '}
            <Link
              path="/login"
              title="Sign in instead"
              className="text-blue-500 text-2xl"
              iconPosition="start"
            />
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
    </>
  );
};

export default RegisterPage;
