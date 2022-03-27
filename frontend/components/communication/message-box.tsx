import {
    Center,
    Text,
    Box,
    Container,
    Flex,
    Spinner,
    Input,
    InputGroup,
    InputRightElement,
    Button,
} from "@chakra-ui/react";
import { Fragment, useState, useEffect, useRef } from "react";
import socketio from "socket.io-client";
import { SOCKET_URL, USER_ROLES } from "../../utils/constants";
import { useRouter, withRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";

export async function getServerSideProps(context: any) {
    return {
        props: {
            session: await getSession(context),
        },
    };
}

// Connection to socket server
const socket = socketio(SOCKET_URL);

const MessageBox = () => {
    const [messageValue, setMessageValue] = useState("");
    const [roomValue, setRoomValue] = useState("");
    const [messageList, setMessageList] = useState<any[]>([]);
    const router = useRouter();
    const { patientAccountId, patientFirstName, patientLastName } = router.query;

    // Socket room initialization depending on user role
    useEffect(() => {
        if (session?.user.Role === USER_ROLES.doctor) {
            setRoomValue(`room_${patientAccountId}`);
        } else if (session?.user.Role === USER_ROLES.patient) {
            setRoomValue(`room_${session?.user.AccountId}`);
        }
        socket.emit("join_room", roomValue);
    }, [patientAccountId, roomValue]);

    const { data: session } = useSession();

    // Message input handler
    async function handleMessage(event: any) {
        setMessageValue(event.target.value);
    }

    // Message Send handler
    async function handleSend(event: any) {
        event.preventDefault();
        if (messageValue !== "") {
            const messageData = {
                room: roomValue,
                author: session?.user.AccountId,
                message: messageValue,
            };
            await socket.emit("send_message", messageData);
            setMessageValue("");
            setMessageList(list => [...list, messageData]);
        }
    }

    // Message Receivr
    useEffect(() => {
        socket.on("receive_message", data => {
            setMessageList(list => [...list, data]);
        });
    }, [socket]);

    // Scroll to most recent message
    const mostRecentMessage: any = useRef(null);
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
                            Chat with Patient {patientFirstName} {patientLastName}
                        </Text>
                    ) : (
                        <Text fontSize="3xl">Chat with Doctor</Text>
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
                                            {messageContent.message}
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
                                            {messageContent.message}
                                        </Text>
                                    </Flex>
                                );
                            }
                        })}
                        <div ref={mostRecentMessage} />
                    </Container>
                    <form onSubmit={handleSend}>
                        <InputGroup size="md" border="0.1px">
                            <Input
                                type="text"
                                placeholder="Enter message"
                                bg="white"
                                value={messageValue}
                                onChange={handleMessage}
                            />
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
export default withRouter(MessageBox);
