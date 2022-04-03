import { Box, Flex, Heading, Divider, Image, Text } from "@chakra-ui/react";
import { PatientBasicInformation } from "@frontend/models/patient";

export default function PatientInformationModalBody({ patient }: { patient: PatientBasicInformation | null }) {
    if (!patient) return null;
    return (
        <>
            <Box>
                <Flex alignItems="center">
                    <Image src="https://i.imgur.com/oJpKCRk.png" alt="Red Person Image" width="20%" marginRight="5%" />
                    <Box>
                        <Heading>
                            {patient?.firstName} {patient?.lastName}
                        </Heading>
                        {patient?.gender && <Text fontSize="md">Gender: {patient?.gender}</Text>}
                        {patient?.dob && <Text fontSize="md">Date of birth: {patient?.dob}</Text>}
                        {/* <Text fontSize="md">Admitted on: TODO</Text> */}
                    </Box>
                </Flex>
            </Box>
            <Divider color="black" backgroundColor="black" height={"1px"} margin="5px 0" />
            <Box padding={"5px 0"}>
                <Heading as="h4" size="md" paddingBottom="5px">
                    More Information:
                </Heading>
                {patient?.address && patient?.city && patient?.postalCode && (
                    <Text fontSize="md" p="5px 0">
                        Address: {patient?.address} {", "}
                        {patient?.city} {patient?.postalCode}
                    </Text>
                )}
                {patient?.email && (
                    <Text fontSize="md" p="5px 0">
                        Email: {patient?.email}
                    </Text>
                )}
                {patient?.phoneNumber && (
                    <Text fontSize="md" p="5px 0">
                        Telephone: {patient?.phoneNumber}
                    </Text>
                )}
            </Box>
        </>
    );
}
