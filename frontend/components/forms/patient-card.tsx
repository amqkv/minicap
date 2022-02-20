import { Text, Box, Heading, Flex, Divider } from "@chakra-ui/react";
import { CardPatientProps } from "@frontend/components/homepage/types/card";

export default function PatientCard({ label, temperature, weight, symptoms }: CardPatientProps) {

    return (
        <Box
            padding={"10px"}
            //w={"25%"}
            border={"solid"}
            boxShadow="dark-lg"
            rounded="md"
            bg="white"
            margin={"10px"}
            minH={"20vh"}
            maxW={"400px"}
            >
                
            <Heading margin={"10px"}>{label}</Heading>
            <Divider colorScheme={"blackAlpha"} />

            <Box>
            <Text m={"10px"}>
                <b>Temperature: </b>
                {temperature} °C
            </Text>

            <Text m={"10px"}>
                <b>Weight: </b>
                {weight} lbs
            </Text>
            
            <Text m={"10px"}>
               <b>Symptoms: </b>
                {symptoms}
            </Text>
            </Box>
            

            
        </Box>
    );
}
