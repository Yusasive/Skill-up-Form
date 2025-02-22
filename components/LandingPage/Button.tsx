"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading = false,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "px-5 py-3 rounded-full text-base font-medium transition-all duration-300 flex items-center justify-center";
  const variants = {
    primary: "bg-[#252525] text-[#FFFFFF] hover:bg-gray-900",
    secondary: "bg-[#F4F4F4] text-[#252525] hover:bg-gray-100",
    outline: "bg-[#FFFFFF] text-[#252525 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
