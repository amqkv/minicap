import { Patient } from "@frontend/models/patient";
import { useState } from "react";
import useSWR from "swr";

// Hook to fetch data , with some new functionalities for data fetching like revalidation. Check SWR for more info

const fetcher = (url: RequestInfo, userId: number) => fetch(`${url}/${userId}`).then(r => r.json());
const usePatientList = (userId: number | undefined) => {
    const response = useSWR(!!userId ? [`/doctors/get-patients-info`, userId] : null, fetcher);

    const patientList: Patient[] = response.data;
    const [patientListToMap, setPatientListToMap] = useState(patientList);
    const error = response.error;
    const mutate = response.mutate;

    const flaggedPatientList = patientList?.filter(patient => patient.isPrioritized);

    const highTemperaturePatientList = patientList?.filter(patient => patient.status[0].temperature.value >= 38);

    //filtering based on reviewed
    const reviewedPatientList = patientList?.filter(patient => patient.isAllReviewed.toString() === "true");

    //filtering based on unreviewed
    const unreviewedPatientList = patientList?.filter(patient => patient.isAllReviewed.toString() === "false");

    return {
        patientListToMap,
        setPatientListToMap,
        patientList,
        highTemperaturePatientList,
        flaggedPatientList,
        reviewedPatientList,
        unreviewedPatientList,
        mutate,
        isLoading: !error && !response,
        isError: error,
    };
};

export default usePatientList;
