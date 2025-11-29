"use client";

import { useState } from "react";
import IOSSwitch from "@/components/ios/Switch";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen p-6 bg-[#f5f5f7]">
      <div className="text-2xl font-bold mb-4">Settings</div>

      <div className="p-4 bg-white rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>Dark Mode</div>
          <IOSSwitch value={darkMode} onChange={setDarkMode} />
        </div>
      </div>
    </div>
  );
}
