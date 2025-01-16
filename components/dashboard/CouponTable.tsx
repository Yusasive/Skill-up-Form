import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

type Coupon = {
  _id: string;
  code: string;
  discountPercentage: number;
  expiryDate: string;
};

type CouponTableProps = {
  coupons: Coupon[];
  handleEditCoupon: (coupon: Coupon) => void;
  handleDeleteCoupon: (id: string) => void;
};

export default function CouponTable({
  coupons,
  handleEditCoupon,
  handleDeleteCoupon,
}: CouponTableProps) {
  const [couponList, setCouponList] = useState<Coupon[]>(coupons);

  const fetchCoupons = async () => {
    try {
      const response = await fetch("/api/coupons");
      const data = await response.json();
      setCouponList(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="overflow-x-auto bg-gray-100 shadow-md rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left text-sm text-gray-700 uppercase tracking-wider">
            <th className="px-6 py-3 border-b-2 border-gray-300">Coupon Code</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Discount</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">
              Expiry Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {couponList.length > 0 ? (
            couponList.map((coupon, index) => (
              <tr
                key={coupon._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 text-gray-700 transition`}
              >
                <td className="px-6 py-3 border-t">{coupon.code}</td>
                <td className="px-6 py-3 border-t">
                  {coupon.discountPercentage}%
                </td>
                <td className="px-6 py-3 border-t">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3 border-t">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCoupon(coupon)}
                      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      aria-label="Edit Coupon"
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCoupon(coupon._id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none"
                      aria-label="Delete Coupon"
                    >
                      <FaTrashAlt />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="text-center py-6 text-gray-500 italic bg-gray-50"
              >
                <div className="flex flex-col items-center">
                  <svg
                    className="w-12 h-12 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 19.5L12 17.25m0 0l2.25 2.25m-2.25-2.25V10.5m-6.75 9a9 9 0 1118 0 9 9 0 01-18 0z"
                    />
                  </svg>
                  <p>No coupons available. Add some to get started!</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
