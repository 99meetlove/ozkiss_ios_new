"use client";

export default function PhotoGrid({ items, onSelect }) {
  return (
    <div
      style={{
        columnCount: 3,
        columnGap: "8px",
        width: "100%",
      }}
    >
      {items.map((m) => (
        <img
          key={m.id}
          src={m.thumbnail_url}
          onClick={() => onSelect(m)}
          style={{
            width: "100%",
            marginBottom: 8,
            borderRadius: 12,
            cursor: "pointer",
            display: "block",
          }}
        />
      ))}
    </div>
  );
}
