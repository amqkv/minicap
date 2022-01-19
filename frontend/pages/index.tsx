import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        type: {session.user.type}
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
