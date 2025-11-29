"use client";

import { useEffect, useState } from "react";
import PerformanceCard from "@/components/performance/PerformanceCard";
import PerformanceChart from "@/components/performance/PerformanceChart";

export default function HostPerformancePage() {
  const [stats, setStats] = useState(null);

  const host_id =
    typeof window !== "undefined"
      ? localStorage.getItem("host_id")
      : null;

  const loadStats = async () => {
    const res = await fetch("/api/host/performance/get", {
      method: "POST",
      body: JSON.stringify({ host_id }),
    });

    const json = await res.json();
    setStats(json);
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (!stats) {
    return <div className="p-6 text-gray-400">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-6 pb-24">
      <div className="text-[26px] font-bold mb-6">
        Performance Dashboard
      </div>

      {/* CHART */}
      <PerformanceChart data={stats.chart} />

      {/* METRICS */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <PerformanceCard label="Completion Rate" value={stats.completion + "%"} />
        <PerformanceCard label="Response Rate" value={stats.response + "%"} />
        <PerformanceCard label="Returning Clients" value={stats.returning + "%"} />
        <PerformanceCard label="Avg Rating" value={stats.rating.toFixed(1)} />
      </div>

      {/* AI SCORE */}
      <div className="mt-8 p-6 rounded-3xl bg-white shadow-sm border text-center">
        <div className="text-[16px] text-gray-600">AI Performance Score</div>
        <div className="text-[44px] font-bold mt-2 text-blue-600">
          {stats.ai_score}
        </div>
        <div className="text-[14px] text-gray-500 mt-1">
          Based on consistency, client satisfaction & engagement.
        </div>
      </div>
    </div>
  );
}
