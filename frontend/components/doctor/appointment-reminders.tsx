import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { Appointment, APPOINTMENT_STATUS, SECTION } from "@frontend/models/appointment";
import moment from "moment";

export default function AppointmentReminders({
    appointmentList,
    section,
}: {
    appointmentList: Appointment[];
    section: string;
}) {
    function borderColor(status: string) {
        switch (status) {
            case APPOINTMENT_STATUS.CONFIRMED:
                return "green.200";
            case APPOINTMENT_STATUS.PENDING:
                return "orange.200";
            case APPOINTMENT_STATUS.DECLINED:
                return "red.200";
        }
    }

    function dateDisplay(appointment: Appointment) {
        switch (appointment.date) {
            case moment().format("YYYY-MM-DD"):
                return "Today";
            case moment().add(1, "days").format("YYYY-MM-DD"):
                return "Tomorrow";
            case moment().add(-1, "days").format("YYYY-MM-DD"):
                return "Yesterday";
            default:
                return moment(appointment.date).format("ddd. MMMM DD");
        }
    }
    return (
        <Box mr={4}>
            {appointmentList.length ? (
                appointmentList.map(appointment => (
                    <Box
                        key={appointment.appointmentId}
                        borderWidth={2}
                        borderColor={section === SECTION.PAST ? "gray.200" : borderColor(appointment.status)}
                        my={2}
                        borderRadius={5}
                        py={2}
                        px={4}
                        fontSize="lg">
                        <Flex>
                            <Flex flex="1">
                                <Text>
                                    {appointment.firstName} {appointment.lastName}
                                </Text>
                                <Text ml={2} color="gray.500">
                                    {appointment.age}
                                    {appointment.gender.substring(0, 1)}
                                </Text>
                            </Flex>
                            <Text>
                                {dateDisplay(appointment)} / {appointment.time}
                            </Text>
                        </Flex>
                    </Box>
                ))
            ) : (
                <Center>
                    <Text fontSize="lg" mt={5} ml={2} color={"gray.500"}>
                        No appointments to show.
                    </Text>
                </Center>
            )}
        </Box>
    );
}
