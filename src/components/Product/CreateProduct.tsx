import { gql, useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import * as Yup from 'yup';

import Button from '../common/Button';
import Input from '../common/Input';

const initialValues = {
  image: '',
  name: '',
  price: '',
  description: '',
  stock: '',
};

const validationSchema = Yup.object().shape({
  image: Yup.mixed().required(),
  name: Yup.string().min(4).required(),
  price: Yup.number().integer().min(1).required(),
  description: Yup.string().min(10).required(),
  stock: Yup.string().min(1).required(),
});

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: String!
    $stock: Integer!
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        stock: $stock
      }
    ) {
      id
    }
  }
`;

export default function CreateProduct() {
  const [createProduct, { error, loading, data }] = useMutation(
    CREATE_PRODUCT_MUTATION
  );

  console.log({ error, loading, data });
  const handleSubmit = (values: typeof initialValues) => {
    console.log({ values });
    createProduct({
      variables: values,
    }).catch((err) => console.error(err));
  };

  return (
    <div className="min-h-[550px] flex items-center justify-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full max-w-screen-md p-8 border border-gray-300 rounded-xl">
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
              name="stock"
              type="number"
              label="Number In Stock"
              placeholder="5"
            />
            <Input
              name="description"
              label="Description"
              placeholder="Nice car"
            />
          </fieldset>
          <Button
            title="Create product"
            className="flex"
            variant="primary"
            type="submit"
            Icon={FaPlusCircle}
            iconPosition="start"
            size="lg"
          />
        </Form>
      </Formik>
    </div>
  );
}
