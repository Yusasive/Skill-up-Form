"use client";

import { useEffect, useState } from "react";
import SkillsOverview from "@/components/dashboard/SkillsOverview";
import UsersTable from "@/components/dashboard/UsersTable";
import UserDetailsModal from "@/components/dashboard/UserDetailsModal";
import { User } from "@/types/types"; // Ensure you import User from a central location

interface Skill {
  name: string;
  count: number;
}

export default function UsersPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]); // Ensure that the user state matches the correct type
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch skills when the component mounts
  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoadingSkills(true);
        const skillsResponse = await fetch("/api/skills-with-counts");
        if (!skillsResponse.ok) {
          throw new Error("Failed to fetch skills data.");
        }
        const skillsData = await skillsResponse.json();
        setSkills(skillsData);
      } catch (error) {
        setError("Failed to load skills. Please try again.");
      } finally {
        setLoadingSkills(false);
      }
    }

    fetchSkills();
  }, []);

  // Fetch users based on the selected skill
  useEffect(() => {
    if (!selectedSkill) return;

    async function fetchUsersBySkill() {
      try {
        setLoadingUsers(true);
        const usersResponse = await fetch(`/api/users?skill=${selectedSkill}`);
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users data.");
        }
        const usersData = await usersResponse.json();
        setUsers(usersData); 
      } catch (error) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoadingUsers(false);
      }
    }

    fetchUsersBySkill();
  }, [selectedSkill]);

  const handleSkillClick = (skillName: string) => {
    setSelectedSkill(skillName);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-extrabold text-green-700 text-center">
          Registration Overview
        </h1>
      </header>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 relative">
          <span>{error}</span>
          <button
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Skills Overview Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Skills Distribution
        </h2>
        <SkillsOverview skills={skills} onSkillClick={handleSkillClick} />
      </section>

      {/* Users Table Section */}
      {selectedSkill && (
        <section className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Users with Skill:{" "}
            <span className="text-green-700">{selectedSkill}</span>
          </h3>
          {loadingUsers ? (
            <div className="flex justify-center items-center py-6">
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-green-500 h-12 w-12"></div>
            </div>
          ) : (
            <UsersTable
              users={users}
              skillName={selectedSkill}
              onUserClick={(user) => setSelectedUser(user)} 
            />
          )}
        </section>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)} 
        />
      )}
    </div>
  );
}
