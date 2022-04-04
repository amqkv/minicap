import React from "react";
import { NextPageContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { MAIN_COLOR, USER_ROLES } from "@frontend/utils/constants";
import { Flex, Text, Box, Divider, Button, useToast, UseToastOptions } from "@chakra-ui/react";
import { PatientBasicInformation } from "@frontend/models/patient";
import Modal from "@frontend/components/modal/modal";
import useFilteredPatients from "@frontend/hooks/use-filtered-patients";
import usePatientModal from "@frontend/hooks/use-patient-modal";
import inputStyling from "@frontend/components/inputs/input-styling";
import PatientInformationModalBody from "@frontend/components/modal/patient-information-modal-body";
import FilteredPatients from "@frontend/components/patient/filtered-patients";
import { serverURL } from "@frontend/config";
import {
    deleteTrackPersonFailure,
    deleteTrackPersonSuccess,
    sendEmailTrackPersonFailure,
    sendEmailTrackPersonSuccess,
} from "@frontend/utils/popups";
import deleteContactPerson from "@frontend/functions/delete-contact-person";
import sendEmailContactPerson from "@frontend/functions/send-email-contact-person";
import { ContactPerson } from "@frontend/components/patient/types/contact-person";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    const id = context.params.id;

    const contacts: PatientBasicInformation[] = await (
        await fetch(serverURL + "/contact-person/getTrackContactsId/" + id)
    ).json();

    const { firstName, lastName } = await (await fetch(serverURL + "/patients/getName/" + id)).json();

    return {
        props: {
            contacts,
            session,
            id,
            pageId: "People in Contact with " + firstName + " " + lastName,
        },
    };
}

const UserListPage = ({ contacts, id }: { contacts: PatientBasicInformation[]; id: number }) => {
    const { data: session } = useSession();
    const { isOpen, modalClose, openModal, selectedPatient } = usePatientModal({});
    const { sort, changeSort, ascending, filteredPatients, setSearchText, filterValue, filterKey, changeFilter } =
        useFilteredPatients(contacts);
    const toast = useToast();
    const callPopup = (props: UseToastOptions) => toast({ ...props, id: "popup" });

    const filteredPatientsListProps = {
        sort,
        changeSort,
        ascending,
        setSearchText,
        filterValue,
        filterKey,
        changeFilter,
        options: ["alphabetical"],
    };

    function handleDeleteUser() {
        const i = contacts.indexOf(selectedPatient as PatientBasicInformation);
        if (i > -1) {
            contacts.splice(i, 1);
            changeSort(sort);
        }
    }

    async function handleDeleteContact() {
        try {
            if (!toast.isActive("popup")) {
                const deleteSuccess = await deleteContactPerson(selectedPatient as ContactPerson, id);
                if (deleteSuccess) {
                    handleDeleteUser();
                    callPopup(deleteTrackPersonSuccess(selectedPatient?.firstName, selectedPatient?.lastName));
                    modalClose();
                } else {
                    throw "error";
                }
            }
        } catch {
            callPopup(deleteTrackPersonFailure(selectedPatient?.firstName, selectedPatient?.lastName));
        }
    }

    async function handleSendEmail() {
        try {
            if (!toast.isActive("popup")) {
                const sendEmailSucess = await sendEmailContactPerson(selectedPatient as ContactPerson, id);
                if (sendEmailSucess) {
                    handleDeleteUser();
                    callPopup(sendEmailTrackPersonSuccess(selectedPatient?.firstName, selectedPatient?.lastName));
                    modalClose();
                } else {
                }
            }
        } catch {
            callPopup(sendEmailTrackPersonFailure(selectedPatient?.firstName, selectedPatient?.lastName));
        }
    }

    if (session?.user.Role === USER_ROLES.hOfficial) {
        return (
            <Box padding={{ base: " 5% 2%", md: "2% 15%" }}>
                <FilteredPatients {...filteredPatientsListProps}>
                    {filteredPatients.map((patient: PatientBasicInformation, i: number) => (
                        <Flex key={i} {...inputStyling} onClick={() => openModal(patient)}>
                            <Text fontSize="2xl" flex={3}>
                                {patient.firstName} {patient.lastName}
                            </Text>
                        </Flex>
                    ))}
                </FilteredPatients>

                <Modal isOpen={isOpen} onClose={modalClose}>
                    <PatientInformationModalBody patient={selectedPatient} />
                    <Divider color="black" backgroundColor="black" height={"1px"} margin="5px 0" />
                    <Flex justifyContent={"space-between"} padding="5px 0" gap="15px">
                        <Button
                            variant="ghost"
                            onClick={handleDeleteContact}
                            background={MAIN_COLOR}
                            color="white"
                            flex={1}
                            _hover={{ opacity: "90%" }}>
                            Delete Contact
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={handleSendEmail}
                            background={MAIN_COLOR}
                            color="white"
                            flex={1}
                            _hover={{ opacity: "90%" }}>
                            Send Email
                        </Button>
                    </Flex>
                </Modal>
            </Box>
        );
    }
    return <p>Access Denied</p>;
};

export default React.memo(UserListPage);
