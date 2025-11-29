"use client";

import { useRouter } from "next/navigation";

export default function ProfileMenu() {
  const router = useRouter();

  const menu = [
    {
      label: "Wallet",
      icon: "💰",
      action: () => router.push("/wallet"),
    },
    {
      label: "My Bookings",
      icon: "📘",
      action: () => router.push("/user/bookings"),
    },
    {
      label: "Host Dashboard",
      icon: "🧭",
      action: () => router.push("/host/dashboard"),
    },
    {
      label: "Referral Rewards",
      icon: "🎁",
      action: () => router.push("/referral"),
    },
    {
      label: "Settings",
      icon: "⚙️",
      action: () => router.push("/settings"),
    },
  ];

  const logout = () => {
    localStorage.removeItem("ozkiss_user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("host_id");

    window.location.href = "/";
  };

  return (
    <div className="px-4 mt-6 flex flex-col gap-4">

      {/* MENU BLOCK */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y">
        {menu.map((item, index) => (
          <div
            key={index}
            onClick={item.action}
            className="flex items-center justify-between p-4 active:scale-[0.98] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="text-[22px]">{item.icon}</div>
              <div className="text-[17px] font-medium">{item.label}</div>
            </div>

            <div className="text-[20px] text-gray-400">›</div>
          </div>
        ))}
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={logout}
        className="w-full py-4 text-center bg-white border border-gray-300 rounded-2xl text-[17px] font-semibold text-red-600 active:scale-95 transition-all"
      >
        Log Out
      </button>
    </div>
  );
}
