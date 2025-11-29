"use client";

export default function PriceHint({ price }) {
  if (!price) return null;

  // === FEES ===
  const client_fee = price * 0.15;      // Client Fee 15%
  const host_cut = price * 0.1;         // Host Commission 10%
  const host_income = price - host_cut; // Host real net income

  // === CASHBACK ===
  const app_cashback = price * 0.07;    // App booking 7%
  const web_cashback = price * 0.04;    // Web booking 4%

  return (
    <div className="mt-6 bg-white p-6 rounded-3xl shadow-sm border">
      <div className="text-[17px] font-semibold mb-4">
        Price Breakdown
      </div>

      {/* Host Income */}
      <div className="flex justify-between mb-3">
        <div className="text-gray-600">Host Income</div>
        <div className="font-semibold text-[17px] text-green-600">
          RM {host_income.toFixed(2)}
        </div>
      </div>

      {/* Platform Fee */}
      <div className="flex justify-between mb-3">
        <div className="text-gray-600">Platform Fee (15%)</div>
        <div className="font-medium">RM {client_fee.toFixed(2)}</div>
      </div>

      {/* Host Commission */}
      <div className="flex justify-between mb-3">
        <div className="text-gray-600">Host Commission (10%)</div>
        <div className="font-medium">RM {host_cut.toFixed(2)}</div>
      </div>

      <hr className="my-4" />

      {/* Cashback */}
      <div className="text-[15px] font-semibold mb-2">
        Cashback Rewards
      </div>

      <div className="flex justify-between text-gray-600 mb-1">
        <span>App Booking Cashback (7%)</span>
        <span>RM {app_cashback.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-600 mb-4">
        <span>Web Booking Cashback (4%)</span>
        <span>RM {web_cashback.toFixed(2)}</span>
      </div>

      {/* Recommended Price Hint */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl">
        Setting a price inside the recommended range improves your ranking
        and increases booking conversion.
      </div>
    </div>
  );
}
