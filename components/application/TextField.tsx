import React from "react";

interface TextFieldProps {
  label: string;
  placeholder: string;
  register: any;
  error?: string;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  register,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-green-800">{label}</label>
    <input
      {...register}
      className={`w-full mt-1 border rounded-md p-2 text-green-900  bg-white focus:outline-none focus:ring-2 focus:ring-green-500 ${
        error ? "border-red-500" : "border-green-300"
      }`}
      placeholder={placeholder}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default TextField;
