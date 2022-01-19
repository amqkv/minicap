import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import LoginLogoutButton from '@frontend/components/LoginLogoutButton'

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        type: {session.user.type} <br />
        <LoginLogoutButton/>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <LoginLogoutButton />
    </>
  );
}
