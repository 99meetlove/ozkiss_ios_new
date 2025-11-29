"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotificationBell() {
  const router = useRouter();
  const [unread, setUnread] = useState(0);

  const load = async () => {
    const user_id =
      typeof window !== "undefined"
        ? localStorage.getItem("user_id")
        : null;

    if (!user_id) return;

    const res = await fetch("/api/notifications/list", {
      method: "POST",
      body: JSON.stringify({ user_id }),
    });

    const json = await res.json();
    setUnread(json.unread || 0);
  };

  useEffect(() => {
    load();

    // refresh every 5s
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      onClick={() => router.push("/notifications")}
      className="relative cursor-pointer active:scale-95 transition-all"
    >
      {/* Bell Icon */}
      <div
        style={{
          fontSize: 24,
          padding: 6,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 0 12px rgba(0,0,0,0.08)",
        }}
      >
        🔔
      </div>

      {/* Unread Badge */}
      {unread > 0 && (
        <div
          className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full px-[6px] py-[2px]"
        >
          {unread}
        </div>
      )}
    </div>
  );
}
