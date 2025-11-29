"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavigationBar from "@/components/ios/NavigationBar";
import IOSButton from "@/components/ios/Button";

export default function ClientBookings() {
  const [bookings, setBookings] = useState([]);

  async function load() {
    const data = await fetch("/api/bookings/me").then((r) => r.json());
    setBookings(data.data || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{ background: "#F2F2F7", minHeight: "100vh" }}
    >
      <NavigationBar title="My Bookings" />

      <div style={{ padding: 16 }}>
        {bookings.length === 0 && (
          <div style={{ opacity: 0.6, padding: 20 }}>No bookings yet.</div>
        )}

        {bookings.map((b) => (
          <div
            key={b.id}
            onClick={() => (window.location.href = `/booking/${b.id}`)}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 20,
              border: "1px solid #E5E5EA",
              marginBottom: 14,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              {b.host_name}
            </div>

            <div style={{ marginTop: 4, opacity: 0.6 }}>
              {b.service_label}
            </div>

            <div style={{ marginTop: 8, fontSize: 16 }}>
              {b.date} · {b.time}
            </div>

            <StatusBadge status={b.status} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  let bg = "#E5E5EA";
  let color = "#000";

  if (status === "paid") {
    bg = "#34C75933";
    color = "#34C759";
  } else if (status === "pending") {
    bg = "#FFCC0033";
    color = "#FF9500";
  } else if (status === "cancelled") {
    bg = "#FF3B3033";
    color = "#FF3B30";
  }

  return (
    <div
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: 10,
        marginTop: 12,
        background: bg,
        color: color,
        fontWeight: 600,
        fontSize: 14,
      }}
    >
      {status}
    </div>
  );
}
