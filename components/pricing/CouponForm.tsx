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
  <div className="mb-6">
    <label className="block text-sm font-medium">Coupon Code</label>
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className="w-full border rounded-md p-2"
        placeholder="Enter coupon code"
      />
      <button
        onClick={() => handleApplyCoupon(couponCode)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Apply
      </button>
    </div>
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
);

export default CouponForm;
