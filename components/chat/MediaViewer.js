"use client";

import { useState } from "react";

export default function MediaViewer({ items, index, onClose }) {
  const [current, setCurrent] = useState(index);

  const item = items[current];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90%] max-h-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "image" && (
          <img
            src={item.media_url}
            className="max-w-full max-h-full rounded-xl"
          />
        )}

        {item.type === "video" && (
          <video
            src={item.media_url}
            className="max-w-full max-h-full rounded-xl"
            controls
            autoPlay
          />
        )}
      </div>
    </div>
  );
}
