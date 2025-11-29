"use client";

import { useEffect, useState } from "react";
import PricingSlider from "@/components/pricing/PricingSlider";
import PriceHint from "@/components/pricing/PriceHint";

export default function PricingPage() {
  const [basePrice, setBasePrice] = useState(0);
  const [range, setRange] = useState(null);
  const host_id =
    typeof window !== "undefined" ? localStorage.getItem("host_id") : null;

  const loadRange = async () => {
    const res = await fetch("/api/host/pricing/get-range", {
      method: "POST",
      body: JSON.stringify({ host_id }),
    });
    const json = await res.json();
    setRange(json.range);
    setBasePrice(json.price || json.range.recommended);
  };

  const save = async () => {
    await fetch("/api/host/pricing/save", {
      method: "POST",
      body: JSON.stringify({
        host_id,
        price: basePrice,
      }),
    });

    alert("Price updated!");
  };

  useEffect(() => {
    loadRange();
  }, []);

  if (!range)
    return <div className="p-6 text-gray-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-6 pb-24">
      <div className="text-[26px] font-bold mb-6">Pricing Setup</div>

      {/* PRICE SLIDER */}
      <PricingSlider
        value={basePrice}
        min={range.min}
        max={range.max}
        onChange={setBasePrice}
      />

      {/* HINT */}
      <PriceHint price={basePrice} />

      {/* SAVE BUTTON */}
      <button
        onClick={save}
        className="mt-10 w-full py-4 rounded-2xl bg-blue-600 text-white text-[18px] active:scale-95 transition-all"
      >
        Save Price
      </button>
    </div>
  );
}
