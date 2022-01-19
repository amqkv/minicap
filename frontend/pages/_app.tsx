import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '@frontend/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // SessionProvider outside or ChakraProvider outside? 
  return (
  
  <SessionProvider session={session}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </SessionProvider>  

  );
}
