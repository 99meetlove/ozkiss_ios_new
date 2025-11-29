"use client";

import { motion } from "framer-motion";
import IOSButton from "@/components/ios/Button";

export default function PaymentSuccess({ searchParams }) {
  const bookingId = searchParams.booking;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      style={{
        minHeight: "100vh",
        background: "#F2F2F7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: 20,
      }}
    >
      {/* SUCCESS CIRCLE */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.45,
          type: "spring",
          bounce: 0.45,
        }}
        style={{
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "#34C759",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: 68,
          boxShadow: "0 12px 30px rgba(52,199,89,0.35)",
        }}
      >
        ✓
      </motion.div>

      {/* TEXT */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        style={{ marginTop: 28, textAlign: "center" }}
      >
        <div style={{ fontSize: 28, fontWeight: 700 }}>
          Payment Successful
        </div>
        <div style={{ opacity: 0.6, marginTop: 6 }}>
          Your booking is now confirmed.
        </div>
      </motion.div>

      {/* BUTTONS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        style={{ width: "100%", marginTop: 40 }}
      >
        <IOSButton
          fullWidth
          bold
          onClick={() => (window.location.href = `/booking/${bookingId}`)}
        >
          View Booking Details
        </IOSButton>

        <div style={{ height: 12 }} />

        <IOSButton
          fullWidth
          color="gray"
          onClick={() => (window.location.href = "/")}
        >
          Back to Home
        </IOSButton>
      </motion.div>
    </motion.div>
  );
}
