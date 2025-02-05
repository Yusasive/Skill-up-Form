import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectFieldProps {
  label: string;
  options: string[];
  register: UseFormRegisterReturn<string>;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  register,
  error,
}) => (
  <div className="mb-6">
    <label className="block text-lg font-bold text-green-800 mb-2">
      🌿 {label}
    </label>

    <div className="relative">
      <select
        {...register}
        className={`w-full p-3 rounded-xl bg-green-50 text-green-900 border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
          error ? "border-red-500" : "border-green-300"
        } appearance-none cursor-pointer`}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-green-900">
            {option}
          </option>
        ))}
      </select>

      <div className="absolute right-3 top-3 pointer-events-none">⬇</div>
    </div>

    {error && <p className="mt-2 text-sm text-red-600">⚠ {error}</p>}
  </div>
);

export default SelectField;
