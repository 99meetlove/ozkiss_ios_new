"use client";

export default function WalletHistory({ transactions }) {
  if (!transactions || transactions.length === 0)
    return (
      <div className="text-center text-gray-400 py-6">
        No transactions yet
      </div>
    );

  const formatDate = (ts) => {
    return new Date(ts).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const typeLabel = (type) => {
    switch (type) {
      case "cashback":
        return "Cashback";
      case "referral":
        return "Referral";
      case "payment":
        return "Payment Used";
      case "deduction":
        return "Deduction";
      default:
        return "Transaction";
    }
  };

  const badgeColor = (type) => {
    switch (type) {
      case "cashback":
        return "#34c759"; // green
      case "referral":
        return "#5ac8fa"; // blue
      case "payment":
        return "#ff3b30"; // red
      case "deduction":
        return "#ff3b30"; // red
      default:
        return "#8e8e93"; // gray
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-4">
      <div className="text-[18px] font-semibold mb-3">Transaction History</div>

      {transactions.map((tx) => {
        const isPositive = tx.amount > 0;

        return (
          <div key={tx.id} className="py-3 border-b last:border-none">
            <div className="flex justify-between items-center">
              
              {/* LEFT SIDE */}
              <div>
                <div className="text-[16px] font-semibold">
                  {typeLabel(tx.type)}
                </div>
                <div className="text-gray-500 text-[13px]">
                  {formatDate(tx.created_at)}
                </div>
                {tx.description && (
                  <div className="text-gray-500 text-[13px] mt-1">
                    {tx.description}
                  </div>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right">
                <div
                  className="text-[18px] font-bold"
                  style={{ color: isPositive ? "#34c759" : "#ff3b30" }}
                >
                  {isPositive ? "+" : "-"}RM {(Math.abs(tx.amount) / 100).toFixed(2)}
                </div>

                {/* badge */}
                <div
                  className="text-white text-[11px] px-2 py-[2px] rounded-full mt-1 inline-block"
                  style={{ background: badgeColor(tx.type) }}
                >
                  {tx.type}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
