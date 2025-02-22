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
}) => {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block text-lg font-bold text-gray-800 mb-2"
      >
        📝 {label}
      </label>

      <div className="relative">
        <textarea
          id={id}
          {...register}
          className={`w-full border-2 p-3 rounded-xl bg-gray-50 text-gray-900 text-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-gray-500 focus:border-gray-500"
          }`}
          placeholder={placeholder}
          rows={5}
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          ⚠ {error}
        </p>
      )}
    </div>
  );
};

export default TextAreaField;
