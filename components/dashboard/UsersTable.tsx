import React from "react";
import { User } from "@/types/types"; // Use the centralized User type

type UsersTableProps = {
  users: User[];
  selectedSkill: string;
  handlePaymentStatusChange: (userId: string, newStatus: string) => void;
  setSelectedUser: (user: User) => void;
};

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  selectedSkill,
  handlePaymentStatusChange,
  setSelectedUser,
}) => {
  const filteredUsers = users.filter((user) =>
    user.skills.includes(selectedSkill)
  );

  return (
    <div className="users-table">
      <h2 className="text-xl font-semibold mb-4">
        Users Registered for{" "}
        <span className="text-blue-500">{selectedSkill}</span>
      </h2>
      {filteredUsers.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">
                Payment Status
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.paymentStatus}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.paymentStatus === "Pending" && (
                    <button
                      className="text-green-600 hover:underline mr-4"
                      onClick={() =>
                        handlePaymentStatusChange(user._id, "Paid")
                      }
                    >
                      Mark as Paid
                    </button>
                  )}
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => setSelectedUser(user)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No users found for the selected skill.</p>
      )}
    </div>
  );
};

export default UsersTable;
