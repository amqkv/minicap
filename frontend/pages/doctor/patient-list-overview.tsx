import { Box, Heading, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import { serverURL } from "@frontend/config";
import { Patient } from "@frontend/models/patient";
import PatientInfoModal from "components/doctor/patient-info-modal";
import { useState } from "react";

interface AppProps {
    patientList: Patient[];
}

export async function getServerSideProps() {
    let patientList: any = [];
    try {
        // <TODO> Get current doctor ID
        const response: any = await fetch(serverURL + "/patients/getPatientsInfo/3");
        patientList = await response.json();
    } catch {}
    return {
        props: {
            patientList,
        },
    };
}

export default function DoctorDashboard({ patientList }: AppProps) {
    const [selectedPatient, setSelectedPatient] = useState<Patient>({
        patientId: 0,
        doctorId: 0,
        basicInformation: {
            firstName: "",
            lastName: "",
            gender: "",
            height: 0,
            dob: "",
            age: 0,
        },
        requiredDetails: {
            weight: false,
            temperature: false,
            symptoms: false,
        },
        status: {
            weight: { value: 0, unit: "" },
            temperature: { value: 0, unit: "" },
            symptoms: { value: "", unit: "" },
            lastUpdated: 0,
        },
        isReviewed: false,
        isPrioritized: false,
    });
    const { onOpen, isOpen, onClose } = useDisclosure();

    function handleClick(selectedPatient: Patient) {
        setSelectedPatient(selectedPatient);
        console.log("currentPatient", selectedPatient);
        onOpen();
    }
    return (
        <Box my={10}>
            <Heading size="xl" m={10} my={8}>
                Patients
            </Heading>
            <SimpleGrid minChildWidth="400px" rowGap={5} columnGap={2}>
                {patientList.map((patient: Patient) => (
                    <Box onClick={() => handleClick(patient)} key={`patient-${patient.patientId}`}>
                        <PatientInfoCard patient={patient} />
                    </Box>
                ))}
            </SimpleGrid>
            <PatientInfoModal isOpen={isOpen} onClose={onClose} patient={selectedPatient} />
        </Box>
    );
}
