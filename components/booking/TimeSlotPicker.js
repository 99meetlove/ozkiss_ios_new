"use client";

export default function TimeSlotPicker({
  selectedTime,
  onChange,
  disabledTimes = [],
}) {
  // Time slots: 10:00 → 03:00 (typical host service hours)
  const slots = [
    "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00",
    "16:00", "17:00", "18:00",
    "19:00", "20:00", "21:00",
    "22:00", "23:00", "00:00",
    "01:00", "02:00", "03:00",
  ];

  return (
    <div className="grid grid-cols-3 gap-2 w-full mt-3 px-1">
      {slots.map((time) => {
        const isSelected = selectedTime === time;
        const isDisabled = disabledTimes.includes(time);

        return (
          <button
            key={time}
            onClick={() => !isDisabled && onChange(time)}
            className="py-3 rounded-2xl text-[15px] font-medium"
            style={{
              background: isDisabled
                ? "rgba(0,0,0,0.08)"
                : isSelected
                ? "#007aff"
                : "white",
              color: isSelected
                ? "white"
                : isDisabled
                ? "gray"
                : "black",
              border: isSelected ? "none" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
