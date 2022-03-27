import { useSession, getSession } from "next-auth/react";
import MessageBox from "@frontend/components/communication/message-box";
import { USER_ROLES } from "@frontend/utils/constants";

export async function getServerSideProps(context: any) {
    return {
        props: {
            session: await getSession(context),
            pageId: "Conversation",
        },
    };
}

const MessageBoxPage = () => {
    const { data: session } = useSession();

    if (session?.user.Role === USER_ROLES.doctor || session?.user.Role === USER_ROLES.patient) {
        return <MessageBox />;
    }
    return (
        <div className={"error-message"}>
            <p>Access Denied</p>
        </div>
    );
};

export default MessageBoxPage;
