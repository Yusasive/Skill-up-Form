"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname(); 

useEffect(() => {
  if (status === "loading") return;  

  if (status === "unauthenticated" && pathname !== "/admin/login") {
    console.log("Session expired, redirecting to login...");
    router.push("/admin/login");
  } else if (status === "authenticated" && session?.user?.role !== "admin") {
    router.push("/admin/login");
  }
}, [session, status, router, pathname]);



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

  return null;
}
