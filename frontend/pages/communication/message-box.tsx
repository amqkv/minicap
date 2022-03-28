import { useSession, getSession } from "next-auth/react";
import MessageBox, { MessageBoxProps } from "@frontend/components/communication/message-box";
import { USER_ROLES } from "@frontend/utils/constants";
import { serverURL } from "@frontend/config/index";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    if (session?.user.Role === USER_ROLES.patient) {
        const response = await fetch(serverURL + `/patients/getAssignedDoctor/${session?.user.AccountId}`);
        const doctorName = await response.json();
        return {
            props: {
                session,
                pageId: `Conversation with Dr. ${doctorName.LastName}`,
                patientId: session?.user.AccountId,
                doctorName: doctorName.LastName,
            },
        };
    }
    return {
        props: {
            session,
            pageId: `Conversation with ${context.query?.patientFirstName} ${context.query?.patientLastName}`,
            patientId: context.query?.patientAccountId,
            firstName: context.query?.patientFirstName,
            lastName: context.query?.patientLastName,
        },
    };
}

const MessageBoxPage = (props: MessageBoxProps) => {
    const { data: session } = useSession();
    if (session?.user.Role === USER_ROLES.doctor || session?.user.Role === USER_ROLES.patient) {
        return <MessageBox {...props} />;
    }
    return (
        <div className={"error-message"}>
            <p>Access Denied</p>
        </div>
    );
};

export default MessageBoxPage;
