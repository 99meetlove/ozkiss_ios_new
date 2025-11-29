"use client";

import { useState } from "react";
import NavigationBar from "@/components/ios/NavigationBar";
import { motion } from "framer-motion";

export default function MapPage() {
  const [sheetOpen, setSheetOpen] = useState(true);

  const hosts = [
    {
      name: "Jennifer",
      price: "$240/hr",
      img: "https://i.pravatar.cc/300?img=12",
    },
    {
      name: "Aria",
      price: "$180/hr",
      img: "https://i.pravatar.cc/300?img=22",
    },
    {
      name: "Maria",
      price: "$220/hr",
      img: "https://i.pravatar.cc/300?img=45",
    },
  ];

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      {/* NAV BAR */}
      <NavigationBar title="Map" small />

      {/* MAP BACKGROUND (placeholder for performance) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#D0D0D0",
        }}
      >
        {/* In future: add your real map here */}
      </div>

      {/* FLOAT TOGGLE BUTTON */}
      <div
        onClick={() => setSheetOpen(!sheetOpen)}
        style={{
          position: "absolute",
          bottom: 130,
          right: 20,
          padding: "12px 18px",
          background: "rgba(255,255,255,0.85)",
          borderRadius: 18,
          backdropFilter: "blur(12px)",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        {sheetOpen ? "Hide List" : "Show List"}
      </div>

      {/* BOTTOM SHEET */}
      <motion.div
        animate={{ y: sheetOpen ? 0 : 300 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 300,
          background: "white",
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          padding: "16px 18px",
        }}
      >
        {/* drag handle */}
        <div
          style={{
            width: 45,
            height: 5,
            background: "#CCC",
            borderRadius: 3,
            margin: "0 auto 18px",
          }}
        />

        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>
          Nearby Hosts
        </h2>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: 14,
            paddingBottom: 4,
          }}
        >
          {hosts.map((h, i) => (
            <div
              key={i}
              style={{
                minWidth: 160,
                borderRadius: 16,
                background: "white",
                overflow: "hidden",
                border: "1px solid #EEE",
              }}
            >
              <img
                src={h.img}
                style={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>{h.name}</div>
                <div style={{ fontSize: 14, opacity: 0.6 }}>{h.price}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
