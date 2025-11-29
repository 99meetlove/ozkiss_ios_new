"use client";

import { useEffect, useRef, useState } from "react";

export default function CalendarStrip({ selectedDate, onChange }) {
  const [dates, setDates] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const tmp = [];
    const today = new Date();

    // Generate 30 days
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      tmp.push(d);
    }
    setDates(tmp);
  }, []);

  useEffect(() => {
    // Auto-center selected date
    if (!scrollRef.current) return;
    const index = dates.findIndex(
      (d) =>
        d.toDateString() === new Date(selectedDate).toDateString()
    );
    if (index >= 0) {
      const itemWidth = 60;
      scrollRef.current.scrollTo({
        left: index * itemWidth - 120,
        behavior: "smooth",
      });
    }
  }, [selectedDate, dates]);

  const formatDay = (d) =>
    d.toLocaleDateString("en-US", { weekday: "short" });
  const formatNum = (d) => d.getDate();

  return (
    <div
      className="w-full py-2 flex gap-2 overflow-x-auto"
      ref={scrollRef}
      style={{
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {dates.map((d, i) => {
        const isSelected =
          selectedDate &&
          new Date(selectedDate).toDateString() === d.toDateString();

        const isToday =
          d.toDateString() === new Date().toDateString();

        return (
          <div
            key={i}
            onClick={() => onChange(d)}
            className="flex flex-col items-center justify-center"
            style={{
              minWidth: 60,
              height: 70,
              borderRadius: 16,
              background: isSelected
                ? "#007aff"
                : isToday
                ? "rgba(0,0,0,0.06)"
                : "transparent",
              cursor: "pointer",
              color: isSelected ? "white" : "black",
            }}
          >
            <div style={{ fontSize: 13, opacity: 0.7 }}>
              {formatDay(d)}
            </div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>
              {formatNum(d)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
