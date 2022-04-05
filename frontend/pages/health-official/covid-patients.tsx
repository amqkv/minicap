import { NextPageContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import Legend from "@frontend/components/legend";
import { serverURL } from "@frontend/config/index";
import { Flex, Text, Box, Divider, Select } from "@chakra-ui/react";
import Circle from "@frontend/components/circle";
import { PatientBasicInformation, Patient_HealthOfficial } from "@frontend/models/patient";
import Modal from "@frontend/components/modal/modal";
import { successfulToast, unsuccessfulToast } from "@frontend/utils/popups";
import useFilteredPatients from "@frontend/hooks/use-filtered-patients";
import usePatientModal from "@frontend/hooks/use-patient-modal";
import inputStyling from "@frontend/components/inputs/input-styling";
import changeCovidStatus from "@frontend/functions/change-patient-covid-status";
import PatientInformationModalBody from "@frontend/components/modal/patient-information-modal-body";
import FilteredPatients from "@frontend/components/patient/filtered-patients";

export async function getServerSideProps(context: NextPageContext) {
    const response = await fetch(serverURL + "/health-official/findUserStatus");
    const patients: Patient_HealthOfficial[] = await response.json();
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

const CovidPatients = ({ patients }: { patients: Patient_HealthOfficial[] }) => {
    const { data: session } = useSession();
    const { isOpen, modalClose, openModal, selectedPatient, setSelectedPatient, toast } = usePatientModal({ toastId });
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
        options: ["alphabetical", "positive", "negative"],
        legend: <Legend />,
    };

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
            <Box padding={{ base: " 5% 2%", md: "2% 15%" }}>
                <FilteredPatients {...filteredPatientsListProps}>
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
                </FilteredPatients>

                <Modal isOpen={isOpen} onClose={modalClose}>
                    <PatientInformationModalBody patient={selectedPatient as Patient_HealthOfficial} />
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
