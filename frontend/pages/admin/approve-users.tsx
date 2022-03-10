import { useSession, getSession } from "next-auth/react";
import ApproveUsers from "@frontend/components/admin/approve-users/approve-users";
import { USER_ROLES } from "@frontend/utils/constants";

export async function getServerSideProps(context: any) {
    return {
        props: {
            session: await getSession(context),
            pageId: "Manage Pending Users"
        },
    };
}

const ApproveUsersPage = () => {
    const { data: session } = useSession();

    if (session?.user.Role === USER_ROLES.admin) {
        return ApproveUsers(session.user.AccountId);
    }
    return (
        <div className={"error-message"}>
            <p>Access Denied</p>
        </div>
    );
};

export default ApproveUsersPage;
