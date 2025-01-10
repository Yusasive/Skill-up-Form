'use client';

import { useState, useEffect } from 'react';

type Coupon = {
  _id: string;
  code: string;
  discountPercentage: number;
  expiryDate: string;
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]); // Explicit type for coupons
  const [code, setCode] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState<string>('');

  useEffect(() => {
    async function fetchCoupons() {
      const response = await fetch('/api/coupons');
      const data = await response.json();
      console.log('Fetched Coupons:', data); // Debug log
      setCoupons(Array.isArray(data) ? data : []); // Ensure data is an array
    }
    fetchCoupons();
  }, []);

  const handleCreateCoupon = async () => {
    const response = await fetch('/api/coupons', {
      method: 'POST',
      body: JSON.stringify({ code, discountPercentage: discount, expiryDate }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('Coupon created successfully!');
      const newCoupon: Coupon = await response.json(); // Ensure new coupon matches the type
      setCoupons((prev) => [...prev, newCoupon]); // Add new coupon to state
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Coupons</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Coupon Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border px-3 py-2 mr-2"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="border px-3 py-2 mr-2"
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="border px-3 py-2 mr-2"
        />
        <button
          onClick={handleCreateCoupon}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Coupon
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Code</th>
            <th className="border border-gray-300 px-4 py-2">Discount</th>
            <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td className="border border-gray-300 px-4 py-2">{coupon.code}</td>
                <td className="border border-gray-300 px-4 py-2">{coupon.discountPercentage}%</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4">No coupons available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
