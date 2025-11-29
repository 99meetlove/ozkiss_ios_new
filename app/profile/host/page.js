"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HostCenterPage() {
  const router = useRouter();
  const [host, setHost] = useState(null);

  useEffect(() => {
    const h =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("ozkiss_host"))
        : null;

    setHost(h);
  }, []);

  if (!host) {
    return (
      <div className="p-6 text-gray-400">Loading host profile...</div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-6 pb-20">

      {/* HEADER */}
      <div className="text-[26px] font-bold mb-6">Host Center</div>

      {/* STATUS CARD */}
      <div
        className="p-5 rounded-2xl bg-white shadow-sm border border-gray-100 mb-6"
      >
        <div className="text-[16px] font-medium mb-1">
          Host Status:{" "}
          <span className={host.verified ? "text-green-600" : "text-red-600"}>
            {host.verified ? "Verified" : "Not Verified"}
          </span>
        </div>

        {!host.verified && (
          <div className="text-[13px] text-gray-500">
            You will need to complete identity verification to unlock all host features.
          </div>
        )}
      </div>

      {/* MENU */}
      <div className="flex flex-col gap-4">

        {/* Host Dashboard */}
        <div
          onClick={() => router.push("/host/dashboard")}
          className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="text-[17px] font-medium">📊 Host Dashboard</div>
          <div className="text-gray-400 text-[20px]">›</div>
        </div>

        {/* Service Setup */}
        <div
          onClick={() => router.push("/profile/host/services")}
          className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="text-[17px] font-medium">🛠️ Service Setup</div>
          <div className="text-gray-400 text-[20px]">›</div>
        </div>

        {/* Host Media Manager */}
        <div
          onClick={() => router.push("/host/media")}
          className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="text-[17px] font-medium">🖼️ Service Photos</div>
          <div className="text-gray-400 text-[20px]">›</div>
        </div>

        {/* Pricing Setup */}
        <div
          onClick={() => router.push("/profile/host/pricing")}
          className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="text-[17px] font-medium">💵 Pricing Setup</div>
          <div className="text-gray-400 text-[20px]">›</div>
        </div>

        {/* Performance Dashboard */}
        <div
          onClick={() => router.push("/profile/host/performance")}
          className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="text-[17px] font-medium">📈 Performance Dashboard</div>
          <div className="text-gray-400 text-[20px]">›</div>
        </div>

        {/* Verification */}
        <div
          onClick={() => router.push("/profile/host/verify")}
          className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="text-[17px] font-medium">🔐 Host Verification</div>
          <div className="text-gray-400 text-[20px]">›</div>
        </div>
      </div>
    </div>
  );
}
