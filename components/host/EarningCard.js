"use client";

export default function EarningCard({ total }) {
  const rm = (total / 100).toFixed(2); // cents → RM

  return (
    <div
      className="w-full p-6 rounded-3xl shadow-xl text-white mt-4"
      style={{
        background:
          "linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
        boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
      }}
    >
      <div className="text-[17px] opacity-90">Total Earnings</div>

      <div className="text-[42px] font-bold mt-2 leading-tight">
        RM {rm}
      </div>

      <div className="text-[13px] opacity-70 mt-1">
        Host receives 10% commission per booking
      </div>
    </div>
  );
}
