"use client";

import { useEffect, useState } from "react";
import SkillsOverview from "@/components/dashboard/SkillsOverview";
import UsersTable from "@/components/dashboard/UsersTable";
import UserDetailsModal from "@/components/dashboard/UserDetailsModal";
import { User, Skill } from "@/types/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersResponse = await fetch("/api/users");
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const skillsMap: { [key: string]: number } = {};
        usersData.forEach((user: User) => {
          user.skills.forEach((skill) => {
            skillsMap[skill] = (skillsMap[skill] || 0) + 1;
          });
        });

        const skillsArray = Object.entries(skillsMap).map(([name, count]) => ({
          name,
          count,
        }));
        setSkills(skillsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handlePaymentStatusChange = async (
    userId: string,
    newStatus: string
  ) => {
    try {
      const response = await fetch(`/api/users/${userId}/payment-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update payment status.");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, paymentStatus: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <SkillsOverview skills={skills} setSelectedSkill={setSelectedSkill} />

      {selectedSkill && (
        <UsersTable
          users={users}
          selectedSkill={selectedSkill}
          handlePaymentStatusChange={handlePaymentStatusChange}
          setSelectedUser={(user: User) => setSelectedUser(user)} // Wrap for compatibility
        />
      )}

      <UserDetailsModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
}
