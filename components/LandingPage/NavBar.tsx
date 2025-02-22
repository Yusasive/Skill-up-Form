"use client";

import Link from "next/link";
import Button from "./Button";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full flex justify-between items-center py-5 lg:py-7 px-7 md:px-12 lg:px-32 backdrop-blur-md bg-white/30 shadow-md z-50"
    >
      <Link href="/">
        <Image src={Logo} alt="NAMSSN" width={60} height={60} />
      </Link>

      <Link href="/register">
        <Button variant="primary">Register Now</Button>
      </Link>
    </motion.nav>
  );
}
