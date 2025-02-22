"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const timeline = [
  { id: 1, icon: <Calendar size={24} />, text: "Registration Opens: 20/2/2025" },
  { id: 2, icon: <Calendar size={24} />, text: "Training Starts: [Date]" },
  { id: 3, icon: <Calendar size={24} />, text: "Duration: 3 weeks" },
  {
    id: 4,
    icon: <MapPin size={24} />,
    text: "Venue: Online & Physical (if applicable)",
  },
]; 

export default function ProgramTimeline() {
  return (
    <section className="bg-white text-black py-12 px-6 md:px-16 lg:px-24">
      <h2 className="text-center text-base lg:text-[22px] font-semibold mb-6">
        Program Timeline
      </h2>
      <motion.div
        className="flex flex-col gap-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
      >
        {timeline.map((item) => (
          <motion.div
            key={item.id}
            className="flex items-center gap-4 bg-[#F7F7F7] p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: item.id * 0.2 }}
          >
            <div className="bg-gray-200 p-3 rounded-full">{item.icon}</div>
            <p className="text-lg lg:text-[28px] font-semibold">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
