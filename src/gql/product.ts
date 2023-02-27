import { gql } from '@apollo/client';

export const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      description
      price
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int!, $take: Int!) {
    products(skip: $skip, take: $take) {
      id
      name
      description
      price
      stock
      status
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
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

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
    $stock: Int # $photo: Upload
  ) {
    updateProduct(
      where: { id: $id }
      data: {
        name: $name
        description: $description
        price: $price
        stock: $stock
        # photo: { create: { image: $photo, altText: $name } }
      }
    ) {
      __typename
      id
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(where: { id: $id }) {
      __typename
      id
    }
  }
`;
