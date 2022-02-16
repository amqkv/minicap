import { Box, Image, Flex, Modal, ModalContent, ModalOverlay, Text, Heading, Divider } from "@chakra-ui/react";
import PatientDetailsToProvideForm from "components/forms/patient-details-to-provide-form";
import { Patient } from "models/patient";
import PatientStatus from "./patient-status";

interface AppProps {
    isOpen: boolean;
    onClose: () => void;
    patient: Patient;
}

export default function PatientInfoModal({ isOpen, onClose, patient }: AppProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent p={1} px={5} pt={5}>
                <Flex>
                    <Box flex="1.5">
                        <Image
                            src="https://static.thenounproject.com/png/389195-200.png"
                            alt="Patient Picture"
                            boxSize="120px"
                            width="170px"
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
                        <Heading size="lg"> Desired Details</Heading>
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
                        <Heading size="md"> Details udpated {patient.status.lastUpdated > 1 ? patient.status.lastUpdated.toFixed(0) : patient.status.lastUpdated.toFixed(1)} hr(s) ago: </Heading>
                    </Box>
                    <PatientStatus patient={patient}/>
                </Box>
            </ModalContent>
        </Modal>
    );
}
