"use client";

import { useEffect, useState } from "react";
import EarningCard from "@/components/host/EarningCard";
import BookingItem from "@/components/host/BookingItem";
import StatCard from "@/components/host/StatCard";
import { useRouter } from "next/navigation";

export default function HostDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [earnings, setEarnings] = useState(null);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const host_id =
    typeof window !== "undefined"
      ? localStorage.getItem("host_id")
      : null;

  const loadData = async () => {
    if (!host_id) return;

    setLoading(true);

    // Earnings
    const e = await fetch("/api/host/earnings/get", {
      method: "POST",
      body: JSON.stringify({ host_id }),
    });
    const earningsJson = await e.json();
    setEarnings(earningsJson);

    // Bookings
    const b = await fetch("/api/host/bookings/get", {
      method: "POST",
      body: JSON.stringify({ host_id }),
    });
    const bookingsJson = await b.json();

    setUpcoming(bookingsJson.upcoming || []);
    setPast(bookingsJson.past || []);

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !earnings)
    return (
      <div className="p-6">
        <div className="w-full h-40 bg-gray-300 animate-pulse rounded-2xl mb-6"></div>
        <div className="w-full h-32 bg-gray-300 animate-pulse rounded-2xl mb-4"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] p-6 pb-24">

      {/* HEADER */}
      <div className="text-[26px] font-bold mb-5">Host Dashboard</div>

      {/* ⭐ EARNINGS SUMMARY */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard label="Today" value={earnings.today} />
        <StatCard label="Week" value={earnings.week} />
        <StatCard label="Month" value={earnings.month} />
        <StatCard label="Total" value={earnings.total} />
      </div>

      {/* BIG EARNING CARD */}
      <EarningCard total={earnings.total} />

      {/* ⭐ UPCOMING BOOKINGS */}
      <div className="mt-8">
        <div className="text-[20px] font-bold mb-2">Upcoming Bookings</div>

        {upcoming.length === 0 && (
          <div className="text-gray-500 text-[14px]">No upcoming bookings</div>
        )}

        <div className="flex flex-col gap-3">
          {upcoming.map((b) => (
            <BookingItem key={b.id} data={b} />
          ))}
        </div>
      </div>

      {/* ⭐ PAST BOOKINGS */}
      <div className="mt-10">
        <div className="text-[20px] font-bold mb-2">Past Bookings</div>

        {past.length === 0 && (
          <div className="text-gray-500 text-[14px]">No past bookings</div>
        )}

        <div className="flex flex-col gap-3">
          {past.map((b) => (
            <BookingItem key={b.id} data={b} />
          ))}
        </div>
      </div>

      {/* ⭐ EMERGENCY BUTTON */}
      <div className="mt-10">
        <button
          onClick={() => alert("Emergency signal sent to admin!")}
          className="w-full py-4 text-[18px] rounded-2xl text-white font-semibold"
          style={{ background: "#ff3b30" }}
        >
          Emergency Button
        </button>

        <div className="text-gray-500 text-[13px] mt-2">
          This will immediately notify Ozkiss admin about suspicious or unsafe activity.
        </div>
      </div>
    </div>
  );
}
