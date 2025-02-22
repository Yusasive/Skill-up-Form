import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn<string>;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  register,
  error,
}) => {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-lg font-bold text-gray-800 mb-2"
      >
        🌱 {label}
      </label>

      <div className="relative">
        <input
          id={id}
          {...register}
          placeholder={placeholder}
          className={`w-full p-3 rounded-xl bg-gray-50 text-gray-900 text-lg transition-all duration-300 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
          }`}
        />

      
      </div>
 
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
};

export default TextField;
