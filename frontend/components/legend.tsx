import { Box, Text, Flex } from "@chakra-ui/react";
import Circle from "@frontend/components/circle";

export default function Legend() {
    return (
        <Box padding="30px 45px" boxShadow="lg" bg="white" borderRadius="15px" backgroundColor="#F9E9E9">
            <Flex alignItems="center" paddingBottom="10px">
                <Circle color="red" diameter={24} />
                <Text fontSize="xl" paddingLeft="10px">
                    Positive
                </Text>
            </Flex>
            <Flex alignItems="center">
                <Circle color="green" diameter={24} />
                <Text fontSize="xl" paddingLeft="10px">
                    Negative
                </Text>
            </Flex>
        </Box>
    );
}
