import { Box, Image, Divider, Text, Flex } from "@chakra-ui/react";
import { Patient } from "@frontend/models/patient";
import PatientStatus from "./patient-status";

interface AppProps {
    patient: Patient;
}

export default function PatientInfoCard({ patient }: AppProps) {
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
            position="relative"
            _hover={{ cursor: "pointer", backgroundColor: "#fafafa" }}>
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
            <PatientStatus patient={patient}/>
            <Text color={"gray.500"} fontSize="xs" mt={2} bottom="10px" position="absolute">
                Last updated {patient.status.lastUpdated > 1 ? patient.status.lastUpdated.toFixed(0) : patient.status.lastUpdated.toFixed(1)} hrs ago
            </Text>
        </Box>
    );
}
