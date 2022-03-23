import { Patient } from "@frontend/models/patient";
import { useState } from "react";
import useSWR from "swr";

// Hook to fetch data , with some new functionalities for data fetching like revalidation. Check SWR for more info

const fetcher = (url: RequestInfo, userId: number) => fetch(`${url}/${userId}`).then(r => r.json());

const usePatientNameList = (userId: number | undefined) => {
    const response = useSWR(!!userId ? [`/doctors/get-patients-name`, userId] : null, fetcher);

    const patientNamesList: string[] = response.data;
    const error = response.error;
    const mutate = response.mutate;

    return {
        patientNamesList,
        mutate,
        isLoading: !error && !response,
        isError: error,
    };
};

export default usePatientNameList;
