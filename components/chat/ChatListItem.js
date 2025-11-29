"use client";

export default function ChatListItem({ chat, onClick }) {
  return (
    <div
      className="chat-list-item"
      onClick={onClick}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      {/* Avatar */}
      <img
        src={chat.avatar || "/default-avatar.png"}
        alt="avatar"
        className="chat-avatar"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      {/* Chat info */}
      <div className="chat-info" style={{ flex: 1 }}>
        <div className="chat-name">{chat.name || "Unknown User"}</div>
        <div className="chat-message">
          {chat.last_message || "No messages yet"}
        </div>
      </div>

      {/* Time */}
      <div className="chat-time">
        {chat.time ? new Date(chat.time).toLocaleTimeString() : ""}
      </div>
    </div>
  );
}
