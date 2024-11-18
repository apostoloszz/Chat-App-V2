// import { Stomp } from "@stomp/stompjs";


// const WebSocketClient = (username) => {
//     const stompClient = Stomp.client("ws://localhost:8080/ws");
//     stompClient.connect({}, () => console.log("Connected to WebSocket"));

//     const connect = () => {
//         stompClient.connect({}, () => {
//             console.log("WebSocket connected");
//             stompClient.subscribe("/topic/public", (message) => {
//                 onMessageCallback(JSON.parse(message.body));
//             });
//             stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, type: "JOIN" }));
//         }, (error) => {
//             console.error("WebSocket connection error:", error);
//         });
//     };

//     let onMessageCallback = () => {};
//     stompClient.onMessage = (callback) => {
//         onMessageCallback = callback;
//     };

//     stompClient.sendMessage = (message) => {
//         if (stompClient.connected) {
//             stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
//         } else {
//             console.error("STOMP client is not connected");
//         }
//     };

//     connect();
//     return stompClient;
// };

// export default WebSocketClient;

import { Stomp } from "@stomp/stompjs";

const WebSocketClient = (username) => {
    const stompClient = Stomp.client("ws://localhost:8080/ws"); // Đảm bảo dùng ws:// khi kết nối WebSocket
    stompClient.connect({}, () => console.log("Connected to WebSocket"));

    const connect = () => {
        stompClient.connect({}, () => {
            console.log("WebSocket connected");

            stompClient.subscribe("/topic/public", (message) => {
                onMessageCallback(JSON.parse(message.body)); // Xử lý tin nhắn nhận được
            });

            stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: username, type: "JOIN" }));
        }, (error) => {
            console.error("WebSocket connection error:", error);
        });
    };

    let onMessageCallback = () => {}; // Callback để xử lý tin nhắn nhận được

    stompClient.onMessage = (callback) => {
        onMessageCallback = callback;
    };

    stompClient.sendMessage = (message) => {
        if (stompClient.connected) {
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message)); // Gửi tin nhắn đến endpoint tương ứng
        } else {
            console.error("STOMP client is not connected");
        }
    };

    connect(); // Kết nối WebSocket khi component được mount
    return stompClient;
};

export default WebSocketClient;






