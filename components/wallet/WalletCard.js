"use client";

export default function WalletCard({ balance }) {
  const rm = (balance / 100).toFixed(2); // convert cents → RM

  return (
    <div
      className="w-full p-6 rounded-3xl shadow-lg text-white mb-6"
      style={{
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
      }}
    >
      <div className="text-[17px] opacity-90">Wallet Balance</div>

      <div className="text-[40px] font-bold mt-2">
        RM {rm}
      </div>

      <div className="mt-4 text-[14px] opacity-80">
        Cashback is added automatically after every booking
      </div>
    </div>
  );
}
