"use client";

import { useState } from "react";
import Image from "next/image";

export default function InputBar({ onSend }) {
  const [text, setText] = useState("");
  const [drawer, setDrawer] = useState(false);

  return (
    <div
      style={{
        padding: 8,
        borderTop: "0.5px solid rgba(0,0,0,0.15)",
        background: "#fff"
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setDrawer(!drawer)}
          style={{ background: "none", border: "none" }}
        >
          <Image src="/icons/sf/plus.png" width={26} height={26} alt="plus" />
        </button>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message"
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: 20,
            border: "1px solid rgba(0,0,0,0.12)",
            outline: "none",
            fontSize: 16,
            background: "#f2f2f7"
          }}
        />

        <button
          onClick={() => {
            if (text.trim() === "") return;
            onSend(text);
            setText("");
          }}
          style={{ background: "none", border: "none" }}
        >
          <Image src="/icons/sf/send.png" width={26} height={26} alt="send" />
        </button>
      </div>
    </div>
  );
}
 
