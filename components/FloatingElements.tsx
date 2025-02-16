"use client";
import { motion } from "framer-motion";

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-10 left-20 w-24 h-24 bg-green-300 blur-3xl opacity-50"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.div
        className="absolute bottom-10 right-20 w-24 h-24 bg-green-400 blur-3xl opacity-60"
        animate={{ y: [0, -30, 0], x: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
    </div>
  );
}
