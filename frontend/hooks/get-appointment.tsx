import useSWR from "swr";

// Hook to fetch data , with some new functionalities for data fetching like revalidation. Check SWR for more info

const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json());

const getAppointmentPatient = () => {
    const { data, error } = useSWR("/api/patient/get-appointment", fetcher);
    return {
        appointments: data,
        isLoading: !error && !data,
        isError: error,
    };
};

export default getAppointmentPatient;