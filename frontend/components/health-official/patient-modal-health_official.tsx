import { Box, Flex, Heading, Divider, Image, Text, Center } from "@chakra-ui/react";
import PatientStatusSwiper from "../health-official/patient-status-swiper";
import { Patient_HealthOfficial } from "@frontend/models/patient";
import LineChart from "@frontend/components/line-chart";
import { formatPatientStatusData } from "@frontend/functions/data-transform-chart";

interface AppProps {
    patient: Patient_HealthOfficial;
}

export default function PatientInformationModalBody({ patient }: AppProps) {
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
                <Divider color="black" backgroundColor="black" height={"1px"} margin="5px 0" />

                <PatientStatusSwiper patient={patient} />

                <Center>
                    {patient.status.length !== 0 && (
                        <Box mt={4}>
                            <LineChart data={formatPatientStatusData(patient.status)} w={400} h={300} />
                        </Box>
                    )}
                </Center>
            </Box>
        </>
    );
}
