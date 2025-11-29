"use client";
import Image from "next/image";

export default function AppDrawer({ open }) {
  if (!open) return null;

  return (
    <div
      style={{
        padding: 12,
        display: "flex",
        gap: 18,
        borderTop: "0.5px solid rgba(0,0,0,0.12)"
      }}
    >
      <Image src="/icons/sf/camera.png" width={28} height={28} alt="camera" />
      <Image src="/icons/sf/photo.png" width={28} height={28} alt="photo" />
      <Image src="/icons/sf/location.png" width={28} height={28} alt="loc" />
    </div>
  );
}
 
