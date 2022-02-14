import { Box, Text, Center, Flex, Image, Heading } from "@chakra-ui/react";
import Link from "@frontend/components/navigation/navlink";
// import LoginLogoutButton from "./LoginLogoutButton";
import LoginLogoutButton from "./login-logout-button";

export function Dashboard() {
    return (
        <Box>
            <Heading paddingTop={"20px"}>Welcome Patient Dazzup</Heading>

            <Center marginTop={"5%"}>
                <Flex flexWrap="wrap">
                    <Box boxShadow="dark-lg" p="6" rounded="md" bg="white" margin={"50px"} h={"300px"} w={"240px"}>
                        <Image src="https://imgur.com/DkXs8lt.png" />
                        <Link url="/patient/forms">
                            <Text _hover={{ color: "tomato" }} align={"center"}>
                                Forms
                            </Text>
                        </Link>
                    </Box>

                    <Box boxShadow="dark-lg" p="6" rounded="md" bg="white" margin={"50px"}>
                        <Link url="#">
                            <Image src="https://imgur.com/gycpeKh.png" />
                        </Link>
                        <Text align={"center"}>Messages</Text>
                    </Box>

                    <Box boxShadow="dark-lg" p="6" rounded="md" bg="white" margin={"50px"}>
                        <Link url="#">
                            <Image src="https://imgur.com/eRLbmpq.png" />
                        </Link>
                        <Text align={"center"}>Appointments</Text>
                    </Box>
                </Flex>
            </Center>
        </Box>
    );
}
