"use client";
import Image from "next/image";

export default function DragPreview({ file }) {
  if (!file) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        left: 20,
        padding: 8,
        background: "#fff",
        borderRadius: 14,
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
      }}
    >
      <Image
        src={URL.createObjectURL(file)}
        width={120}
        height={120}
        alt="preview"
        style={{ borderRadius: 12, objectFit: "cover" }}
      />
    </div>
  );
}
 
