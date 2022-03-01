import { Button, Box, Heading, UseToastOptions, useToast, SimpleGrid } from "@chakra-ui/react";
import PatientInputs from "@frontend/components/inputs/unit-input";
import PatientTextarea from "@frontend/components/inputs/patient-textarea-input";
import { pastConditionsProps, statusFilled, StatusParameters } from "@frontend/functions/create-status";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { allFieldsFilled, validIntegerField } from "@frontend/functions/validation";
import { patientSymptoms, registerIntegerErrorPopup } from "@frontend/utils/popups";
import PatientCard from "./patient-card";
import { useRouter } from "next/router";

export interface requiredDetails {
    Weight: boolean;
    Symptoms: boolean;
    Temperature: boolean;
}

export interface PatientsFormsToFill {
    requiredDetails: requiredDetails;
    pastConditions: pastConditionsProps[];
}

export default function PatientFormToFill({ requiredDetails, pastConditions }: PatientsFormsToFill) {
    const router = useRouter();
    const { Temperature: temperature, Weight: weight, Symptoms: symptoms } = requiredDetails;
    const [weightError, setWeightError] = useState(false);
    const [temperatureError, setTemperatureError] = useState(false);
    const toast = useToast();
    const callPopup = (props: UseToastOptions) => !toast.isActive("popup") && toast({ ...props, id: "popup" });

    const { data: session } = useSession();
    const userId = session?.user?.AccountId;

    // function to send data to backend and create new status
    async function handlePatientForm(event: any) {
        event.preventDefault();

        const time = moment().format("YYYY-MM-DD HH:mm:ss");
        let error = false;

        // initialize values for statusValues
        // TODO: decide on default value for weight
        const statusValues: StatusParameters = {
            accountId: userId,
            temperature: 37,
            weight: 181,
            symptoms: " ",
            isReviewed: false,
            statusTime: time,
        };

        // assigning values depending on what field is shown
        // for 3 checkbox
        if (requiredDetails.Temperature && requiredDetails.Weight && requiredDetails.Symptoms) {
            statusValues.temperature = event.target[0].value;
            statusValues.weight = event.target[1].value;
            statusValues.symptoms = event.target[2].value;
        }

        // for checkbox weight and symptoms
        else if (requiredDetails.Weight && requiredDetails.Symptoms) {
            statusValues.weight = event.target[0].value;
            statusValues.symptoms = event.target[1].value;
        }
        // for checkbox temperature and symptoms
        else if (requiredDetails.Temperature && requiredDetails.Symptoms) {
            statusValues.temperature = event.target[0].value;
            statusValues.symptoms = event.target[1].value;
        }
        // for checkbox temperature and weight
        else if (requiredDetails.Temperature && requiredDetails.Weight) {
            statusValues.temperature = event.target[0].value;
            statusValues.weight = event.target[1].value;
        }

        // for checkbox temperature ONLY
        else if (requiredDetails.Temperature) {
            statusValues.temperature = event.target[0].value;
        }

        // for checkbox weight ONLY
        else if (requiredDetails.Weight) {
            statusValues.weight = event.target[0].value;
        }

        // for checkbox symptoms ONLY
        else if (requiredDetails.Symptoms) {
            statusValues.symptoms = event.target[0].value;
        }


        // weight integer validation
        if (!validIntegerField(statusValues.weight)) {
            setWeightError(true);
            error = true;
        } else setWeightError(false);

        // temperature integer validation
        if (!validIntegerField(statusValues.temperature)) {
            setTemperatureError(true);
            error = true;
        } else setTemperatureError(false);

        // popup if error
        if (error) {
            callPopup(registerIntegerErrorPopup);
        } else if (!allFieldsFilled(statusValues)) {
            callPopup(patientSymptoms);
        } else {
            try {
                const response = await statusFilled(statusValues);

                if (response) {
                    // change to another page function
                    (await router.push("/")) && toast.closeAll();

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
                <Box w={{ base: "100%", md: "30%" }} paddingRight={"10px"}>
                    <form onSubmit={handlePatientForm}>
                        {temperature && (
                            <PatientInputs
                                error={temperatureError}
                                label="Temperature"
                                units="°C"
                                name={"temperature"}
                            />
                        )}
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

                <Heading margin={"30px"}>Previous Day's Conditions</Heading>

                <SimpleGrid minChildWidth="300px" rowGap={2} spacing={"20px"}>
                    {pastConditions.map(
                        ({
                            StatusTime: label,
                            Temperature: temperature,
                            Weight: weight,
                            Symptoms: symptoms,
                        }: pastConditionsProps) => {
                            label = label.substring(0, 10);

                            return (
                                <PatientCard
                                    key={label}
                                    label={label}
                                    temperature={temperature}
                                    weight={weight}
                                    symptoms={symptoms}
                                />
                            );
                        }
                    )}
                </SimpleGrid>
            </Box>
        </>
    );
}
