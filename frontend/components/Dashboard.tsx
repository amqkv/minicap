import { Box, Text, Center, Flex, Image, Link } from "@chakra-ui/react";
// import LoginLogoutButton from "./LoginLogoutButton";
import LoginLogoutButton from "./login-logout-button";

export function Dashboard() {
  return (
    <Box>
      <Center marginTop={"10%"}>
        <Flex>
          <Box boxShadow="dark-lg" p="6" rounded="md" bg="white" margin={"50px"}>
            <Link href="#">
              <Image src="https://imgur.com/dLd1iAA.png" />
            </Link>
            <Text align={"center"}>Forms</Text>
          </Box>

          <Box boxShadow="dark-lg" p="6" rounded="md" bg="white" margin={"50px"}>
            <Link href="#">
              <Image src="https://imgur.com/dDfwcJ3.png" />
            </Link>
            <Text align={"center"}>Conversation</Text>
          </Box>

          <Box boxShadow="dark-lg" p="6" rounded="md" bg="white" margin={"50px"}>
            <Link href="#">
              <Image src="https://imgur.com/Ujgud3a.png" />
            </Link>
            <Text align={"center"}>Appointments</Text>
          </Box>
        </Flex>
      </Center>
      <LoginLogoutButton />
    </Box>
  );
}
