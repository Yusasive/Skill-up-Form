"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FiHome,
  FiUsers,
  FiTag,
  FiCpu,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

type SidebarProps = {
  onToggle: (isOpen: boolean) => void;
};

const Sidebar = ({ onToggle }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: "Home", path: "/admin/dashboard", icon: <FiHome /> },
    { label: "Users", path: "/admin/dashboard/users", icon: <FiUsers /> },
    { label: "Coupons", path: "/admin/dashboard/coupons", icon: <FiTag /> },
    { label: "Skills", path: "/admin/dashboard/skills", icon: <FiCpu /> },
  ];

  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle(newIsOpen);
  };

  const handleLogOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: "/admin/login" });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div
      className={`h-screen ${
        isOpen ? "w-64" : "w-20"
      } bg-green-700 text-white flex flex-col shadow-lg fixed transition-all duration-300`}
    >
      <div className="p-6 flex items-center justify-between">
        <h2 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>
          Admin Dashboard
        </h2>
        <button onClick={toggleSidebar} className="text-2xl">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      <nav className="flex-1 px-4">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => router.push(item.path)}
                className={`w-full text-left py-2 px-4 rounded-lg flex items-center space-x-2 ${
                  pathname === item.path ? "bg-green-800" : "hover:bg-green-600"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogOut}
          disabled={isLoggingOut}
          className={`w-full bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg text-center flex items-center justify-center space-x-2 ${
            isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FiLogOut className="text-xl" />
          <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>
          {isLoggingOut && <span className="ml-2 loader"></span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
