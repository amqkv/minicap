import { StarIcon } from "@chakra-ui/icons";
import { Box, Badge, Image, Divider, Text, Flex, Heading } from "@chakra-ui/react";
import Patient from "@frontend/models/patient";

interface AppProps {
    patient: Patient;
}

export default function PatientInfoCard({ patient }: AppProps) {
    const status: { [key: string]: { value: string | number; unit: string } } = {
        weight: {
            value: patient.status.weight.value,
            unit: patient.status.weight.unit,
        },
        temperature: {
            value: patient.status.temperature.value,
            unit: patient.status.temperature.unit,
        },
        symptoms: {
            value: patient.status.symptoms.value,
            unit: patient.status.symptoms.unit,
        },
    };
    const requiredDetails: { [key: string]: boolean } = {
        weight: patient.requiredDetails.weight,
        temperature: patient.requiredDetails.temperature,
        symptoms: patient.requiredDetails.symptoms,
    };
    function clicked() {
        console.log(patient);
        console.log("status.weight.value", status.weight.value);
        console.log("patient.status", patient.status);
    }

    return (
        <Box
            maxW="sm"
            minH="250px"
            minW="400px"
            borderWidth="2px"
            borderRadius="lg"
            overflow="hidden"
            borderColor={!patient.isReviewed ? "red.100" : "gray.200"}
            shadow="md"
            mx={10}
            height="100%"
            px="6"
            py="4"
            position="relative">
            <Flex>
                <Box flex="1.7">
                    <Image
                        src="https://static.thenounproject.com/png/389195-200.png"
                        alt="Patient Picture"
                        boxSize="120px"
                        width="170px"
                    />
                </Box>
                <Box flex="2.3">
                    <Box fontWeight="semibold" isTruncated mx={2} mt="1">
                        <Text fontSize="xl">
                            {patient.basicInformation.firstName} {patient.basicInformation.lastName}
                        </Text>
                    </Box>
                    <Box display="flex" alignItems="baseline" mx={2}>
                        <Box color={"gray.500"} fontWeight="bold" letterSpacing="wide" fontSize="sm">
                            <Text textTransform="capitalize">
                                {patient.basicInformation.gender} ({patient.basicInformation.age})
                            </Text>
                            <Text>{patient.basicInformation.dob}</Text>
                            <Text>Height: {patient.basicInformation.height} cm</Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>

            <Divider mb={3} />
            <Box mx={2}>
                {Object.keys(patient.status).map(statusDetail =>
                    requiredDetails[statusDetail] ? (
                        <Text fontSize="sm">
                            <b>{statusDetail.charAt(0).toUpperCase() + statusDetail.slice(1)}: &nbsp;</b>
                            {status[statusDetail].value} {status[statusDetail].unit}
                        </Text>
                    ) : null
                )}
            </Box>
            {/* <button onClick={clicked}>click</button> */}
            <Text color={"gray.500"} fontSize="xs" mt={2} bottom="10px" position="absolute">
                Last updated {patient.status.lastUpdated} hrs ago
            </Text>
        </Box>
    );
}
