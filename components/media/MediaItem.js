"use client";

const statusColors = {
  approved: "#34C759",
  pending: "#FFCC00",
  rejected: "#FF3B30",
};

export default function MediaItem({ item, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        background: "#DDD",
        cursor: "pointer",
      }}
    >
      <img
        src={item.thumbnail_url || item.file_url}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <div
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          background: statusColors[item.status],
          color: "white",
          padding: "2px 6px",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        {item.status}
      </div>
    </div>
  );
}
