"use client";

export default function QuickReply({ text, onSelect }) {
  return (
    <button
      onClick={() => onSelect(text)}
      style={{
        background: "#EFEFF4",
        borderRadius: 16,
        padding: "6px 12px",
        marginRight: 6,
        border: "none",
        fontSize: 14,
      }}
    >
      {text}
    </button>
  );
}
 
