"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/LandingPage/Button";
import hero1 from "@/public/images/hero1.png";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[#FFFFFF] pt-28 lg:pt-16 px-7 md:px-12 lg:px-32 flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-left max-w-2xl space-y-6 lg:space-y-8 mb-8"
      >
        <h1 className="text-3xl md:text-5xl lg:text-5xl  font-semibold text-[#252525] leading-tight">
          Level Up Your Skills with NAMSSN&apos;s Skill Up Program!
        </h1>
        <p className="text-base md:text-lg font-normal text-[#555555] mt-2 md:mt-4">
          Join the National Association of Mathematical Science Students of
          Nigeria (NAMSSN) as we empower students with in-demand skills for
          academic and career success.
        </p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="/register">
            <Button variant="primary">Register Now</Button>
          </Link>
          <Link href="https://www.linkedin.com/company/namssn-unilorin/">
            <Button variant="secondary">Learn More</Button>
          </Link>
        </motion.div>
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
          height={700}
          className="w-full h-auto rounded-xl"
          priority
        />
      </motion.div>
    </section>
  );
}
