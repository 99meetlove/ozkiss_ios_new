"use client";

export default function IOSSwitch({ value, onChange }) {
  return (
    <label style={{ position: "relative", display: "inline-block", width: 51, height: 31 }}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        style={{ display: "none" }}
      />

      <span
        style={{
          position: "absolute",
          cursor: "pointer",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: value ? "#34C759" : "#E5E5EA",
          borderRadius: 16,
          transition: "0.3s",
        }}
      ></span>

      <span
        style={{
          position: "absolute",
          top: 3,
          left: value ? 26 : 3,
          width: 25,
          height: 25,
          background: "white",
          borderRadius: "50%",
          transition: "0.3s",
        }}
      ></span>
    </label>
  );
}

 
