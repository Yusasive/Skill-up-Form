import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface RadioFieldProps {
  label: string;
  options: string[];
  register: UseFormRegisterReturn<string>;
  error?: string;
}

const RadioField: React.FC<RadioFieldProps> = ({
  label,
  options,
  register,
  error,
}) => (
  <div className="mb-6">
    <label className="block text-lg font-bold text-gray-700 mb-2">
      🌱 {label}
    </label>

    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center space-x-2 p-3 bg-gray-100 border-2 border-transparent rounded-lg cursor-pointer transition-all duration-300 hover:border-gray-500 hover:shadow-lg"
        >
          <input
            type="radio"
            value={option}
            {...register}
            className="hidden peer"
          />
          <div className="w-5 h-5 border-2 border-gray-500 rounded-full flex items-center justify-center peer-checked:bg-gray-500 peer-checked:border-gray-700 transition-all">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
          <span className="text-gray-900 font-semibold">{option}</span>
        </label>
      ))}
    </div>

    {error && <p className="text-red-500 text-sm mt-2">⚠ {error}</p>}
  </div>
);

export default RadioField;
