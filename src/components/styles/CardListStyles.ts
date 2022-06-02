import styled from 'styled-components';

const CardListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  /* grid-auto-rows: 420px; */
  gap: 2rem;

  .card {
    border: 1px solid var(--lightGrey);
    border-radius: 1rem;
    position: relative;

    img {
      border-radius: 1rem;
      max-width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .description {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 1rem;

      a {
        font-size: 3rem;
        font-weight: 600;
        background: var(--linear);
        padding: 0.5rem 2rem;
        transform: skew(-4deg) rotate(-2deg);
        margin-top: -2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        text-align: center;

        &:hover {
          text-decoration: underline;
        }
      }

      .desc {
        font-size: 2rem;
        margin: 1rem 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        text-align: center;
      }

      .price {
        font-size: 2rem;
        background: var(--linear);
        padding: 0.5rem 1rem;
        transform: skew(-5deg) rotate(2deg);
        position: absolute;
        right: -1px;
        top: -1px;
        font-weight: 600;
      }
    }

    .buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
      grid-auto-rows: 50px;
      grid-gap: 1px;
      border-top: 1px solid var(--lightGray);

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        /* padding: 1.5rem 0; */

        span {
          margin-right: 1rem;
          font-size: 1.3rem;
        }
      }

      div + div {
        border-left: 1px solid var(--lightGray);
      }
    }
  }
`;

export default CardListStyles;
