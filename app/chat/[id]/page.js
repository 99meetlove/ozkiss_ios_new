"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import ChatHeader from "@/components/chat/ChatHeader";
import ReactionBar from "@/components/chat/ReactionBar";
import BubbleTail from "@/components/chat/BubbleTail";
import MediaViewer from "@/components/chat/MediaViewer";
import SearchModal from "@/components/chat/SearchModal";
import VoiceWaveform from "@/components/chat/VoiceWaveform";
import iOSBackGesture from "@/components/chat/iOSBackGesture";
import "@/app/globals.css";

export default function ChatPage({ params }) {
  const chatId = params.id;

  // Logged in user
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  // ========= STATE =========
  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");
  const [replyTarget, setReplyTarget] = useState(null);

  const [chatPartner, setChatPartner] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);

  // Reaction
  const [activeReactionFor, setActiveReactionFor] = useState(null);

  // Media Viewer
  const [mediaViewerOpen, setMediaViewerOpen] = useState(false);
  const [mediaViewerIndex, setMediaViewerIndex] = useState(0);
  const [mediaItems, setMediaItems] = useState([]);

  // Search modal
  const [searchOpen, setSearchOpen] = useState(false);

  // refs
  const typingTimer = useRef(null);
  const containerRef = useRef(null);

  // Install iOS back gesture
  iOSBackGesture();
  // ========= LOAD CHAT PARTNER =========
  const loadPartner = async (chatRow) => {
    const partnerId = chatRow.participants.find((id) => id !== userId);

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", partnerId)
      .single();

    setChatPartner(data);
  };

  // ========= LOAD CHAT + MESSAGES + REACTIONS =========
  const loadChat = async () => {
    // Load chat row
    const { data: chatRow } = await supabase
      .from("chats")
      .select("*")
      .eq("id", chatId)
      .single();

    if (!chatRow) return;

    await loadPartner(chatRow);

    // Load messages
    const { data: msgs } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    // Load reactions
    const { data: reactions } = await supabase
      .from("chat_reactions")
      .select("*")
      .eq("chat_id", chatId);

    // Merge reactions into messages
    const merged = msgs.map((m) => {
      const r = reactions.filter((x) => x.message_id === m.id);

      const grouped = {};
      r.forEach((x) => {
        if (!grouped[x.reaction]) grouped[x.reaction] = [];
        grouped[x.reaction].push(x.user_id);
      });

      m.reactions = grouped;
      return m;
    });

    setMessages(merged);

    // Extract media items for MediaViewer
    setMediaItems(merged.filter((m) => m.type === "image" || m.type === "video"));

    // Scroll to bottom
    setTimeout(() => {
      containerRef.current?.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "auto",
      });
    }, 50);
  };

  // ========= SEND MESSAGE =========
  const sendText = async () => {
    if (!input.trim()) return;

    await supabase.from("chat_messages").insert({
      chat_id: chatId,
      sender_id: userId,
      type: "text",
      content: input,
      read_status: "sent",
      reply_to: replyTarget?.id || null,
    });

    setInput("");
    setReplyTarget(null);
  };

  // ========= TYPING =========
  const handleInput = (e) => {
    setInput(e.target.value);
    sendTyping();
  };

  const sendTyping = async () => {
    clearTimeout(typingTimer.current);

    await supabase.from("typing").upsert({
      chat_id: chatId,
      user_id: userId,
      is_typing: true,
    });

    typingTimer.current = setTimeout(async () => {
      await supabase.from("typing").upsert({
        chat_id: chatId,
        user_id: userId,
        is_typing: false,
      });
    }, 1500);
  };

  // ========= REACTIONS (TOGGLE) =========
  const toggleReaction = async (messageId, emoji) => {
    const { data: existing } = await supabase
      .from("chat_reactions")
      .select("*")
      .eq("message_id", messageId)
      .eq("user_id", userId)
      .single();

    // If same emoji → remove
    if (existing && existing.reaction === emoji) {
      await supabase.from("chat_reactions").delete().eq("id", existing.id);
    }
    // If different emoji → update
    else if (existing) {
      await supabase
        .from("chat_reactions")
        .update({ reaction: emoji })
        .eq("id", existing.id);
    }
    // No previous reaction → add
    else {
      await supabase.from("chat_reactions").insert({
        chat_id: chatId,
        message_id: messageId,
        user_id: userId,
        reaction: emoji,
      });
    }

    setActiveReactionFor(null);
  };

  // ========= REALTIME SUBSCRIPTIONS =========
  useEffect(() => {
    loadChat();

    const channel = supabase
      .channel("chat_v5_" + chatId)
      // messages
      .on(
        "postgres_changes",
        { event: "*", table: "chat_messages", filter: `chat_id=eq.${chatId}` },
        () => loadChat()
      )
      // reactions
      .on(
        "postgres_changes",
        { event: "*", table: "chat_reactions", filter: `chat_id=eq.${chatId}` },
        () => loadChat()
      )
      // typing
      .on(
        "postgres_changes",
        { event: "*", table: "typing", filter: `chat_id=eq.${chatId}` },
        async () => {
          const { data } = await supabase
            .from("typing")
            .select("*")
            .eq("chat_id", chatId)
            .eq("is_typing", true);

          setTypingUsers(data || []);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [chatId]);
  // ========= RENDER =========
  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white">

      {/* HEADER */}
      <ChatHeader
        partner={chatPartner}
        isTyping={typingUsers?.length > 0}
        isBlocked={isBlocked}
        onSearch={() => setSearchOpen(true)}
      />

      {/* FULLSCREEN MEDIA VIEWER */}
      {mediaViewerOpen && (
        <MediaViewer
          items={mediaItems}
          index={mediaViewerIndex}
          onClose={() => setMediaViewerOpen(false)}
        />
      )}

      {/* SEARCH MODAL */}
      {searchOpen && (
        <SearchModal
          messages={messages}
          onClose={() => setSearchOpen(false)}
          onJump={(index) => {
            const el = document.getElementById(`msg-${index}`);
            if (el)
              el.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            setSearchOpen(false);
          }}
        />
      )}

      {/* MESSAGE LIST */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{ background: "var(--chat-bg)" }}
      >
        {messages.map((msg, index) => {
          const mine = msg.sender_id === userId;
          const prev = messages[index - 1];
          const next = messages[index + 1];

          const isPrevSame = prev && prev.sender_id === msg.sender_id;
          const isNextSame = next && next.sender_id === msg.sender_id;

          // Bubble rounding – iMessage style
          const radiusStyle = {
            borderTopLeftRadius: mine ? 18 : isPrevSame ? 6 : 18,
            borderTopRightRadius: mine ? (isPrevSame ? 6 : 18) : 18,
            borderBottomLeftRadius: mine ? 18 : isNextSame ? 6 : 18,
            borderBottomRightRadius: mine ? (isNextSame ? 6 : 18) : 18,
          };

          // For detecting media items
          const mediaIndex = mediaItems.findIndex((x) => x.id === msg.id);

          return (
            <div
              key={msg.id}
              id={`msg-${index}`}
              className="relative"
              style={{
                display: "flex",
                justifyContent: mine ? "flex-end" : "flex-start",
                marginTop: isPrevSame ? 3 : 10,
                animation: "bubblePop 0.32s cubic-bezier(0.18,0.89,0.32,1.28)",
              }}
              // Long press = reaction bar
              onContextMenu={(e) => {
                e.preventDefault();
                setActiveReactionFor(msg.id);
              }}
              onClick={() => {
                if (activeReactionFor === msg.id) setActiveReactionFor(null);
              }}
            >
              {/* === BUBBLE === */}
              <div
                className={`imessage-bubble ${
                  mine ? "imessage-right" : "imessage-left"
                }`}
                style={radiusStyle}
              >
                {/* TEXT */}
                {msg.type === "text" && <div>{msg.content}</div>}

                {/* IMAGE */}
                {msg.type === "image" && (
                  <img
                    src={msg.media_url}
                    style={{
                      width: 200,
                      borderRadius: 14,
                      marginTop: 4,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setMediaViewerOpen(true);
                      setMediaViewerIndex(mediaIndex);
                    }}
                  />
                )}

                {/* VIDEO */}
                {msg.type === "video" && (
                  <video
                    src={msg.media_url}
                    controls
                    style={{
                      width: 200,
                      borderRadius: 14,
                      marginTop: 4,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setMediaViewerOpen(true);
                      setMediaViewerIndex(mediaIndex);
                    }}
                  />
                )}

                {/* VOICE */}
                {msg.type === "voice" && (
                  <VoiceWaveform url={msg.media_url} mine={mine} />
                )}

                {/* BUBBLE TAIL */}
                {!isNextSame && <BubbleTail mine={mine} />}
              </div>

              {/* === REACTIONS ON TOP OF BUBBLE === */}
              {msg.reactions &&
                Object.keys(msg.reactions).length > 0 && (
                  <div
                    className="absolute"
                    style={{
                      top: -22,
                      right: mine ? 0 : "auto",
                      left: mine ? "auto" : 0,
                      fontSize: 16,
                      background: "white",
                      padding: "2px 6px",
                      borderRadius: 12,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                      display: "flex",
                      gap: 4,
                      animation:
                        "reactionPop 0.25s cubic-bezier(0.18,0.89,0.32,1.28)",
                    }}
                  >
                    {Object.keys(msg.reactions).map((emoji) => (
                      <div key={emoji}>
                        {emoji}
                        {msg.reactions[emoji].length > 1 &&
                          ` x${msg.reactions[emoji].length}`}
                      </div>
                    ))}
                  </div>
                )}

              {/* === REACTION BAR === */}
              {activeReactionFor === msg.id && (
                <ReactionBar
                  onReact={(emoji) => toggleReaction(msg.id, emoji)}
                  onClose={() => setActiveReactionFor(null)}
                />
              )}
            </div>
          );
        })}

        {/* TYPING BUBBLE */}
        {typingUsers.length > 0 && (
          <div className="flex mt-3">
            <div className="typing-bubble">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>
      {/* INPUT BAR — iMessage Style */}
      {!isBlocked && (
        <div className="ios-input-bar">
          
          {/* Voice (future hook) */}
          <button
            onClick={() => {}}
            className="flex items-center justify-center"
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#e5e5ea",
              fontSize: 18,
            }}
          >
            🎤
          </button>

          {/* Upload (future hook) */}
          <button
            onClick={() => {}}
            className="flex items-center justify-center"
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "#e5e5ea",
              fontSize: 18,
            }}
          >
            ＋
          </button>

          {/* INPUT */}
          <input
            value={input}
            onChange={handleInput}
            className="ios-input-box"
            placeholder={
              replyTarget
                ? `Replying: ${replyTarget.content?.slice(0, 30)}...`
                : "iMessage"
            }
          />

          {/* SEND */}
          <button onClick={sendText} className="ios-send-btn">
            Send
          </button>
        </div>
      )}

    </div>
  );
}
