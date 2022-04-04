import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "@frontend/styles/globals.scss";
import { ChakraProvider, Heading, Flex } from "@chakra-ui/react";
import NavBar from "@frontend/components/navigation/navbar";
import Footer from "@frontend/components/navigation/footer";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    // SessionProvider outside or ChakraProvider outside?
    let pageTitle = pageProps.pageId; // To distinguish between tab name and page title. Only using pageId results in the homepage displaying the title above the welcome message.
    if (!pageTitle) {
        pageTitle = "CoCo Tracker";
    }
    return (
        <SessionProvider session={session}>
            <ChakraProvider>
                <div id="App">
                    <title>{pageTitle}</title>
                    <NavBar />
                    <div id="PageContents">
                        {/* we do not use pageTitle here so that if not pageId is set, nothing is displayed. */}
                        <Flex flexWrap={"wrap"} ml={"5vh"} mr={"5vh"}>
                            <Heading>{pageProps.pageId}</Heading>
                        </Flex>
                        <Component {...pageProps} />
                    </div>
                    <Footer />
                </div>
            </ChakraProvider>
        </SessionProvider>
    );
}
