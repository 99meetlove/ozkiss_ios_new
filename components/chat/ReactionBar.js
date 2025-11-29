"use client";

export default function ReactionBar({ onReact, onClose }) {
  const reactions = ["❤️", "👍", "👎", "😂", "❗", "❓"];

  return (
    <div
      className="absolute z-50 bg-white shadow-lg px-3 py-2 rounded-full flex gap-2"
      style={{
        top: "-48px",
        left: "50%",
        transform: "translateX(-50%)",
        backdropFilter: "blur(20px)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {reactions.map((r) => (
        <button
          key={r}
          onClick={() => onReact(r)}
          style={{
            fontSize: 22,
            padding: "3px 6px",
          }}
        >
          {r}
        </button>
      ))}

      <button
        onClick={onClose}
        style={{ marginLeft: 5, opacity: 0.5 }}
      >
        ✖
      </button>
    </div>
  );
}
