"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseDetails from "@/components/pricing/CourseDetails";
import CouponForm from "@/components/pricing/CouponForm";
import PriceSummary from "@/components/pricing/PriceSummary";

interface Skill {
  description: string;
  name: string;
  price: number;
}

interface UserData {
  skills: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  [key: string]: string | number | boolean | undefined;
}

export default function PricingPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>("");
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        if (response.ok) {
          const data: Skill[] = await response.json();

          const skillsWithDescription = data.map((skill) => ({
            ...skill,
            description: skill.description || "No description available",
          }));

          setSkills(skillsWithDescription);

          const userData = JSON.parse(
            sessionStorage.getItem("userData") || "{}"
          );
          setUserData(userData);

          const skill = skillsWithDescription.find(
            (s: Skill) => s.name === userData.skills
          );
          if (skill) {
            setSelectedSkill(skill.name);
            setOriginalPrice(skill.price);
            setDiscountedPrice(skill.price);
          } else {
            setError("Selected course not available.");
          }
        } else {
          console.error("Failed to fetch skills.");
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchSkills();
  }, []);

  const handleApplyCoupon = async (code: string) => {
    try {
      const response = await fetch(`/api/coupons?code=${code.trim()}`);
      if (response.ok) {
        const { discountPercentage } = await response.json();
        const newPrice =
          originalPrice - (originalPrice * discountPercentage) / 100;
        setDiscountedPrice(newPrice);
        setIsCouponApplied(true);
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Invalid coupon code.");
      }
    } catch {
      setError("Failed to apply coupon. Please try again.");
    }
  };

  const handleNext = () => {
    const updatedData = {
      ...userData,
      originalPrice,
      discountedPrice,
      couponCode: isCouponApplied ? couponCode : null,
    };
    sessionStorage.setItem("userData", JSON.stringify(updatedData));
    router.push("/register/payment");
  };

  if (!userData)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-green-600 text-lg font-semibold">
          Loading ...
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <header className="sticky top-0 bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-extrabold text-green-700 text-center">
          Pricing and Payment
        </h1>
      </header>
      <CourseDetails skills={skills} selectedSkill={selectedSkill} />
      <PriceSummary
        originalPrice={originalPrice}
        discountedPrice={discountedPrice}
        isCouponApplied={isCouponApplied}
      />
      <CouponForm
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        handleApplyCoupon={handleApplyCoupon}
        error={error}
      />
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => router.push("/register")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
