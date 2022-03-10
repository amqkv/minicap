import { Box, Text, Image } from "@chakra-ui/react";
import Link from "@frontend/components/navigation/navlink";
import { CardProps } from "./types/types";

export default function Card({ label, image, url }: CardProps) {
    return (
        <Link url={url}>
            <Box
                _hover={{ color: "tomato" }}
                boxShadow="dark-lg"
                p="6"
                rounded="md"
                bg="white"
                margin={"50px"}
                h={"250px"}
                w={"240px"}>
                <Image src={image} />
                <Text align={"center"} mt={6}>
                    {label}
                </Text>
            </Box>
        </Link>
    );
}
