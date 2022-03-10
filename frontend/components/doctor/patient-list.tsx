import { Center, Text } from "@chakra-ui/react";
import { Patient } from "@frontend/models/patient";
import { SetStateAction } from "react";
import PatientInfoCard from "./patient-info-card";

interface AppProps {
    patientList: Patient[];
    searchTerm: string;
    setSelectedPatient: (value: SetStateAction<Patient>) => void;
    onOpen: () => void;
}

const PatientList = ({ patientList, searchTerm, setSelectedPatient, onOpen }: AppProps) => {
    const handleClick = (selectedPatient: Patient) => {
        setSelectedPatient(selectedPatient);
        onOpen();
    };
    const filtered = patientList.filter(elm =>
        `${elm.basicInformation.firstName?.toLowerCase()} ${elm.basicInformation.lastName?.toLowerCase()}`.includes(
            searchTerm.toLowerCase()
        )
    );

    if (filtered.length === 0) {
        return (
            <Center>
                <Text fontSize="xl" color="gray.500" mt={10}>
                    No patient to show.
                </Text>
            </Center>
        );
    } else {
        const mappedList = filtered.map((patient: Patient) => (
            <PatientInfoCard
                patient={patient}
                clickHandler={() => handleClick(patient)}
                key={`patient-${patient.patientId}`}
            />
        ));
        return <>{mappedList}</>;
    }
};

export default PatientList;
