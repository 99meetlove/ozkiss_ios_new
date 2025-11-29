"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import NavigationBar from "@/components/ios/NavigationBar";
import GroupSection from "@/components/ios/GroupSection";
import IOSInput from "@/components/ios/Input";
import IOSButton from "@/components/ios/Button";

export default function HostAddressPage() {
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <NavigationBar title="Host Address" small={true} />

      <GroupSection>
        <IOSInput label="Address" value={address} onChange={setAddress} placeholder="123 Example St" />
        <IOSInput label="Unit / Suite" value={unit} onChange={setUnit} placeholder="Apartment 20A" />
      </GroupSection>

      <div style={{ padding: 16 }}>
        <IOSButton title="Save Address" />
      </div>
    </motion.div>
  );
}
