"use client";

export default function ChatListItem({ item }) {
  return (
    <div className="chat-list-item">
      <div style={{ fontWeight: 600 }}>
        {item?.title || "Chat Item"}
      </div>
      <div style={{ fontSize: 12, color: "#777" }}>
        {item?.last || "No messages yet"}
      </div>
    </div>
  );
}
