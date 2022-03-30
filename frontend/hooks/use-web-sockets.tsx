import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../utils/constants";

type Props = {
    patient_accountId?: number;
    enabled: boolean;
};

type Message = {
    roomId: string;
    author?: number;
    content: string;
};

// Hook for web socket connection and functionalities
const useWebSockets = ({ patient_accountId, enabled }: Props) => {
    const ref = useRef<Socket>();
    const [messageList, setMessageList] = useState<Message[]>([]);
    const roomId = `room_${patient_accountId}`;

    // Send mesages to socket
    const send = (msg: string, author?: number) => {
        const messageData: Message = { roomId: roomId, content: msg, author: author };
        ref.current?.emit("send_message", messageData);
        setMessageList(list => [...list, messageData]);
    };

    useEffect(() => {
        if (!enabled) {
            return;
        }
        const socket = io(SOCKET_URL);

        // Join room connected to patient
        socket.emit("join_room", roomId);

        // Update message list when new message received
        socket.on("receive_message", data => {
            setMessageList(list => [...list, data]);
        });

        // Attempt to reconnect during connection error
        socket.on("reconnect", () => {
            socket.emit("join_room", patient_accountId);
        });

        ref.current = socket;
        return () => {
            socket.disconnect();
        };
    }, [enabled, patient_accountId, roomId]);

    return {
        send,
        messageList,
    };
};

export default useWebSockets;
