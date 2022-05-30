import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    --header-height: 70px;
    --animation-duration: 0.3s;
    --linear: linear-gradient(90deg,#FB1834, #FB2B90);
    --linear1: linear-gradient(90deg,#02C5F5, #92FE9E);

    --red: #ff0000;
    --black: #393939;
    --gray: #3A3A3A;
    --grey: var(--gray);
    --lightGray: #e1e1e1;
    --lightGrey: var(--lightGray);
    --offWhite: #ededed;
    --maxWidth: 1000px;
    --bs: 0 12px 24px 0 rgba(0,0,0,0.09);

    --shipGray: #3E363F;

    font-size: 10px;
  }

  *,*::before,*::after {
    box-sizing: border-box;
  }

  body {
    color: var(--shipGray);
    margin: 0;
    padding: 0;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  /*
    7. Remove built-in form typography styles
  */
  input, button, textarea, select {
    font: inherit;
  }

  /*
    8. Avoid text overflows
  */

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  /*
    9. Create a root stacking context
  */

  #root, #__next {
    isolation: isolate;
  }

  a {
    text-decoration: none;
    color: var(--shipGray)
  }
`;

export default GlobalStyles;
