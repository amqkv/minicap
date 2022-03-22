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
} from "@chakra-ui/react";
import StandardInput from "@frontend/components/inputs/standard-input";
import TrackPatientForm from "@frontend/components/patient/tracking-patient-form-input";

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
    return (
        <Flex p={{ base: "0px", md: "50px" }} minWidth="100%">
            <Accordion defaultIndex={[0]} allowMultiple size="100%" defaultIsOpen>
                <AccordionItem >
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Person 1
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <form>
                            <Flex >
                                <TrackPatientForm />
                            </Flex>
                        </form>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex="1" textAlign="left">
                                Person 2
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <form>
                            <Flex>
                                <TrackPatientForm />
                            </Flex>
                        </form>
                    </AccordionPanel>
                </AccordionItem>
                <Flex marginTop="20px" alignItems={"center"} justifyContent={"center"}>
                    <Button
                        w="15%"
                        color={"white"}
                        backgroundColor={MAIN_COLOR}
                        _hover={{ opacity: "80%" }}
                        type="submit"
                        marginRight="15px">
                        Add User
                    </Button>
                    <Button
                        w="15%"
                        color={"white"}
                        backgroundColor={MAIN_COLOR}
                        _hover={{ opacity: "80%" }}
                        type="submit">
                        Submit Form
                    </Button>
                </Flex>
            </Accordion>
        </Flex>
    );
}
