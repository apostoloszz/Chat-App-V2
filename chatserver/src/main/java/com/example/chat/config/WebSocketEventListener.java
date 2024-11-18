package com.example.chat.config;

import com.example.chat.entity.ChatMessage;
import com.example.chat.entity.Friend;
import com.example.chat.entity.MessageType;
import com.example.chat.repository.FriendRepository;
import com.example.chat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");

        if (username != null) {
            userRepository.findByUsername(username).ifPresent(user -> {
                user.setOnlineStatus(true);
                userRepository.save(user);
                log.info("User connected: {}", username);
                notifyFriendStatusChange(username, true); // Gửi thông báo online
            });
        }
        System.out.println("New WebSocket connection established");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");

        if (username != null) {
            log.info("User disconnected: {}", username);
            userRepository.findByUsername(username).ifPresent(user -> {
                user.setOnlineStatus(false);
                userRepository.save(user);
                notifyFriendStatusChange(username, false); // Gửi thông báo offline
            });

            var chatMessage = ChatMessage.builder()
                    .type(MessageType.LEAVER)
                    .sender(username)
                    .build();
            messagingTemplate.convertAndSend("/topic/public", chatMessage);
        }
        System.out.println("WebSocket connection closed");
    }

        private void notifyFriendStatusChange(String username, Boolean onlineStatus) {
        // Tìm bạn bè của người dùng và gửi thông báo về trạng thái mới
        userRepository.findByUsername(username).ifPresent(user -> {
            List<Friend> friends = friendRepository.findByFriendIdAndStatus(user.getId(), Friend.Status.ACCEPTED);
            friends.forEach(friend -> messagingTemplate.convertAndSendToUser(
                    friend.getUser().getUsername(),
                    "/queue/status",
                    Map.of("friend", username, "onlineStatus", onlineStatus)
            ));
        });
    }




}
