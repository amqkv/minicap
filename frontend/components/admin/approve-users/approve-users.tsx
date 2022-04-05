import { Box, Center, Container, List, Spinner } from "@chakra-ui/react";
import { Fragment } from "react";
import UserList from "@frontend/components/admin/list";
import UserInfoSimple from "@frontend/models/user-info-simple";
import unconfirmedUsersList from "@frontend/hooks/unconfirmed-users-list";
import ApproveUsersRowCard from "@frontend/components/admin/approve-users/approve-users-row-card";
import { Scrollbars } from "react-custom-scrollbars-2";

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
                <Center>
                    <Container px={0}>
                        <List spacing={10}>
                            <UserList
                                style={{
                                    minHeight: "26vh",
                                    maxHeight: "auto",
                                    py: 2,
                                    m: 0,
                                    alignItems: "left",
                                    height: "650px",
                                    width: ["100vw", "55vh"],
                                }}
                                key="1"
                                title="Pending Users"
                                length={users["Users"].length}>
                                <Scrollbars autoHide>
                                    {users["Users"].map((item: UserInfoSimple) => (
                                        <ApproveUsersRowCard
                                            key={item.AccountId}
                                            session={sessionId}
                                            userInfoSimple={item}
                                        />
                                    ))}
                                </Scrollbars>
                            </UserList>
                        </List>
                    </Container>
                </Center>
            )}
        </Fragment>
    );
}
