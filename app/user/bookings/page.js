"use client";

import { useEffect, useState } from "react";
import BookingCard from "@/components/bookings/BookingCard";

export default function UserBookingsPage() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const loadBookings = async () => {
    setLoading(true);

    const user_id =
      typeof window !== "undefined"
        ? localStorage.getItem("user_id")
        : null;

    if (!user_id) {
      setLoading(false);
      return;
    }

    const res = await fetch("/api/bookings/get", {
      method: "POST",
      body: JSON.stringify({ user_id }),
    });

    const json = await res.json();

    if (json.success) {
      setBookings(json.bookings || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Skeleton loading
  if (loading) {
    return (
      <div className="p-6">
        <div className="w-full h-32 bg-gray-200 rounded-2xl animate-pulse mb-4"></div>
        <div className="w-full h-32 bg-gray-200 rounded-2xl animate-pulse mb-4"></div>
      </div>
    );
  }

  // Empty state
  if (!loading && bookings.length === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-center p-6">
        <img
          src="/empty/bookings.png"
          className="w-48 opacity-70 mb-4"
        />
        <div className="text-[20px] font-semibold">No bookings yet</div>
        <div className="text-gray-500 text-[14px] mt-1 mb-6">
          Start exploring host profiles and book your first session!
        </div>
        <a
          href="/"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white text-[16px]"
        >
          Explore Hosts
        </a>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="text-[24px] font-bold mb-4">My Bookings</div>

      <div className="flex flex-col gap-4">
        {bookings.map((b) => (
          <BookingCard key={b.id} data={b} />
        ))}
      </div>
    </div>
  );
}
