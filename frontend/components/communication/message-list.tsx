import { Box, Container, Spinner } from "@chakra-ui/react";
import { Fragment } from "react";
import UserList from "@frontend/components/admin/list";
import UserInfoSimple from "@frontend/models/user-info-simple";
import usePatientNameList from "@frontend/hooks/use-patient-name";
import UserRowCard from "../admin/user-row-card";

interface appProps {
    sessionId: number;
}

const MessageList = ({ sessionId }: appProps) => {
    // data hook to fetch list of message
    const { patientNames, isLoading, isError } = usePatientNameList(sessionId);

    const patientSelectedHandler = (patient: UserInfoSimple) => {
        console.log("dab", patient.AccountId);
    };

    if (isError) {
        return (
            <Fragment>
                <p> There is an error </p>
            </Fragment>
        );
    }
    return (
        <Fragment>
            {isLoading && <Spinner />}
            {isError && <p id="error-message"> There is an error </p>}
            {!!patientNames && (
                <Box px={{ base: 0, sm: 1, md: 4, lg: 1 }} py={5}>
                    <Container py={2} bg={"pink"} borderRadius={7}>
                        <UserList>
                            {Object.keys(patientNames).map(key => {
                                return (
                                    <UserRowCard
                                        key={patientNames[key].AccountId}
                                        onUserSelect={patientSelectedHandler}
                                        userInfoSimple={patientNames[key]}
                                    />
                                );
                            })}
                        </UserList>
                    </Container>
                </Box>
            )}
        </Fragment>
    );
};
export default MessageList;
