import { Box, Button, Flex, FormLabel, Heading, Input, Select, useToast } from "@chakra-ui/react";
import { serverURL } from "@frontend/config";
import { Appointment, APPOINTMENT_TIMESLOTS, DEFAULT_APPOINTMENT } from "@frontend/models/appointment";
import { PatientBasicInformation } from "@frontend/models/patient";
import { CSSProperties, useState } from "react";

export default function NewAppointmentForm({
    appointmentList,
    userId,
    patientList,
}: {
    appointmentList: Appointment[];
    userId: number;
    patientList: PatientBasicInformation[];
}) {
    const [appointment, setAppointment] = useState(DEFAULT_APPOINTMENT);
    const datePickerStyle: CSSProperties = { border: "1px solid #e6e6e6", padding: "5px 10px", borderRadius: "6px" };
    const today = new Date().toISOString().slice(0, 10);
    const toast = useToast();

    function selectPatient(patientId: string) {
        setAppointment({ ...appointment, patientId: parseInt(patientId) });
    }

    function pickDate(appointmentDate: string) {
        setAppointment({ ...appointment, date: appointmentDate });
    }

    function selectTime(time: string) {
        setAppointment({ ...appointment, time: time });
    }

    function disableOption(timeslot: string) {
        for (let i = 0; i < appointmentList.length; i++) {
            if (appointmentList[i].date === appointment.date && appointmentList[i].time === timeslot) {
                return true;
            }
        }
        return false;
    }

    async function scheduleAppointment() {
        if (appointment.time === "" || appointment.date === "" || appointment.patientId === 0) {
            toast({
                title: "Form incomplete! All fields need to be filled.",
                description: "Please enter the necessary information.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            await fetch(serverURL + "/doctors/makeAppointment/" + userId, {
                method: "POST",
                body: JSON.stringify(appointment),
                headers: { "Content-Type": "application/json" },
            }).then(res => {
                toast({
                    title: "Appointment set!",
                    description: "An email has been sent to your patient.",
                    status: "success",
                    isClosable: true,
                });
                window.location.reload();
            });
        }
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
                                {patient.firstName} {patient.lastName} ({patient.age} {patient.gender?.substring(0, 1)})
                            </option>
                        ))}
                    </Select>
                </Flex>
                <Flex my={3}>
                    <FormLabel fontSize="lg" htmlFor="apt-date">
                        Date & time:&emsp;
                    </FormLabel>
                    <Input
                        type="date"
                        name="apt-date"
                        onChange={e => pickDate(e.target.value)}
                        style={datePickerStyle}
                        min={today}
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
                            <option key={timeslot} value={timeslot} disabled={disableOption(timeslot)}>
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
