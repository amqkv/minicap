import { NextPageContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import Legend from "@frontend/components/legend";
import { serverURL } from "@frontend/config/index";
import { Flex, Text, Box } from "@chakra-ui/react";
import Circle from "@frontend/components/circle";
import { PatientBasicInformation } from "@frontend/models/patient";
import Modal from "@frontend/components/modal/modal";
import useFilteredPatients from "@frontend/hooks/use-filtered-patients";
import usePatientModal from "@frontend/hooks/use-patient-modal";
import inputStyling from "@frontend/components/inputs/input-styling";
import PatientInformationModalBody from "@frontend/components/modal/patient-information-modal-body";
import FilteredPatients from "@frontend/components/patient/filtered-patients";

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
        placeholder: "Enter a name or an email",
        options: ["alphabetical", "positive", "negative"],
        legend: <Legend />,
    };

    if (session?.user.Role === USER_ROLES.iOfficer) {
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
                    <PatientInformationModalBody patient={selectedPatient} />
                </Modal>
            </Box>
        );
    }
    return <p>Access Denied</p>;
};

export default UserListPage;
