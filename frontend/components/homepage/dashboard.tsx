import { Box, Center, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import Card from "./card";
import { links, link } from "@frontend/components/homepage/dashboard-structure";
import { useSession } from "next-auth/react";
import Chart from "@frontend/components/line-chart";
import { USER_ROLES } from "@frontend/utils/constants";
import DashboardCharts from "@frontend/components/homepage/dashboard-charts";

export default function Dashboard({ data }: { data: unknown[] }) {
    const { data: session } = useSession();
    const userRole = session?.user?.Role;
    const userName = session?.user?.FirstName + " " + session?.user?.LastName;

    // reverse data array for line chart
    data.reverse();

    return (
        <>
            <Box>
                <Heading paddingLeft={"50px"}>
                    Welcome {userRole} {userName}
                </Heading>

                <Flex flexWrap={"wrap"}>
                    <DashboardCharts role={userRole} data={data} />

                    <Box flex="1">
                        {session?.user?.Role === USER_ROLES.patient && (
                            <Box margin={"20px 0px 30px 10%"}>
                                <Heading size={"lg"}>Announcement:</Heading>
                                <UnorderedList marginTop={"20px"}>
                                    <ListItem>You have 0 new message</ListItem>
                                    <ListItem>You can add or update today's status when clicking on forms</ListItem>
                                    <ListItem>
                                        If you have tested positive for Covid-19, please consult quarantine information
                                        page for further instructions
                                    </ListItem>
                                </UnorderedList>
                            </Box>
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
            </Box>
        </>
    );
}
