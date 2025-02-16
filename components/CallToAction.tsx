"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CallToAction() {
  const router = useRouter();

  return (
    <section className="text-center py-16 bg-green-600 text-white">
      <h2 className="text-3xl font-bold">🔥 Are You Ready?</h2>
      <p className="text-lg mt-2">Limited spots available! Secure yours now.</p>
      <motion.button
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full text-lg mt-6 transition-all shadow-lg"
        onClick={() => router.push("/register")}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        Join Now 🚀
      </motion.button>
    </section>
  );
}
