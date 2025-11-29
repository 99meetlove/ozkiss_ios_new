"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingDetailPage({ params }) {
  const router = useRouter();
  const bookingId = params.id;

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  const loadDetail = async () => {
    setLoading(true);

    const res = await fetch("/api/bookings/get", {
      method: "POST",
      body: JSON.stringify({
        user_id: localStorage.getItem("user_id"),
      }),
    });

    const json = await res.json();

    if (json.success) {
      const found = json.bookings.find((b) => String(b.id) === bookingId);
      setBooking(found || null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDetail();
  }, []);

  if (loading || !booking) {
    return (
      <div className="p-6">
        <div className="w-full h-60 bg-gray-200 animate-pulse rounded-2xl mb-4"></div>
        <div className="w-full h-20 bg-gray-200 animate-pulse rounded-2xl mb-4"></div>
      </div>
    );
  }

  const host = booking.host;

  const dateFormatted = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const cashbackWeb = Math.round(booking.price * 0.04);
  const cashbackApp = Math.round(booking.price * 0.07);

  const goChat = () => router.push(`/chat/${host.id}`);

  const rebook = () => {
    localStorage.setItem(
      "ozkiss_quick_rebook",
      JSON.stringify({
        host_id: booking.host_id,
        service: booking.service,
        duration: booking.duration,
        location: booking.location,
      })
    );

    router.push(`/booking/${booking.host_id}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] p-6">

      <div className="text-[24px] font-bold mb-5">Booking Details</div>

      {/* HOST CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6 flex gap-4">
        <img
          src={host.avatar}
          className="w-20 h-20 rounded-2xl object-cover"
        />

        <div className="flex flex-col justify-center">
          <div className="text-[20px] font-semibold">{host.name}</div>
          <div className="text-gray-500 text-[14px]">⭐ {host.rating || 5.0}</div>
        </div>
      </div>

      {/* INFO CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Date</span>
          <span>{dateFormatted}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Time</span>
          <span>{booking.time}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Service</span>
          <span>{booking.service.name}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Duration</span>
          <span>{booking.duration} hr</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Location</span>
          <span>
            {booking.location === "incall" ? "Incall" : "Outcall"}
          </span>
        </div>

        <div className="border-t my-3"></div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Price</span>
          <span>RM{booking.price}</span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">Client Fee (15%)</span>
          <span>RM{Math.round(booking.price * 0.15)}</span>
        </div>

        <div className="border-t my-3"></div>

        <div className="text-[17px] font-semibold mb-2">Cashback</div>

        <div className="flex justify-between py-2 text-[14px]">
          <span className="text-gray-500">Web (4%)</span>
          <span>RM{cashbackWeb}</span>
        </div>

        <div className="flex justify-between py-2 text-[14px]">
          <span className="text-gray-500">App (7%)</span>
          <span>RM{cashbackApp}</span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <button
        onClick={goChat}
        className="w-full py-4 rounded-2xl bg-blue-600 text-white text-[17px] font-semibold mb-4"
      >
        Message Host
      </button>

      <button
        onClick={rebook}
        className="w-full py-4 rounded-2xl bg-white border text-[17px] font-semibold"
      >
        Rebook
      </button>
    </div>
  );
}
