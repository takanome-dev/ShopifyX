import styled from 'styled-components';

const HeaderStyles = styled.header`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 2rem;
  height: var(--header-height);
  ${({ changeColor }: { changeColor: boolean }) =>
    changeColor && 'box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);'}
  position: sticky;
  top: 0;
  background: ${({ changeColor }: { changeColor: boolean }) =>
    changeColor ? '#fff' : 'var(--linear)'};
  z-index: 2;

  .logo {
    background: ${({ changeColor }: { changeColor: boolean }) =>
      changeColor ? 'var(--linear)' : 'transparent'};
    transform: skew(-10deg);
    font-size: 3rem;
    margin: 0;

    a {
      color: var(--black);
      padding: 1rem;
      text-transform: uppercase;
    }

    @media (max-width: 400px) {
      font-size: 2rem;
    }
  }

  .nav {
    display: flex;
    justify-content: center;

    a {
      font-size: 2rem;
      margin: 2rem;
      position: relative;
      text-transform: uppercase;
      font-weight: 600;

      &:before {
        height: 3px;
        width: 0;
        content: '';
        background: ${({ changeColor }: { changeColor: boolean }) =>
          changeColor ? 'var(--linear)' : '#fff'};
        position: absolute;
        left: 0;
        transition: var(--animation-duration);
        margin-top: 2.7rem;
      }

      &:hover {
        &:before {
          width: 100%;
        }
      }
    }
  }

  .icons {
    display: flex;
    justify-self: flex-end;

    svg + svg {
      margin-left: 2rem;
    }

    svg {
      cursor: pointer;

      /* &:first-child {
        margin-right: 2rem;
      } */

      &:last-child {
        display: none;
      }
    }
  }

  @media screen and (max-width: 805px) {
    /* grid-template-columns: auto 1fr; */

    .nav {
      display: none;
    }

    .icons {
      svg {
        &:last-child {
          display: initial;
        }
      }
    }
  }
`;

export default HeaderStyles;
