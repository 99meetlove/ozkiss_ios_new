"use client";

import { motion } from "framer-motion";
import NavigationBar from "@/components/ios/NavigationBar";
import SearchBar from "@/components/ios/SearchBar";
import IOSButton from "@/components/ios/Button";
import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const categories = [
    { name: "Incall", icon: "🏠" },
    { name: "Outcall", icon: "🚗" },
    { name: "Massage", icon: "💆‍♀️" },
    { name: "Companionship", icon: "✨" },
    { name: "Party", icon: "🎉" },
    { name: "Couple", icon: "❤️" },
  ];

  const quick = [
    "Nearby Hosts",
    "Top Rated",
    "Open Now",
    "Budget Options",
    "New Hosts",
  ];

  const trending = [
    "Asian",
    "Cute",
    "Blonde",
    "Japanese",
    "Tall",
    "Slim",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* NAVIGATION */}
      <NavigationBar title="Search" />

      {/* SEARCH BAR */}
      <div style={{ padding: "16px" }}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search hosts, categories…"
        />
      </div>

      {/* QUICK FILTERS */}
      <div style={{ padding: "0 16px" }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Quick Filters
        </h3>

        <div
          style={{
            display: "flex",
            gap: 10,
            overflowX: "auto",
            paddingBottom: 10,
          }}
        >
          {quick.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <IOSButton small>{item}</IOSButton>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CATEGORIES GRID */}
      <div style={{ padding: "16px" }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Categories
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {categories.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: "white",
                borderRadius: 18,
                padding: 18,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: 32 }}>{c.icon}</div>
              <div
                style={{
                  marginTop: 8,
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {c.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* TRENDING SEARCHES */}
      <div style={{ padding: "0 16px 20px 16px" }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Trending Searches
        </h3>

        {trending.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              padding: "14px 0",
              borderBottom: "1px solid #E5E5EA",
              fontSize: 16,
            }}
          >
            {t}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
