"use client";

import { useState } from "react";
import NavigationBar from "@/components/ios/NavigationBar";
import IOSButton from "@/components/ios/Button";
import { motion } from "framer-motion";

export default function BookingPage({ params }) {
  const hostId = params.hostId;

  // Multi-step state
  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [time, setTime] = useState(null);

  // Fake services (will connect to Supabase later)
  const services = [
    { name: "Incall", price: 240 },
    { name: "Outcall", price: 260 },
    { name: "Dinner Date", price: 300 },
  ];

  const times = [
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{ paddingBottom: 40 }}
    >
      <NavigationBar title="Booking" />

      {/* STEP 1 — Choose Service */}
      {step === 1 && (
        <div style={{ padding: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            Choose Service
          </h2>

          {services.map((s, i) => (
            <div
              key={i}
              onClick={() => setService(s)}
              style={{
                padding: "16px 20px",
                borderRadius: 18,
                background: service?.name === s.name ? "black" : "white",
                color: service?.name === s.name ? "white" : "black",
                marginBottom: 12,
                border: "1px solid #E5E5EA",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 17, fontWeight: 600 }}>{s.name}</div>
              <div style={{ opacity: service?.name === s.name ? 1 : 0.6 }}>
                ${s.price}/hr
              </div>
            </div>
          ))}

          <IOSButton
            fullWidth
            disabled={!service}
            style={{ marginTop: 20 }}
            onClick={() => setStep(2)}
          >
            Continue
          </IOSButton>
        </div>
      )}

      {/* STEP 2 — Choose Time */}
      {step === 2 && (
        <div style={{ padding: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            Choose Time
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {times.map((t, i) => (
              <div
                key={i}
                onClick={() => setTime(t)}
                style={{
                  padding: "16px 20px",
                  borderRadius: 18,
                  background: time === t ? "black" : "white",
                  color: time === t ? "white" : "black",
                  border: "1px solid #E5E5EA",
                  cursor: "pointer",
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", marginTop: 20, gap: 10 }}>
            <IOSButton fullWidth color="gray" onClick={() => setStep(1)}>
              Back
            </IOSButton>
            <IOSButton fullWidth disabled={!time} onClick={() => setStep(3)}>
              Continue
            </IOSButton>
          </div>
        </div>
      )}

      {/* STEP 3 — Summary */}
      {step === 3 && (
        <div style={{ padding: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>
            Summary
          </h2>

          <div
            style={{
              background: "white",
              padding: "18px 20px",
              borderRadius: 18,
              border: "1px solid #E5E5EA",
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 600 }}>
              {service.name}
            </div>
            <div style={{ marginTop: 6, opacity: 0.7 }}>
              {time}
            </div>
            <div style={{ marginTop: 10, fontSize: 18, fontWeight: 700 }}>
              ${service.price}
            </div>
          </div>

          <div style={{ display: "flex", marginTop: 20, gap: 10 }}>
            <IOSButton fullWidth color="gray" onClick={() => setStep(2)}>
              Back
            </IOSButton>
            <IOSButton fullWidth onClick={() => setStep(4)}>
              Proceed to Payment
            </IOSButton>
          </div>
        </div>
      )}

      {/* STEP 4 — Payment */}
      {step === 4 && (
        <div style={{ padding: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>
            Payment Method
          </h2>

          <div
            style={{
              background: "white",
              padding: "18px 20px",
              borderRadius: 18,
              border: "1px solid #E5E5EA",
            }}
          >
            <div style={{ fontSize: 16 }}>
              Visa / Mastercard / Apple Pay / Google Pay
            </div>
          </div>

          <IOSButton
            fullWidth
            bold
            style={{ marginTop: 20 }}
            onClick={() => alert("Payment Success! (mock)")}
          >
            Pay ${service.price}
          </IOSButton>

          <IOSButton
            fullWidth
            color="gray"
            style={{ marginTop: 10 }}
            onClick={() => setStep(3)}
          >
            Back
          </IOSButton>
        </div>
      )}
    </motion.div>
  );
}
