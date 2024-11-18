package com.example.chat.repository;

import com.example.chat.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    List<Friend> findByUserIdAndStatus(Long userId, Friend.Status status);

    List<Friend> findByFriendIdAndStatus(Long friendId, Friend.Status status);
}
