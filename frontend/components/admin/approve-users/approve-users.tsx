import { Box, Container, List, Spinner} from "@chakra-ui/react";
import { Fragment } from "react";
import UserList from "@frontend/components/admin/list";
import UserInfoSimple from "@frontend/models/user-info-simple";
import unconfirmedUsersList from "@frontend/hooks/unconfirmed-users-list";
import ApproveUsersRowCard from "@frontend/components/admin/approve-users/approve-users-row-card";

export function getPendingUsers(){
    const data = unconfirmedUsersList();
    return data;
}

export function ApproveUsers (users: any, isLoading: boolean, isError: any, sessionId: Number)  {
    return (
        <Fragment>
            {isLoading && <Spinner />}
            {isError && <p> There is an error </p>}
            {!!users && (
                <Box>
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
                                title="pending"
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
};
