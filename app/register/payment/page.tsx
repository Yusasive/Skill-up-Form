"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

export default function PaymentPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

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
      <div className="p-4 text-red-500">
        Payment integration is misconfigured. Please contact support.
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
    callback: async (response: any) => {
      if (response.status === "successful") {
        console.log("Payment successful:", response);

        try {
          const res = await fetch("/api/payment/confirm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transactionId: response.transaction_id,
              userData, // Ensure userData contains the necessary details
            }),
          });

          if (res.ok) {
            console.log("Payment confirmation successful.");
            alert("Payment successful!");
            closePaymentModal();
            router.push("/register/success");
          } else {
            const errorData = await res.json();
            console.error("Payment confirmation failed:", errorData);
            alert(
              `Payment was successful, but we could not confirm it. Reason: ${errorData.error || "Unknown error."}`
            );
          }
        } catch (error) {
          console.error("Error confirming payment:", error);
          alert(
            "An error occurred while confirming payment. Please contact support."
          );
        }
      } else {
        alert("Payment failed or was canceled.");
      }
    },
    onClose: () => {
      console.log("Payment modal closed.");
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Make Payment</h1>
      <p className="mb-4">
        You are about to pay for <strong>{skills}</strong>.
      </p>
      <p className="mb-4">
        Total Amount:
        {discountedPrice ? (
          <>
            <span className="line-through text-red-500 mr-2">
              #{originalPrice.toFixed(2)}
            </span>
            <span className="font-bold">#{discountedPrice.toFixed(2)}</span>
          </>
        ) : (
          <span className="font-bold">#{originalPrice.toFixed(2)}</span>
        )}
      </p>

      <FlutterWaveButton
        {...fwConfig}
        text="Pay Now"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      />
    </div>
  );
}
