import { useSession, getSession } from "next-auth/react";
import MessageBox, { MessageBoxProps } from "@frontend/components/communication/message-box";
import { USER_ROLES } from "@frontend/utils/constants";
import { serverURL } from "@frontend/config/index";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    // Get information related to doctor for patient's page
    if (session?.user.Role === USER_ROLES.patient) {
        const response = await fetch(serverURL + `/patients/getAssignedDoctor/${session?.user.AccountId}`);
        const doctor = await response.json();
        return {
            props: {
                session,
                pageId: `Conversation`,
                patient_accountId: session?.user.AccountId,
                doctor_accountId: doctor.AccountId,
                doctorName: doctor.LastName,
            },
        };
    }

    // Get information related to patient for doctor's page
    return {
        props: {
            session,
            pageId: `Conversation`,
            patient_accountId: context.query?.patientAccountId,
            doctor_accountId: session?.user.AccountId,
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
