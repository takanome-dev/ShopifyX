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
    changeColor ? '#fff' : 'var(--linear1)'};

  .logo {
    background: ${({ changeColor }: { changeColor: boolean }) =>
      changeColor ? 'var(--linear1)' : 'transparent'};
    transform: skew(-10deg);
    font-size: 3rem;
    margin: 0;

    a {
      color: var(--shipGray);
      padding: 1rem;
      text-transform: uppercase;
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
          changeColor ? 'var(--linear1)' : '#fff'};
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

    svg {
      cursor: pointer;

      &:first-child {
        margin-right: 2rem;
      }
    }
  }
`;

export default HeaderStyles;
