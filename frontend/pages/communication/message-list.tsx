import { useSession, getSession } from "next-auth/react";
import MessageList from "@frontend/components/communication/message-list";
import { USER_ROLES } from "@frontend/utils/constants";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            session: await getSession(context),
            pageId: "List of Patients to Communicate",
        },
    };
}

const MessageListPage = () => {
    const { data: session } = useSession();

    if (session?.user.Role === USER_ROLES.doctor) {
        return <MessageList sessionId={session.user.AccountId} />;
    }
    return (
        <div className={"error-message"}>
            <p>Access Denied</p>
        </div>
    );
};

export default MessageListPage;
