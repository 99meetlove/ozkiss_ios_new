"use client";

import { useState } from "react";
import NavigationBar from "@/components/ios/NavigationBar";
import IOSButton from "@/components/ios/Button";
import { motion } from "framer-motion";

export default function HostServicesPage() {
  const [type, setType] = useState("incall");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("1 hour");
  const [category, setCategory] = useState("General");
  const [description, setDescription] = useState("");

  const durations = ["30 min", "1 hour", "1.5 hours", "2 hours"];
  const categories = [
    "General",
    "Massage",
    "Dinner Date",
    "Outcall Travel",
    "Special Service",
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
      <NavigationBar title="Service Setup" />

      {/* TYPE SELECTION */}
      <Section title="Service Type">
        <div style={{ display: "flex", gap: 12, padding: "14px 18px" }}>
          <TypeButton
            active={type === "incall"}
            onClick={() => setType("incall")}
            label="Incall"
          />
          <TypeButton
            active={type === "outcall"}
            onClick={() => setType("outcall")}
            label="Outcall"
          />
        </div>
      </Section>

      {/* PRICE */}
      <Section title="Price">
        <div style={{ padding: "14px 18px" }}>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />
        </div>
      </Section>

      {/* DURATION */}
      <Section title="Duration">
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            ...inputStyle,
            width: "100%",
            appearance: "none",
            cursor: "pointer",
          }}
        >
          {durations.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Section>

      {/* CATEGORY */}
      <Section title="Category">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            ...inputStyle,
            width: "100%",
            appearance: "none",
            cursor: "pointer",
          }}
        >
          {categories.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Section>

      {/* DESCRIPTION */}
      <Section title="Description">
        <div style={{ padding: "14px 18px" }}>
          <textarea
            placeholder="Describe your service..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              ...inputStyle,
              height: 100,
              resize: "none",
            }}
          />
        </div>
      </Section>

      {/* SAVE BUTTON */}
      <div style={{ margin: "40px 16px" }}>
        <IOSButton fullWidth bold onClick={() => alert("Saved (mock)")}>
          Save Service
        </IOSButton>
      </div>
    </motion.div>
  );
}

/* -------------------------------- COMPONENTS -------------------------------- */

function Section({ title, children }) {
  return (
    <div style={{ margin: "26px 16px 0 16px" }}>
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

function TypeButton({ active, onClick, label }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        padding: "12px 0",
        textAlign: "center",
        borderRadius: 14,
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        background: active ? "black" : "#F2F2F7",
        color: active ? "white" : "black",
      }}
    >
      {label}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #E5E5EA",
  fontSize: 16,
  background: "#F2F2F7",
  outline: "none",
};
