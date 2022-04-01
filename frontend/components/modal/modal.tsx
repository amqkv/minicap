import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AppProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function PatientInfoModal({ isOpen, onClose, children }: AppProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent p={1} px={5} pt={5} width={{ md: "600px", base: "100vw" }}>
                {children}
            </ModalContent>
        </Modal>
    );
}

