"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!session)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-200 to-green-500">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-green-700"></div>
        <p className="text-white font-semibold mt-4 text-xl">Loading...</p>
      </div>
    );

  const formattedDate = new Date().toLocaleDateString();
  const adminEmail = session.user?.email;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-400 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-lg p-12 md:p-16 lg:p-20">
        <h1 className="text-5xl font-extrabold text-green-800 mb-10 text-center animate-fade-in">
          Welcome to the Admin Dashboard
        </h1>
        <div className="bg-green-50 p-6 rounded-xl shadow-inner border-l-4 border-green-500 mb-10">
          <p className="text-xl font-semibold text-gray-800 mb-4">
            Hello,{" "}
            <span className="text-green-700 font-bold">{adminEmail}</span>!
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Today:</span> {formattedDate}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Current Time:</span>{" "}
            <span className="text-green-800 font-bold">{currentTime}</span>
          </p>
        </div>
        
      </div>
    </div>
  );
}
