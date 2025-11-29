"use client";

export default function BubbleTail({ mine }) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      style={{
        position: "absolute",
        bottom: 0,
        [mine ? "right" : "left"]: -12,
      }}
    >
      {mine ? (
        // BLUE RIGHT TAIL
        <path
          d="M2 20 C10 12, 12 6, 12 0 L16 0 L16 20 Z"
          fill="#007aff"
        />
      ) : (
        // GRAY LEFT TAIL
        <path
          d="M14 20 C6 12, 4 6, 4 0 L0 0 L0 20 Z"
          fill="#e5e5ea"
        />
      )}
    </svg>
  );
}
