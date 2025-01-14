"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type CourseDetails = {
  price: number;
  description: string;
};

const courseDetails: Record<
  "Frontend Development" | "Backend Development" | "UI/UX Design",
  CourseDetails
> = {
  "Frontend Development": {
    price: 200,
    description:
      "Learn the basics of HTML, CSS, JavaScript, React, and build stunning interfaces.",
  },
  "Backend Development": {
    price: 250,
    description:
      "Master server-side programming with Node.js, databases, and REST APIs.",
  },
  "UI/UX Design": {
    price: 180,
    description:
      "Understand user-centered design principles and create intuitive user interfaces.",
  },
};

export default function PricingPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [selectedSkill, setSelectedSkill] = useState<
    keyof typeof courseDetails
  >("Frontend Development");
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const [couponCode, setCouponCode] = useState<string>("");
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const data = sessionStorage.getItem("userData");
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);

      if (parsedData.skills in courseDetails) {
        const skillDetails =
          courseDetails[parsedData.skills as keyof typeof courseDetails];
        setSelectedSkill(parsedData.skills as keyof typeof courseDetails);
        setOriginalPrice(skillDetails.price);
        setDiscountedPrice(skillDetails.price);
      } else {
        setError("Selected course not available.");
      }
    } else {
      router.push("/register");
    }
  }, [router]);

  const handleApplyCoupon = async () => {
    const trimmedCoupon = couponCode.trim();

    if (!trimmedCoupon) {
      setError("Please enter a valid coupon code.");
      return;
    }

    try {
      const response = await fetch(`/api/coupons?code=${trimmedCoupon}`);

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
    } catch (err) {
      console.error("Error validating coupon:", err);
      setError("Failed to apply coupon. Please try again.");
    }
  };

  const handleNext = () => {
    if (!selectedSkill || !originalPrice || !discountedPrice) {
      alert("Please ensure all course details are available.");
      return;
    }

    const updatedData = {
      ...userData,
      originalPrice,
      discountedPrice,
      couponCode: isCouponApplied ? couponCode : null,
    };

    sessionStorage.setItem("userData", JSON.stringify(updatedData));
    router.push("/register/payment");
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pricing and Payment</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">{selectedSkill}</h2>
        <p className="text-gray-700">
          {courseDetails[selectedSkill]?.description}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium">Price</h3>
        <div className="flex items-center space-x-4">
          {isCouponApplied && (
            <span className="text-gray-500 line-through text-sm">
              #{originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-2xl font-bold text-green-600">
            #{discountedPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium">Coupon Code</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full border rounded-md p-2"
            placeholder="Enter coupon code"
          />
          <button
            type="button"
            onClick={handleApplyCoupon}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
