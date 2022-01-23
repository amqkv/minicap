import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import LoginLogoutButton from "@frontend/components/LoginLogoutButton";
import { Flex, Heading, Container } from "@chakra-ui/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
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
        Signed in as {session.user.name} <br />
        type: {session.user.type} <br />
        <LoginLogoutButton />
      </>
    );
  }
  return (

    <>
      <Flex position={"relative"} width={"50%"} height={"100%"}>
        <Container>
          TODO
        </Container>
      </Flex>

      <Flex
        width={"50%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
      >
        <Flex direction="column" background="gray.100" p={20} rounded={6}>
          <Heading mb={6}>Login to your account</Heading>

          <LoginLogoutButton />
        </Flex>
      </Flex>
    </>
  );
}
