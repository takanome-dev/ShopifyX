import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    --header-height: 70px;
    --animation-duration: 0.3s;
    /* --linear: linear-gradient(90deg,#FB1834, #FB2B90); */
    --red: #ff0000;
    --black: #3E363F;
    --gray: #3A3A3A;
    --grey: var(--gray);
    --lightGray: #e1e1e1;
    --lightGrey: var(--lightGray);
    --linear: linear-gradient(90deg,#02C5F5, #92FE9E);
    --offWhite: #ededed;
    --maxWidth: 1100px;
    /* --bs: 0 12px 24px 0 rgba(0,0,0,0.09); */
    --header-bs: 0 0 10px 2px rgba(0, 0, 0, 0.1);

    font-size: 10px;
  }

  *,*::before,*::after {
    box-sizing: border-box;
  }

  body {
    color: var(--black);
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
    margin: 0
  }

  /*
    9. Create a root stacking context
  */

  #root, #__next {
    isolation: isolate;
  }

  a {
    text-decoration: none;
    color: var(--black)
  }
`;

export default GlobalStyles;
