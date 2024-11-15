// import { Stomp } from "@stomp/stompjs";
//
// const WebSocketClient = (username) => {
//     const stompClient = Stomp.client("ws://localhost:8080/ws");
//
//     const connect = () => {
//         stompClient.connect({}, () => {
//             stompClient.subscribe("/topic/public", (message) => {
//                 const parsedMessage = JSON.parse(message.body);
//                 onMessageCallback(parsedMessage);
//             });
//
//             stompClient.subscribe(`/user/${username}/queue/messages`, (message) => {
//                 const parsedMessage = JSON.parse(message.body);
//                 onMessageCallback(parsedMessage);
//             });
//
//             stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, type: "JOIN" }));
//         });
//     };
//
//     let onMessageCallback = () => {};
//     stompClient.onMessage = (callback) => {
//         onMessageCallback = callback;
//     };
//
//     stompClient.sendMessage = (message) => {
//         stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
//     };
//
//     stompClient.sendPrivateMessage = (message) => {
//         stompClient.send("/app/chat.privateMessage", {}, JSON.stringify(message));
//     };
//
//     connect();
//
//     return stompClient;
// };
//
// export default WebSocketClient;

import { Stomp } from "@stomp/stompjs";

const WebSocketClient = (username) => {
    const stompClient = Stomp.client("ws://localhost:8080/ws");

    const connect = () => {
        stompClient.connect({}, () => {
            console.log("WebSocket connected");
            stompClient.subscribe("/topic/public", (message) => {
                onMessageCallback(JSON.parse(message.body));
            });
            stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, type: "JOIN" }));
        }, (error) => {
            console.error("WebSocket connection error:", error);
        });
    };

    let onMessageCallback = () => {};
    stompClient.onMessage = (callback) => {
        onMessageCallback = callback;
    };

    stompClient.sendMessage = (message) => {
        if (stompClient.connected) {
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
        } else {
            console.error("STOMP client is not connected");
        }
    };

    connect();
    return stompClient;
};

export default WebSocketClient;





