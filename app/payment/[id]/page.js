"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import IOSButton from "@/components/ios/Button";
import NavigationBar from "@/components/ios/NavigationBar";

export default function PaymentPage({ params }) {
  const bookingId = params.id;

  const [booking, setBooking] = useState(null);

  async function load() {
    const data = await fetch(`/api/booking?id=${bookingId}`).then((r) =>
      r.json()
    );
    setBooking(data.data);
  }

  useEffect(() => {
    load();
  }, []);

  if (!booking)
    return <div style={{ padding: 20 }}>Loading…</div>;

  const finalPrice = booking.price * 1.15; // includes 15% client fee

  // ⭐ VERY IMPORTANT — PAY FUNCTION
  async function pay(method) {
    console.log("Paying with:", method);

    // Update booking status → paid
    await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({ booking_id: bookingId }),
    });

    // Redirect to success page
    window.location.href = `/payment-success?booking=${bookingId}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: "100vh",
        background: "#F2F2F7",
      }}
    >
      <NavigationBar title="Payment" />

      {/* PAYMENT CARD */}
      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: 24,
          margin: 16,
          border: "1px solid #E5E5EA",
          boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>
          {booking.host_name}
        </h2>

        <div style={{ opacity: 0.6, marginTop: 4 }}>
          {booking.service_label}
        </div>

        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            marginTop: 16,
          }}
        >
          ${finalPrice.toFixed(2)}
        </div>

        <div style={{ opacity: 0.5, marginTop: 4 }}>
          Includes 15% client fee
        </div>
      </div>

      {/* PAYMENT METHODS */}
      <div style={{ margin: "16px" }}>

        {/* VISA + MASTERCARD (same line) */}
        <div style={{ display: "flex", gap: 10 }}>
          <PaymentOption
            title="Visa"
            icon="/icons/visa.png"
            onClick={() => pay("visa")}
          />

          <PaymentOption
            title="Mastercard"
            icon="/icons/mastercard.png"
            onClick={() => pay("mastercard")}
          />
        </div>

        {/* ALIPAY */}
        <div style={{ marginTop: 12 }}>
          <PaymentOption
            title="Alipay"
            icon="/icons/alipay.png"
            onClick={() => pay("alipay")}
          />
        </div>

        {/* APPLE PAY */}
        <div style={{ marginTop: 12 }}>
          <IOSButton fullWidth bold onClick={() => pay("apple")}>
             Pay
          </IOSButton>
        </div>

        {/* GOOGLE PAY */}
        <div style={{ marginTop: 12 }}>
          <IOSButton fullWidth color="gray" onClick={() => pay("gpay")}>
            GPay
          </IOSButton>
        </div>

      </div>
    </motion.div>
  );
}

/* Components */

function PaymentOption({ title, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 18px",
        borderRadius: 14,
        background: "white",
        border: "1px solid #E5E5EA",
        cursor: "pointer",
      }}
    >
      <img src={icon} style={{ width: 32 }} />
      <div style={{ fontSize: 16, fontWeight: 600 }}>{title}</div>
    </div>
  );
}
