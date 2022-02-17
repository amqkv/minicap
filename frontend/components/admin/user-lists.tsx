import { Box, useDisclosure, Spinner, SimpleGrid } from "@chakra-ui/react";
import { Fragment, useState } from "react";
import UserList from "./list";
import UserInfoSimple from "@frontend/models/user-info-simple";
import UserModal from "./user-modal";
import useRole from "@frontend/hooks/user-role";
import UserRowCard from "./user-row-card";

interface appProps {
    sessionId: Number;
}

const UserLists = ({ sessionId }: appProps) => {
    const { userRoles, isLoading, isError } = useRole(); // Custom Hook to Fetch the user/role data

    const { isOpen, onOpen, onClose } = useDisclosure(); // Hook to deal with the modal visibility

    const [userSelected, setUserSelected] = useState<UserInfoSimple>({
        AccountId: 0,
        FirstName: "",
        LastName: "",
        Role: "",
    });

    // Array with the roles to be used as keys
    let keys: string[] = [];
    if (!!userRoles) {
        keys = Object.keys(userRoles);
    }

    //Function to be passed to bubble up the user selected  and open a modal with their info
    const userSelectedHandler = (user: UserInfoSimple) => {
        setUserSelected(user);
        onOpen();
    };

    return (
        <Fragment>
            {isLoading && <Spinner />}
            {isError && <p> There is an error </p>}

            {!!userRoles && (
                <Box px={{ base: 0, sm: 1, md: 4, lg: 1 }} py={20}>
                    <SimpleGrid
                        columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
                        gap="8"
                        overflowY={{ base: "auto", md: "scroll" }}
                        overflowX={"hidden"}
                        maxHeight="70vh"
                        paddingX={4}
                        sx={{
                            "&::-webkit-scrollbar": {
                                width: "5px",
                                borderRadius: "8px",
                                backgroundColor: `#D5D4D4`,
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: `#7A7777`,
                            },
                        }}>
                        {/* User List created for each role */}
                        {keys.map(key => {
                            return (
                                <UserList
                                    style={{
                                        overflowY: "scroll",
                                        minHeight: "26vh",
                                        maxHeight: "26vh",
                                        py: 2,
                                        m: 0,
                                        alignItems: "left",
                                    }}
                                    key={key}
                                    title={key}
                                    length={userRoles[key].length}>
                                    {userRoles[key].map((item: UserInfoSimple) => (
                                        <UserRowCard
                                            key={item.AccountId}
                                            onUserSelect={userSelectedHandler}
                                            userInfoSimple={item}
                                        />
                                    ))}
                                </UserList>
                            );
                        })}
                    </SimpleGrid>
                </Box>
            )}
            <UserModal isOpen={isOpen} onClose={onClose} userInfo={userSelected} sessionId={sessionId} />
        </Fragment>
    );
};

export default UserLists;
