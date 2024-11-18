package com.example.chat.entity;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {
    private String sender;
    private String recipient;
    private String content;
    private String contentType; // TEXT, EMOJI, STICKER
    private MessageType type;   // CHAT, JOIN, LEAVER
}

