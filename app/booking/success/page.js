"use client";

import { useEffect } from "react";

export default function BookingSuccessPage() {
  useEffect(() => {
    // Animation, confetti, or redirect can be added later
    console.log("Booking Success Page Loaded");
  }, []);

  return (
    <div className="p-6 flex flex-col items-center text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Booking Successful!
      </h1>

      <p className="text-gray-700 mb-6">
        Your booking has been confirmed. A confirmation message has been sent.
      </p>

      <a
        href="/"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
      >
        Back to Home
      </a>
    </div>
  );
}
