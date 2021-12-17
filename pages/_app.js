import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import { Global, css } from '@emotion/core'

import '@/styles/globals.css'
import {ProvideAuth} from '@/lib/auth'
import theme from '@/styles/theme'

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ProvideAuth>
        <GlobalStyle/>
        <Component {...pageProps} />
      </ProvideAuth>
    </ThemeProvider>
  );
}

export default MyApp
