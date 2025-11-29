"use client";

import { uploadMedia } from "@/utils/uploadMedia";

export default function UploadButton({ onUpload }) {
  const handleSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadMedia(file);
    onUpload(url, file.type.startsWith("video") ? "video" : "image");
  };

  return (
    <div>
      <label className="cursor-pointer text-blue-500 font-medium">
        📎
        <input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleSelect}
        />
      </label>
    </div>
  );
}
