"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function PerformanceChart({ data }) {
  if (!data || data.length === 0)
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border text-center text-gray-400">
        No performance data yet.
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border">
      <div className="text-[17px] font-semibold mb-4">
        Earnings Trend
      </div>

      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#e5e5e5" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#888" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#888" }}
              tickFormatter={(v) => `RM${v}`}
            />
            <Tooltip
              formatter={(value) => [`RM${value}`, "Earnings"]}
              contentStyle={{
                borderRadius: "14px",
                border: "1px solid #ddd",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#007aff"     // Apple blue
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
