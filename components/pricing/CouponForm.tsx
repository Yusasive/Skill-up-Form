import React from "react";

interface CouponFormProps {
  couponCode: string;
  setCouponCode: React.Dispatch<React.SetStateAction<string>>;
  handleApplyCoupon: (code: string) => void;
  error: string;
}

const CouponForm: React.FC<CouponFormProps> = ({
  couponCode,
  setCouponCode,
  handleApplyCoupon,
  error,
}) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6 max-w-md mx-auto">
    <label
      htmlFor="coupon-code"
      className="block text-sm font-bold text-gray-800 mb-2"
    >
      Coupon Code
    </label>

    <div className="flex items-stretch space-x-3">
      <input
        id="coupon-code"
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className={`flex-1 border rounded-md px-4 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
        }`}
        placeholder="Enter coupon code"
      />

      <button
        onClick={() => handleApplyCoupon(couponCode)}
        disabled={!couponCode}
        className={`px-5 py-2 text-sm font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 transition-all ${
          couponCode
            ? "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-400"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Apply
      </button>
    </div>

    {error && (
      <p className="text-red-500 text-xs mt-3 flex items-center">
        <svg
          className="w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 8a8 8 0 11-16 0 8 8 0 0116 0zm-8 4a1 1 0 10-2 0 1 1 0 002 0zm-2-4a1 1 0 012 0v2a1 1 0 01-2 0V8z"
            clipRule="evenodd"
          />
        </svg>
        {error}
      </p>
    )}
  </div>
);

export default CouponForm;
