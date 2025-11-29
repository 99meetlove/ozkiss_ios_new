"use client";

export default function PerformanceCard({ label, value }) {
  return (
    <div
      className="
        p-5 rounded-2xl bg-white shadow-sm border border-gray-100
        flex flex-col items-center justify-center
      "
    >
      <div className="text-[14px] text-gray-600">{label}</div>
      <div className="text-[26px] font-bold mt-1">{value}</div>
    </div>
  );
}
