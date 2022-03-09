import { Box, Center, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import Card from "./card";
import { links, link } from "@frontend/components/homepage/dashboard-structure";
import { useSession } from "next-auth/react";
import Chart from "@frontend/components/homepage/line-chart";
import { USER_ROLES } from "@frontend/utils/constants";
import { StatusDataProps } from "@frontend/models/patient";

export default function Dashboard({ data }: { data: StatusDataProps[] }) {
    const { data: session } = useSession();
    const userRole = session?.user?.Role;
    const userName = session?.user?.FirstName + " " + session?.user?.LastName;

    // reverse data array for line chart
    data.reverse();

    return (
        <>
            <Heading paddingLeft={"50px"}>
                Welcome {userRole} {userName}
            </Heading>
            <Flex flexWrap={"wrap"}>
                {/* Patient dashboard */}
                {session?.user?.Role === USER_ROLES.patient ? (
                    <Box flex="1" margin={"20px 0px 0px 50px"}  w={{ sm: "60%", base: "100%" }}>
                        <Heading size={"lg"}>Your Status Chart:</Heading>
                        <Chart data={data} w={900} h={700} />
                    </Box>
                ) : (
                    <></>
                )}

                <Box flex="1">
                    {session?.user?.Role === USER_ROLES.patient ? (
                        <Box margin={"20px 0px 50px 10px"}>
                            <Heading size={"lg"}>Announcement:</Heading>
                            <UnorderedList marginTop={"20px"}>
                                <ListItem>You have 0 new message</ListItem>
                                <ListItem>You can add or update today's status when clicking on forms</ListItem>
                                <ListItem>
                                    If you have tested positive for Covid-19, please consult quarantine information page
                                    for further instructions
                                </ListItem>
                            </UnorderedList>
                        </Box>
                    ) : (
                        <></>
                    )}
                    <Center>
                        <Flex flexWrap={"wrap"}>
                            {links.map(({ label, url, roleRequired, img }: link) => {
                                const renderCard = roleRequired === userRole || !roleRequired;
                                return renderCard && <Card key={label} label={label} image={img} url={url} />;
                            })}
                        </Flex>
                    </Center>
                </Box>
            </Flex>
        </>
    );
}
