"use client";

export default function DropdownSheet({ visible, items, onSelect, onCancel }) {
  if (!visible) return null;

  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.2)",
        zIndex: 999
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "env(safe-area-inset-bottom)",
          left: 16,
          right: 16,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            overflow: "hidden",
            marginBottom: 8,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelect(item)}
              style={{
                padding: "14px 16px",
                textAlign: "center",
                borderTop: index > 0 ? "0.5px solid rgba(0,0,0,0.1)" : "none",
                fontSize: 18,
                cursor: "pointer"
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div
          onClick={onCancel}
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "14px 16px",
            textAlign: "center",
            fontSize: 18,
            cursor: "pointer"
          }}
        >
          Cancel
        </div>
      </div>
    </div>
  );
}
 
