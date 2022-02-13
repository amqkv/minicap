import { Box, Button, Heading } from "@chakra-ui/react";
import PatientInputs from "@frontend/components/inputs/patient-inputs"



export default function PatientDetailsToProvideForm({ requiredDetails }: any) {
    return(
        <Box>
            <Heading>Your Doctor: Dr Sawkon Di Zenoots</Heading>
            <Heading>Today's Condition</Heading>
            <PatientInputs label="Temperature" units="°C" name={"temperature"}/>
            <PatientInputs label="Weight" units="lbs" name={"weight"}/>
            <Button colorScheme="pink" size="xs">Submit</Button>
        </Box>
    );
}