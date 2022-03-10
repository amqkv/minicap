import { Box, Flex, Heading, Divider, Image, Text } from "@chakra-ui/react";

export default function PatientInformationModalBody({ patient }: any) {
    return (
        <>
            <Box>
                <Flex alignItems="center">
                    <Image src="https://i.imgur.com/oJpKCRk.png" alt="Red Person Image" width="20%" marginRight="5%" />
                    <Box>
                        <Heading>
                            {patient?.firstName} {patient?.lastName}
                        </Heading>
                        <Text fontSize="md">Gender: {patient?.gender}</Text>
                        <Text fontSize="md">Date of birth: {patient?.dob}</Text>
                        {/* <Text fontSize="md">Admitted on: TODO</Text> */}
                    </Box>
                </Flex>
            </Box>
            <Divider color="black" backgroundColor="black" height={"1px"} margin="5px 0" />
            <Box padding={"5px 0"}>
                <Heading as="h4" size="md" paddingBottom="5px">
                    More Information:
                </Heading>
                <Text fontSize="md" p="5px 0">
                    Address: {patient?.address} {", "}
                    {patient?.city} {patient?.postalCode}
                </Text>
                <Text fontSize="md" p="5px 0">
                    Email: {patient?.email}
                </Text>
                <Text fontSize="md" p="5px 0">
                    Telephone: {patient?.phoneNumber}
                </Text>
            </Box>
        </>
    );
}
