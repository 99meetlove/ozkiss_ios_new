"use client";

import { supabase } from "@/utils/supabaseClient";
import { useEffect } from "react";

export default function NotificationProvider() {
  useEffect(() => {
    const user_id =
      typeof window !== "undefined"
        ? localStorage.getItem("user_id")
        : null;

    if (!user_id) return;

    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user_id}`,
        },
        (payload) => {
          console.log("🔔 New notification:", payload.new);

          // Browser native notification
          if (Notification.permission === "granted") {
            new Notification(payload.new.title, {
              body: payload.new.message || "",
              icon: "/ozkiss_logo.png",
            });
          }

          // fallback: play sound
          const audio = new Audio("/sounds/notify.mp3");
          audio.play().catch(() => {});

          // update badge in NotificationBell (storage trick)
          localStorage.setItem("ozkiss_notify_refresh", Date.now());
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
