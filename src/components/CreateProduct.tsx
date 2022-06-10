import React from 'react';
import { FaPen } from 'react-icons/fa';
import styled from 'styled-components';

import Button from './common/Button';
import Input from './common/Input';

const FormStyles = styled.div`
  margin-top: 7rem;
  form {
    padding: 2rem;
    border: 1px solid var(--lightGray);
    border-radius: 0.8rem;
  }
`;

export default function CreateProduct() {
  return (
    <FormStyles>
      <form>
        <Input type="file" name="Image" />
        <Input name="John Doe" label="Name" />
        <Input name="$1000" label="Price" />
        <Input name="Nice shoes" label="Description" />
        <Button title="Create product" Icon={FaPen} />
      </form>
    </FormStyles>
  );
}
