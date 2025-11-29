"use client";

import { useEffect, useState } from "react";
import UserCard from "@/components/profile/UserCard";
import ProfileMenu from "@/components/profile/ProfileMenu";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("ozkiss_user"))
        : null;

    setUser(u);
  }, []);

  if (!user) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] pb-20">
      {/* HEADER */}
      <div
        className="px-4 py-6 text-[24px] font-bold"
        style={{
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          background: "rgba(255,255,255,0.7)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        Profile
      </div>

      {/* USER CARD */}
      <UserCard user={user} />

      {/* MENU */}
      <ProfileMenu />
    </div>
  );
}
