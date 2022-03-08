import { Box, Container, List, Spinner } from "@chakra-ui/react";
import { Fragment } from "react";
import UserList from "@frontend/components/admin/list";
import UserInfoSimple from "@frontend/models/user-info-simple";
import unconfirmedUsersList from "@frontend/hooks/unconfirmed-users-list";
import ApproveUsersRowCard from "@frontend/components/admin/approve-users/approve-users-row-card";

export default function ApproveUsers(sessionId: number) {
    // data hook to fetch users list
    const { users, isLoading, isError } = unconfirmedUsersList();

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
            {!!users && (
                <Box py={5}>
                    <Container>
                        <List spacing={10}>
                            <UserList
                                style={{
                                    overflowY: "scroll",
                                    minHeight: "26vh",
                                    maxHeight: "auto",
                                    py: 2,
                                    m: 0,
                                    alignItems: "left",
                                }}
                                key="1"
                                title="Pending Users"
                                length={users["Users"].length}>
                                {users["Users"].map((item: UserInfoSimple) => (
                                    <ApproveUsersRowCard
                                        key={item.AccountId}
                                        session={sessionId}
                                        userInfoSimple={item}
                                    />
                                ))}
                            </UserList>
                        </List>
                    </Container>
                </Box>
            )}
        </Fragment>
    );
}
