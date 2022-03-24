import { useSession, getSession } from "next-auth/react";
import MessageList from "@frontend/components/communication/message-list";
import { USER_ROLES } from "@frontend/utils/constants";

export async function getServerSideProps(context: any) {
    return {
        props: {
            session: await getSession(context),
            pageId: "Message List",
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
