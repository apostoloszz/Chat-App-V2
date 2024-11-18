import React, { useState } from "react";
import EmojiPicker from "../utils/EmojiPicker";

const MessageInput = ({ onSend }) => {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim()) {
            onSend(input);
            setInput("");
        }
    };

    return (
        <div className="message-input">
            <EmojiPicker onSelect={(emoji) => setInput((prev) => prev + emoji)} />
            <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default MessageInput;
