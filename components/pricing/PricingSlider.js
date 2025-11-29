"use client";

export default function PricingSlider({ value, min, max, onChange }) {
  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border">
      <div className="text-[17px] font-semibold mb-3">
        Set Your Base Price
      </div>

      <div className="text-[32px] font-bold mb-4 text-blue-600">
        RM {value}
      </div>

      {/* Slider */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full accent-blue-600"
        style={{
          height: "6px",
          borderRadius: "3px",
          background: "linear-gradient(90deg, #007aff, #4da3ff)",
        }}
      />

      {/* Min/Max */}
      <div className="flex justify-between mt-3 text-gray-500 text-[14px]">
        <span>RM {min}</span>
        <span>RM {max}</span>
      </div>
    </div>
  );
}
