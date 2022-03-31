import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../utils/constants";
import { serverURL } from "@frontend/config/index";

type Props = {
    patient_accountId: number;
    enabled: boolean;
};

type Message = {
    roomId: string;
    Author_AccountId: number;
    Doctor_AccountId: number;
    Patient_AccountId: number;
    Content: string;
};

// Hook for web socket connection and functionalities
const useWebSockets = ({ patient_accountId, enabled }: Props) => {
    const ref = useRef<Socket>();
    const [messageList, setMessageList] = useState<Message[]>([]);
    const roomId = `${patient_accountId}`;

    // Get past messages
    function getMessage() {
        fetch(serverURL + `/communication/getMessage/${patient_accountId}`)
            .then(response => response.json())
            .then(pastMessages => {
                console.log("past messages", pastMessages);
                setMessageList(pastMessages);
            });
    }

    // Send mesages to socket
    const send = (author_accountId: number, msg: string, doctor_accountId: number, patient_accountId: number) => {
        const messageData: Message = {
            roomId: roomId,
            Author_AccountId: author_accountId,
            Content: msg,
            Doctor_AccountId: doctor_accountId,
            Patient_AccountId: patient_accountId,
        };
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

        getMessage();
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
    }, []);

    return {
        send,
        messageList,
    };
};

export default useWebSockets;
