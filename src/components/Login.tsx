import { Formik, Form } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

import Button from './common/Button';
import Input from './common/Input';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

const Login = () => (
  <div>
    <h1 className="p-4 text-5xl text-gray-900 uppercase bg-gradient-to-r from-cyan to-teal">
      <Link href="/">Click To Buy</Link>
    </h1>
    <div className="rounded shadow">
      <h2>Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log({ values })}
      >
        <Form>
          <Input name="email" label="Email" placeholder="test@gmail.com" />
          <Input name="password" label="Password" placeholder="secret123" />
          <p>Forgot password?</p>
          <Button
            title="Sign in"
            className="border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20"
            type="submit"
            size="lg"
          />
        </Form>
        <p>Create account</p>
        <div>
          <p>Or sign in with</p>
          <div>
            <p>Google</p>
            <p>Facebook</p>
            <p>Twitter</p>
          </div>
        </div>
      </Formik>
    </div>
  </div>
);

export default Login;
