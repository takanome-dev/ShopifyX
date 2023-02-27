import { gql, useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { BiLoader } from 'react-icons/bi';
import { FaPlusCircle } from 'react-icons/fa';
import * as Yup from 'yup';

import Button from '@/components/common/Button';
import ErrorMessage from '@/components/common/ErrorMessage';
import Input from '@/components/common/Input';

interface CreateProductMutation {
  createProduct: {
    id: string;
    __typename: string;
  };
}

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
    $price: Int!
    $stock: Int!
    $photo: Upload!
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        stock: $stock
        photo: { create: { image: $photo, altText: $name } }
      }
    ) {
      id
    }
  }
`;

export default function SellPage() {
  const router = useRouter();
  const [createProduct, { error, loading }] =
    useMutation<CreateProductMutation>(CREATE_PRODUCT_MUTATION);

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await createProduct({
      variables: {
        name: values.name,
        description: values.description,
        price: +values.price,
        stock: +values.stock,
        photo: values.image,
      },
    });

    if (!error) {
      router
        .push(`/products/${res.data!.createProduct.id}`)
        .catch(console.error);
    }
  };

  return (
    <>
      <ErrorMessage error={error!} />
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
              title={loading ? 'creating product...' : 'Create product'}
              className="flex"
              variant="primary"
              type="submit"
              disabled={loading}
              iconClasses={loading ? 'animate-spin' : ''}
              Icon={loading ? BiLoader : FaPlusCircle}
              iconPosition={loading ? 'end' : 'start'}
              size="lg"
            />
          </Form>
        </Formik>
      </div>
    </>
  );
}
