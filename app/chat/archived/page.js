"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import ChatListItem from "@/components/Chat/ChatListItem";
import "@/components/Chat/ChatList.css";

export default function ArchivedChatsPage() {
  const userId =
    typeof window !== "undefined"
      ? localStorage.getItem("user_id")
      : null;

  const [archivedRooms, setArchivedRooms] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const loadArchived = async () => {
      const { data, error } = await supabase
        .from("chat_rooms")
        .select("*")
        .eq("is_archived", true)
        .contains("participants", [userId]);

      if (!error) setArchivedRooms(data || []);
    };

    loadArchived();
  }, [userId]);

  return (
    <div className="chat-list">
      <h2 className="chat-section-title">Archived Chats</h2>
      {archivedRooms.length === 0 ? (
        <p className="chat-empty">No archived chats</p>
      ) : (
        archivedRooms.map((room) => (
          <ChatListItem key={room.id} room={room} />
        ))
      )}
    </div>
  );
}
