import { Box, Container, List, Spinner } from "@chakra-ui/react";
import { Fragment } from "react";
import UserList from "@frontend/components/admin/list";
import UserInfoSimple from "@frontend/models/user-info-simple";
import usePatientNameList from "@frontend/hooks/use-patient-name";
import ApproveUsersRowCard from "@frontend/components/admin/approve-users/approve-users-row-card";

export default function MessageList(sessionId: number) {
    // data hook to fetch users list
    const { isLoading, isError } = usePatientNameList(sessionId);

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
            {
                <Box py={5}>
                    <h1>bonjour</h1>
                    <Container>
                        <List spacing={10}>bonjour</List>
                    </Container>
                </Box>
            }
        </Fragment>
    );
}
