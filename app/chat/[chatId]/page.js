"use client";

import { motion } from "framer-motion";
import NavigationBar from "@/components/ios/NavigationBar";

export default function ChatPage() {
  const messages = [
    { fromMe: false, text: "Hi! How can I help? 😊" },
    { fromMe: true, text: "I would like to make a booking." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <NavigationBar title="Chat" small={true} />

      <div style={{ padding: 16 }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: 12,
              display: "flex",
              justifyContent: msg.fromMe ? "flex-end" : "flex-start"
            }}
          >
            <div
              style={{
                background: msg.fromMe ? "black" : "#EFEFEF",
                color: msg.fromMe ? "white" : "black",
                padding: "10px 14px",
                borderRadius: 18,
                maxWidth: "70%"
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
