import { Box, Container, List, Spinner} from "@chakra-ui/react";
import { Fragment, useState } from "react";
import UserList from "@frontend/components/admin/list";
import UserInfoSimple from "@frontend/models/user-info-simple";
import unconfirmedUsersList from "@frontend/hooks/unconfirmed-users-list";
import ApproveUsersRowCard from "@frontend/components/admin/approve-users/approve-users-row-card";

interface appProps {
    sessionId: Number;
}

export function getPendingUsers(){
    //let { users, isLoading, isError } = unconfirmedUsersList(); // Custom Hook to Fetch the user/role data
    const data = unconfirmedUsersList();
    return data;
}

export function ApproveUsers (users: any, isLoading: boolean, isError: any, sessionId: Number)  {
    //let { users, isLoading, isError } = unconfirmedUsersList(); // Custom Hook to Fetch the user/role data
    //console.log(users);

    const [userSelected, setUserSelected] = useState<UserInfoSimple>({
        AccountId: 0,
        FirstName: "",
        LastName: "",
        Role: "",
    });
    
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
