import React from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
  skills: string[];
  paymentStatus: string;
  faculty: string;
  department: string;
  weeklyCommitment: string;
  interestReason: string;
  originalPrice: number;
  discountedPrice: number;
};

type UserDetailsModalProps = {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
};

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  selectedUser,
  setSelectedUser,
}) => {
  if (!selectedUser) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">
          Details for {selectedUser.name}
        </h2>
        <p>
          <strong>Email:</strong> {selectedUser.email}
        </p>
        <p>
          <strong>Phone:</strong> {selectedUser.phone}
        </p>
        <p>
          <strong>Gender:</strong> {selectedUser.gender}
        </p>
        <p>
          <strong>Age:</strong> {selectedUser.age}
        </p>
        <p>
          <strong>Faculty:</strong> {selectedUser.faculty}
        </p>
        <p>
          <strong>Department:</strong> {selectedUser.department}
        </p>
        <p>
          <strong>Weekly Commitment:</strong> {selectedUser.weeklyCommitment}
        </p>
        <p>
          <strong>Interest Reason:</strong> {selectedUser.interestReason}
        </p>
        <p>
          <strong>Original Price:</strong> ${selectedUser.originalPrice}
        </p>
        <p>
          <strong>Discounted Price:</strong> ${selectedUser.discountedPrice}
        </p>
        <p>
          <strong>Payment Status:</strong> {selectedUser.paymentStatus}
        </p>

        <button
          className="text-red-600 hover:underline mt-4"
          onClick={() => setSelectedUser(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
