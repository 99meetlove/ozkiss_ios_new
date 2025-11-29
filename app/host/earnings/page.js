"use client";

import { motion } from "framer-motion";
import NavigationBar from "@/components/ios/NavigationBar";
import IOSButton from "@/components/ios/Button";

export default function HostEarningsPage() {
  // Fake earnings — we connect real data later in Part C
  const earnings = {
    today: 580,
    week: 2100,
    month: 4200,
    lifetime: 12800,
  };

  const transactions = [
    { id: 1, user: "Michael", amount: 240, time: "Today 1:30 PM", status: "completed" },
    { id: 2, user: "Aria", amount: 260, time: "Yesterday", status: "completed" },
    { id: 3, user: "Jason", amount: 180, time: "3 days ago", status: "pending" },
    { id: 4, user: "Chris", amount: 260, time: "Last week", status: "cancelled" },
  ];

  const badgeColors = {
    completed: "#34C759",
    pending: "#FFCC00",
    cancelled: "#FF3B30",
  };

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
      <NavigationBar title="Earnings" />

      {/* TOP CARD */}
      <div
        style={{
          margin: "20px 16px 0 16px",
          background: "white",
          borderRadius: 20,
          padding: "20px",
          border: "1px solid #E5E5EA",
        }}
      >
        <EarningRow label="Today" value={`$${earnings.today}`} big />

        <div style={{ marginTop: 16 }}>
          <EarningRow label="This Week" value={`$${earnings.week}`} />
          <EarningRow label="This Month" value={`$${earnings.month}`} />
          <EarningRow label="Lifetime" value={`$${earnings.lifetime}`} />
        </div>
      </div>

      {/* REQUEST PAYOUT */}
      <div style={{ margin: "28px 16px" }}>
        <IOSButton fullWidth bold onClick={() => alert("Payout requested (mock)")}>
          Request Payout
        </IOSButton>
      </div>

      {/* TRANSACTION HISTORY */}
      <div style={{ margin: "0 16px" }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            marginBottom: 12,
            color: "#6e6e73",
          }}
        >
          Transaction History
        </div>

        <div
          style={{
            background: "white",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid #E5E5EA",
          }}
        >
          {transactions.map((t, i) => (
            <div
              key={t.id}
              style={{
                padding: "16px 18px",
                borderBottom: i < transactions.length - 1 ? "1px solid #E5E5EA" : "none",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{t.user}</div>
                <div style={{ opacity: 0.6, marginTop: 4 }}>{t.time}</div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>${t.amount}</div>

                <div
                  style={{
                    marginTop: 4,
                    background: badgeColors[t.status],
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: 12,
                    fontSize: 12,
                    display: "inline-block",
                  }}
                >
                  {t.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------ COMPONENTS ------------------ */

function EarningRow({ label, value, big }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: big ? "0" : "10px 0",
      }}
    >
      <div
        style={{
          fontSize: big ? 16 : 15,
          opacity: big ? 0.8 : 0.6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: big ? 32 : 18,
          fontWeight: big ? 700 : 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}
