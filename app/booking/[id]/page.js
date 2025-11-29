"use client";

import { useEffect, useState } from "react";
import CalendarStrip from "@/components/booking/CalendarStrip";
import TimeSlotPicker from "@/components/booking/TimeSlotPicker";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function BookingPage({ params }) {
  const hostId = params.id;
  const router = useRouter();

  // ========= STATE =========
  const [host, setHost] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1); // hours
  const [locationType, setLocationType] = useState("incall"); // incall | outcall

  const [unavailableTimes, setUnavailableTimes] = useState([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  // ⭐ For Quick Rebook
  const [quickData, setQuickData] = useState(null);

  // ========= LOAD HOST DATA =========
  const loadHost = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("hosts")
      .select("*")
      .eq("id", hostId)
      .single();

    setHost(data);
    setSelectedService(data?.services[0] || null);
    setLoading(false);
  };

  // ========= LOAD UNAVAILABLE TIMES =========
  const loadUnavailable = async () => {
    const d = selectedDate.toISOString().split("T")[0];

    const { data } = await supabase
      .from("booking_slots")
      .select("time")
      .eq("host_id", hostId)
      .eq("date", d);

    const times = data?.map((x) => x.time) || [];
    setUnavailableTimes(times);
  };

  // ========= PRICE CALC =========
  const calcPrice = () => {
    if (!host || !selectedService) return;

    let base = selectedService.price * selectedDuration;

    // Outcall fee
    if (locationType === "outcall") {
      base += host.outcall_fee || 0;
    }

    setPrice(base);
  };

  // ========= EFFECTS =========
  useEffect(() => {
    loadHost();
  }, []);

  useEffect(() => {
    if (!host) return;
    calcPrice();
  }, [selectedService, selectedDuration, locationType, host]);

  useEffect(() => {
    loadUnavailable();
  }, [selectedDate]);

  // ⭐ ========= QUICK REBOOK AUTO-FILL =========
  useEffect(() => {
    const d =
      typeof window !== "undefined"
        ? localStorage.getItem("ozkiss_quick_rebook")
        : null;

    if (!d) return;

    const q = JSON.parse(d);
    setQuickData(q);

    // auto-fill fields
    if (q.service) setSelectedService(q.service);
    if (q.duration) setSelectedDuration(q.duration);
    if (q.location) setLocationType(q.location);

    // clear after load
    localStorage.removeItem("ozkiss_quick_rebook");
  }, []);

  // ========= GO SUMMARY =========
  const goSummary = () => {
    if (!selectedDate || !selectedTime || !selectedService) return;

    const payload = {
      host_id: hostId,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      service: selectedService,
      duration: selectedDuration,
      location: locationType,
      price,
    };

    localStorage.setItem("ozkiss_booking", JSON.stringify(payload));

    router.push("/booking/summary");
  };

  if (loading || !host)
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Loading…
      </div>
    );

  return (
    <div className="w-full min-h-screen pb-20 bg-[#f5f5f7]">
      {/* HEADER */}
      <div
        className="px-4 py-3 text-[20px] font-semibold"
        style={{
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          background: "rgba(255,255,255,0.8)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        Book {host.name}
      </div>

      {/* ⭐ QUICK REBOOK BANNER */}
      {quickData && (
        <div
          className="mx-4 mt-3 p-4 rounded-2xl shadow-sm bg-white border border-blue-100"
          style={{ background: "rgba(0,122,255,0.06)" }}
        >
          <div className="text-[15px] font-medium">Quick Rebook applied</div>
          <div className="text-[13px] text-gray-600 mt-1">
            Service: {quickData.service?.name} • {quickData.duration} hr •{" "}
            {quickData.location}
          </div>
        </div>
      )}

      {/* DATE PICKER */}
      <div className="mt-1">
        <CalendarStrip
          selectedDate={selectedDate}
          onChange={(d) => setSelectedDate(d)}
        />
      </div>

      {/* TIME PICKER */}
      <div className="px-4 mt-4">
        <div className="text-[17px] font-semibold mb-2">Select Time</div>

        <TimeSlotPicker
          selectedTime={selectedTime}
          onChange={setSelectedTime}
          disabledTimes={unavailableTimes}
        />
      </div>

      {/* SERVICE */}
      <div className="px-4 mt-6">
        <div className="text-[17px] font-semibold mb-2">Service</div>

        <select
          className="w-full border p-3 rounded-xl bg-white"
          value={selectedService?.id}
          onChange={(e) => {
            const svc = host.services.find(
              (x) => x.id === Number(e.target.value)
            );
            setSelectedService(svc);
          }}
        >
          {host.services.map((svc) => (
            <option key={svc.id} value={svc.id}>
              {svc.name} — RM{svc.price}/hr
            </option>
          ))}
        </select>
      </div>

      {/* DURATION */}
      <div className="px-4 mt-6">
        <div className="text-[17px] font-semibold mb-2">Duration</div>

        <div className="flex gap-2">
          {[1, 2, 3, 4].map((hr) => (
            <button
              key={hr}
              className="flex-1 py-3 rounded-xl border"
              onClick={() => setSelectedDuration(hr)}
              style={{
                background: selectedDuration === hr ? "#007aff" : "white",
                color: selectedDuration === hr ? "white" : "black",
              }}
            >
              {hr} hr
            </button>
          ))}
        </div>
      </div>

      {/* LOCATION */}
      <div className="px-4 mt-6">
        <div className="text-[17px] font-semibold mb-2">Location</div>

        <div className="flex gap-2">
          <button
            onClick={() => setLocationType("incall")}
            className="flex-1 py-3 rounded-xl border"
            style={{
              background: locationType === "incall" ? "#007aff" : "white",
              color: locationType === "incall" ? "white" : "black",
            }}
          >
            Incall
          </button>

          <button
            onClick={() => setLocationType("outcall")}
            className="flex-1 py-3 rounded-xl border"
            style={{
              background: locationType === "outcall" ? "#007aff" : "white",
              color: locationType === "outcall" ? "white" : "black",
            }}
          >
            Outcall
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div className="px-4 mt-6">
        <div className="text-[17px] font-semibold">Total</div>
        <div className="text-[28px] font-bold mt-1">RM{price}</div>
        <div className="text-gray-500 text-[13px] mt-1">
          * Before cashback (4% web / 7% app)
        </div>
      </div>

      {/* BUTTON */}
      <div className="px-4 mt-10">
        <button
          onClick={goSummary}
          className="w-full py-4 rounded-2xl text-white text-[17px] font-semibold"
          style={{ background: "#007aff" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
