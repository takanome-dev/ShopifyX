import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { SiDiscord } from 'react-icons/si';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import Button from '@/components/common/Button';
// import Input from '@/components/common/Input';
import { Label } from '@/components/ui/label';
import useAuth from '@/hooks/useAuth';
import { WithPageLayout } from '@/interfaces/with-page-layout';
import BlankLayout from '@/layouts/blank-layout';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

const LoginPage: WithPageLayout = () => {
  const [error, setError] = useState<string | undefined>();

  const router = useRouter();
  const { login, loginLoading: loading } = useAuth();

  const handleSubmit = async (values: typeof initialValues) => {
    const { data, errors } = await login({
      variables: {
        email: values.email,
        password: values.password,
      },
    });

    const errorMessage =
      errors ||
      // eslint-disable-next-line no-underscore-dangle
      data?.authenticateUserWithPassword?.__typename ===
        'UserAuthenticationWithPasswordFailure'
        ? 'Invalid email or password'
        : undefined;

    setError(errorMessage);

    if (!errorMessage) {
      router.replace('/products').catch(console.error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="login-page rounded-lg shadow-xl max-w-2xl p-8 border">
        <div className="login-header mb-10">
          <h2 className="pb-2 text-3xl font-semibold text-center">Sign In</h2>
          <p className="text-center">
            Sign in to your account and start shopping 🛒
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="login-form">
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
            {/* <Input name="email" label="Email" error={error} /> */}
            {/* <Input name="password" label="Password" isPassword /> */}
            <div className="my-4 text-right">
              <Link href="/reset-password" className="text-blue-500">
                Forgot password?
              </Link>
            </div>
            <Button
              className="mt-2 w-full font-bold text-lg shadow-md shadow-cyan-100"
              variant="primary"
            >
              Sign in
            </Button>
            {/* <Button
              title={loading ? 'Signing in...' : 'Sign in'}
              className="w-full justify-center mt-8"
              variant="primary"
              type="submit"
              size="lg"
              disabled={loading}
              iconClasses="animate-spin"
              Icon={loading ? BiLoader : undefined}
            /> */}
          </Form>
        </Formik>
        <p className="mt-6">
          New here?{' '}
          <Link href="/register" className="register-link text-blue-500">
            Create an account
          </Link>
        </p>
        <div className="relative flex flex-col items-center mt-4">
          {/* <p className="mb-4 bg-white px-4 before:content-[''] before:w-full before:h-1 before:bg-gray-200 before:absolute before:left-0 before:top-3 before:-z-10">
            or
          </p> */}
          <div className="relative flex w-full justify-center">
            <div className="absolute top-1/2 left-0 block h-[1px] w-full bg-slate-300" />
            <span className="z-50 bg-slate-50 px-2 text-center">or</span>
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
  );
};

LoginPage.PageLayout = BlankLayout;
export default LoginPage;
