import React from "react";

interface TextAreaFieldProps {
  label: string;
  placeholder: string;
  register: any;
  error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder,
  register,
  error,
}) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <textarea
      {...register}
      className="w-full mt-1 border rounded-md p-2"
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default TextAreaField;
