type CouponFormProps = {
  formState: {
    code: string;
    discountPercentage: number;
    expiryDate: string;
    editId: string | null;
  };
  setFormState: React.Dispatch<
    React.SetStateAction<{
      code: string;
      discountPercentage: number;
      expiryDate: string;
      editId: string | null;
    }>
  >;
  handleCreateOrUpdateCoupon: () => void;
};

export default function CouponForm({
  formState,
  setFormState,
  handleCreateOrUpdateCoupon,
}: CouponFormProps) {
  return (
    <div className="mb-6 bg-gray-100 shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-bold text-gray-700 mb-4">
        {formState.editId ? "Edit Coupon" : "Create New Coupon"}
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Coupon Code"
          value={formState.code}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, code: e.target.value }))
          }
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
          disabled={!!formState.editId}
        />
        <input
          type="number"
          placeholder="Discount %"
          value={formState.discountPercentage}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              discountPercentage: Number(e.target.value),
            }))
          }
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700"
        />
        <input
          type="date"
          value={formState.expiryDate}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, expiryDate: e.target.value }))
          }
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/3 focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-700"
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleCreateOrUpdateCoupon}
          className={`${
            formState.editId ? "bg-blue-600" : "bg-green-600"
          } text-white px-6 py-2 rounded-lg hover:opacity-90 focus:ring-2 focus:ring-offset-2 ${
            formState.editId ? "focus:ring-blue-500" : "focus:ring-green-500"
          }`}
        >
          {formState.editId ? "Update Coupon" : "Add Coupon"}
        </button>
        {formState.editId && (
          <button
            onClick={() =>
              setFormState({
                code: "",
                discountPercentage: 0,
                expiryDate: "",
                editId: null,
              })
            }
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
