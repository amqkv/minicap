import { Box, Button, Flex, FormLabel, Heading, Select, Text, useToast } from "@chakra-ui/react";
import { APPOINTMENT_TIMESLOTS } from "@frontend/models/appointment";
import { CSSProperties, useState } from "react";
const patientList = [
    { patientId: 1, firstName: "Peppa", lastName: "Pig", age: "39", gender: "Male" },
    { patientId: 2, firstName: "Dwayne", lastName: "The Rock", age: "52", gender: "Male" },
];

const defaultAppointmnent = { patientId: 0, date: "", time: "" };
export default function NewAppointmentForm() {
    const [appointment, setAppointment] = useState(defaultAppointmnent);
    const today = new Date().toISOString().slice(0, 10);
    const datePickerStyle: CSSProperties = { border: "1px solid #e6e6e6", padding: "5px 10px", borderRadius: "6px" };
    const toast = useToast();
    function selectPatient(patientId: string) {
        setAppointment({ ...appointment, patientId: parseInt(patientId) });
        console.log(patientId);
    }

    function pickDate(appointmentDate: string) {
        setAppointment({ ...appointment, date: appointmentDate });
        console.log(appointmentDate);
    }
    function selectTime(time: string) {
        setAppointment({ ...appointment, time: time });
        console.log(time);
    }
    function scheduleAppointment() {
        if (appointment.patientId === 0 || appointment.date === "" || appointment.time === "") {
            toast({
                title: "Form incomplete! All fields need to be filled.",
                description: "Please enter the necessary information.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        console.log(appointment);
    }

    return (
        <Box mb={6} mt={2} mx={4}>
            <Heading size="lg">New appointment</Heading>
            <Box>
                <Flex my={3}>
                    <FormLabel htmlFor="patient-name" fontSize="lg">
                        Patient name:
                    </FormLabel>

                    <Select
                        flex="3.65"
                        placeholder="Patient name"
                        name="patient-name"
                        onChange={e => selectPatient(e.target.value)}>
                        {patientList.map(patient => (
                            <option key={`patient-${patient.patientId}`} value={patient.patientId}>
                                {patient.firstName} {patient.lastName} ({patient.age} {patient.gender.substring(0, 1)})
                            </option>
                        ))}
                    </Select>
                </Flex>
                <Flex my={3}>
                    <FormLabel fontSize="lg" htmlFor="apt-date">
                        Date & time:&emsp;
                    </FormLabel>
                    <input
                        type="date"
                        name="apt-date"
                        onChange={e => pickDate(e.target.value)}
                        style={datePickerStyle}
                    />
                    <FormLabel mx={3} fontSize="lg" htmlFor="apt-time">
                        at
                    </FormLabel>
                    <Select
                        flex="3.65"
                        placeholder="Pick a time"
                        name="apt-time"
                        maxWidth={150}
                        onChange={e => selectTime(e.target.value)}>
                        {APPOINTMENT_TIMESLOTS.map(timeslot => (
                            <option key={timeslot} value={timeslot}>
                                {timeslot}
                            </option>
                        ))}
                    </Select>
                </Flex>
                <Flex justifyContent="flex-end">
                    <Button onClick={scheduleAppointment} colorScheme="red">
                        Schedule
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}
