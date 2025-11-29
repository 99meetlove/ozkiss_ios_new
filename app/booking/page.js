"use client";

import { motion } from "framer-motion";
import NavigationBar from "@/components/ios/NavigationBar";
import IOSInput from "@/components/ios/Input";
import IOSButton from "@/components/ios/Button";
import IOSPicker from "@/components/ios/Picker";
import { useState } from "react";

export default function BookingPage() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("8:00 PM");
  const [pickerOpen, setPickerOpen] = useState(false);

  const timeSlots = ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <NavigationBar title="Booking" small={true} />

      <div style={{ padding: 16 }}>
        <IOSInput label="Your Name" value={name} onChange={setName} placeholder="Enter name" />

        <div onClick={() => setPickerOpen(true)}>
          <IOSInput label="Time" value={time} onChange={() => {}} />
        </div>

        <div style={{ marginTop: 20 }}>
          <IOSButton title="Confirm Booking" />
        </div>
      </div>

      <IOSPicker
        visible={pickerOpen}
        options={timeSlots}
        value={time}
        onChange={setTime}
        onClose={() => setPickerOpen(false)}
      />
    </motion.div>
  );
}
