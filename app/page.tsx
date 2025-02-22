"use client";

import HeroSection from "@/components/LandingPage/Hero";
import Navbar from "@/components/LandingPage/NavBar";
import Programs from "@/components/LandingPage/Programs";
import Member from "@/components/LandingPage/Member";
import Skills from "@/components/LandingPage/Skills";
import Join from "@/components/LandingPage/Join";
import ProgramTimeline from "@/components/LandingPage/ProgramTimeline";
import DontMissOut from "@/components/LandingPage/DontMissOut";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Programs />
      <Member />
      <Skills />
      <Join />
      <ProgramTimeline />
      <DontMissOut />
    </div>
  );
}
