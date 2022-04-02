import { Box, Button, Center, Flex, Heading, ListItem, UnorderedList, useDisclosure } from "@chakra-ui/react";
import Card from "./card";
import { links, link } from "@frontend/components/homepage/dashboard-structure";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import DashboardCharts from "@frontend/components/homepage/dashboard-charts";
import PatientInfoModal from "@frontend/components/modal/modal";

export default function Dashboard({
    data,
    stats,
    statusFilled,
    appointmentConfirmation,
}: {
    data: unknown[];
    stats: { unassignedPatientsCount: number; pendingCount: number };
    statusFilled: boolean;
    appointmentConfirmation: unknown[]; 
}) {
    const { data: session } = useSession();
    const userRole = session?.user?.Role;
    const userName = session?.user?.FirstName + " " + session?.user?.LastName;
    const { onOpen, isOpen, onClose } = useDisclosure();

    return (
        <>
            <Box>
                <Heading paddingLeft={"50px"}>
                    Welcome {userRole} {userName}
                </Heading>

                <Flex flexWrap={"wrap"}>
                    <Box flex="1">
                        {session?.user?.Role === USER_ROLES.patient && (
                            <Box margin={"20px 0px 30px 10%"}>
                                <Heading size={"lg"}>Announcement:</Heading>
                                <Flex>
                                    <Box flex="1">
                                        <UnorderedList marginTop={"20px"}>
                                            <ListItem>You have 0 new message.</ListItem>
                                            {!statusFilled && (
                                                <ListItem color="red">
                                                    You have not filled Today's status. Please fill it as soon as
                                                    possible.
                                                </ListItem>
                                            )}
                                            <ListItem>
                                                You can add or update today's status when clicking on forms.
                                            </ListItem>
                                            <ListItem>
                                                If you have tested positive for Covid-19, please consult quarantine
                                                information page for further instructions.
                                            </ListItem>
                                        </UnorderedList>
                                    </Box>
                                    <Box flex="1">
                                        <Heading size={'md'}>Your doctor has scheduled an appointment with you. Please confirm the appointment. </Heading>
                                        <Button onClick={onOpen} marginTop={"5px"}>Confirm Appointment</Button>
                                    </Box>
                                </Flex>
                            </Box>
                        )}

                        <Center>
                            <Flex flexWrap={"wrap"}>
                                <DashboardCharts role={userRole} data={data} stats={stats} />

                                {links.map(({ label, url, roleRequired, img }: link) => {
                                    const renderCard = roleRequired === userRole || !roleRequired;
                                    return renderCard && <Card key={label} label={label} image={img} url={url} />;
                                })}
                            </Flex>
                        </Center>
                    </Box>
                </Flex>
                {/* Appointment modal */}
                <PatientInfoModal isOpen={isOpen} onClose={onClose}>
                    <p> Hello </p>
                </PatientInfoModal>
            </Box>
        </>
    );
}
