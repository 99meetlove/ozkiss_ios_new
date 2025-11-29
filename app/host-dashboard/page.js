"use client";

import { motion } from "framer-motion";
import NavigationBar from "@/components/ios/NavigationBar";
import IOSButton from "@/components/ios/Button";

export default function HostDashboard() {
  // Fake stats (connect to Supabase later)
  const stats = {
    earningsToday: 580,
    earningsMonth: 4200,
    bookingsToday: 3,
    rating: 4.9,
    status: "Verified",
  };

  const upcomingBookings = [
    { guest: "Michael", time: "2:00 PM", service: "Incall" },
    { guest: "Jason", time: "5:00 PM", service: "Outcall" },
  ];

  const quickActions = [
    { label: "My Services" },
    { label: "Media Manager" },
    { label: "Availability" },
    { label: "Bookings" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "#F2F2F7",
        minHeight: "100vh",
        paddingBottom: 40,
      }}
    >
      <NavigationBar title="Host Dashboard" />

      {/* EARNINGS CARD */}
      <div
        style={{
          margin: "20px 16px 0 16px",
          background: "white",
          borderRadius: 20,
          padding: "20px",
          border: "1px solid #E5E5EA",
        }}
      >
        <div style={{ fontSize: 15, opacity: 0.6 }}>Today’s Earnings</div>
        <div style={{ fontSize: 34, fontWeight: 700, marginTop: 6 }}>
          ${stats.earningsToday}
        </div>

        <div
          style={{
            fontSize: 15,
            opacity: 0.6,
            marginTop: 14,
            borderTop: "1px solid #E5E5EA",
            paddingTop: 14,
          }}
        >
          This Month
        </div>
        <div style={{ fontSize: 24, fontWeight: 600 }}>
          ${stats.earningsMonth}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div style={{ margin: "28px 16px 0 16px" }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 12,
            color: "#6e6e73",
          }}
        >
          Quick Actions
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14,
          }}
        >
          {quickActions.map((a, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: 18,
                padding: "18px",
                border: "1px solid #E5E5EA",
                fontSize: 16,
                fontWeight: 600,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {a.label}
            </div>
          ))}
        </div>
      </div>

      {/* UPCOMING BOOKINGS */}
      <div style={{ margin: "28px 16px 0 16px" }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 12,
            color: "#6e6e73",
          }}
        >
          Today’s Bookings
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid #E5E5EA",
          }}
        >
          {upcomingBookings.map((b, i) => (
            <div
              key={i}
              style={{
                padding: "16px 18px",
                borderBottom:
                  i < upcomingBookings.length - 1
                    ? "1px solid #E5E5EA"
                    : "none",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 600 }}>{b.guest}</div>
              <div style={{ opacity: 0.6 }}>{b.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RATING + STATUS */}
      <div style={{ margin: "28px 16px 0 16px" }}>
        <div
          style={{
            background: "white",
            borderRadius: 18,
            padding: "18px",
            border: "1px solid #E5E5EA",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 15, opacity: 0.6 }}>Rating</div>
            <div style={{ fontSize: 20, fontWeight: 600 }}>
              ⭐ {stats.rating}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 15, opacity: 0.6 }}>Status</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: stats.status === "Verified" ? "#34C759" : "orange",
              }}
            >
              {stats.status}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
