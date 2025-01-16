import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTransgender,
  FaUniversity,
  FaCommentDots,
  FaMoneyBillWave,
  FaCogs,
  FaSchool,
  FaLightbulb,
} from "react-icons/fa";
import { FaBaby } from "react-icons/fa6";

type UserDetailsModalProps = {
  user: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    age: number;
    skills: string[] | undefined;
    faculty: string;
    department: string;
    interestReason: string;
    paymentStatus: string;
    comment?: string;
  };
  onClose: () => void;
};

export default function UserDetailsModal({
  user,
  onClose,
}: UserDetailsModalProps) {
  const skillList = Array.isArray(user.skills) ? user.skills.join(", ") : "N/A";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="user-details-modal"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full border-2 border-green-500 animate-fade-in">
        {/* Header */}
        <h3
          id="user-details-modal"
          className="text-2xl font-bold text-green-600 mb-4 text-center border-b pb-2"
        >
          User Details
        </h3>

        {/* Content */}
        <div className="space-y-4 text-gray-700 overflow-y-auto max-h-96">
          <p className="flex items-center">
            <FaUser className="mr-2 text-green-600" />
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="flex items-center">
            <FaEnvelope className="mr-2 text-green-600" />
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="flex items-center">
            <FaPhone className="mr-2 text-green-600" />
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p className="flex items-center">
            <FaTransgender className="mr-2 text-green-600" />
            <span className="font-semibold">Gender:</span> {user.gender}
          </p>
          <p className="flex items-center">
            <FaBaby className="mr-2 text-green-600" />
            <span className="font-semibold">Age:</span> {user.age}
          </p>
          <p className="flex items-center">
            <FaCogs className="mr-2 text-green-600" />
            <span className="font-semibold">Skills:</span> {skillList}
          </p>
          <p className="flex items-center">
            <FaUniversity className="mr-2 text-green-600" />
            <span className="font-semibold">Faculty:</span> {user.faculty}
          </p>
          <p className="flex items-center">
            <FaSchool className="mr-2 text-green-600" />
            <span className="font-semibold">Department:</span> {user.department}
          </p>
          <p className="flex items-center">
            <FaLightbulb className="mr-2 text-green-600" />
            <span className="font-semibold">Reason for Interest:</span>{" "}
            {user.interestReason}
          </p>
          {user.comment && (
            <p className="flex items-center">
              <FaCommentDots className="mr-2 text-green-600" />
              <span className="font-semibold">Comment:</span> {user.comment}
            </p>
          )}
          <p className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-600" />
            <span className="font-semibold">Payment Status:</span>{" "}
            <span
              className={`px-3 py-1 rounded text-white text-sm font-semibold ${
                user.paymentStatus === "Paid"
                  ? "bg-green-600"
                  : user.paymentStatus === "Pending"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            >
              {user.paymentStatus}
            </span>
          </p>
        </div>

        {/* Close Button */}
        <button
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition-transform transform hover:scale-105"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
