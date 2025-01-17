import React from "react";

interface SelectFieldProps {
  label: string;
  options: string[];
  register: any;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  register,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-green-800">{label}</label>
    <select
      {...register}
      className={`w-full mt-1 border rounded-md p-2 bg-white text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 ${
        error ? "border-red-500" : "border-green-300"
      }`}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option} className="text-green-800">
          {option}
        </option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default SelectField;
