"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import ChatListItem from "@/components/Chat/ChatListItem";
import "@/components/Chat/ChatList.css";

export default function ArchivedChatsPage() {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  const [chats, setChats] = useState([]);

  // Load archived chats
  const loadArchived = async () => {
    if (!userId) return;

    const { data: archiveRows } = await supabase
      .from("chat_archived")
      .select("*")
      .eq("user_id", userId);

    const ids = archiveRows?.map((x) => x.chat_id) || [];

    if (ids.length === 0) {
      setChats([]);
      return;
    }

    const { data: chatRows } = await supabase
      .from("chats")
      .select("*")
      .in("id", ids);

    const list = [];

    for (const chat of chatRows) {
      const partnerId = chat.participants.find((id) => id !== userId);

      const { data: partner } = await supabase
        .from("users")
        .select("*")
        .eq("id", partnerId)
        .single();

      const { data: lastMsg } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("chat_id", chat.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      const isTyping =
        lastMsg?.is_typing && lastMsg.sender_id === partnerId;

      list.push({
        chat,
        partner,
        lastMsg,
        isTyping,
      });
    }

    const sorted = list.sort((a, b) => {
      const t1 = a.lastMsg?.created_at || 0;
      const t2 = b.lastMsg?.created_at || 0;
      return new Date(t2) - new Date(t1);
    });

    setChats(sorted);
  };

  const unarchive = async (chatId) => {
    await supabase
      .from("chat_archived")
      .delete()
      .eq("chat_id", chatId)
      .eq("user_id", userId);

    loadArchived();
  };

  useEffect(() => {
    loadArchived();

    const channel = supabase
      .channel("archive_rt")
      .on(
        "postgres_changes",
        { event: "*", table: "chat_archived", schema: "public" },
        () => loadArchived()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        Archived Chats

        <button
          style={{ float: "right", fontSize: 14, color: "#007aff" }}
          onClick={() => (window.location.href = "/chat")}
        >
          Back
        </button>
      </div>

      <div className="chat-list">
        {chats.length === 0 && (
          <div className="empty-chat">No archived chats</div>
        )}

        {chats.map((c) => (
          <ChatListItem
            key={c.chat.id}
            chatId={c.chat.id}
            partner={c.partner}
            lastMsg={c.lastMsg}
            unread={0}
            isTyping={c.isTyping}
            isArchived={true}
            onUnarchive={unarchive}
          />
        ))}
      </div>
    </div>
  );
}
