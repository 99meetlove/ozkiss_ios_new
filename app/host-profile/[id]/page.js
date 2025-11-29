"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import IOSButton from "@/components/ios/Button";
import PhotoGrid from "@/components/media/PhotoGrid";
import NavigationBar from "@/components/ios/NavigationBar";

export default function HostProfilePage({ params }) {
  const id = params.id;

  const [host, setHost] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [services, setServices] = useState([]);
  const [tab, setTab] = useState("photos");

  async function load() {
    const d1 = await fetch(`/api/host/profile?id=${id}`).then((r) => r.json());
    const d2 = await fetch(`/api/media/list?host_id=${id}`).then((r) => r.json());
    const d3 = await fetch(`/api/host/services?id=${id}`).then((r) => r.json());

    setHost(d1.data);
    setPhotos(d2.data);
    setServices(d3.data);
  }

  useEffect(() => {
    load();
  }, []);

  if (!host) return <div style={{ padding: 20 }}>Loading…</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        background: "#F2F2F7",
        minHeight: "100vh",
        paddingBottom: 100,
      }}
    >
      <NavigationBar title={host.name} />

      {/* AVATAR */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <img
          src={host.avatar_url}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        />
        <div style={{ fontSize: 26, fontWeight: 700, marginTop: 12 }}>
          {host.name}
        </div>
        <div style={{ opacity: 0.6 }}>{host.location}</div>
      </div>

      {/* iOS TABS */}
      <div
        style={{
          margin: "24px 16px 0 16px",
          display: "flex",
          gap: 8,
        }}
      >
        <Tab active={tab === "photos"} onClick={() => setTab("photos")}>
          Photos
        </Tab>
        <Tab active={tab === "services"} onClick={() => setTab("services")}>
          Services
        </Tab>
        <Tab active={tab === "reviews"} onClick={() => setTab("reviews")}>
          Reviews
        </Tab>
      </div>

      {/* PHOTOS TAB */}
      {tab === "photos" && (
        <div style={{ marginTop: 16, padding: "0 16px" }}>
          <PhotoGrid items={photos} onSelect={() => {}} />
        </div>
      )}

      {/* SERVICES TAB */}
      {tab === "services" && (
        <div
          style={{
            marginTop: 16,
            background: "white",
            borderRadius: 18,
            padding: 20,
            border: "1px solid #E5E5EA",
            margin: "16px",
          }}
        >
          {services.map((s) => (
            <div
              key={s.id}
              style={{
                paddingBottom: 20,
                borderBottom: "1px solid #E5E5EA",
                marginBottom: 20,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                {s.type} · {s.duration}
              </div>
              <div style={{ marginTop: 4, opacity: 0.6 }}>{s.description}</div>
              <div
                style={{ marginTop: 10, fontSize: 20, fontWeight: 700 }}
              >
                ${s.price}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* REVIEWS TAB */}
      {tab === "reviews" && (
        <div
          style={{
            marginTop: 16,
            background: "white",
            borderRadius: 18,
            padding: 20,
            border: "1px solid #E5E5EA",
            margin: "16px",
            opacity: 0.5,
            textAlign: "center",
          }}
        >
          Reviews system coming soon...
        </div>
      )}

      {/* BOTTOM BUTTONS */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 0,
          right: 0,
          padding: "0 16px",
        }}
      >
        <IOSButton fullWidth bold>
          Book Now
        </IOSButton>

        <div style={{ height: 12 }}></div>

        <IOSButton fullWidth color="gray">
          Chat
        </IOSButton>
      </div>
    </motion.div>
  );
}

/* ----------------------- Components ----------------------- */

function Tab({ active, onClick, children }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        padding: "10px 0",
        textAlign: "center",
        borderRadius: 12,
        background: active ? "black" : "#E5E5EA",
        color: active ? "white" : "black",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
}
