import { useSession, getSession } from 'next-auth/react';
import ApproveUsers from "@frontend/components/admin/approve-users";

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
        return <ApproveUsers sessionId={session.user.AccountId} />;
    }
    return <p>Access Denied</p>;
};

export default ApproveUsersPage;