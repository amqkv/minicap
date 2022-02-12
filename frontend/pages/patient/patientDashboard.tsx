import { Dashboard } from "@frontend/components/Dashboard"
import { useSession, getSession } from "next-auth/react";


export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default function PatientDashboard() {
  const { data: session } = useSession();

  
  if (session?.user.Role === "Patient") {
    return <Dashboard/>;
  }
  return <p>Access Denied</p>;
};




