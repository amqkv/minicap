import useSWR from "swr";
import PatientInfoSimple from "@frontend/models/patient-info-simple";
// Hook to fetch data , with some new functionalities for data fetching like revalidation. Check SWR for more info
interface DoctorInfo {
    accountId: number;
    firstName: string;
    lastName: string;
    doctorId: number;
    patients: PatientInfoSimple[];
}

const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json());
const usePatientDoctorData = () => {
    const { data, error } = useSWR(`/api/admin/patient-doctor`, fetcher);

    return {
        patientInfo: data?.assigned as DoctorInfo[],
        unassignedPatientInfo: data?.unassigned as PatientInfoSimple[],
        isLoading: !error && !data,
        isError: error,
    };
};

export default usePatientDoctorData;
