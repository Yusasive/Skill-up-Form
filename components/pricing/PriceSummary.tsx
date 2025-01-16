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
  <div className="mb-6">
    <h3 className="text-lg font-medium">Price</h3>
    <div className="flex items-center space-x-4">
      {isCouponApplied && (
        <span className="text-gray-500 line-through text-sm">
          #{originalPrice.toFixed(2)}
        </span>
      )}
      <span className="text-2xl font-bold text-green-600">
        #{discountedPrice.toFixed(2)}
      </span>
    </div>
  </div>
);

export default PriceSummary;
