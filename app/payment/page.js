"use client";

import { useEffect, useState } from "react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    // Example: load payment amount from localStorage
    try {
      const a = localStorage.getItem("payment_amount");
      if (a) setAmount(a);
    } catch (e) {}

    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">Payment</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4">
          <p className="text-lg">Amount Due: RM {amount || "0.00"}</p>

          <button
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => alert("Payment Success (placeholder)")}
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}
