"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function iOSBackGesture() {
  const router = useRouter();

  useEffect(() => {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const onTouchStart = (e) => {
      // Only start gesture if touching from very left edge
      if (e.touches[0].clientX < 25) {
        isDragging = true;
        startX = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;

      const diff = currentX - startX;

      // Optional: you can add UI translation here
    };

    const onTouchEnd = () => {
      if (!isDragging) return;

      const diff = currentX - startX;

      if (diff > 70) {
        router.back();
      }

      isDragging = false;
      startX = 0;
      currentX = 0;
    };

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return null;
}
