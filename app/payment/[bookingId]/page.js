"use client";

import NavigationBar from "@/components/ios/NavigationBar";
import IOSButton from "@/components/ios/Button";
import { motion } from "framer-motion";

export default function PaymentPage({ params }) {
  const bookingId = params.bookingId;

  // Fake booking summary (we connect to Supabase later)
  const booking = {
    host: "Samantha",
    service: "Incall",
    time: "3:00 PM",
    price: 240,
  };

  const methods = [
    { label: "Visa / Mastercard", icon: "💳" },
    { label: "Apple Pay", icon: "" },
    { label: "Google Pay", icon: "🟦" },
  ];

  const user = {
    name: "Bernard",
    email: "bernard@example.com",
    phone: "+61 412 345 678",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        paddingBottom: 40,
        background: "#F2F2F7",
        minHeight: "100vh",
      }}
    >
      <NavigationBar title="Payment" />

      {/* SUMMARY */}
      <Card title="Booking Summary">
        <Row label="Host" value={booking.host} />
        <Row label="Service" value={booking.service} />
        <Row label="Time" value={booking.time} />
        <Row
          label="Price"
          value={`$${booking.price}`}
          bold
        />
      </Card>

      {/* PAYMENT METHODS */}
      <Card title="Payment Method">
        {methods.map((m, i) => (
          <div
            key={i}
            style={{
              padding: "16px 18px",
              borderBottom: i < methods.length - 1 ? "1px solid #E5E5EA" : "none",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 20 }}>{m.icon}</span>
            <span>{m.label}</span>
          </div>
        ))}
      </Card>

      {/* CONTACT INFO */}
      <Card title="Contact Information">
        <Row label="Name" value={user.name} />
        <Row label="Email" value={user.email} />
        <Row label="Phone" value={user.phone} />
      </Card>

      {/* PAY NOW */}
      <div style={{ margin: "40px 16px" }}>
        <IOSButton fullWidth bold>
          Pay ${booking.price}
        </IOSButton>
      </div>
    </motion.div>
  );
}

/* ---------------------------------- COMPONENTS ---------------------------------- */

function Card({ title, children }) {
  return (
    <div style={{ margin: "24px 16px 0 16px" }}>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#6e6e73",
          marginBottom: 10,
          paddingLeft: 4,
        }}
      >
        {title}
      </div>

      <div
        style={{
          background: "white",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid #E5E5EA",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div
      style={{
        padding: "16px 18px",
        borderBottom: "1px solid #E5E5EA",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 16,
      }}
    >
      <span>{label}</span>
      <span style={{ opacity: 0.75, fontWeight: bold ? 700 : 400 }}>
        {value}
      </span>
    </div>
  );
}
