"use client";

import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <FaCheckCircle className="mx-auto text-gray-600 text-6xl mb-4" />

        <h1 className="text-3xl font-semibold text-gray-600 mb-4">
          Registration Successful!
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Thank you for registering. We look forward to seeing you in the class!
        </p>

        <button
          onClick={() => router.push("/")}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
