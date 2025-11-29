"use client";

export default function ModalSheet({ visible, onClose, children }) {
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
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 20,
          paddingBottom: "calc(env(safe-area-inset-bottom) + 20px)",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.15)"
        }}
      >
        {children}
      </div>
    </div>
  );
}
 
