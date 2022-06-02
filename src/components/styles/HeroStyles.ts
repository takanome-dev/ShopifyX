import styled from 'styled-components';

const HeroStyles = styled.div`
  padding-top: 2rem;
  height: calc(100vh - var(--header-height));
  background: var(--linear);

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    place-items: center;
    max-width: var(--maxWidth);
    margin: 0 auto;
    padding: 0 2rem;
  }

  .desc {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h1 {
      font-size: 5rem;
      margin: 0;
    }

    p {
      font-size: 3rem;
    }

    button {
      border: 0;
      /* transition: background 0.3s ease-in-out; */

      /* &:hover {
        background: var(--linear);
        color: var(--black);
      } */
    }

    @media (max-width: 748px) {
      h1 {
        font-size: 3rem;
      }

      p {
        font-size: 2rem;
      }
    }
  }

  .product {
    img {
      width: 100%;
      object-fit: contain;
      @media (max-width: 748px) {
        width: 300px;
        height: 300px;
      }
    }
  }

  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
      grid-template-columns: 1fr;
    }

    .product {
      img {
        display: none;
      }
    }
  }
`;

export default HeroStyles;
