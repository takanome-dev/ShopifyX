import { useMutation } from '@apollo/client';
import { Formik, Form, useFormikContext, useFormik } from 'formik';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import ErrorMessage from '@/components/common/ErrorMessage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CREATE_PRODUCT_MUTATION } from '@/gql/product';
import { WithPageLayout } from '@/interfaces/with-page-layout';
import MainLayout from '@/layouts/main-layout';
import { fileToBase64 } from '@/utils/base64';
import formatMoney from '@/utils/formatMoney';

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

const SellPage: WithPageLayout = () => {
  const router = useRouter();
  const [createProduct, { error, loading }] =
    useMutation<CreateProductMutation>(CREATE_PRODUCT_MUTATION);

  // const handleSubmit = async (inputs: typeof initialValues) => {
  //   const res = await createProduct({
  //     variables: {
  //       name: inputs.name,
  //       description: inputs.description,
  //       price: +inputs.price,
  //       stock: +inputs.stock,
  //       photo: inputs.image,
  //     },
  //   });

  //   if (!error) {
  //     router
  //       .push(`/products/${res.data!.createProduct.id}`)
  //       .catch(console.error);
  //   }
  // };

  const { values, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (inputs: typeof initialValues) => {
      const res = await createProduct({
        variables: {
          name: inputs.name,
          description: inputs.description,
          price: +inputs.price,
          stock: +inputs.stock,
          photo: inputs.image,
        },
      });

      if (!error) {
        router
          .push(`/products/${res.data!.createProduct.id}`)
          .catch(console.error);
      }
    },
  });

  console.log({ values });

  return (
    <>
      <ErrorMessage error={error!} />
      <div className="flex justify-between mt-20">
        <form
          className="w-full p-8 border border-slate-200 rounded-lg max-w-3xl"
          onSubmit={handleSubmit}
        >
          <fieldset className="p-0 m-0 border-none disabled:opacity-50 disabled:pointer-events-none flex flex-col gap-4">
            <Label htmlFor="file" className="flex gap-4 items-center">
              <div className="w-36 h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                <Camera className="w-12 h-12 text-slate-400" />
                <Input name="image" type="file" id="file" className="hidden" />
              </div>
              <div>
                <Button variant="subtle">Browse</Button>
                <p className="mt-4">Choose a file in JPG or PNG format</p>
              </div>
            </Label>
            <div className="flex flex-col gap-2 mt-4">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" placeholder="Airmax..." />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <Input name="price" id="price" placeholder="$100" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="stock">Stock</Label>
              <Input name="stock" id="stock" placeholder="5" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Stock</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="A cool shoes..."
              />
            </div>
          </fieldset>
          <Button
            className="mt-6 w-full font-bold text-lg shadow-md shadow-cyan-100"
            variant="primary"
          >
            Create product
          </Button>
          {/* <Button
              title={loading ? 'creating product...' : 'Create product'}
              className="flex"
              variant="primary"
              type="submit"
              disabled={loading}
              iconClasses={loading ? 'animate-spin' : ''}
              Icon={loading ? BiLoader : FaPlusCircle}
              iconPosition={loading ? 'end' : 'start'}
              size="lg"
            /> */}
        </form>
        <div className="">
          <h2 className="text-xl text-slate-600 font-semibold">
            Product preview 📸
          </h2>
          <div className="border border-slate-200 rounded-lg p-4 mt-4 max-w-lg max-h-[450px] items-end">
            <div className="w-full">
              <Image
                src={
                  values.image
                    ? fileToBase64(values.image as any)
                    : 'https://res.cloudinary.com/wesbos/image/upload/v1579815920/sick-fits-keystone/5e2a13f0689b2835ae71d1a5.jpg'
                }
                // src="https://res.cloudinary.com/wesbos/image/upload/v1579815920/sick-fits-keystone/5e2a13f0689b2835ae71d1a5.jpg"
                alt="Preview Image"
                className="object-cover rounded-lg"
                width={400}
                height={400}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+yHgAFWAJp08sG7wAAAABJRU5ErkJggg=="
              />
            </div>
            <div className="flex flex-col px-4 mt-3">
              <h3 className="w-full mb-3 overflow-hidden text-3xl font-semibold text-ellipsis whitespace-nowrap">
                {values.name ?? ''}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold">
                  {formatMoney(Number(values.price) ?? 0)}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/assets/avatar.png" alt="User avatar" />
                  <AvatarFallback>N/A</AvatarFallback>
                </Avatar>
                <p className="flex flex-col">
                  <small className="text-slate-400 -mb-1">seller</small>
                  <span className="text-base text-blue-600">@takanome</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SellPage.PageLayout = MainLayout;
export default SellPage;
