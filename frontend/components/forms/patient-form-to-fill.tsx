import { Button, Box, Heading, Text } from "@chakra-ui/react";
import PatientInputs from "@frontend/components/inputs/patient-inputs";
import PatientTextarea from "@frontend/components/inputs/patient-textarea-input";
import { statusFilled, StatusParameters } from "@frontend/functions/create-status";
import { useSession, getSession } from "next-auth/react";

export interface requiredDetails {
    Weight: boolean;
    Symptoms: boolean;
    Temperature: boolean;
}

export default function PatientDetailsToProvideForm({ requiredDetails }: { requiredDetails: requiredDetails }) {
    const { Temperature: temperature, Weight: weight, Symptoms: symptoms } = requiredDetails;
    const today = new Date().toISOString().slice(0, 10);
    const { data: session } = useSession();
    const userId = session?.user?.AccountId;
    //console.log(typeof(userId));

    // fucntion to send data to backend
    async function handlePatientForm(event: any) {
        event.preventDefault();

        const statusValues: StatusParameters = {
            accountId: userId,
            temperature: event.target[0].value,
            weight: event.target[1].value,
            symptoms: event.target[2].value,
            isReviewed: false,
            statusTime: today,
        };
        //TODO: validation for temperature and weight (must be integers)

        try {
            const response = await statusFilled(statusValues);

            if (response) {
                // change to another page function
                const data = await response.json();
            } else throw "Error";
        } catch (errr) {
            console.log("There was an error Teeeheee");
        }
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

                    <Button
                        colorScheme="pink"
                        size="md"
                        margin={"20px 0 0 20px"}
                        _hover={{ opacity: "80%" }}
                        type="submit">
                        Submit
                    </Button>
                </form>
            </Box>
        </>
    );
}
