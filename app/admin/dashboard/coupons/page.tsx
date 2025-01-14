"use client";

import { useState, useEffect } from "react";

type Coupon = {
  _id: string;
  code: string;
  discountPercentage: number;
  expiryDate: string;
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [code, setCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoupons() {
      try {
        const response = await fetch("/api/coupons");
        if (!response.ok) {
          throw new Error("Failed to fetch coupons");
        }
        const data = await response.json();
        setCoupons(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        alert("Failed to load coupons. Please try again later.");
      }
    }
    fetchCoupons();
  }, []);

  const handleCreateOrUpdateCoupon = async () => {
    try {
      const method = editId ? "PATCH" : "POST";
      const url = editId ? `/api/coupons` : "/api/coupons";

      const response = await fetch(url, {
        method,
        body: JSON.stringify({
          code,
          discountPercentage: discount,
          expiryDate,
          ...(editId && {
            updatedFields: { discountPercentage: discount, expiryDate },
          }),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const updatedCoupon: Coupon = await response.json();
        if (editId) {
          setCoupons((prev) =>
            prev.map((coupon) =>
              coupon._id === editId ? { ...coupon, ...updatedCoupon } : coupon
            )
          );
          alert("Coupon updated successfully!");
        } else {
          setCoupons((prev) => [...prev, updatedCoupon]);
          alert("Coupon created successfully!");
        }

        // Reset form
        setCode("");
        setDiscount(0);
        setExpiryDate("");
        setEditId(null);
      } else {
        const error = await response.json();
        alert(
          `Failed to ${editId ? "update" : "create"} coupon: ${error.error}`
        );
      }
    } catch (error) {
      console.error(`Error ${editId ? "updating" : "creating"} coupon:`, error);
      alert(`An error occurred. Please try again.`);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    try {
      const response = await fetch("/api/coupons", {
        method: "DELETE",
        body: JSON.stringify({ _id: id }), 
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setCoupons((prev) => prev.filter((coupon) => coupon._id !== id));
        alert("Coupon deleted successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to delete coupon: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      alert("An error occurred while deleting the coupon. Please try again.");
    }
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditId(coupon._id);
    setCode(coupon.code);
    setDiscount(coupon.discountPercentage);
    setExpiryDate(new Date(coupon.expiryDate).toISOString().slice(0, 10));
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
          disabled={!!editId} // Disable editing the code field while updating
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
          onClick={handleCreateOrUpdateCoupon}
          className={`${
            editId ? "bg-blue-600" : "bg-green-600"
          } text-white px-4 py-2 rounded hover:opacity-90`}
        >
          {editId ? "Update Coupon" : "Add Coupon"}
        </button>
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setCode("");
              setDiscount(0);
              setExpiryDate("");
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded ml-2 hover:bg-gray-700"
          >
            Cancel Edit
          </button>
        )}
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Code</th>
            <th className="border border-gray-300 px-4 py-2">Discount</th>
            <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {coupon.code}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {coupon.discountPercentage}%
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditCoupon(coupon)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCoupon(coupon._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No coupons available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
