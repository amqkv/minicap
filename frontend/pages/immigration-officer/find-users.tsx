import List from "@frontend/components/admin/list";
import { NextPageContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import StandardInput from "@frontend/components/inputs/standard-input";
import Legend from "@frontend/components/legend";
import { serverURL } from "@frontend/config/index";
import { Flex, Text, Box } from "@chakra-ui/react";
import Circle from "@frontend/components/circle";

export async function getServerSideProps(context: NextPageContext) {
    const response = await fetch(serverURL + "/users/role");
    const { Patient } = await response.json();

    return {
        props: {
            patients: Patient,
            session: await getSession(context),
        },
    };
}

const UserListPage = ({ patients }: any) => {
    const { data: session } = useSession();

    if (session?.user.Role === USER_ROLES.iOfficer) {
        return (
            <Box padding="0 15%">
                {/* rendering the search bar */}
                <Flex width="90%" paddingBottom="40px" justifyContent={"space-between"} alignItems="center">
                    <StandardInput
                        style={{ width: "70%" }}
                        name={"search label"}
                        placeholder={"Enter name or email"}
                        inputProps={{
                            size: "lg",
                            isInvalid: true,
                            errorBorderColor: "gray.400",
                        }}
                    />
                    <Legend />
                </Flex>
                <Box width="90%">
                    <List>
                        {patients.map(({ FirstName, LastName }: any) => (
                            <Flex
                                background="#fcfcfc"
                                borderRadius="5px"
                                boxShadow="2px 2px 15px 0.5px #8f8f8f26"
                                padding="14px 14px 14px 14px"
                                alignItems="center"
                                justifyContent="space-evenly">
                                <Text fontSize="2xl" flex={3}>
                                    {LastName}, {FirstName}
                                </Text>
                                <Box flex={3} />
                                {/* TODO: eventually change the color so that it matches database */}
                                <Circle color="red" diameter={24} />
                            </Flex>
                        ))}
                    </List>
                </Box>
            </Box>
        );
    }
    return <p>Access Denied</p>;
};

export default UserListPage;
