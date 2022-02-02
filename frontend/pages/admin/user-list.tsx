import { Box } from '@chakra-ui/react';
import UserLists from '@frontend/components/admin/UserLists';
import { useSession, getSession } from 'next-auth/react';

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

const UserListPage = () => {
  const { data: session } = useSession();

  if (session?.user.Role === 'Admin') {
    return <UserLists sessionId={session.user.AccountId} />;
  }
  return <p>Access Denied</p>;
};

export default UserListPage;
