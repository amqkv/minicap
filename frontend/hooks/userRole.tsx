import UserInfoSimple from '@frontend/models/UserInfoSimple';
import useSWR from 'swr';
const fetcher = (url: RequestInfo) => fetch(url).then((r) => r.json());
const useRole = () => {
  const { data, error } = useSWR(`/api/users/role`, fetcher);
  return {
    userRoles: data as { [key: string]: UserInfoSimple[] },
    isLoading: !error && !data,
    isError: error,
  };
};

export default useRole;
