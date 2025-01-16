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
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <select {...register} className="w-full mt-1 border rounded-md p-2">
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default SelectField;
