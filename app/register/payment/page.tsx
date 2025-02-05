"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { FaMoneyBillWave, FaExclamationTriangle } from "react-icons/fa";

type UserData = {
  name: string;
  email: string;
  phone: string;
  discountedPrice?: number;
  originalPrice: number;
  skills: string;
};

type FlutterwaveResponse = {
  status: string;
  transaction_id: number;
};

export default function PaymentPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      router.push("/register");
    }
  }, [router]);

  if (!userData) return null;

  const { name, email, phone, discountedPrice, originalPrice, skills } =
    userData;

  if (!process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY) {
    console.error("Flutterwave public key is not defined. Check .env setup.");
    return (
      <div className="p-4 text-red-500 bg-red-50 border border-red-300 rounded-lg flex items-center space-x-2">
        <FaExclamationTriangle className="text-lg" />
        <span>
          Payment integration is misconfigured. Please contact support.
        </span>
      </div>
    );
  }

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY as string,
    tx_ref: `rave-${Date.now()}`,
    amount: discountedPrice || originalPrice,
    currency: "NGN",
    payment_options: "card, banktransfer, ussd",
    customer: {
      email: email,
      phone_number: phone,
      name: name,
    },
    customizations: {
      title: "SkillUp Payment",
      description: `Payment for ${skills} course`,
      logo: "/logo.png",
    },
  };

  const fwConfig = {
    ...config,
    callback: (response: FlutterwaveResponse) => {
      if (response.status === "successful") {
        console.log("Payment successful:", response);
        fetch("/api/payment/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactionId: response.transaction_id,
            userData,
          }),
        })
          .then((res) => {
            if (res.ok) {
              console.log("Payment confirmation successful.");
              alert("Payment successful!");
              closePaymentModal();
              router.push("/register/success");
            } else {
              return res.json().then((errorData) => {
                console.error("Payment confirmation failed:", errorData);
                alert(
                  `Payment was successful, but we could not confirm it. Reason: ${errorData.error || "Unknown error."}`
                );
              });
            }
          })
          .catch((error) => {
            console.error("Error confirming payment:", error);
            alert(
              "An error occurred while confirming payment. Please contact support."
            );
          });
      } else {
        alert("Payment failed or was canceled.");
      }
    },
    onClose: () => {
      console.log("Payment modal closed.");
    },
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50" >
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mt-8 w-full sm:w-96">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-green-700">Make Payment</h1>
          <FaMoneyBillWave className="text-green-500 text-2xl" />
        </header>

        <section className="mb-6">
          <p className="text-lg text-gray-800">
            You are about to pay for{" "}
            <strong className="text-green-700">{skills}</strong>.
          </p>
          <p className="mt-2 text-gray-700">
            Total Amount:
            {discountedPrice ? (
              <span className="ml-2">
                <span className="line-through text-red-500 mr-2">
                  #{originalPrice.toFixed(2)}
                </span>
                <span className="font-bold text-green-600">
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
        <FlutterWaveButton
          {...fwConfig}
          text="Pay Now"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all w-full"
        />
      </div>
    </div>
  );
}
