"use client";

export default function PreviewBubble({ url, type }) {
  if (type === "video")
    return (
      <video
        controls
        className="rounded-xl max-w-[200px] bg-black"
        src={url}
      />
    );

  return (
    <img
      src={url}
      className="rounded-xl max-w-[200px]"
      alt="preview"
    />
  );
}
