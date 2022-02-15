import { Box, Text, Center, Flex, Image, Heading } from "@chakra-ui/react";
import { Card } from "./card";

export function Dashboard() {
    return (
        <Box>
            {/* TODO add patients name in heading */}
            <Heading paddingLeft={"50px"}>Welcome Patient Dazzup</Heading>

            <Center marginTop={"5%"}>
                <Flex flexWrap="wrap">
                    <Card label="Forms" image="https://imgur.com/DkXs8lt.png" url="/patient/forms"/>
                    {/* TODO add links to paths to messages and Appointments */}
                    <Card label="Messages" image="https://imgur.com/gycpeKh.png" url="#"/>
                    <Card label="Appointments" image="https://imgur.com/eRLbmpq.png" url="#"/>
                </Flex>
            </Center>
        </Box>
    );
}
