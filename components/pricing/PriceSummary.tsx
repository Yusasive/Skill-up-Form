import React from "react";

interface PriceSummaryProps {
  originalPrice: number;
  discountedPrice: number;
  isCouponApplied: boolean;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({
  originalPrice,
  discountedPrice,
  isCouponApplied,
}) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-6 max-w-md mx-auto border border-gray-200">
    {/* Title */}
    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
      Price Summary
    </h3>

    <div className="flex flex-col items-center space-y-2">
      {isCouponApplied ? (
        <>
          <span className="text-gray-500 line-through text-sm">
            Original Price: #{originalPrice.toFixed(2)}
          </span>
          <span className="text-3xl font-bold text-green-600">
            #{discountedPrice.toFixed(2)}
          </span>
        </>
      ) : (
        <span className="text-3xl font-bold text-gray-800">
          #{originalPrice.toFixed(2)}
        </span>
      )}
    </div>

    {isCouponApplied && (
      <div className="mt-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded-md text-center">
        <p className="text-sm font-medium">
          Coupon applied successfully! 🎉 You saved{" "}
          <span className="font-bold">
            #{(originalPrice - discountedPrice).toFixed(2)}
          </span>
        </p>
      </div>
    )}

    <div className="mt-6 border-t border-gray-200"></div>
  </div>
);

export default PriceSummary;
