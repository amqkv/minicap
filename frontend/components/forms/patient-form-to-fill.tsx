import { Button, Box, Heading, Text } from "@chakra-ui/react";
import PatientInputs from "@frontend/components/inputs/patient-inputs";
import PatientTextarea from "@frontend/components/inputs/patient-textarea-input";
import { serverURL } from "@frontend/config/index";

export interface requiredDetails {
    Weight: boolean
    Symptoms: boolean
    Temperature: boolean
}

// fucntion to send data to backend
export async function onSave(requiredDetails: requiredDetails) {
    let patientID = 1;



}

export default function PatientDetailsToProvideForm({ requiredDetails }: { requiredDetails: requiredDetails }) {
    const { Temperature: temperature, Weight: weight, Symptoms: symptoms } = requiredDetails

    async function handlePatientForm(event: any) {
        event.preventDefault();
    }

    return (
        <>
            <Box paddingLeft={"20px"}>
                <Heading size="lg">Your Doctor: Dr Sawkon Di Zenoots</Heading>
                <Heading size="lg">Today's Condition</Heading>
                <Text></Text>
                <form onSubmit={handlePatientForm}>
                    {temperature && <PatientInputs label="Temperature" units="°C" name={"temperature"} />}
                    {weight && <PatientInputs label="Weight" units="lbs" name={"weight"} />}
                    {symptoms && <PatientTextarea label="Symptoms" units="" name={"symptoms"} />}


                    <Button colorScheme="pink" size="md" margin={"20px 0 0 20px"} onClick={() => onSave(requiredDetails)}>
                        Submit
                    </Button>
                </form>
            </Box>

        </>
    );
}
