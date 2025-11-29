"use client";

export default function StatCard({ label, value }) {
  const rm = (value / 100).toFixed(2); // convert cents → RM

  return (
    <div
      className="p-4 rounded-2xl bg-white shadow-sm border border-gray-100"
      style={{
        minHeight: 90,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="text-gray-500 text-[13px]">{label}</div>
      <div className="text-[22px] font-bold mt-1">RM {rm}</div>
    </div>
  );
}
