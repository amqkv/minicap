import UserList from "@frontend/components/admin/user-list";
import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import useRole from "@frontend/hooks/user-role";
import StandardInput from "@frontend/components/inputs/standard-input";

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

const UserListPage = () => {
  const { data: session } = useSession();
  const { userRoles } = useRole(); // Custom Hook to Fetch the user/role data
  const tempUsers = userRoles.Patient;

  if (session?.user.Role === USER_ROLES.iOfficer) {
    return (
      <>
      {/* rendering the search bar */}
        <StandardInput
          name={"search label"}
          placeholder={"Enter name or email"}
        />
        <UserList
          userRole="Find User"
          onUserSelect={() => {}}
          usersInfoSimple={tempUsers}
        />
      </>
    );
  }
  return <p>Access Denied</p>;
};

export default UserListPage;
