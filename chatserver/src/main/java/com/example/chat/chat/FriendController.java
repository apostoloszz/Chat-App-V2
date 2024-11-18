package com.example.chat.chat;

import com.example.chat.entity.Friend;
import com.example.chat.entity.User;
import com.example.chat.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    // Gửi yêu cầu kết bạn
    @PostMapping("/send-request")
    public ResponseEntity<Friend> sendFriendRequest(
            @RequestParam Long userId,
            @RequestParam Long friendId
    ) {
        Friend friendRequest = friendService.sendFriendRequest(userId, friendId);
        return ResponseEntity.ok(friendRequest);
    }

    // Chấp nhận yêu cầu kết bạn
    @PostMapping("/accept-request/{requestId}")
    public ResponseEntity<Friend> acceptFriendRequest(
            @PathVariable Long requestId
    ) {
        Friend acceptedRequest = friendService.acceptFriendRequest(requestId);
        return ResponseEntity.ok(acceptedRequest);
    }

    // Lấy danh sách bạn bè
    @GetMapping("/{userId}")
    public ResponseEntity<List<Friend>> getFriends(
            @PathVariable Long userId
    ) {
        List<Friend> friends = friendService.getFriends(userId);
        return ResponseEntity.ok(friends);
    }

    // Lấy danh sách bạn bè kèm trạng thái online/offline
    @GetMapping("/{userId}/list-with-status")
    public ResponseEntity<List<User>> getFriendListWithStatus(@PathVariable Long userId) {
        List<User> friends = friendService.getFriendListWithStatus(userId);
        return ResponseEntity.ok(friends);
    }

    // Tìm kiếm người dùng
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String keyword) {
        List<User> users = friendService.searchUsers(keyword);
        return ResponseEntity.ok(users);
    }
}
