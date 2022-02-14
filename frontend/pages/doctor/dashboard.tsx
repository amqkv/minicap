import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import PatientInfoCard from "@frontend/components/doctor/patient-info-card";
import { serverURL } from "@frontend/config";
import Patient from "@frontend/models/patient";

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
    return (
        <Box my={10}>
            <Heading size="xl" m={10} my={8}>
                Patients
            </Heading>
            <SimpleGrid minChildWidth="400px" rowGap={5}>
                {patientList.map((patient: Patient) => (
                    <Center>
                        <PatientInfoCard patient={patient} key={`patient-${patient.patientId}`} />
                    </Center>
                ))}
            </SimpleGrid>
        </Box>
    );
}
