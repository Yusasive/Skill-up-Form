"use client";

import { useState, useEffect } from "react";
import CouponForm from "@/components/dashboard/CouponForm";
import CouponTable from "@/components/dashboard/CouponTable";

type Coupon = {
  _id: string;
  code: string;
  discountPercentage: number;
  expiryDate: string;
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [formState, setFormState] = useState({
    code: "",
    discountPercentage: 0,
    expiryDate: "",
    editId: null as string | null,
  });

  const fetchCoupons = async () => {
    try {
      const response = await fetch("/api/coupons");
      if (!response.ok) throw new Error("Failed to fetch coupons");
      const data = await response.json();
      setCoupons(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      alert("Failed to load coupons. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleCreateOrUpdateCoupon = async () => {
    try {
      const method = formState.editId ? "PATCH" : "POST";
      const url = formState.editId
        ? `/api/coupons/${formState.editId}`
        : "/api/coupons";

      const response = await fetch(url, {
        method,
        body: JSON.stringify({
          code: formState.code,
          discountPercentage: formState.discountPercentage,
          expiryDate: formState.expiryDate,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const updatedCoupon: Coupon = await response.json();
        if (formState.editId) {
          setCoupons((prev) =>
            prev.map((coupon) =>
              coupon._id === formState.editId
                ? { ...coupon, ...updatedCoupon }
                : coupon
            )
          );
          alert("Coupon updated successfully!");
        } else {
          setCoupons((prev) => [...prev, updatedCoupon]);
          alert("Coupon created successfully!");
        }

        setFormState({
          code: "",
          discountPercentage: 0,
          expiryDate: "",
          editId: null,
        });
      } else {
        const error = await response.json();
        alert(
          `Failed to ${formState.editId ? "update" : "create"} coupon: ${error.error}`
        );
      }
    } catch (error) {
      console.error(
        `Error ${formState.editId ? "updating" : "creating"} coupon:`,
        error
      );
      alert("An error occurred. Please try again.");
    }
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setFormState({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      expiryDate: new Date(coupon.expiryDate).toISOString().slice(0, 10),
      editId: coupon._id,
    });
  };

  const handleDeleteCoupon = async (id: string) => {
    try {
      const response = await fetch(`/api/coupons/${id}`, {
        method: "DELETE",
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="sticky top-0 bg-white shadow-lg rounded-lg p-6 mb-6 z-10">
        <h1 className="text-4xl font-extrabold text-green-700 text-center">
          Manage Coupons
        </h1>
      </header>
      <CouponForm
        formState={formState}
        setFormState={setFormState}
        handleCreateOrUpdateCoupon={handleCreateOrUpdateCoupon}
      />
      <CouponTable
        coupons={coupons}
        handleEditCoupon={handleEditCoupon}
        handleDeleteCoupon={handleDeleteCoupon}
      />
    </div>
  );
}
