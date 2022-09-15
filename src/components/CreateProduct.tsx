/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Formik, Form } from 'formik';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import styled from 'styled-components';
import * as Yup from 'yup';

import Button from './common/Button';
import Input from './common/Input';

const FormStyles = styled(Form)`
  margin-top: 7rem;
  padding: 2rem;
  border: 1px solid var(--lightGray);
  border-radius: 0.8rem;
`;

const initialValues = {
  image: '',
  name: '',
  price: '',
  description: '',
};

const validationSchema = Yup.object().shape({
  image: Yup.string().required(),
  name: Yup.string().min(4).required(),
  price: Yup.number().integer('price must be a "number"').min(1).required(),
  description: Yup.string().min(10).required(),
});

export default function CreateProduct() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log({ values })}
    >
      <FormStyles>
        <Input type="file" name="image" />
        <Input name="name" label="Name" />
        <Input name="price" type="text" label="Price" />
        <Input name="description" label="Description" />
        <Button title="Create product" type="submit" Icon={FaPen} />
      </FormStyles>
    </Formik>
  );
}
