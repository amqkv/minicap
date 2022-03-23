import { Box, Heading } from "@chakra-ui/react";
import NewAppointmentForm from "@frontend/components/forms/new-appointment-form";

export default function AppointmentsOverview() {
    return (
        <Box m={10}>
            <Heading>Appointments</Heading>
            <Box m={10}>
                <NewAppointmentForm />
            </Box>
        </Box>
    );
}
