"use client";
import { motion } from "framer-motion";

const reasons = [
  { id: 1, text: "Hands-on training by experienced professionals." },
  { id: 2, text: "Certificate of Completion" },
  { id: 3, text: "Internship and job opportunities" },
  { id: 4, text: "Networking with industry experts" },
  { id: 5, text: "Practical projects and mentorship" },
];

export default function WhyJoin() {
  return (
    <section className="bg-black text-white py-12 px-6 md:px-16 lg:px-24">
      <h2 className="text-center text-[22px] font-semibold my-8">Why Join?</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
      >
        {reasons.slice(0, 3).map((reason) => (
          <motion.div
            key={reason.id}
            className="bg-gradient-to-b from-[#3A3A3A] to-[#242424] rounded-lg p-6 text-left shadow-lg space-y-40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: reason.id * 0.2 }}
          >
            <span className="text-3xl font-semibold text-[#FFFFFF] bg-[#646464] px-3 rounded-full">
              {reason.id}
            </span>
            <p className="mt-2 text-[26px] lg:text-3xl font-semibold text-[#FFFFFF]">
              {reason.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
      >
        {reasons.slice(3).map((reason) => (
          <motion.div
            key={reason.id}
            className="bg-gradient-to-b from-[#3A3A3A] to-[#242424] rounded-lg p-6 text-left shadow-lg space-y-40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: reason.id * 0.2 }}
          >
            <span className="text-3xl font-semibold text-[#FFFFFF] bg-[#646464] px-3 rounded-full">
              {reason.id}
            </span>
            <p className="mt-2 text-[26px] lg:text-3xl font-semibold text-[#FFFFFF]">
              {reason.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
