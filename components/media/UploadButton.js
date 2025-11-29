"use client";

import { useState } from "react";

export default function UploadButton({ hostId, onUploaded }) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("host_id", hostId);

    const res = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });

    const out = await res.json();

    setLoading(false);

    if (out.success) {
      if (onUploaded) onUploaded();
    } else {
      alert("Upload failed: " + out.error);
    }
  }

  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px 20px",
        background: "#111",
        color: "white",
        borderRadius: 14,
        fontSize: 16,
        fontWeight: 500,
        cursor: "pointer",
        width: "100%",
        textAlign: "center",
      }}
    >
      {loading ? "Uploading…" : "Upload Media"}
      <input
        type="file"
        accept="image/*,video/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
    </label>
  );
}
