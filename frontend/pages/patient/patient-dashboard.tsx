import { Dashboard } from "@frontend/components/homepage/dashboard"
import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default function PatientDashboard() {
  const { data: session } = useSession();

  // can merge to check if session?.user.Role in condition later
  if (session?.user.Role === USER_ROLES.patient) {
    return <Dashboard/>;
  } 

  if (session?.user.Role === USER_ROLES.doctor) {
    return <Dashboard/>;
  } 

  return <p>Access Denied</p>;
};




