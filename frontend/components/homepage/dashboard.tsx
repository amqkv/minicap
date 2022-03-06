import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import Card from "./card";
import { links, link } from "@frontend/components/homepage/dashboard-structure";
import { useSession } from "next-auth/react";
import Chart from "@frontend/components/homepage/line-chart";
import { USER_ROLES } from "@frontend/utils/constants";
import { StatusDataProps } from "./types/types";

export default function Dashboard({ data }: {data: StatusDataProps}) {
    const { data: session } = useSession();
    const userRole = session?.user?.Role;
    const userName = session?.user?.FirstName + " " + session?.user?.LastName;
    // depending on the role, will render different box for different functionalities
    return (
        <Box >
            <Heading paddingLeft={"50px"}>
                Welcome {userRole} {userName}
            </Heading>
            <Center>
                {session?.user?.Role === USER_ROLES.patient ? (
                    <Box padding={"20px 20px 0 50px"}>
                        <Heading size={"lg"}>Your Status Chart:</Heading>
                        <Chart data={data} />
                    </Box>
                ) : (
                    <p></p>
                )}
                <Flex flexWrap="wrap">
                    {links.map(({ label, url, roleRequired, img }: link) => {
                        const renderCard = roleRequired === userRole || !roleRequired;
                        return renderCard && <Card key={label} label={label} image={img} url={url} />;
                    })}
                </Flex>
            </Center>
        </Box>
    );
}
