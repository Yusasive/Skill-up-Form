import React, { useState, useEffect } from "react";
import { generateCSV } from "@/utils/csvUtils";
import {
  FaDownload,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

type User = {
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

type UsersTableProps = {
  users: User[];
  skillName: string;
  onUserClick: (user: User) => void;
};

export default function UsersTable({
  users,
  skillName,
  onUserClick,
}: UsersTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filename, setFilename] = useState("Users_Data");
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const USERS_PER_PAGE = 10;

  useEffect(() => {
    const searchResults = users.filter(
      (user) =>
        [user.name, user.email]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        (paymentFilter === "All" || user.paymentStatus === paymentFilter)
    );
    setFilteredUsers(searchResults);
    setCurrentPage(1);
  }, [searchQuery, paymentFilter, users]);

  const handleDownload = () => {
    if (filteredUsers.length > 0) {
      const sanitizedUsers = filteredUsers.map((user) => ({
        ...user,
        skills: Array.isArray(user.skills) ? user.skills : [],
      }));
      generateCSV(sanitizedUsers, filename);
      setIsModalOpen(false);
    } else {
      alert("No users available to download.");
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-green-700">
          Registered Users for {skillName}
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition-transform transform hover:scale-105"
        >
          <FaDownload className="mr-2" /> Download Users
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
          />
        </div>

        {/* Payment Status Dropdown */}
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-green-100 text-gray-700">
              <th className="p-4 text-left font-semibold">S/N</th>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Email</th>
              <th className="p-4 text-left font-semibold">Payment Status</th>
              <th className="p-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user, index) => {
                const serialNumber =
                  (currentPage - 1) * USERS_PER_PAGE + index + 1;
                return (
                  <tr
                    key={user.email}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-green-50 transition-colors duration-150`}
                  >
                    <td className="p-4 font-medium text-gray-800">
                      {serialNumber}
                    </td>{" "}
                    <td className="p-4 font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="p-4 font-medium text-gray-600">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                          user.paymentStatus === "Paid"
                            ? "bg-green-500"
                            : user.paymentStatus === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      >
                        {user.paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md transition-transform transform hover:scale-105"
                        onClick={() => onUserClick(user)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-6 text-center text-gray-500 text-sm"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          <FaArrowLeft className="mr-2" /> Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Next <FaArrowRight className="ml-2" />
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 id="modal-title" className="text-xl font-bold text-gray-800">
                Save File
              </h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter file name"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-2 mb-4 focus:outline-none text-gray-900 focus:ring-2 focus:ring-green-500"
            />
            <div className="flex justify-end space-x-2">
              {/* <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button> */}
              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
