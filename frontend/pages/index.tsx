import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import LoginLogoutButton from "@frontend/components/login-logout-button";
import { Box, Img, Flex, Heading } from "@chakra-ui/react";
import Dashboard, { AppointmentInfo } from "@frontend/components/homepage/dashboard";
import { serverURL } from "@frontend/config";
import { USER_ROLES } from "@frontend/utils/constants";
import moment from "moment";
import VisitorPicture from "@frontend/utils/pictures/visitor.png";

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await getSession(context);
    const role = session?.user.Role;
    let data: unknown[] = [];
    const userId = session?.user.AccountId;
    let statusOfTheDay = [];
    let appointmentConfirmation = [];
    const today = moment().format().substring(0, 10);
    let statusFilled = true;
    let incomingAppointments = [];

    if (role === USER_ROLES.patient) {
        const response = await Promise.all([
            fetch(serverURL + "/status/getAllStatusChart/" + userId),
            fetch(serverURL + "/status/getAllStatus/" + userId),
            fetch(serverURL + "/patients/getAppointmentForPatients/" + userId),
            fetch(serverURL + "/patients/getConfirmedAppointments/" + userId),
        ]);
        const fetchData = await Promise.all([
            response[0].json(),
            response[1].json(),
            response[2].json(),
            response[3].json(),
        ]);
        data = fetchData[0];
        statusOfTheDay = fetchData[1];
        appointmentConfirmation = fetchData[2];
        incomingAppointments = fetchData[3];
        statusFilled = statusOfTheDay[0].StatusTime.substring(0, 10) === today;
    }

    let stats: { unassignedPatientsCount: number; pendingCount: number } = {
        unassignedPatientsCount: NaN,
        pendingCount: NaN,
    };

    if (role === USER_ROLES.iOfficer) {
        const response = await fetch(serverURL + "/immigration-officer/countUsersStatus");
        data = await response.json();
    }
    if (role === USER_ROLES.admin) {
        const response = await fetch(serverURL + "/admins/get-dashboard-stats");
        stats = await response.json();
    }

    return {
        props: {
            session,
            data,
            statusFilled,
            stats,
            appointmentConfirmation,
            incomingAppointments,
        },
    };
};

export default function Home({
    data,
    stats,
    statusFilled,
    appointmentConfirmation,
    incomingAppointments,
}: {
    data: unknown[];
    stats: { unassignedPatientsCount: number; pendingCount: number };
    statusFilled: boolean;
    appointmentConfirmation: AppointmentInfo[];
    incomingAppointments: AppointmentInfo[];
}) {
    const { data: session } = useSession();
    if (session) {
        return (
            <Dashboard
                data={data}
                stats={stats}
                statusFilled={statusFilled}
                appointmentConfirmation={appointmentConfirmation}
                incomingAppointments={incomingAppointments}
            />
        );
    }

    return (
        <Flex
            padding={{ base: "5% 0%", md: "0 10%" }}
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center">
            <Box background="white.100" w={{ base: "100%", md: "50%" }} p={{ base: "15% 10%", md: "20px" }} rounded={6}>
                <Heading mb={8}> Welcome to CoCo Tracker!</Heading>
                <p>
                    Within this application, you may track your current status or manage your appointments with your
                    doctor with ease! You can even commmunicate with them using our built-in messaging system. If you
                    are using this application as an official role such as a Doctor, Health Official, Immigration
                    Officier, or Administrator, then please receive confirmation from your organization after
                    signing-up. Thank you for choosing CoCo Tracker!
                </p>
                <LoginLogoutButton />
            </Box>

            <Box w="50%" h="100%" p="20px" display={{ base: "none", md: "initial" }}>
                <Img src="https://i.imgur.com/hyFbfVn.png" w="100%" h="100%" alt="Visitor picture" />
            </Box>
        </Flex>
    );
}
