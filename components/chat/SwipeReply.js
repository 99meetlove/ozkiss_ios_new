 
"use client";
import { useState } from "react";

export default function SwipeReply({ children, onSwipe }) {
  const [drag, setDrag] = useState(0);

  return (
    <div
      style={{ position: "relative", left: drag }}
      onTouchStart={(e) => setDrag(0)}
      onTouchMove={(e) => {
        const dx = e.touches[0].clientX - e.touches[0].screenX;
        if (dx > 20 && dx < 60) setDrag(dx);
      }}
      onTouchEnd={() => {
        if (drag > 50) onSwipe();
        setDrag(0);
      }}
    >
      {children}
    </div>
  );
}
