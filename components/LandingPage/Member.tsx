"use client";
import { motion } from "framer-motion";

const members = [
  {
    id: 1,
    text: "Students at University of Ilorin, at any level",
  },
  {
    id: 2,
    text: "Anyone interested in tech, data, and analytical skills",
  },
  {
    id: 3,
    text: "Enthusiastic learners looking to build a competitive edge",
  },
];

export default function WhoCanJoin() {
  return (
    <section className="bg-[#F7F7F7] py-12 px-7 md:px-12 lg:px-32 ">
      <h2 className="text-center text-[#252525] text-[22px] font-semibold mb-6">
        Who Can Join?
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
      >
        {members.map((member) => (
          <motion.div
            key={member.id}
            className="border border-gray-300  rounded-lg p-6 text-left"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: member.id * 0.2 }}
          >
            <span className="text-5xl font-medium bg-gradient-to-b from-[#252525] to-[#f9f8f8] text-transparent bg-clip-text">
              {member.id}
            </span>
            <p className="mt-2 text-lg font-medium text-[#252525]">
              {member.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
