"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import IOSButton from "@/components/ios/Button";
import NavigationBar from "@/components/ios/NavigationBar";
import { supabase } from "@/lib/supabase";

export default function ChatRoom({ params }) {
  const roomId = params.roomId;
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);

  const listRef = useRef(null);

  // === Upload Image ===
  async function uploadImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);
    form.append("room", roomId);

    await fetch("/api/chat/upload", {
      method: "POST",
      body: form,
    });

    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 300);
  }

  // === Load Data ===
  async function load() {
    const room = await fetch(`/api/chat/room?id=${roomId}`).then((r) =>
      r.json()
    );
    setOtherUser(room.other);

    const data = await fetch(`/api/chat/messages?room=${roomId}`).then((r) =>
      r.json()
    );
    setMessages(data.data);
  }

  // === Realtime ===
  useEffect(() => {
    load();

    // Messages realtime
    const msgChannel = supabase
      .channel("chat_" + roomId)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);

          setTimeout(() => {
            listRef.current?.scrollTo({
              top: listRef.current.scrollHeight,
              behavior: "smooth",
            });
          }, 80);
        }
      )
      .subscribe();

    // Typing realtime
    const typingChannel = supabase
      .channel("typing_" + roomId)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "chat_rooms" },
        (payload) => {
          if (payload.new.typing_user === otherUser?.id) {
            setTyping(true);
            setTimeout(() => setTyping(false), 1500);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(msgChannel);
      supabase.removeChannel(typingChannel);
    };
  }, [otherUser]);

  // === Send Message ===
  async function sendMessage() {
    if (!text.trim()) return;

    await fetch("/api/chat/send", {
      method: "POST",
      body: JSON.stringify({
        room_id: roomId,
        text,
      }),
    });

    setText("");
  }

  // === Text input typing indicator ===
  async function handleTyping(e) {
    setText(e.target.value);

    await fetch("/api/chat/typing", {
      method: "POST",
      body: JSON.stringify({
        room_id: roomId,
        typing: true,
      }),
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        minHeight: "100vh",
        background: "#F2F2F7",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavigationBar
        title={otherUser?.name || "Chat"}
        avatar={otherUser?.avatar_url}
        status={otherUser?.is_online ? "Online" : "Last seen recently"}
      />

      {/* Messages */}
      <div
        ref={listRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
        }}
      >
        {messages.map((m) => (
          <Bubble
            key={m.id}
            mine={m.sender_id !== otherUser?.id}
            image={m.image_url}
          >
            {m.text}
          </Bubble>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <div
            style={{
              opacity: 0.6,
              margin: "8px 0 4px 8px",
              fontSize: 14,
            }}
          >
            {otherUser?.name} is typing…
          </div>
        )}
      </div>

      {/* INPUT BAR */}
      <div
        style={{
          padding: 12,
          background: "white",
          borderTop: "1px solid #E5E5EA",
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        {/* Upload */}
        <label
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: "#E5E5EA",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontSize: 20,
            fontWeight: 600,
            userSelect: "none",
          }}
        >
          +
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => uploadImage(e)}
          />
        </label>

        {/* Text input */}
        <input
          value={text}
          onChange={handleTyping}
          placeholder="Message..."
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 20,
            border: "1px solid #E5E5EA",
            fontSize: 15,
            outline: "none",
            background: "#F2F2F7",
          }}
        />

        {/* Send */}
        <div style={{ minWidth: 70 }}>
          <IOSButton small onClick={sendMessage}>
            Send
          </IOSButton>
        </div>
      </div>
    </motion.div>
  );
}

function Bubble({ children, mine, image }) {
  return (
    <div
      style={{
        maxWidth: "75%",
        marginBottom: 12,
        marginLeft: mine ? "auto" : 0,
        background: mine ? "black" : "white",
        color: mine ? "white" : "black",
        padding: image ? 0 : "10px 14px",
        borderRadius: 20,
        border: mine ? "none" : "1px solid #E5E5EA",
        overflow: "hidden",
      }}
    >
      {image && (
        <img
          src={image}
          style={{
            width: "100%",
            display: "block",
            borderRadius: 12,
          }}
        />
      )}

      {!image && children}
    </div>
  );
}
