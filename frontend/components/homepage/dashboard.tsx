import { Box, Text, Center, Flex, Image, Heading } from "@chakra-ui/react";
import { Card } from "./card";
import { links, link } from "@frontend/components/homepage/dashboard-structure";
import { useSession } from "next-auth/react";

export function Dashboard() {
    const { data: session } = useSession();
    const userRole = session?.user?.Role;

    // depending on the role, will render different box for different functionalities
    return (
        <Box>
            {/* TODO add patients name in heading */}
            <Heading paddingLeft={"50px"}>Wassup {userRole} </Heading>

            <Center marginTop={"5%"}>
                <Flex flexWrap="wrap">
                    {links.map(({ label, url, roleRequired, img }: link) => {
                        const renderCard = roleRequired === userRole || !roleRequired;
                        return (
                            renderCard && (
                                <Card label={label} image={img} url={url} />
                            )
                        );
                    })}
                </Flex>
            </Center>
        </Box>
    );
}
