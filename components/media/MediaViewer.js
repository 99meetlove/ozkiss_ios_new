"use client";

import { motion } from "framer-motion";

export default function MediaViewer({ item, onClose }) {
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <motion.img
        src={item.file_url}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
          borderRadius: 16,
        }}
      />
    </motion.div>
  );
}
