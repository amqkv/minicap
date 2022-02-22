import { Box, Flex, Divider, Heading, Text, Image } from "@chakra-ui/react";
import { Patient } from "@frontend/models/patient";
import PatientDetailsToProvideForm from "../forms/patient-details-to-provide-form";
import PatientStatus from "./patient-status";

export default function PatientInfoModalContent({ patient }: { patient: Patient }) {
    return (
        <Box>
            <Flex>
                <Box flex="1.5">
                    <Image
                        src="https://images-ext-2.discordapp.net/external/pTKakmU5qrrmG0himz_tGUYOY4uXKwtSFmck1JV1Vcs/https/i.imgur.com/oJpKCRk.png"
                        alt="Patient Picture"
                        boxSize="100px"
                        width="170px"
                        mb={3}
                    />
                </Box>
                <Box pl={2} flex="2.3">
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
            <Divider />
            <Box m="14px" className="section desired-details">
                <Box mb="10px" className="header">
                    <Heading size="md"> Desired Details</Heading>
                </Box>
                <Box>
                    <PatientDetailsToProvideForm
                        requiredDetails={patient.requiredDetails}
                        patientId={patient.patientId}
                    />
                </Box>
            </Box>
            <Divider />
            <Box m="14px" className="section desired-details">
                <Box mb="10px" className="header">
                    <Heading size="md">
                        {" "}
                        Details udpated{" "}
                        {patient.status[0].lastUpdated > 1
                            ? patient.status[0].lastUpdated.toFixed(0)
                            : patient.status[0].lastUpdated.toFixed(1)}{" "}
                        hr(s) ago:{" "}
                    </Heading>
                </Box>
                <PatientStatus patient={patient} />
            </Box>
        </Box>
    );
}
