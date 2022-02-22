import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    RadioGroup,
    Stack,
    Radio,
    Box,
    CloseButton,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { mutate } from "swr";
import classes from "./patient-modal.module.css";
import PatientInfoSimple from "@frontend/models/patient-info-simple";

interface appProps {
    doctorList: {
        firstName: string;
        lastName: string;
        doctorId: number;
        numberOfPatients: number;
    }[];
    patientInfo: PatientInfoSimple;
    isOpen: boolean;
    onClose: () => void;
    sessionId: number;
}

const PatientModal = ({ patientInfo, doctorList, isOpen, onClose, sessionId }: appProps) => {
    const [selectedDoctor, setSelectedDoctor] = useState(patientInfo.doctorId);

    const doctorSelectHandler = (event: string) => {
        setSelectedDoctor(Number(event));
    };

    const doctorSubmitHandler = async () => {
        await fetch("/api/admin/assign-patient-doctor", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                accountId: sessionId,
                patientId: patientInfo.patientId,
                doctor_doctorId: selectedDoctor,
            }),
        });
        // Call for other fetches with SWR to revalidate the data using this route
        onClose();
        mutate("/api/admin/patient-doctor");
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent maxW={"30rem"}>
                <ModalHeader px={6} paddingTop={4} paddingBottom={0}>
                    <Flex align="right" justify="right">
                        <CloseButton size="md" onClick={onClose} />
                    </Flex>

                    <p className={classes.modalHeader} id="patient-name">
                        {patientInfo.lastName}, {patientInfo.firstName}
                    </p>
                </ModalHeader>
                <ModalBody pt={0} alignSelf="baseline">
                    <Box my={1} className={classes.selectionFont}>
                        {" "}
                        Assign this patient to:
                    </Box>

                    <RadioGroup name="Doctor" my={2} value={selectedDoctor} onChange={doctorSelectHandler}>
                        <Stack direction={"column"} spacing={5} className={classes.roleFont} alignItems="baseline">
                            <Radio key={"0"} value={-1}>
                                Unassigned
                            </Radio>
                            {doctorList?.map(doc => (
                                <Radio key={doc.doctorId} value={doc.doctorId}>
                                    Dr {doc.firstName} {doc.lastName} ({doc.numberOfPatients})
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                        id="done-button"
                        backgroundColor={"#FF4545BD"}
                        className={classes.applyButton}
                        onClick={doctorSubmitHandler}>
                        <Box className={classes.buttonFont}>Done</Box>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PatientModal;
