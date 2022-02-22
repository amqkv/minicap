import { Box, Text, Image } from "@chakra-ui/react";
import Link from "@frontend/components/navigation/navlink";
import { CardProps } from "./types/card";

export default function Card({ label, image, url }: CardProps) {
    return (
        <Box boxShadow="dark-lg" p="6" rounded="md" bg="white" margin={"50px"} h={"250px"} w={"240px"}>
            <Image src={image} />
            <Link url={url}>
                <Text _hover={{ color: "tomato" }} align={"center"}>
                    {label}
                </Text>
            </Link>
        </Box>
    );
}
