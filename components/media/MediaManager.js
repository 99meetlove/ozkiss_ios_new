"use client";

import { useEffect, useState } from "react";
import UploadButton from "./UploadButton";
import PhotoGrid from "./PhotoGrid";
import MediaViewer from "./MediaViewer";

export default function MediaManager({ hostId }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  async function load() {
    const res = await fetch(`/api/media/list?host_id=${hostId}`);
    const out = await res.json();
    setItems(out.data || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <UploadButton hostId={hostId} onUploaded={load} />

      <div style={{ marginTop: 16 }}>
        <PhotoGrid items={items} onSelect={setSelected} />
      </div>

      <MediaViewer item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
