import { useSession, getSession } from "next-auth/react";
import { MAIN_COLOR, USER_ROLES } from "@frontend/utils/constants";
import { requiredDetails, PatientsFormsToFill } from "@frontend/components/forms/types/types";

import PatientFormToFill from "@frontend/components/forms/patient-form-to-fill";
import { serverURL } from "@frontend/config/index";
import { NextPageContext } from "next";

import {
    Flex,
    Box,
    Img,
    Button,
    Heading,
    useToast,
    UseToastOptions,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Center,
    CloseButton,
} from "@chakra-ui/react";
import TrackPatientForm from "@frontend/components/patient/tracking-patient-form-input";
import React, { useState } from "react";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    const userId = session?.user.AccountId;

    return {
        props: {
            session,
            pageId: "People you've been in contact with",
        },
    };
}

export default function PositivePatientsTrackerForm() {
    const [components, setComponents] = useState([<TrackPatientForm />]);

    function addComponent() {
        setComponents([...components, <TrackPatientForm />]);
    }

    // ??? no clue how to remove a component
    function removeComponent() {}

    return (
        <Flex p={{ base: "0px", md: "50px" }} flexDirection="column">
            {components.map((item, i) => (
                <TrackPatientForm />
            ))}

            <Flex marginTop="20px" alignItems={"center"} justifyContent={"center"}>
                <Button
                    w="15%"
                    color={"white"}
                    backgroundColor={MAIN_COLOR}
                    _hover={{ opacity: "80%" }}
                    type="submit"
                    marginRight="15px"
                    onClick={addComponent}>
                    Add User
                </Button>
                <Button w="15%" color={"white"} backgroundColor={MAIN_COLOR} _hover={{ opacity: "80%" }} type="submit">
                    Submit Form
                </Button>
            </Flex>
        </Flex>
    );
}
