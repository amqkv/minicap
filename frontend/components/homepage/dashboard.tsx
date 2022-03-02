import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import Card from "./card";
import { links, link } from "@frontend/components/homepage/dashboard-structure";
import { useSession } from "next-auth/react";
import Chart from "@frontend/components/line-chart";
import { USER_ROLES } from "@frontend/utils/constants";

export default function Dashboard() {
    const { data: session } = useSession();
    const userRole = session?.user?.Role;
    const userName = session?.user?.FirstName + " " + session?.user?.LastName;
    // depending on the role, will render different box for different functionalities
    return (
        <Box>
            <Heading paddingLeft={"50px"}>
                Welcome {userRole} {userName}
            </Heading>
            {session?.user?.Role === USER_ROLES.patient? <Chart/>: <p>You are not a doctor. NOOOOB</p>}

            <Center marginTop={"5%"}>
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
