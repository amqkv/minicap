import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex,Icon,Spacer,Text, useToast  } from "@chakra-ui/react";
import { serverURL } from "@frontend/config";

export interface appointmentFormat {
    appointmentId: number;
    date: string;
    time: string;
}

export default function ConfirmAppointment(appointment: appointmentFormat) {
    const toast = useToast();

    async function onConfirm() {
        let id = appointment.appointmentId
        fetch(serverURL + "/patients/appointmentConfirmation" , {
            method: "PATCH",
            body: JSON.stringify({ appointmentId:id, confirm:"confirmed"}),
            headers: { "Content-Type": "application/json" },
        })
        .then(res => {
            toast({
                title: "Appointment updated!",
                description: "You have confirmed the appointment with your doctor. If there is any issue, contact your doctor.",
                status: "success",
                duration: 10000,
                isClosable: true,
            });
            window.location.reload();
        })
        .catch(err => {
            toast({
                title: "Appointment update error!",
                description: "There was an issue. Try again.",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
            window.location.reload();
        })
    }

    async function onDecline() {
        let id = appointment.appointmentId
        fetch(serverURL + "/patients/appointmentConfirmation" , {
            method: "PATCH",
            body: JSON.stringify({ appointmentId:id, confirm:"declined"}),
            headers: { "Content-Type": "application/json" },
        })
        .then(res => {
            toast({
                title: "Appointment updated!",
                description: "You have confirmed the appointment with your doctor. If there is any issue, contact your doctor.",
                status: "success",
                duration: 10000,
                isClosable: true,
            });
            window.location.reload();
        })
        .catch(err => {
            toast({
                title: "Appointment update error!",
                description: "There was an issue. Try again.",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
            window.location.reload();
        })
    }
    
   const year = appointment.date ? appointment.date.substring(0,4) : '';
        const month = appointment.date ? appointment.date.substring(5,7): '';
        const  day = appointment.date ? appointment.date.substring(8,10): '';
        const newDate = new Date(+year, +month-1, +day);
        const date = newDate.toString().substring(4, 15);


    return (
        <Flex borderWidth={2} borderColor={"blue.200"} borderRadius={5} py={2} px={4} my={2} mr={4}>
            <Flex alignItems="center">
                <Text fontSize="md">
                    {date} from {appointment.time}
                </Text>
            </Flex>
            <Spacer />
            <Box>
                <Button mr="3" onClick={onConfirm}>
                    <Icon as={CheckIcon} color="green"></Icon>
                </Button>
            </Box>
            <Box>
                <Button onClick={onDecline}>
                    <Icon as={CloseIcon} color="red"></Icon>
                </Button>
            </Box>
        </Flex>
    );
}

