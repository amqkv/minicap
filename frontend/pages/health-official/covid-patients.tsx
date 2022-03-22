import List from "@frontend/components/admin/list";
import { NextPageContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { MAIN_COLOR, USER_ROLES } from "@frontend/utils/constants";
import Legend from "@frontend/components/legend";
import { serverURL } from "@frontend/config/index";
import { Flex, Text, Box, Input, Divider, Select, Button } from "@chakra-ui/react";
import Circle from "@frontend/components/circle";
import { PatientBasicInformation } from "@frontend/models/patient";
import Modal from "@frontend/components/modal/modal";
import { successfulToast, unsuccessfulToast } from "@frontend/utils/popups";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import useFilteredPatients from "@frontend/hooks/use-filtered-patients";
import usePatientModal from "@frontend/hooks/use-patient-modal";
import inputStyling from "@frontend/components/inputs/input-styling";
import changeCovidStatus from "@frontend/functions/change-patient-covid-status";
import PatientInformationModalBody from "@frontend/components/modal/patient-information-modal-body";

export async function getServerSideProps(context: NextPageContext) {
    const response = await fetch(serverURL + "/immigration-officer/findUsersStatus");
    const patients: PatientBasicInformation[] = await response.json();
    const session = await getSession(context);

    return {
        props: {
            patients,
            session,
            pageId: "Covid Patients List",
        },
    };
}
const toastId = "covid";

const buttonProps = {
    variant: "outline",
    size: "lg",
};

const CovidPatients = ({ patients }: { patients: PatientBasicInformation[] }) => {
    const { data: session } = useSession();
    const { isOpen, modalClose, openModal, selectedPatient, setSelectedPatient, toast } = usePatientModal({ toastId });
    const {
        changeSort,
        ascending,
        filteredPatients,
        positivesOnly,
        negativesOnly,
        searchText,
        setSearchText,
        positiveNegativeFilter,
    } = useFilteredPatients(patients);

    async function changeStatus() {
        const { hasCovid, firstName, lastName, id } = selectedPatient || {};
        const covidChange = !hasCovid;
        const { ok } = await changeCovidStatus(covidChange, id);
        if (ok) {
            setSelectedPatient({ ...selectedPatient, hasCovid: covidChange });
            patients.map(patient => {
                if (id === patient.id) patient.hasCovid = covidChange;
            });
        }
        const toastParameters = ok
            ? successfulToast({ firstName, lastName, covidChange })
            : unsuccessfulToast({ firstName, lastName, covidChange });

        toast.isActive(toastId) ? toast.update(toastId, toastParameters) : toast({ id: toastId, ...toastParameters });
    }

    if (session?.user.Role === USER_ROLES.hOfficial) {
        return (
            <Box padding={{ base: " 5% 0%", md: "0 15%" }}>
                {/* rendering the search bar */}
                <Flex
                    paddingBottom={{ base: "5px", md: "40px" }}
                    // justifyContent={"space-between"}
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
                            <Button {...buttonProps} onClick={() => changeSort("lastName")}>
                                Alphabetical
                                {ascending ? <ArrowUpIcon marginLeft="10px" /> : <ArrowDownIcon marginLeft="10px" />}
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
                    <Divider color="black" backgroundColor="black" height={"1px"} margin="5px 0" />
                    <Flex padding={"10px 0"} justifyContent="center">
                        <Text fontSize="md" p="5px 0" flex="1">
                            Current Covid Status:
                        </Text>
                        <Select
                            size="sm"
                            flex="1"
                            value={selectedPatient?.hasCovid?.toString()}
                            icon={<Circle color={selectedPatient?.hasCovid ? "red" : "green"} diameter={24} />}
                            onChange={changeStatus}>
                            <option value={true.toString()}>Positive</option>
                            <option value={false.toString()}>Negative</option>
                        </Select>
                    </Flex>
                </Modal>
            </Box>
        );
    }
    return <p>Access Denied</p>;
};

export default CovidPatients;
