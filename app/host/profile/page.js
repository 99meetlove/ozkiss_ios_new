"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import NavigationBar from "@/components/ios/NavigationBar";
import GroupSection from "@/components/ios/GroupSection";
import IOSInput from "@/components/ios/Input";
import IOSButton from "@/components/ios/Button";

export default function HostProfileSetup() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <NavigationBar title="Host Profile" small={true} />

      <GroupSection>
        <IOSInput label="Name" value={name} onChange={setName} placeholder="Enter name" />
        <IOSInput label="Age" value={age} onChange={setAge} placeholder="Enter age" type="number" />
        <IOSInput label="Bio" value={bio} onChange={setBio} placeholder="Short introduction" />
      </GroupSection>

      <div style={{ padding: 16 }}>
        <IOSButton title="Save Profile" />
      </div>
    </motion.div>
  );
}
