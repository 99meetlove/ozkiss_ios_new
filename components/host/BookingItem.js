"use client";

export default function BookingItem({ data }) {
  // Host receives 10% commission (already in final system)
  const hostIncome = Math.round(data.price * 0.1);
  const rm = (hostIncome / 100).toFixed(2);

  const dateFormatted = new Date(data.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 active:scale-[0.98] transition-all cursor-pointer"
    >
      {/* CUSTOMER AVATAR */}
      <img
        src={data.user?.avatar}
        className="w-14 h-14 rounded-2xl object-cover"
      />

      {/* MIDDLE CONTENT */}
      <div className="flex-1">
        <div className="text-[17px] font-semibold">{data.user?.name}</div>

        <div className="text-gray-500 text-[14px]">
          {data.service?.name} • {data.duration} hr
        </div>

        <div className="text-gray-600 text-[14px] mt-1">
          {dateFormatted}, {data.time}
        </div>
      </div>

      {/* PRICE */}
      <div className="flex flex-col justify-center items-end">
        <div className="text-[13px] text-gray-500">Income</div>
        <div className="text-[18px] font-bold text-green-600">
          RM {rm}
        </div>
      </div>
    </div>
  );
}
