"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import NavigationBar from "@/components/ios/NavigationBar";
import SearchBar from "@/components/ios/SearchBar";
import IOSButton from "@/components/ios/Button";
import GroupSection from "@/components/ios/GroupSection";

export default function HomePage() {
  const [search, setSearch] = useState("");

  const featured = {
    name: "Samantha",
    image: "https://i.pravatar.cc/500?img=12",
    desc: "Top Host in Sydney",
  };

  const hosts = [
    {
      name: "Jenny",
      price: "$230/hr",
      image: "https://i.pravatar.cc/400?img=31",
    },
    {
      name: "Stella",
      price: "$260/hr",
      image: "https://i.pravatar.cc/400?img=22",
    },
    {
      name: "Emily",
      price: "$180/hr",
      image: "https://i.pravatar.cc/400?img=45",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* NAVIGATION BAR */}
      <NavigationBar title="Discover" />

      {/* SEARCH BAR */}
      <div style={{ padding: "16px" }}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search hosts, categories…"
        />
      </div>

      {/* FEATURED SECTION */}
      <div style={{ padding: "0 16px", marginTop: 10 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          Featured
        </h2>

        <div
          style={{
            height: 220,
            borderRadius: 18,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            cursor: "pointer",
          }}
        >
          <img
            src={featured.image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              right: 0,
              padding: "16px",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
              color: "white",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700 }}>
              {featured.name}
            </div>
            <div style={{ opacity: 0.8, marginTop: 2 }}>{featured.desc}</div>
          </div>
        </div>
      </div>

      {/* HOST LIST */}
      <div style={{ padding: "22px 16px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          Recommended for you
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14,
          }}
        >
          {hosts.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "white",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
              }}
            >
              <img
                src={h.image}
                style={{ width: "100%", height: 160, objectFit: "cover" }}
              />

              <div style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: 17, fontWeight: 600 }}>{h.name}</div>
                <div
                  style={{ fontSize: 14, opacity: 0.6, marginTop: 2 }}
                >
                  {h.price}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FLOATING MAP BUTTON */}
      <div
        style={{
          position: "fixed",
          right: 20,
          bottom: 110,
          background: "rgba(255,255,255,0.85)",
          padding: "12px 20px",
          borderRadius: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          fontSize: 15,
          backdropFilter: "blur(18px)",
        }}
      >
        Map View
      </div>
    </motion.div>
  );
}
