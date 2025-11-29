"use client";

import { useEffect, useState } from "react";
import NavigationBar from "@/components/ios/NavigationBar";
import IOSButton from "@/components/ios/Button";
import { motion } from "framer-motion";

export default function HostMediaPage() {
  const [media, setMedia] = useState([]);

  // Fake data for now (later connect to Supabase)
  useEffect(() => {
    setMedia([
      {
        id: 1,
        url: "https://i.pravatar.cc/600?img=20",
        type: "photo",
        status: "approved",
      },
      {
        id: 2,
        url: "https://i.pravatar.cc/600?img=25",
        type: "photo",
        status: "pending",
      },
      {
        id: 3,
        url: "https://i.pravatar.cc/600?img=45",
        type: "photo",
        status: "rejected",
      },
    ]);
  }, []);

  const statusColor = {
    approved: "#34C759",
    pending: "#FFCC00",
    rejected: "#FF3B30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "#F2F2F7",
        minHeight: "100vh",
        paddingBottom: 90,
      }}
    >
      <NavigationBar title="Media Manager" />

      {/* GRID */}
      <div
        style={{
          padding: "16px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        {media.map((m) => (
          <div
            key={m.id}
            style={{
              borderRadius: 12,
              overflow: "hidden",
              position: "relative",
              background: "#DDD",
            }}
          >
            <img
              src={m.url}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* Status Badge */}
            <div
              style={{
                position: "absolute",
                right: 6,
                top: 6,
                padding: "2px 6px",
                fontSize: 11,
                borderRadius: 6,
                background: statusColor[m.status],
                color: "white",
                fontWeight: 600,
              }}
            >
              {m.status}
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD BUTTON */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
      >
        <IOSButton bold onClick={() => alert("Upload coming soon")}>
          Upload Media
        </IOSButton>
      </div>
    </motion.div>
  );
}
