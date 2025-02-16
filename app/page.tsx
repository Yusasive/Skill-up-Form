"use client";

import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CallToAction from "@/components/CallToAction";
import FloatingElements from "@/components/FloatingElements";
import AnimatedDivider from "@/components/AnimatedDivider";
import WaveDivider from "@/components/WaveDivider";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-400 to-green-600 text-white font-sans">
      <FloatingElements />
      <HeroSection />
      <WaveDivider />
      <AnimatedDivider />
      <FeaturesSection />
      <CallToAction />
    </div>
  );
}
