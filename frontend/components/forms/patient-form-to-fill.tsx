import { Box, Button, Heading } from "@chakra-ui/react";
import PatientInputs from "@frontend/components/inputs/patient-inputs"
import PatientTextarea from "@frontend/components/inputs/patient-textarea-input"


export default function PatientDetailsToProvideForm({ requiredDetails }: any) {
    return(
        <Box paddingLeft={"20px"}>
            <Heading size="lg">Your Doctor: Dr Sawkon Di Zenoots</Heading>
            <Heading size="lg">Today's Condition</Heading>
            <PatientInputs label="Temperature" units="°C" name={"temperature"}/>
            <PatientInputs label="Weight" units="lbs" name={"weight"}/>

            
            <PatientTextarea label="Symptoms" units="" name={"symptoms"}/>
            <Button colorScheme="pink" size="md" margin={"20px 0 0 20px"}>Submit</Button>
        </Box>
    );
}