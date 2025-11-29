"use client";

import { useRouter } from "next/navigation";

export default function BookingCard({ data }) {
  const router = useRouter();

  const goDetail = () => {
    router.push(`/user/bookings/${data.id}`);
  };

  const rebook = () => {
    // Save data to quick booking
    localStorage.setItem(
      "ozkiss_quick_rebook",
      JSON.stringify({
        host_id: data.host_id,
        service: data.service,
        duration: data.duration,
        location: data.location,
      })
    );

    router.push(`/booking/${data.host_id}`);
  };

  const dateFormatted = new Date(data.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const isPaid = data.payment_status === "paid";

  return (
    <div
      onClick={goDetail}
      className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4 active:scale-[0.98] transition-all cursor-pointer"
    >
      {/* AVATAR */}
      <img
        src={data.host?.avatar}
        className="w-16 h-16 rounded-2xl object-cover"
      />

      {/* MIDDLE */}
      <div className="flex-1">
        <div className="text-[17px] font-semibold">{data.host?.name}</div>
        <div className="text-gray-500 text-[14px]">
          {data.service.name} • {data.duration} hr
        </div>
        <div className="text-gray-600 text-[14px] mt-1">
          {dateFormatted}, {data.time}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col items-end gap-2">
        <div
          className={`text-[12px] px-3 py-[4px] rounded-full text-white ${
            isPaid ? "bg-green-500" : "bg-orange-500"
          }`}
        >
          {isPaid ? "PAID" : "PENDING"}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            rebook();
          }}
          className="text-blue-600 text-[13px] font-semibold"
        >
          Rebook
        </button>
      </div>
    </div>
  );
}
