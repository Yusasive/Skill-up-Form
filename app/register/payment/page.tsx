"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FaMoneyBillWave, FaExclamationTriangle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

type UserData = {
  name: string;
  email: string;
  phone: string;
  discountedPrice?: number;
  originalPrice: number;
  skills: string;
};

export default function PaymentPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isClient, setIsClient] = useState(false);
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  useEffect(() => {
    setIsClient(true); 
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!isClient || !userData) return null; 

  const { email, discountedPrice, originalPrice, skills } = userData;

  if (!publicKey) {
    console.error("Paystack public key is not defined. Check .env setup.");
    return (
      <div className="p-4 text-red-500 bg-red-50 border border-red-300 rounded-lg flex items-center space-x-2">
        <FaExclamationTriangle className="text-lg" />
        <span>
          Payment integration is misconfigured. Please contact support.
        </span>
      </div>
    );
  }

  const amount = (discountedPrice || originalPrice) * 100;

  const handleSuccess = async (reference: { reference: string }) => {
    try {
      const response = await fetch("/api/payment/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference: reference.reference,
          userData,
        }),
      });

      const data = await response.json();

      if (response.ok && data.paymentStatus === "Paid") {
        toast.success("✅ Payment successful!");
        setTimeout(() => {
          router.push("/register/success");
        }, 2000);
      } else {
        toast.error(
          `⚠️ Payment was successful, but verification failed. Contact support. (${data.error || "Unknown error"})`
        );
      }
    } catch (err) {
      console.error("Payment verification error:", err);
      toast.error(
        "❌ An error occurred while verifying payment. Please contact support."
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-8 w-full sm:w-96">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Make Payment</h1>
          <FaMoneyBillWave className="text-gray-500 text-2xl" />
        </header>

        <section className="mb-6">
          <p className="text-lg text-gray-800">
            You are about to pay for{" "}
            <strong className="text-gray-700">{skills}</strong>.
          </p>
          <p className="mt-2 text-gray-700">
            Total Amount:
            {discountedPrice ? (
              <span className="ml-2">
                <span className="line-through text-red-500 mr-2">
                  #{originalPrice.toFixed(2)}
                </span>
                <span className="font-bold text-gray-600">
                  #{discountedPrice.toFixed(2)}
                </span>
              </span>
            ) : (
              <span className="ml-2 font-bold text-gray-800">
                #{originalPrice.toFixed(2)}
              </span>
            )}
          </p>
        </section>

        <PaystackButton
          publicKey={publicKey}
          email={email}
          amount={amount}
          currency="NGN"
          text="Pay Now"
          onSuccess={handleSuccess}
          onClose={() => toast.info("⚠️ Payment process was closed.")}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-all w-full"
        />
      </div>
    </div>
  );
}
