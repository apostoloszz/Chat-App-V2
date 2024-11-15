package com.example.chat.repository;

import com.example.chat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndRecipientIdOrRecipientIdAndSenderIdOrderByTimestampAsc(
            Long senderId, Long recipientId, Long recipientIdReverse, Long senderIdReverse
    );
}
