import CardOrder from '@/components/order/card-order';
import { Product } from '@/interfaces/product';

const product1: Product = {
  id: '1',
  name: 'Yeti Hondo',
  description: 'Great shoes!',
  status: 'AVAILABLE',
  price: 3423,
  photo: {
    image: {
      publicUrlTransformed:
        'https://res.cloudinary.com/wesbos/image/upload/v1576791335/sick-fits-keystone/5dfbed262849d7961377c2c0.jpg',
    },
  },
  orderStatus: 'delivered',
  createdAt: '',
  updatedAt: '',
  createdById: '',
  stock: 1,
};
const product2: Product = {
  id: '1',
  name: 'Yeti Hondo',
  description: 'Great shoes!',
  status: 'AVAILABLE',
  price: 3423,
  photo: {
    image: {
      publicUrlTransformed:
        'https://res.cloudinary.com/wesbos/image/upload/v1576791335/sick-fits-keystone/5dfbed262849d7961377c2c0.jpg',
    },
  },
  orderStatus: 'delivered',
  createdAt: '',
  updatedAt: '',
  createdById: '',
  stock: 1,
};
const product3: Product = {
  id: '1',
  name: 'Yeti Hondo',
  description: 'Great shoes!',
  status: 'AVAILABLE',
  price: 3423,
  orderStatus: 'delivered',
  createdAt: '',
  updatedAt: '',
  createdById: '',
  stock: 1,
  photo: {
    image: {
      publicUrlTransformed:
        'https://res.cloudinary.com/wesbos/image/upload/v1576791335/sick-fits-keystone/5dfbed262849d7961377c2c0.jpg',
    },
  },
};

export default function OrderPage() {
  return (
    <div className="pt-5 pb-16">
      <h1 className="mb-4 text-5xl font-bold">Order History</h1>
      <p className="mb-8 text-2xl text-gray-500">
        Check status of recent orders, manage returns and discover similar
        products
      </p>
      <CardOrder product={product2} />
      <CardOrder product={product1} />
      <CardOrder product={product3} />
    </div>
  );
}
