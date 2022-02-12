import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '@frontend/styles/globals.scss';
import { ChakraProvider } from '@chakra-ui/react';
import NavBar from '@frontend/components/navigation/NavBar';
import Footer from '@frontend/components/navigation/Footer';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // SessionProvider outside or ChakraProvider outside?
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
            <div id="App">
                <NavBar />
                <div id='PageContents'>
                    <Component {...pageProps} />
                </div>
                <Footer />
            </div>
      </ChakraProvider>
    </SessionProvider>
  );
}
