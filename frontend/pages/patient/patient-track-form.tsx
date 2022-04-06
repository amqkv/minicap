import { useSession, getSession } from "next-auth/react";
import { MAIN_COLOR, USER_ROLES } from "@frontend/utils/constants";
import { NextPageContext } from "next";

import {
    Flex,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    CloseButton,
    useToast,
    UseToastOptions,
} from "@chakra-ui/react";
import TrackPatientForm from "@frontend/components/patient/tracking-patient-form-input";
import React, { useState } from "react";
import { serverURL } from "@frontend/config";
import { ContactPerson } from "@frontend/components/patient/types/contact-person";
import postTrackContacts from "@frontend/functions/track-contacts";
import { trackPersonSuccess, trackPersonFailure } from "@frontend/utils/popups";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    const accountId = session?.user.AccountId;
    let hasCovid = false;

    try {
        hasCovid = await (await fetch(serverURL + "/patients/isPositive/" + accountId)).json();
    } catch {}

    return {
        props: {
            session,
            hasCovid,
            pageId: "People you've been in contact with",
        },
    };
}

export default function PositivePatientsTrackerForm({ hasCovid }: { hasCovid: boolean }) {
    const { data: session } = useSession();
    const [accordionIndex, setAccordionIndex] = useState(0);

    const [formValues, setFormValues] = useState([
        { firstName: "", lastName: "", email: "", phoneNumber: "", dateOfContact: "" },
    ]);
    const toast = useToast();
    const callPopup = (props: UseToastOptions) => toast({ ...props, id: "popup" });

    const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newFormValues = [...formValues];
        newFormValues[i][e.target.name as keyof ContactPerson] = e.target.value;
        setFormValues(newFormValues);
    };

    // adding new line for user to input a new user
    const addFormFields = () => {
        setFormValues([...formValues, { firstName: "", lastName: "", email: "", phoneNumber: "", dateOfContact: "" }]);
        setAccordionIndex(formValues.length);
    };

    // remove a line for user to input information
    const removeFormFields = (i: number) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
        setAccordionIndex(formValues.length);
    };

    const handleSubmit = async () => {
        try {
            if (!toast.isActive("popup")) {
                const success = await postTrackContacts(formValues, session?.user.AccountId);
                if (success) {
                    setFormValues([]); // clears form data
                    callPopup(trackPersonSuccess);
                } else {
                    throw "error";
                }
            }
        } catch {
            callPopup(trackPersonFailure);
        }
    };

    if (session?.user.Role === USER_ROLES.patient && hasCovid) {
        return (
            <Flex p={{ base: "15px 0", md: "50px" }} flexDirection="column" position="relative">
                <Accordion allowToggle index={accordionIndex} onChange={e => setAccordionIndex(e as number)}>
                    {formValues.map((item, index) => (
                        <AccordionItem key={index} allowToggle>
                            <h2>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                        {item.firstName + " " + item.lastName}
                                    </Box>
                                    <AccordionIcon />
                                    <CloseButton marginLeft="15px" onClick={() => removeFormFields(index)} />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <TrackPatientForm key={index} onChange={handleChange} index={index} values={item} />
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
                <Flex marginTop="20px" alignItems={"flex-end"} justifyContent={"center"}>
                    <Button
                        inputProps={{ flex: 1 }}
                        color={"white"}
                        backgroundColor={MAIN_COLOR}
                        _hover={{ opacity: "80%" }}
                        type="submit"
                        marginRight="15px"
                        onClick={addFormFields}>
                        Add User
                    </Button>
                    <Button
                        inputProps={{ flex: 1 }}
                        color={"white"}
                        backgroundColor={MAIN_COLOR}
                        _hover={{ opacity: "80%" }}
                        onClick={handleSubmit}>
                        Submit Form
                    </Button>
                </Flex>
            </Flex>
        );
    }

    return <p>Access Denied</p>;
}
