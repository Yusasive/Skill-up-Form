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
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      {...register}
      className="w-full mt-1 border rounded-md p-2"
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default TextField;
