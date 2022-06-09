import React from 'react';
import styled from 'styled-components';

import CardList from './CardList';
import Pagination from './Pagination';

const ProductsStyles = styled.div`
  /* margin: 3rem auto; */
`;

export default function Products() {
  return (
    <ProductsStyles>
      <CardList />
      <Pagination />
    </ProductsStyles>
  );
}
