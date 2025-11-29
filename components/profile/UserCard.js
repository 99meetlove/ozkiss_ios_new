"use client";

import { useRouter } from "next/navigation";

export default function UserCard({ user }) {
  const router = useRouter();

  return (
    <div className="px-4 mt-4">
      <div
        className="p-5 rounded-3xl bg-white shadow-sm border border-gray-100 flex items-center gap-5"
      >
        {/* AVATAR */}
        <img
          src={user.avatar || "/default-avatar.png"}
          className="w-20 h-20 rounded-full object-cover border"
        />

        {/* RIGHT SIDE */}
        <div className="flex-1">
          <div className="text-[20px] font-semibold">{user.name}</div>

          {/* USER ID */}
          <div className="text-[14px] text-gray-500 mt-1">
            User ID: <span className="font-mono">{user.user_id}</span>
          </div>

          {/* EDIT BUTTON */}
          <button
            onClick={() => router.push("/profile/edit")}
            className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-[14px]"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
