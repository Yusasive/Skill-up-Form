"use client";

import { useEffect, useState } from "react";
import SkillForm from "@/components/dashboard/SkillForm";
import SkillList from "@/components/dashboard/SkillList";

export type Skill = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills");
      const data = await response.json();

      if (Array.isArray(data)) {
        setSkills(data);
      } else {
        console.error("Fetched skills data is not an array", data);
        setSkills([]);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleCreateSkill = async (
    name: string,
    price: number,
    description: string
  ) => {
    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        body: JSON.stringify({ name, price, description }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const result = await response.json();
        setSkills((prev) => [...prev, result.skill]);
        alert("Skill created successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to create skill: ${error.error}`);
      }
    } catch (error) {
      console.error("Error creating skill:", error);
      alert("An error occurred while creating the skill. Please try again.");
    }
  };

  const handleUpdateSkill = async (
    id: string,
    newName: string,
    newPrice: number,
    newDescription: string
  ) => {
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          price: newPrice,
          description: newDescription,
        }),
      });

      if (response.ok) {
        const updatedSkill = await response.json();
        setSkills((prev) =>
          prev.map((skill) =>
            skill._id === id ? { ...skill, ...updatedSkill } : skill
          )
        );
        alert("Skill updated successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to update skill: ${error.error}`);
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      alert("An error occurred while updating the skill. Please try again.");
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSkills((prev) => prev.filter((skill) => skill._id !== id));
        alert("Skill deleted successfully!");
      } else {
        const error = await response.json();
        alert(`Failed to delete skill: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("An error occurred while deleting the skill. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-green-600 text-lg font-semibold">
          Loading skills...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="sticky top-0 bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-extrabold text-green-700 text-center">
          Manage Skills
        </h1>
      </header>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add a New Skill
          </h2>
          <SkillForm onCreateSkill={handleCreateSkill} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Existing Skills
          </h2>
          {skills.length > 0 ? (
            <SkillList
              skills={skills}
              onUpdateSkill={handleUpdateSkill}
              onDeleteSkill={handleDeleteSkill}
            />
          ) : (
            <p className="text-gray-600 text-sm">
              No skills available. Add some skills to get started!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
