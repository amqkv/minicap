import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AppProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function PatientInfoModal({ isOpen, onClose, children }: AppProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent p={1} px={5} pt={5} minW={{ base: "300", md: "600px" }}>
                {children}
            </ModalContent>
        </Modal>
    );
}
