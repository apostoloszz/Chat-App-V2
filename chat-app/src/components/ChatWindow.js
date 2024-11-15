import React, { useEffect, useState } from "react";
import WebSocketClient from "../utils/WebSocketClient";
import MessageInput from "./MessageInput";
import UserList from "./UserList";

const ChatWindow = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = WebSocketClient(username);

    useEffect(() => {
        socket.onMessage((message) => {
            if (message.type === "USER_LIST") {
                setOnlineUsers(message.content);
            } else {
                setMessages((prev) => [...prev, message]);
            }
        });
    }, [socket]);

    const sendMessage = (content) => {
        const message = { sender: username, content, type: "CHAT" };
        socket.sendMessage(message);
        setMessages((prev) => [...prev, message]);
    };

    return (
        <div className="chat-window">
            <UserList users={onlineUsers} />
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === username ? "sent" : "received"}`}>
                        <strong>{msg.sender}: </strong>{msg.content}
                    </div>
                ))}
            </div>
            <MessageInput onSend={sendMessage} />
        </div>
    );
};

export default ChatWindow;
