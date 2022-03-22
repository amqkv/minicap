import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import List from "@frontend/components/admin/list";
import inputStyling from "@frontend/components/inputs/input-styling";
import { Flex, Box, Text, Button, Input } from "@chakra-ui/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import useFilteredPatients from "@frontend/hooks/use-filtered-patients";

interface TrackContractPatientsProps {
    patients: object[];
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    return {
        props: {
            session,
            pageId: "List of Patients",
            patients: [],
        },
    };
}

const buttonProps = {
    variant: "outline",
    size: "lg",
};

export default function TrackContactPatients({ patients }: TrackContractPatientsProps) {
    const { data: session } = useSession();
    const { alphabeticalSort, setAlphabeticalSort, filteredPatients, searchText, setSearchText } =
        useFilteredPatients(patients);

    if (session?.user.Role !== USER_ROLES.hOfficial) {
        return <p>Access Denied</p>;
    }

    return (
        <Box padding={{ base: "2% 5%", md: "2vh 5vh" }}>
            <Box flex="1">
                <Input
                    placeholder={"Enter name or email"}
                    marginBottom="20px"
                    width="100%"
                    size="lg"
                    isInvalid
                    errorBorderColor="gray.400"
                    value={searchText}
                    onChange={event => setSearchText(event.target.value)}
                />
                <Button {...buttonProps} onClick={() => setAlphabeticalSort(!alphabeticalSort)} marginBottom="10px">
                    Alphabetical
                    {alphabeticalSort ? <ArrowUpIcon marginLeft="10px" /> : <ArrowDownIcon marginLeft="10px" />}
                </Button>
            </Box>

            <List>
                <Flex {...inputStyling} padding="14px 25px" justifyContent={"space-between"}>
                    <Text fontSize="2xl" flex={1}>
                        ballsack
                    </Text>
                    <Text fontSize="2xl" flex={1} textAlign="center">
                        (3)
                    </Text>
                    <Text fontSize="2xl" flex={1} textAlign="end">
                        RANDOM DATE
                    </Text>
                </Flex>
            </List>
        </Box>
    );
}
