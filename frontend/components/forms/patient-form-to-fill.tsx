import { Button, Box, Heading, Text, UseToastOptions, toast, useToast } from "@chakra-ui/react";
import PatientInputs from "@frontend/components/inputs/patient-inputs";
import PatientTextarea from "@frontend/components/inputs/patient-textarea-input";
import { statusFilled, StatusParameters } from "@frontend/functions/create-status";
import moment from "moment";
import { useSession, getSession } from "next-auth/react";
import { useState } from "react";
import {validIntegerField} from "@frontend/functions/validation";
import { registerIntegerErrorPopup } from "@frontend/utils/popups";

export interface requiredDetails {
    Weight: boolean;
    Symptoms: boolean;
    Temperature: boolean;
}

export default function PatientDetailsToProvideForm({ requiredDetails }: { requiredDetails: requiredDetails }) {
    const { Temperature: temperature, Weight: weight, Symptoms: symptoms } = requiredDetails;
    const [weightError, setWeightError] = useState(false);
    const [temperatureError, setTemperatureError] = useState(false);
    const toast = useToast();
    const callPopup = (props: UseToastOptions) => !toast.isActive('popup') && toast({ ...props, id: 'popup' });

    const { data: session } = useSession();
    const userId = session?.user?.AccountId;

    // fucntion to send data to backend
    async function handlePatientForm(event: any) {
        event.preventDefault();

        const time = moment().format("YYYY-MM-DD HH:mm:ss");
        const statusValues: StatusParameters = {
            accountId: userId,
            temperature: event.target[0].value,
            weight: event.target[1].value,
            symptoms: event.target[2].value,
            isReviewed: false,
            statusTime: time,
        };
        //TODO: validation for temperature and weight (must be integers)
        let error = false;
        if (!validIntegerField(statusValues.weight)) {
            setWeightError(true);
            error = true;
        } else setWeightError(false);

        if (!validIntegerField(statusValues.temperature)) {
            setTemperatureError(true);
            error = true;
        } else setTemperatureError(false);

        if (error) {
            callPopup(registerIntegerErrorPopup);
        } else {
            try {
                const response = await statusFilled(statusValues);
    
                if (response) {
                    // change to another page function
                    const data = await response.json();
                } else throw "Error";
            } catch (errr) {
                console.log("There was an error");
            }
        }

       
    }

    return (
        <>
            <Box paddingLeft={"20px"}>
                <Heading size="lg">Your Doctor: Dr Sawkon Di Zenoots</Heading>
                <Heading size="lg">Today's Condition</Heading>
                <form onSubmit={handlePatientForm}>
                    {temperature && <PatientInputs error={temperatureError} label="Temperature" units="°C" name={"temperature"} />}
                    {weight && <PatientInputs error={weightError} label="Weight" units="lbs" name={"weight"} />}
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
function callPopup(arg0: string) {
    throw new Error("Function not implemented.");
}

