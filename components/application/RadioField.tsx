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
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <div className="flex space-x-4">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="radio"
            value={option}
            {...register}
            className="form-radio"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default RadioField;
