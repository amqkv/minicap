import { Box, Center, Heading, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import { serverURL } from "@frontend/config";
import Patient from "@frontend/models/patient";
import PatientInfoModal from "components/doctor/patient-info-modal";

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
    const { onOpen, isOpen, onClose } = useDisclosure();

    return (
        <Box my={10}>
            <Heading size="xl" m={10} my={8}>
                Patients
            </Heading>
            <SimpleGrid minChildWidth="400px" rowGap={5}>
                {patientList.map((patient: Patient) => (
                    <Center>
                        <PatientInfoCard patient={patient} key={`patient-${patient.patientId}`} onClick={onOpen} />
                    </Center>
                ))}
            </SimpleGrid>
            <PatientInfoModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}
