"use client";

import { useEffect, useState } from "react";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user_id =
    typeof window !== "undefined"
      ? localStorage.getItem("user_id")
      : null;

  const loadNotifications = async () => {
    if (!user_id) return;

    setLoading(true);

    const res = await fetch("/api/notifications/list", {
      method: "POST",
      body: JSON.stringify({ user_id }),
    });

    const json = await res.json();
    setNotifications(json.notifications || []);
    setLoading(false);

    // auto mark read
    await fetch("/api/notifications/mark-read", {
      method: "POST",
      body: JSON.stringify({ user_id }),
    });
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const badgeColor = (type) => {
    switch (type) {
      case "chat":
        return "#007aff";
      case "booking":
        return "#34c759";
      case "payment":
        return "#ff9f0a";
      case "emergency":
        return "#ff3b30";
      default:
        return "#8e8e93";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="w-full h-24 rounded-2xl bg-gray-300 animate-pulse mb-4"></div>
        <div className="w-full h-24 rounded-2xl bg-gray-300 animate-pulse mb-4"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] p-6 pb-24">
      <div className="text-[26px] font-bold mb-5">Notifications</div>

      {notifications.length === 0 ? (
        <div className="text-center text-gray-400 mt-10 text-[15px]">
          No notifications yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100"
            >
              {/* Header Row */}
              <div className="flex justify-between items-center mb-1">
                <div
                  className="text-[12px] px-2 py-[2px] rounded-full text-white"
                  style={{ background: badgeColor(n.type) }}
                >
                  {n.type}
                </div>

                <div className="text-[12px] text-gray-500">
                  {new Date(n.created_at).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {/* Title */}
              <div className="text-[16px] font-semibold">{n.title}</div>

              {/* Message */}
              {n.message && (
                <div className="text-[14px] text-gray-600 mt-1">
                  {n.message}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
