export interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  price: number;
  photo: string;
}

export interface InitialValues {
  image: string;
  name: string;
  price: number;
  description: string;
}
