"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import ChatListItem from "@/components/Chat/ChatListItem.js";
import "@/components/Chat/ChatList.css";

export default function ArchivedChatsPage() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load archived chats
  useEffect(() => {
    const loadChats = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setChats([]);
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", userId)
        .eq("archived", true)
        .order("updated_at", { ascending: false });

      if (!error && data) {
        setChats(data);
      }

      setLoading(false);
    };

    loadChats();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Archived Chats</h1>

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : chats.length === 0 ? (
        <p className="text-gray-500">No archived chats</p>
      ) : (
        <div className="chat-list">
          {chats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} />
          ))}
        </div>
      )}
    </div>
  );
}
