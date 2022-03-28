import { Text, Box, Container, Spinner } from "@chakra-ui/react";
import { Fragment } from "react";
import UserList from "@frontend/components/admin/list";
import UserInfoSimple from "@frontend/models/user-info-simple";
import usePatientNameList from "@frontend/hooks/use-patient-name";
import UserRowCard from "../admin/user-row-card";
import { useRouter } from "next/router";

interface appProps {
    sessionId: number;
}

const MessageList = ({ sessionId }: appProps) => {
    const router = useRouter();
    // data hook to fetch list of message
    const { patientNames, isLoading, isError } = usePatientNameList(sessionId);
    const patientSelectedHandler = (patient: UserInfoSimple) => {
        if (patient) {
            router.push({
                pathname: "./message-box",
                query: {
                    patientAccountId: patient.AccountId,
                    patientFirstName: patient.FirstName,
                    patientLastName: patient.LastName,
                },
            });
        }
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
                    <Container my={2} py={2} bg="gray.300" borderRadius={7}>
                        <Text fontSize="xl" as="b" mb={4}>
                            Please select a patient with who you wish to chat with:
                        </Text>
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
