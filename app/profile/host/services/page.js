"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HostServicesPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  const host_id =
    typeof window !== "undefined"
      ? localStorage.getItem("host_id")
      : null;

  const loadServices = async () => {
    if (!host_id) return;

    setLoading(true);

    const res = await fetch("/api/host/services/list", {
      method: "POST",
      body: JSON.stringify({ host_id }),
    });

    const json = await res.json();
    setServices(json.services || []);
    setLoading(false);
  };

  const toggleService = async (id, enabled) => {
    await fetch("/api/host/services/update-status", {
      method: "POST",
      body: JSON.stringify({
        service_id: id,
        enabled,
      }),
    });

    loadServices();
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f7] p-6 pb-20">

      <div className="text-[26px] font-bold mb-6">Host Services</div>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 active:scale-[0.98] transition-all"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  router.push(`/host/services/${s.id}`)
                }
              >
                <div>
                  <div className="text-[18px] font-semibold">
                    {s.name}
                  </div>
                  <div className="text-[14px] text-gray-500">
                    {s.enabled ? "Active" : "Inactive"}
                  </div>
                </div>

                <div className="text-gray-400 text-[20px]">›</div>
              </div>

              {/* Toggle */}
              <div className="mt-4 flex justify-between items-center">
                <div className="text-[15px] text-gray-600">
                  Available
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={s.enabled}
                    onChange={(e) =>
                      toggleService(s.id, e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="
                    w-11 h-6 bg-gray-300 peer-focus:outline-none
                    rounded-full peer
                    peer-checked:bg-blue-600
                    transition-all
                  "></div>
                  <div className="
                    absolute left-1 top-1 w-4 h-4 bg-white rounded-full
                    transition-all peer-checked:translate-x-5
                    shadow
                  "></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
