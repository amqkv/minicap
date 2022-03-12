import List from "@frontend/components/admin/list";
import { NextPageContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import Legend from "@frontend/components/legend";
import { serverURL } from "@frontend/config/index";
import { Flex, Text, Box, Input, Button } from "@chakra-ui/react";
import Circle from "@frontend/components/circle";
import { PatientBasicInformation } from "@frontend/models/patient";
import Modal from "@frontend/components/modal/modal";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { MAIN_COLOR } from "@frontend/utils/constants";
import useFilteredPatients from "@frontend/hooks/use-filtered-patients";
import usePatientModal from "@frontend/hooks/usePatientModal";
import inputStyling from "@frontend/components/inputs/input-styling";
import PatientInformationModalBody from "@frontend/components/modal/patient-information-modal-body";

export async function getServerSideProps(context: NextPageContext) {
    const response = await fetch(serverURL + "/immigration-officer/findUsersStatus");
    const patients: PatientBasicInformation[] = await response.json();
    const session = await getSession(context);

    return {
        props: {
            patients,
            session,
            pageId: "Patients List ",
        },
    };
}

const buttonProps = {
    variant: "outline",
    size: "lg",
};

const UserListPage = ({ patients }: { patients: PatientBasicInformation[] }) => {
    const { data: session } = useSession();
    const {
        alphabeticalSort,
        setAlphabeticalSort,
        filteredPatients,
        positivesOnly,
        negativesOnly,
        searchText,
        setSearchText,
        positiveNegativeFilter,
    } = useFilteredPatients(patients);

    const { isOpen, modalClose, openModal, selectedPatient } = usePatientModal(null);

    if (session?.user.Role === USER_ROLES.iOfficer) {
        return (
            <Box padding={{ base: " 5% 0%", md: "0 15%" }}>
                {/* rendering the search bar */}
                <Flex
                    paddingBottom={{ base: "5px", md: "40px" }}
                    alignItems="center"
                    margin="auto"
                    flexDirection={{ base: "column", md: "row" }}>
                    <Box marginRight={{ base: "0px", md: "20px" }} flex="1">
                        <Input
                            placeholder={"Enter name or email"}
                            marginBottom="20px"
                            width="100%"
                            size="lg"
                            isInvalid
                            errorBorderColor="gray.400"
                            value={searchText}
                            onChange={event => setSearchText(event.target.value)}
                        />
                        {/* rendering three buttons for filtering and sorting */}
                        <Flex justifyContent="space-around" flexDirection={{ base: "column", md: "row" }}>
                            <Button
                                {...buttonProps}
                                onClick={() => positiveNegativeFilter(true)}
                                background={positivesOnly ? MAIN_COLOR : "white"}>
                                Positive <Circle color="red" diameter={24} style={{ marginLeft: "10px" }} />
                            </Button>
                            <Button
                                {...buttonProps}
                                onClick={() => positiveNegativeFilter(false)}
                                background={negativesOnly ? MAIN_COLOR : "white"}>
                                Negative <Circle color="green" diameter={24} style={{ marginLeft: "10px" }} />
                            </Button>
                            <Button {...buttonProps} onClick={() => setAlphabeticalSort(!alphabeticalSort)}>
                                Alphabetical
                                {alphabeticalSort ? (
                                    <ArrowUpIcon marginLeft="10px" />
                                ) : (
                                    <ArrowDownIcon marginLeft="10px" />
                                )}
                            </Button>
                        </Flex>
                    </Box>

                    {/* rendering the legend component */}
                    <Legend />
                </Flex>
                <Box margin="auto">
                    <List>
                        {filteredPatients.map((patient: PatientBasicInformation) => (
                            <Flex key={patient.id} {...inputStyling} onClick={() => openModal(patient)}>
                                {/* getting info from backend */}
                                <Text fontSize="2xl" flex={3}>
                                    {patient.firstName} {patient.lastName}
                                </Text>
                                <Box flex={3} />
                                {/* change the color so that it matches the patient state from the database */}
                                <Circle color={patient.hasCovid ? "red" : "green"} diameter={24} />
                            </Flex>
                        ))}
                    </List>
                </Box>

                <Modal isOpen={isOpen} onClose={modalClose}>
                    <PatientInformationModalBody patient={selectedPatient} />
                </Modal>
            </Box>
        );
    }
    return <p>Access Denied</p>;
};

export default UserListPage;
