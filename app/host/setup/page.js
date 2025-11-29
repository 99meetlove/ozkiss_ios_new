"use client";

import { useState } from "react";
import IOSSwitch from "@/components/ios/Switch";

export default function HostSetupPage() {
  const [outcall, setOutcall] = useState(false);

  return (
    <div className="min-h-screen p-6 bg-[#f5f5f7]">
      <div className="text-2xl font-bold mb-4">Host Setup</div>

      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div>Outcall</div>
          <IOSSwitch value={outcall} onChange={setOutcall} />
        </div>

        <p className="text-gray-500 text-sm">
          Placeholder page — replace later with your real UI.
        </p>
      </div>
    </div>
  );
}
