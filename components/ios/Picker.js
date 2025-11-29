"use client";

export default function IOSPicker({ visible, options, value, onChange, onClose }) {
  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.25)",
        zIndex: 999
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          background: "#fff",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div style={{ textAlign: "center", padding: 12, fontWeight: 600, fontSize: 17 }}>
          Select
        </div>

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          size={5}
          style={{
            width: "100%",
            border: "none",
            padding: 20,
            fontSize: 18,
            outline: "none",
          }}
        >
          {options.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div
          onClick={onClose}
          style={{
            padding: 16,
            fontSize: 20,
            textAlign: "center",
            cursor: "pointer",
            color: "#007AFF"
          }}
        >
          Done
        </div>
      </div>
    </div>
  );
}
 
