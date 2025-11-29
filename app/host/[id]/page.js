"use client";

import { motion } from "framer-motion";
import IOSButton from "@/components/ios/Button";
import NavigationBar from "@/components/ios/NavigationBar";

export default function HostProfilePage({ params }) {
  // in future: fetch from Supabase
  const host = {
    name: "Samantha",
    age: 23,
    location: "Sydney CBD",
    topPic: "https://i.pravatar.cc/900?img=10",
    gallery: [
      "https://i.pravatar.cc/500?img=33",
      "https://i.pravatar.cc/500?img=45",
      "https://i.pravatar.cc/500?img=12",
    ],
    about:
      "Friendly, elegant and professional. Available for incall & outcall. Fluent in English & Japanese.",
    services: [
      { name: "Incall", price: "$240/hr" },
      { name: "Outcall", price: "$260/hr" },
      { name: "Dinner Date", price: "$300/hr" },
    ],
    reviews: [
      {
        user: "Michael",
        text: "Amazing experience. Very kind and beautiful.",
      },
      {
        user: "Jason",
        text: "Professional and sweet, highly recommend.",
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* TOP NAV BAR */}
      <NavigationBar title={host.name} />

      {/* TOP IMAGE */}
      <div
        style={{
          width: "100%",
          height: 320,
          overflow: "hidden",
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
        }}
      >
        <img
          src={host.topPic}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* CONTENT */}
      <div style={{ padding: "18px" }}>
        {/* NAME */}
        <div style={{ fontSize: 28, fontWeight: 700 }}>{host.name}</div>
        <div style={{ fontSize: 16, opacity: 0.6, marginTop: 4 }}>
          {host.age} years • {host.location}
        </div>

        {/* GALLERY */}
        <div style={{ marginTop: 16, display: "flex", gap: 10, overflowX: "auto" }}>
          {host.gallery.map((img, i) => (
            <div
              key={i}
              style={{
                width: 140,
                height: 180,
                borderRadius: 16,
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={img}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>

        {/* ABOUT */}
        <div style={{ marginTop: 26 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700 }}>About</h3>
          <p style={{ marginTop: 8, fontSize: 16, lineHeight: "22px" }}>
            {host.about}
          </p>
        </div>

        {/* SERVICES */}
        <div style={{ marginTop: 28 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700 }}>Services</h3>

          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
            {host.services.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 18px",
                  background: "white",
                  borderRadius: 18,
                  border: "1px solid #EEE",
                }}
              >
                <div style={{ fontSize: 17, fontWeight: 600 }}>{s.name}</div>
                <div style={{ opacity: 0.7, marginTop: 3 }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* REVIEWS */}
        <div style={{ marginTop: 28 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700 }}>Reviews</h3>

          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
            {host.reviews.map((r, i) => (
              <div
                key={i}
                style={{
                  padding: "14px 18px",
                  background: "white",
                  borderRadius: 18,
                  border: "1px solid #EEE",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 600 }}>{r.user}</div>
                <div style={{ opacity: 0.75, marginTop: 4 }}>{r.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BOOK BUTTON */}
        <div style={{ marginTop: 30 }}>
          <IOSButton fullWidth bold>
            Book Now
          </IOSButton>
        </div>
      </div>
    </motion.div>
  );
}
