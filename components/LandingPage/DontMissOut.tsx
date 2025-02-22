"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DontMissOut() {
  return (
    <section className="bg-[#252525] text-white text-center py-20 px-6">
      <motion.h2
        className="text-[50px] lg:text-[80px] font-semibold mb-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-gray-500">Don</span>&apos;t{" "}
        <span className="text-white">Miss</span>{" "}
        <span className="text-white lg:text-gray-400">Out!</span>
      </motion.h2>
      <motion.p
        className="text-base lg:text-lg text-[#FFFFFF] font-normal mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Secure your spot today and take the first step towards mastering
        valuable skills.
      </motion.p>
      <Link href="/register">
        {" "}
        <motion.button
          className="bg-white text-black font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-300"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Register Now
        </motion.button>
      </Link>
    </section>
  );
}
