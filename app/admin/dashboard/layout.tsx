"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated" && session.user.role !== "admin") {
      router.push("/not-authorized");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-green-600 text-lg font-semibold">Loading ...</div>
      </div>
    );
  }

  if (status === "authenticated" && session.user.role === "admin") {
    return (
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
    );
  }

  // If the user is not authenticated or not an admin, return null (or a fallback UI)
  return null;
}
