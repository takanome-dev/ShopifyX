export interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  price: number;
  stock: number;
  photo: Image;
  createdById: string;
  updatedAt: string;
  createdAt: string;
  orderStatus?: 'processing' | 'delivered' | 'failed';
}

export interface InitialValues {
  image: string;
  name: string;
  price: number;
  description: string;
}

export interface Image {
  id: string;
  image: {
    id: string;
    publicUrlTransformed: string;
    filename: string;
    originalFilename: string;
    mimetype: string;
    encoding: string;
    _meta: {
      public_id: string;
      version: number;
      signature: string;
      width: number;
      height: number;
      format: string;
      resource_type: string;
      created_at: string;
      // created_at: FieldTypeFunc<BaseListTypeInfo>;
      tags: string[];
      bytes: number;
      type: string;
      etag: string;
      placeholder: false;
      url: string;
      secure_url: string;
      original_filename: string;
    };
  };
}

export interface User {
  __typename?: string;
  username: string;
  email: string;
  password: string;
}
