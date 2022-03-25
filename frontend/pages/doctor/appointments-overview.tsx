import { Box, Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import NewAppointmentForm from "@frontend/components/forms/new-appointment-form";
import { BsCalendarPlus } from "react-icons/bs";
import PatientInfoModal from "@frontend/components/modal/modal";
import { getSession } from "next-auth/react";
import { Appointment } from "@frontend/models/appointment";
import { USER_ROLES } from "@frontend/utils/constants";
import { serverURL } from "@frontend/config";
export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    const userId = session?.user.AccountId;

    let appointmentList: Appointment[] = [];

    try {
        if (session?.user.Role === USER_ROLES.doctor) {
            const appointmentListResponse: any = await fetch(serverURL + "/doctors/getAppointments/" + userId);
            appointmentList = await appointmentListResponse.json();
        }
    } catch {}
    return {
        props: {
            session,
            appointmentList,
        },
    };
}
export default function AppointmentsOverview({ appointmentList }: { appointmentList: Appointment[] }) {
    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <Box m={10}>
            <Heading>Appointments</Heading>
            {JSON.stringify(appointmentList)}
            <Button variant="ghost" onClick={onOpen}>
                <BsCalendarPlus style={{ width: "25px", height: "25px" }} />
            </Button>
            <PatientInfoModal isOpen={isOpen} onClose={onClose}>
                <NewAppointmentForm />
            </PatientInfoModal>
        </Box>
    );
}
