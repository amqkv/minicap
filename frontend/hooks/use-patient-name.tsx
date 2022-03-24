import useSWR from "swr";
import UserInfoSimple from "@frontend/models/user-info-simple";

// Hook to fetch data , with some new functionalities for data fetching like revalidation. Check SWR for more info

const fetcher = (url: RequestInfo, userId: number) => fetch(`${url}/${userId}`).then(r => r.json());

const usePatientNameList = (userId: number | undefined) => {
    const { data, error } = useSWR(!!userId ? [`/doctors/get-patients-name`, userId] : null, fetcher);

    return {
        patientNames: data as { [key: string]: UserInfoSimple },
        isLoading: !error && !data,
        isError: error,
    };
};

export default usePatientNameList;
