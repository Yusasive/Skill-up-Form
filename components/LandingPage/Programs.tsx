"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import hero1 from "@/public/images/hero2.png";

export default function HeroSection() {
  return (
    <>
      <motion.div
        className="gap-4 py-16 bg-[#F7F7F7]"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h1 className="text-[#252525] text-[22px] text-center font-semibold">
          About the Program
        </h1>
      </motion.div>{" "}
      <section className="bg-[#F7F7F7] px-7 md:px-12 lg:px-32 flex flex-col-reverse lg:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-left max-w-2xl space-y-6 lg:space-y-8"
        >
          <h1 className="text-3xl md:text-5xl lg:text-5xl mt-4 md:mt-0 font-semibold text-[#252525] leading-tight">
            What is the Skill Up Program?
          </h1>
          <p className="text-base md:text-lg font-normal text-[#555555] mt-2 md:mt-4">
            The NAMSSN Skill Up Program is an initiative designed to equip
            students with practical skills that complement their mathematical
            science education. Our goal is to bridge the gap between theoretical
            knowledge and industry needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[500px]"
        >
          <Image
            src={hero1}
            alt="Hero Picture"
            width={610}
            height={460}
            className="rounded-xl w-full"
            priority
          />
        </motion.div>
      </section>
    </>
  );
}
