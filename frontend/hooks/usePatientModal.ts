import { useState } from "react";
import { PatientBasicInformation } from "@frontend/models/patient";
import { successfulToast, unsuccessfulToast } from "@frontend/utils/popups";
import { useDisclosure, useToast } from "@chakra-ui/react";

export default function usePatientModal(toastId: string | null) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPatient, setSelectedPatient] = useState<PatientBasicInformation | null>(null);
    const toast = useToast();

    function openModal(patient: PatientBasicInformation) {
        onOpen();
        setSelectedPatient(patient);
    }

    function modalClose() {
        onClose();
        toastId && toast.close(toastId);
    }

    // returning needed functions
    return {
        isOpen,
        modalClose,
        openModal,
        selectedPatient,
        setSelectedPatient,
        toast,
    };
}
