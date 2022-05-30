/* eslint-disable */
import styled from 'styled-components';

const HeaderStyles = styled.header`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 2rem;
  height: var(--header-height);
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);

  .logo {
    background: var(--linear1);
    transform: skew(-10deg);
    font-size: 3rem;
    /* border-radius: 0.5rem; */
    margin: 0;

    a {
      color: var(--shipGray);
      padding: 1rem;
      text-transform: uppercase;
    }
  }

  .icons {
    display: flex;

    svg {
      cursor: pointer;

      &:first-child {
        margin-right: 2rem;
      }
    }
  }
`;

export default HeaderStyles;
