import { Center, Text, Box, Container, Flex, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { Fragment, useEffect, useRef } from "react";
import { USER_ROLES } from "../../utils/constants";
import { useSession } from "next-auth/react";
import useWebSockets from "../../hooks/use-web-sockets";

export interface MessageBoxProps {
    patient_accountId?: number;
    firstName?: string;
    lastName?: string;
    doctorName?: string;
}

const MessageBox = ({ patient_accountId, firstName, lastName, doctorName }: MessageBoxProps) => {
    const { data: session } = useSession();
    const { messageList, send } = useWebSockets({
        patient_accountId: patient_accountId,
        enabled: Boolean(patient_accountId),
    });

    // Message Send handler
    async function handleSend(event: any) {
        event.preventDefault();
        const messageInput = event.target[0];
        if (messageInput.value !== "") {
            send(messageInput.value, session?.user.AccountId);
            messageInput.value = "";
        }
    }

    // Scroll to most recent message
    const mostRecentMessage = useRef<null | HTMLDivElement>(null);
    function scrollToBottom() {
        mostRecentMessage.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => {
        scrollToBottom();
    }, [messageList]);

    return (
        <Fragment>
            <Box px={{ base: 0, sm: 1, md: 4, lg: 1 }} py={5}>
                <Center>
                    {session?.user.Role === USER_ROLES.doctor ? (
                        <Text fontSize="3xl">
                            Chat with Patient {firstName} {lastName}
                        </Text>
                    ) : (
                        <Text fontSize="3xl">Chat with Dr. {doctorName}</Text>
                    )}
                </Center>
                <Container>
                    <Container
                        my={2}
                        py={2}
                        bg="gray.300"
                        borderRadius={7}
                        overflowY={{ base: "auto", md: "scroll" }}
                        overflowX={"hidden"}
                        minHeight="50vh"
                        maxHeight="50vh"
                        paddingX={4}
                        sx={{
                            "&::-webkit-scrollbar": {
                                width: "5px",
                                borderRadius: "8px",
                                backgroundColor: `#D5D4D4`,
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: `#7A7777`,
                            },
                        }}>
                        {messageList.map((messageContent, index) => {
                            if (messageContent.author === session?.user.AccountId) {
                                return (
                                    <Flex key={index}>
                                        <Text
                                            position="relative"
                                            ml="auto"
                                            fontSize="lg"
                                            bg="green.200"
                                            px="2"
                                            mb="2"
                                            maxWidth="20rem"
                                            borderRadius={8}>
                                            {messageContent.content}
                                        </Text>
                                    </Flex>
                                );
                            } else {
                                return (
                                    <Flex key={index}>
                                        <Text
                                            position="relative"
                                            fontSize="lg"
                                            bg="red.200"
                                            px="2"
                                            mb="2"
                                            maxWidth="20rem"
                                            borderRadius={8}>
                                            {messageContent.content}
                                        </Text>
                                    </Flex>
                                );
                            }
                        })}
                        <div ref={mostRecentMessage} />
                    </Container>
                    <form onSubmit={handleSend}>
                        <InputGroup size="md" border="0.1px">
                            <Input type="text" placeholder="Enter message" bg="white" />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" bg="blue.200" _hover={{ opacity: "75%" }} type="submit">
                                    Send
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </form>
                </Container>
            </Box>
        </Fragment>
    );
};
export default MessageBox;
