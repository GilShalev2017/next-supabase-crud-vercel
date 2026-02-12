// import { createGlobalStyle } from 'styled-components';

// export const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body {
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
//       'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
//       sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//     transition: background-color 0.3s ease, color 0.3s ease;
//   }

//   html, body {
//     height: 100%;
//   }

//   #root {
//     height: 100%;
//   }
// `;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.text};
    transition: all 0.3s;
  }
`;

export default GlobalStyle;