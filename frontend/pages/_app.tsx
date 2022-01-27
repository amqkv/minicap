import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "@frontend/styles/globals.scss";
import "@frontend/styles/doctor.scss";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "@frontend/components/NavBar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // SessionProvider outside or ChakraProvider outside?
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <NavBar />
        <Component {...pageProps}/>
      </ChakraProvider>
    </SessionProvider>
  );
}
