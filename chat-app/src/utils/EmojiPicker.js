import React from "react";

const emojis = ["😀", "😂", "😍", "👍", "🎉", "❤️", "🔥", "🎁", "🙌", "💡"];

const EmojiPicker = ({ onSelect }) => (
    <div className="emoji-picker">
        {emojis.map((emoji, index) => (
            <span key={index} onClick={() => onSelect(emoji)}>
                {emoji}
            </span>
        ))}
    </div>
);

export default EmojiPicker;
