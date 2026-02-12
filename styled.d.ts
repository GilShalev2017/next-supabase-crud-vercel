// // styled.d.ts
// import 'styled-components';

// declare module 'styled-components' {
//   export interface DefaultTheme extends AppTheme {}  // import { AppTheme } from './layout' or wherever
// }

import 'styled-components';

// Augment / extend the DefaultTheme interface
declare module 'styled-components' {
  export interface DefaultTheme {
    bg: string;
    text: string;
    card: string;
    // ← add any other theme properties here in the future
  }
}