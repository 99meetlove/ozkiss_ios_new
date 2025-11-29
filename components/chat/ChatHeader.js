"use client";

import { useRouter } from "next/navigation";

export default function ChatHeader({ partner, isTyping, isBlocked, onSearch }) {
  const router = useRouter();

  return (
    <div
      className="w-full px-3 py-2 flex items-center gap-3 border-b"
      style={{
        backdropFilter: "blur(18px)",
        background: "rgba(255,255,255,0.75)",
        WebkitBackdropFilter: "blur(18px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="#007aff"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginLeft: -4 }}
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* AVATAR */}
      <img
        src={partner?.avatar || "/default-avatar.png"}
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* NAME + STATUS */}
      <div className="flex flex-col">
        <div className="text-[17px] font-semibold text-black">
          {partner?.name || "User"}
        </div>

        {/* STATUS */}
        {isBlocked ? (
          <span className="text-red-500 text-sm">Blocked</span>
        ) : isTyping ? (
          <span className="text-blue-500 text-sm flex items-center gap-1">
            <span className="typing-dots">
              <span></span><span></span><span></span>
            </span>
          </span>
        ) : (
          <span className="text-gray-500 text-sm">Online</span>
        )}
      </div>

      {/* RIGHT SIDE (Search) */}
      <div className="flex-1 flex justify-end">
        <button
          onClick={onSearch}
          className="flex items-center justify-center"
          style={{ width: 44, height: 44 }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            stroke="#007aff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="16.65" y1="16.65" x2="21" y2="21"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
