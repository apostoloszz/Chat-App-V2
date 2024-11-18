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
    // Tạo client STOMP với endpoint WebSocket
    const stompClient = Stomp.client("ws://localhost:8080/ws"); // Hoặc dùng SockJS nếu cần
    stompClient.reconnectDelay = 5000; // Thử kết nối lại sau 5 giây nếu bị ngắt

    // Biến để lưu callback xử lý tin nhắn
    let onMessageCallback = () => {};

    // Hàm kết nối WebSocket
    const connect = () => {
        stompClient.connect({}, () => {
            console.log("WebSocket connected");

            // Subscribe vào topic để nhận tin nhắn
            stompClient.subscribe("/topic/public", (message) => {
                if (onMessageCallback) {
                    onMessageCallback(JSON.parse(message.body)); // Gọi callback khi nhận tin nhắn
                }
            });

            // Gửi sự kiện "JOIN" để thông báo user đã tham gia
            stompClient.send("/app/chat.addUser", {}, JSON.stringify({
                sender: username,
                type: "JOIN",
            }));
        }, (error) => {
            console.error("WebSocket connection error:", error);
        });
    };

    // Hàm để gửi tin nhắn
    const sendMessage = (message) => {
        if (stompClient.connected) {
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
        } else {
            console.error("STOMP client is not connected");
        }
    };

    // Gán callback xử lý tin nhắn
    const onMessage = (callback) => {
        onMessageCallback = callback;
    };

    // Gọi hàm kết nối khi khởi tạo
    connect();

    // Trả về các phương thức
    return {
        sendMessage,
        onMessage,
    };
};

export default WebSocketClient;









