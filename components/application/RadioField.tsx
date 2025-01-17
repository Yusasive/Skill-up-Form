import React from "react";

interface RadioFieldProps {
  label: string;
  options: string[];
  register: any;
  error?: string;
}

const RadioField: React.FC<RadioFieldProps> = ({
  label,
  options,
  register,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-green-600">{label}</label>
    <div className="flex flex-wrap mt-2">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2 mr-4 mb-2">
          <input
            type="radio"
            value={option}
            {...register}
            className="form-radio text-green-500 focus:ring-green-400"
          />
          <span className="text-sm text-green-900">{option}</span>
        </label>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default RadioField;
