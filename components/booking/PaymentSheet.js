"use client";

import { useState } from "react";

export default function PaymentSheet({
  amount,
  cashbackWeb,
  cashbackApp,
  onPay,
}) {
  const [loading, setLoading] = useState(false);

  const triggerPayment = async (method) => {
    setLoading(true);
    await onPay(method);
    setLoading(false);
  };

  return (
    <div className="w-full p-5">

      {/* AMOUNT CARD */}
      <div className="bg-white shadow-sm rounded-2xl p-5 mb-6">
        <div className="text-[17px] font-semibold">Total Amount</div>
        <div className="text-[32px] font-bold mt-1">RM{amount}</div>

        <div className="mt-4 text-[15px] font-medium">Cashback</div>

        <div className="flex justify-between text-[14px] mt-1">
          <span className="text-gray-500">Web (4%)</span>
          <span>RM{cashbackWeb}</span>
        </div>

        <div className="flex justify-between text-[14px] mt-1">
          <span className="text-gray-500">App (7%)</span>
          <span>RM{cashbackApp}</span>
        </div>
      </div>

      {/* PAYMENT OPTIONS */}
      <div className="bg-white shadow-sm rounded-2xl p-5">

        <div className="text-[17px] font-semibold mb-3">Payment Method</div>

        {/* Apple Pay */}
        <button
          onClick={() => triggerPayment("applepay")}
          className="w-full py-4 rounded-xl bg-black text-white text-[17px] mb-3"
          disabled={loading}
        >
           Pay
        </button>

        {/* Google Pay */}
        <button
          onClick={() => triggerPayment("googlepay")}
          className="w-full py-4 rounded-xl bg-[#4285F4] text-white text-[17px] mb-3"
          disabled={loading}
        >
          G Pay
        </button>

        {/* Card */}
        <button
          onClick={() => triggerPayment("card")}
          className="w-full py-4 rounded-xl border text-[17px] mb-3"
          disabled={loading}
        >
          Credit / Debit Card
        </button>

        {/* Alipay */}
        <button
          onClick={() => triggerPayment("alipay")}
          className="w-full py-4 rounded-xl bg-[#1677ff] text-white text-[17px]"
          disabled={loading}
        >
          Alipay
        </button>

      </div>

      {/* PROCESSING */}
      {loading && (
        <div className="mt-4 text-center text-gray-500 text-[15px]">
          Processing…
        </div>
      )}
    </div>
  );
}
