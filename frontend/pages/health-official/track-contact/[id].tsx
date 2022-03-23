import { NextPageContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { MAIN_COLOR, USER_ROLES } from "@frontend/utils/constants";
import Legend from "@frontend/components/legend";
import { Flex, Text, Box, Divider, Button } from "@chakra-ui/react";
import { PatientBasicInformation } from "@frontend/models/patient";
import Modal from "@frontend/components/modal/modal";
import useFilteredPatients from "@frontend/hooks/use-filtered-patients";
import usePatientModal from "@frontend/hooks/use-patient-modal";
import inputStyling from "@frontend/components/inputs/input-styling";
import PatientInformationModalBody from "@frontend/components/modal/patient-information-modal-body";
import FilteredPatients from "@frontend/components/patient/filtered-patients";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    const name = "fakeName";

    return {
        props: {
            contacts: [],
            session,
            pageId: "People in Contact with " + name,
        },
    };
}

const UserListPage = ({ patients }: { patients: PatientBasicInformation[] }) => {
    const { data: session } = useSession();
    const { isOpen, modalClose, openModal, selectedPatient } = usePatientModal({});
    const { sort, changeSort, ascending, filteredPatients, setSearchText, filterValue, filterKey, changeFilter } =
        useFilteredPatients(patients);

    const filteredPatientsListProps = {
        sort,
        changeSort,
        ascending,
        setSearchText,
        filterValue,
        filterKey,
        changeFilter,
        options: ["alphabetical"],
        legend: <Legend />,
    };

    async function handleInvalidContact() {
        console.log("hi");
    }

    async function handleSendEmail() {
        console.log("hi");
    }

    if (session?.user.Role === USER_ROLES.hOfficial) {
        return (
            <Box padding={{ base: " 5% 2%", md: "2% 15%" }}>
                <FilteredPatients {...filteredPatientsListProps}>
                    {filteredPatients.map((patient: PatientBasicInformation) => (
                        <Flex key={patient.id} {...inputStyling} onClick={() => openModal(patient)}>
                            <Text fontSize="2xl" flex={3}>
                                {patient.firstName} {patient.lastName}
                            </Text>
                        </Flex>
                    ))}
                </FilteredPatients>

                <Modal isOpen={isOpen} onClose={modalClose}>
                    <PatientInformationModalBody patient={selectedPatient} />
                    <Divider color="black" backgroundColor="black" height={"1px"} margin="5px 0" />
                    <Flex>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleInvalidContact}
                            background={MAIN_COLOR}
                            _hover={{ opacity: "90%" }}>
                            Invalid Contact
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleSendEmail}
                            background={MAIN_COLOR}
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

export default UserListPage;
