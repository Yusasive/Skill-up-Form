"use client";

import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-white text-black text-center rounded-t-3xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Why Join?</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: "📚",
            title: "Expert Mentorship",
            text: "Learn from industry professionals.",
          },
          {
            icon: "💡",
            title: "Hands-On Projects",
            text: "Work on real-world applications.",
          },
          {
            icon: "🎓",
            title: "Certification",
            text: "Earn a recognized certificate.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 shadow-lg rounded-lg bg-green-100 border-l-4 border-green-500 hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <h3 className="text-xl font-bold mb-2">
              {feature.icon} {feature.title}
            </h3>
            <p>{feature.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
