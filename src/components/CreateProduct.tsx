/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Formik, Form } from 'formik';
import React from 'react';
import { FaPen, FaPlusCircle } from 'react-icons/fa';
import * as Yup from 'yup';

import Button from './common/Button';
import Input from './common/Input';

const initialValues = {
  image: '',
  name: '',
  price: '',
  description: '',
};

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required(),
  name: Yup.string().min(4).required(),
  price: Yup.number().integer().min(1).required(),
  description: Yup.string().min(10).required(),
});

export default function CreateProduct() {
  return (
    <div className="pb-20">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log({ values })}
      >
        <Form className="p-8 border border-gray-300 mt-28 rounded-xl">
          <fieldset className="p-0 m-0 border-none disabled:opacity-50 disabled:pointer-events-none">
            <Input type="file" name="image" />
            <Input name="name" label="Name" placeholder="Car" />
            <Input
              name="price"
              type="number"
              label="Price"
              placeholder="10_000"
            />
            <Input
              name="description"
              label="Description"
              placeholder="Nice car"
            />
          </fieldset>
          <Button
            title="Create product"
            className="flex border-none shadow-md hover:opacity-80 bg-gradient-to-r from-cyan to-teal shadow-cyan2-500/20"
            type="submit"
            Icon={FaPlusCircle}
            iconPosition="left"
            size="lg"
          />
        </Form>
      </Formik>
    </div>
  );
}
