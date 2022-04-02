import { NextPageContext } from "next";
import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { Flex, Text, Box } from "@chakra-ui/react";
import useFilteredPatients from "@frontend/hooks/use-filtered-patients";
import inputStyling from "@frontend/components/inputs/input-styling";
import FilteredPatients from "@frontend/components/patient/filtered-patients";
import NavLink from "@frontend/components/navigation/navlink";
import { PatientBasicInformation } from "@frontend/models/patient";

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

const UserListPage = ({ patients }: { patients: PatientBasicInformation[] }) => {
    const { data: session } = useSession();
    const { sort, changeSort, ascending, filteredPatients, setSearchText, filterValue, filterKey, changeFilter } =
        useFilteredPatients(patients);

    const filteredPatientsListProps = {
        sort,
        changeSort,
        ascending,
        setSearchText,
        filterValue,
        filterKey,
        changeFilter,
        placeholder:'Enter a name or an email',
        options: ["alphabetical", "number", "date"],
    };

    if (session?.user.Role === USER_ROLES.hOfficial) {
        return (
            <Box padding={{ base: " 5% 2%", md: "2% 15%" }}>
                <FilteredPatients {...filteredPatientsListProps}>
                    {filteredPatients.map(({ firstName, lastName, id, number, date }: PatientBasicInformation) => (
                        <NavLink key={id} url={"/health-official/track-contact/" + id}>
                            <Flex key={id} {...inputStyling}>
                                <Text fontSize="2xl" flex={1}>
                                    {firstName} {lastName}
                                </Text>
                                <Text fontSize="2xl" flex={1} textAlign="center">
                                    ({number})
                                </Text>
                                <Text fontSize="2xl" flex={1} textAlign="end">
                                    {date}
                                </Text>
                            </Flex>
                        </NavLink>
                    ))}
                </FilteredPatients>
            </Box>
        );
    }
    return <p>Access Denied</p>;
};

export default UserListPage;
