import { Box, Button, Modal, useDisclosure } from "@chakra-ui/react";

export default function PatientInfoModal(isOpen: boolean, onClose: () => void) {
    // const { isOpen, onClose } = useDisclosure();
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            hello
        </Modal>
    );
}
