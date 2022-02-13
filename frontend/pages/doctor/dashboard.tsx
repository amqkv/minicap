import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
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
    const response: any = await fetch(
      serverURL + "/patients/getPatientsInfo/3"
    );
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
      <Grid templateColumns="repeat(2, 1fr)" rowGap={5}>
        {patientList.map((patient: Patient) => (
          <GridItem key={`patient-card-${patient.patientId}`}>
            <PatientInfoCard
              patient={patient}
              key={`patient-${patient.patientId}`}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
