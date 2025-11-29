"use client";

import { motion } from "framer-motion";
import NavigationBar from "@/components/ios/NavigationBar";
import GroupSection from "@/components/ios/GroupSection";

export default function ReviewsPage() {
  const reviews = [
    { name: "John", rating: 5, text: "Amazing service!" },
    { name: "Alice", rating: 4, text: "Very friendly and professional." },
    { name: "Mike", rating: 5, text: "Perfect experience." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <NavigationBar title="Reviews" small={true} />

      <GroupSection>
        {reviews.map((r, idx) => (
          <div
            key={idx}
            style={{
              padding: "14px 16px",
              borderBottom: "0.5px solid rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 600 }}>{r.name}</div>
            <div style={{ fontSize: 14, opacity: 0.6 }}>⭐ {r.rating}</div>
            <div style={{ marginTop: 6 }}>{r.text}</div>
          </div>
        ))}
      </GroupSection>
    </motion.div>
  );
}
