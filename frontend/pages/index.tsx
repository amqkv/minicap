import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import LoginLogoutButton from "@frontend/components/login-logout-button";
import { Box, Img, Flex, Heading } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async context => {
    return {
        props: {
            session: await getSession(context),
        },
    };
};

export default function Home() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                Signed in as {session.user.FirstName} <br />
                type: {session.user.Gender} <br />
                <LoginLogoutButton />
            </>
        );
    }
    return (
        <>
            <Flex
                padding={{ base: "5% 0%", md: "0 10%" }}
                flexDirection={{ base: "column", md: "row" }}
                alignItems="center">
                <Box
                    background="white.100"
                    w={{ base: "100%", md: "50%" }}
                    p={{ base: "15% 10%", md: "20px" }}
                    rounded={6}>
                    <Heading mb={8}>Some description</Heading>
                    <p>
                        Some more description here lmao badabing badaboom hehe hihi hoho Ideally long enough to take 3-4
                        lines like this So that it looks legit and better lololololololollolollololol
                    </p>
                    <LoginLogoutButton />
                </Box>

                <Box w="50%" h="100%" p="20px" display={{ base: "none", md: "initial" }}>
                    <Img src="https://imgur.com/omMyzrd.png" w="100%" h="100%" alt="Visitor picture" />
                </Box>
            </Flex>
        </>
    );
}
