"use client";

import { useEffect, useState } from "react";
import EditAvatar from "@/components/profile/EditAvatar";

export default function EditProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const u =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("ozkiss_user"))
        : null;

    if (u) {
      setUser(u);
      setName(u.name);
    }
  }, []);

  const save = async () => {
    if (!user) return;

    const res = await fetch("/api/profile/update", {
      method: "POST",
      body: JSON.stringify({
        user_id: user.user_id,
        name,
        avatar: user.avatar,
      }),
    });

    const json = await res.json();

    if (json.success) {
      // update localStorage
      const updated = { ...user, name, avatar: json.avatar };
      localStorage.setItem("ozkiss_user", JSON.stringify(updated));

      alert("Profile updated!");
      window.location.href = "/profile";
    }
  };

  if (!user)
    return (
      <div className="p-6 text-gray-400">Loading...</div>
    );

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-6 pb-20">
      {/* HEADER */}
      <div className="text-[24px] font-bold mb-6">Edit Profile</div>

      {/* AVATAR */}
      <EditAvatar
        avatar={user.avatar}
        onChange={(v) => setUser({ ...user, avatar: v })}
      />

      {/* NAME */}
      <div className="mt-8">
        <label className="text-[15px] text-gray-600">Display Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-2 p-3 bg-white rounded-2xl border border-gray-200"
          placeholder="Your name"
        />
      </div>

      {/* USER ID */}
      <div className="mt-6 text-gray-600 text-[14px]">
        User ID:
        <span className="font-mono ml-2">{user.user_id}</span>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={save}
        className="w-full mt-10 py-4 bg-blue-600 text-white text-[17px] rounded-2xl active:scale-95 transition-all"
      >
        Save Changes
      </button>
    </div>
  );
}
