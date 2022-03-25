import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import NewAppointmentForm from "@frontend/components/forms/new-appointment-form";
import { BsCalendarPlus } from "react-icons/bs";
import PatientInfoModal from "@frontend/components/modal/modal";
import { getSession } from "next-auth/react";

export default function AppointmentsOverview() {
    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <Box m={10}>
            <Heading>Appointments</Heading>

            <Button variant="ghost" onClick={onOpen}>
                <BsCalendarPlus style={{ width: "25px", height: "25px" }} />
            </Button>
            <PatientInfoModal isOpen={isOpen} onClose={onClose}>
                <NewAppointmentForm />
            </PatientInfoModal>
        </Box>
    );
}
