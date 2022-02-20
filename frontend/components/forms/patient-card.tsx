import { Text, Box, Heading, Flex, Divider } from "@chakra-ui/react";
import { CardPatientProps } from "@frontend/components/homepage/types/card";

export default function PatientCard({ label, temperature, weight, symptoms }: CardPatientProps) {
    return (
        <Box
            padding={"10px"}
            w={"25%"}
            border={"solid"}
            boxShadow="dark-lg"
            p="6"
            rounded="md"
            bg="white"
            margin={"10px"}>
            <Heading margin={"10px"}>{label}</Heading>
            <Divider orientation="horizontal" colorScheme={"blackAlpha"} />

            <Text margin={"10px"}>
                <Text fontWeight={"bold"}>Temperature: </Text>
                {temperature} °C
            </Text>
            <Text margin={"10px"}>
                <Text fontWeight={"bold"}>Weight: </Text>
                {weight} lbs
            </Text>
            <Text margin={"10px"}>
                <Text fontWeight={"bold"}>Symptoms: </Text>
                {symptoms}
            </Text>
        </Box>
    );
}
