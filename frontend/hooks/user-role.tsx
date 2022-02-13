import UserInfoSimple from "@frontend/models/user-info-simple";
import useSWR from "swr";

// Hook to fetch data , with some new functionalities for data fetching like revalidation. Check SWR for more info

const fetcher = (url: RequestInfo) => fetch(url).then(r => r.json());
const useRole = () => {
    const { data, error } = useSWR(`/api/users/role`, fetcher);
    return {
        userRoles: data as { [key: string]: UserInfoSimple[] },
        isLoading: !error && !data,
        isError: error,
    };
};

export default useRole;
