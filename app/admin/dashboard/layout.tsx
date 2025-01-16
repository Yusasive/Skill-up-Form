"use client";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SessionProvider>
      <div className="flex">
        <Sidebar onToggle={setIsSidebarOpen} />
        <main
          className={`transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } w-full min-h-screen bg-gray-50 p-6`}
        >
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
