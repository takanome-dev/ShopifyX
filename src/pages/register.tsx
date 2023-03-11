import { Formik, Form } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiDiscord } from 'react-icons/si';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuth from '@/hooks/useAuth';
import { WithPageLayout } from '@/interfaces/with-page-layout';
import BlankLayout from '@/layouts/blank-layout';
// import Button from '@/components/common/Button';
// import Input from '@/components/common/Input';

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

const RegisterPage: WithPageLayout = () => {
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
      <div className="register-page flex items-center justify-center">
        <div className="rounded-lg shadow-xl max-w-2xl p-8">
          <div className="register-header mb-10">
            <h2 className="pb-2 text-3xl font-semibold text-center">
              Register
            </h2>
            <p className="text-center">
              Create an account and start shopping 🛒
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="register-form">
              <div className="flex flex-col gap-2 mt-4">
                <Label htmlFor="username">Email</Label>
                <Input name="username" id="username" placeholder="hello" />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="hell@example.com"
                />
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="supersecret"
                />
              </div>
              <Button
                className="mt-4 w-full font-bold text-lg shadow-md shadow-cyan-100"
                variant="primary"
              >
                Sign up
              </Button>
              {/* <Button
                title={loading ? 'Signing up...' : 'Sign up'}
                className="w-full mt-8 justify-center"
                variant="primary"
                type="submit"
                size="lg"
                disabled={loading}
                iconClasses="animate-spin"
                Icon={loading ? BiLoader : undefined}
              /> */}
            </Form>
          </Formik>
          <p className="mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500">
              Sign in instead
            </Link>
          </p>
          <div className="relative flex flex-col items-center mt-4">
            {/* <p className="mb-4 bg-white px-4 before:content-[''] before:w-full before:h-1 before:bg-gray-200 before:absolute before:left-0 before:top-3 before:-z-10">
            or
          </p> */}
            <div className="relative flex w-full justify-center">
              <div className="absolute top-1/2 left-0 block h-[1px] w-full bg-slate-300" />
              <span className="z-50 bg-white px-2 text-center">or</span>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="ghost" size="sm" className="h-10">
                <FcGoogle size={24} className="" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 ">
                <FaGithub size={24} className="" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10">
                <SiDiscord size={24} className="text-[#5865F2]" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

RegisterPage.PageLayout = BlankLayout;
export default RegisterPage;
