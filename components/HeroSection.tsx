"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center p-8">
      <motion.h1
        className="text-5xl sm:text-7xl font-extrabold tracking-wide text-green-700"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        Unlock Your Potential 🚀
      </motion.h1>

      <motion.p
        className="text-lg sm:text-2xl mt-4 max-w-3xl text-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Join the <strong>Skill-Up Program</strong> by **NAMSSN Unilorin** and
        gain hands-on experience in high-demand skills with expert mentorship!
      </motion.p>

      <motion.button
        className="mt-6 px-8 py-4 text-lg font-bold bg-yellow-400 text-black rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-yellow-500"
        onClick={() => router.push("/register")}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        Register Now 🚀
      </motion.button>
    </section>
  );
}
