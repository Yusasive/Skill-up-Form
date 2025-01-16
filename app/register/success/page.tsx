"use client";

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Registration Successful!
      </h1>
      <p className="mt-4">
        Thank you for registering. We look forward to seeing you in the class!
      </p>
      <button
        onClick={() => router.push("/register")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go Home
      </button>
    </div>
  );
}
