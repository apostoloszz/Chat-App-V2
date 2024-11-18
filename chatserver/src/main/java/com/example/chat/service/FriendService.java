package com.example.chat.service;

import com.example.chat.entity.Friend;
import com.example.chat.entity.User;
import com.example.chat.repository.FriendRepository;
import com.example.chat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    // Gửi yêu cầu kết bạn
    public Friend sendFriendRequest(Long userId, Long friendId) {
        if (userId.equals(friendId)) {
            throw new IllegalArgumentException("Cannot send friend request to yourself.");
        }

        // Kiểm tra xem yêu cầu đã tồn tại chưa
        if (friendRepository.findByUserIdAndStatus(userId, Friend.Status.PENDING)
                .stream()
                .anyMatch(f -> f.getFriend().getId().equals(friendId))) {
            throw new IllegalStateException("Friend request already sent.");
        }

        // Tìm user và friend
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found."));
        User friend = userRepository.findById(friendId).orElseThrow(() -> new IllegalArgumentException("Friend not found."));

        // Tạo yêu cầu kết bạn
        Friend friendRequest = Friend.builder()
                .user(user)
                .friend(friend)
                .status(Friend.Status.PENDING)
                .build();

        return friendRepository.save(friendRequest);
    }

    // Chấp nhận yêu cầu kết bạn
    public Friend acceptFriendRequest(Long requestId) {
        Friend friendRequest = friendRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found."));

        if (!friendRequest.getStatus().equals(Friend.Status.PENDING)) {
            throw new IllegalStateException("Friend request is not pending.");
        }

        friendRequest.setStatus(Friend.Status.ACCEPTED);
        return friendRepository.save(friendRequest);
    }

    // Lấy danh sách bạn bè
    public List<Friend> getFriends(Long userId) {
        return friendRepository.findByUserIdAndStatus(userId, Friend.Status.ACCEPTED);
    }

    // Lấy danh sách bạn bè kèm trạng thái online
    public List<User> getFriendsWithStatus(Long userId) {
        // Lấy tất cả bạn bè đã chấp nhận
        List<Friend> friends = friendRepository.findByUserIdAndStatus(userId, Friend.Status.ACCEPTED);

        // Lấy thông tin User từ danh sách bạn bè
        List<User> friendList = friends.stream()
                .map(Friend::getFriend)
                .toList();

        return friendList;
    }

    public List<User> searchUsers(String keyword) {
        // Tìm kiếm bạn bè theo tên hoặc email chứa keyword
        return userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword);
    }

    public List<User> getFriendListWithStatus(Long userId) {
        // Lấy danh sách bạn bè đã chấp nhận
        List<Friend> acceptedFriends = friendRepository.findByUserIdAndStatus(userId, Friend.Status.ACCEPTED);

        // Trả về danh sách User kèm trạng thái
        return acceptedFriends.stream()
                .map(Friend::getFriend)
                .toList();
    }

}
