import { useSession, getSession } from 'next-auth/react';
import ApproveUsers from "@frontend/components/admin/approve-users/approve-users";

export async function getServerSideProps(context: any) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}

const ApproveUsersPage = () => {
    const { data: session } = useSession();

    if (session?.user.Role === 'Admin') {
        return ApproveUsers(session.user.AccountId);
    }
    return <div className={"error-message"}><p>Access Denied</p></div>;
};

export default ApproveUsersPage;