"use client";

import { useEffect, useState } from "react";
import WalletCard from "@/components/wallet/WalletCard";
import WalletHistory from "@/components/wallet/WalletHistory";

export default function WalletPage() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const loadWallet = async () => {
    setLoading(true);

    const user_id =
      typeof window !== "undefined"
        ? localStorage.getItem("user_id")
        : null;

    if (!user_id) {
      setLoading(false);
      return;
    }

    const res = await fetch("/api/wallet/get", {
      method: "POST",
      body: JSON.stringify({ user_id }),
    });

    const json = await res.json();

    if (json.success) {
      setBalance(json.balance);
      setTransactions(json.transactions);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadWallet();
  }, []);

  // Skeleton while loading
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#f5f5f7] p-6">
        <div className="w-full h-40 rounded-3xl bg-gray-300 animate-pulse mb-6"></div>
        <div className="w-full h-64 rounded-2xl bg-gray-300 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f5f5f7] p-6">

      {/* WALLET CARD */}
      <WalletCard balance={balance} />

      {/* TRANSACTION HISTORY */}
      <WalletHistory transactions={transactions} />
    </div>
  );
}
