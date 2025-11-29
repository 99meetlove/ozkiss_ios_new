"use client";

export default function BookingSummary({
  data,
  host,
  onConfirm,
}) {
  if (!data || !host) return null;

  // Format date
  const dateFormatted = new Date(data.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Cashback
  const cashbackWeb = Math.round(data.price * 0.04);
  const cashbackApp = Math.round(data.price * 0.07);

  return (
    <div className="w-full px-4 py-5">

      {/* HOST CARD */}
      <div className="flex items-center gap-4 p-4 rounded-2xl mb-6 shadow-sm bg-white">
        <img
          src={host.avatar}
          className="w-14 h-14 rounded-xl object-cover"
        />
        <div className="flex flex-col">
          <div className="text-[17px] font-semibold">{host.name}</div>
          <div className="text-gray-600 text-[14px]">
            ⭐ {host.rating || 5.0}
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
        <div className="text-[18px] font-semibold mb-3">Booking Details</div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Date</span>
          <span>{dateFormatted}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Time</span>
          <span>{data.time}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Service</span>
          <span>{data.service.name}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Duration</span>
          <span>{data.duration} hour(s)</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Location</span>
          <span>
            {data.location === "incall" ? "Incall" : "Outcall"}
          </span>
        </div>

        <div className="border-t my-3"></div>

        {/* PRICING */}
        <div className="text-[18px] font-semibold mb-2">Price</div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Subtotal</span>
          <span>RM{data.price}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Client Fee (15%)</span>
          <span>RM{Math.round(data.price * 0.15)}</span>
        </div>

        <div className="border-t my-3"></div>

        {/* CASHBACK */}
        <div className="text-[18px] font-semibold mb-2">Cashback</div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Web (4%)</span>
          <span>RM{cashbackWeb}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">App (7%)</span>
          <span>RM{cashbackApp}</span>
        </div>
      </div>

      {/* CONFIRM BUTTON */}
      <button
        onClick={onConfirm}
        className="w-full py-4 rounded-2xl text-white text-[17px] font-semibold"
        style={{ background: "#007aff" }}
      >
        Confirm & Pay
      </button>
    </div>
  );
}
