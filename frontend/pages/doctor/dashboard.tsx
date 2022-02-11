import PatientInfoCard from '@frontend/components/doctor/patient-info-card';
import { serverURL } from '@frontend/config';

export async function getServerSideProps() {
  let patientInfo: any = [];
  try {
    // <TODO> Get current patient ID (the one that gets clicked on)
    const response: any = await fetch(serverURL + '/patients/getRequiredDetails/1');
    patientInfo = await response.json();
  } catch {}
  return {
    props: {
      patientInfo,
    },
  };
}

export default function DoctorDashboard() {
  return <PatientInfoCard />;
}
