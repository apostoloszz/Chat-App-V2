import React from "react";

const UserList = ({ users, onPrivateChat }) => (
    <div className="user-list">
        <h3>Online Users</h3>
        <ul>
            {users.map((user) => (
                <li key={user} onClick={() => onPrivateChat(user)}>
                    {user}
                </li>
            ))}
        </ul>
    </div>
);

export default UserList;
