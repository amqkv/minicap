import useSWR from "swr";

// Hook to fetch data , with some new functionalities for data fetching like revalidation. Check SWR for more info

const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json());

const unconfirmedUsersList = () => {
    const { data, error } = useSWR("/api/users/pending", fetcher);
    return {
        users: data,
        isLoading: !error && !data,
        isError: error,
    };
};

export default unconfirmedUsersList;