import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaFieldProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn<string>; 
  error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder,
  register,
  error,
}) => (
  <div className="mb-6">
    <label
      className="block text-sm font-semibold text-green-700 mb-1"
      htmlFor={label.toLowerCase().replace(/\s+/g, "-")}
    >
      {label}
    </label>

    <textarea
      id={label.toLowerCase().replace(/\s+/g, "-")}
      {...register} 
      className={`w-full mt-1 border rounded-lg p-3 text-sm text-green-900 shadow-sm transition-all focus:outline-none focus:ring-2 ${
        error
          ? "border-red-500 focus:ring-red-400"
          : "border-gray-300 focus:ring-green-400 focus:border-green-400"
      }`}
      placeholder={placeholder}
      rows={5}
    />

    {error && (
      <p className="text-red-500 text-xs mt-2">
        <svg
          className="inline-block w-4 h-4 mr-1 text-red-500"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 8a8 8 0 11-16 0 8 8 0 0116 0zm-8 4a1 1 0 10-2 0 1 1 0 002 0zm-2-4a1 1 0 012 0v2a1 1 0 01-2 0V8z"
            clipRule="evenodd"
          />
        </svg>
        {error}
      </p>
    )}
  </div>
);

export default TextAreaField;
