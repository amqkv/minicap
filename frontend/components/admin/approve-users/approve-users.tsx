import { Box, Container, List, Spinner, useDisclosure } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import UserList from "@frontend/components/admin/list";
import UserInfoPending from "@frontend/models/user-info-pending";
import UserInfoSimple from "@frontend/models/user-info-simple";
import unconfirmedUsersList from "@frontend/hooks/unconfirmed-users-list";
import UserRowCard from "@frontend/components/admin/user-row-card";
import UserModal from "@frontend/components/admin/user-modal";
import ApproveUsersRowCard from "@frontend/components/admin/approve-users/approve-users-row-card";

interface appProps {
    sessionId: Number;
}
const ApproveUsers = ({ sessionId }: appProps) => {
    let { users, isLoading, isError } = unconfirmedUsersList(); // Custom Hook to Fetch the user/role data
    console.log(users);

    const { isOpen, onOpen, onClose } = useDisclosure(); // Hook to deal with the modal visibility

    const [userSelected, setUserSelected] = useState<UserInfoSimple>({
        AccountId: 0,
        FirstName: "",
        LastName: "",
        Role: "",
    });

    const userSelectedHandler = (user: UserInfoSimple) => {
        setUserSelected(user);
        onOpen();
    };

    //console.log(users);

    //@todo create list data handler
    //@todo connect edit function
    //@todo make the user disappear from the list once confirmed -> seems it need to be handled by edit
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

export default ApproveUsers;
