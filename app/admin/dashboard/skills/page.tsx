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

  
  useEffect(() => {
    async function fetchSkills() {
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
    }
    fetchSkills();
  }, []);

  const handleCreateSkill = async (
    name: string,
    price: number,
    description: string
  ) => {
    const response = await fetch("/api/skills", {
      method: "POST",
      body: JSON.stringify({ name, price, description }),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    if (result.message) {
      setSkills((prev) => [
        ...prev,
        { _id: result.skillId, name, price, description },
      ]);
    }
  };

  const handleUpdateSkill = async (
    id: string,
    newName: string,
    newPrice: number,
    newDescription: string
  ) => {
    const response = await fetch(`/api/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: newName,
        price: newPrice,
        description: newDescription,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if (result.message) {
      setSkills((prev) =>
        prev.map((skill) =>
          skill._id === id
            ? {
                ...skill,
                name: newName,
                price: newPrice,
                description: newDescription,
              }
            : skill
        )
      );
    }
  };

  // Handle delete skill
  const handleDeleteSkill = async (id: string) => {
    const response = await fetch(`/api/skills/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.message) {
      setSkills((prev) => prev.filter((skill) => skill._id !== id));
    }
  };

  if (loading) {
    return <p>Loading skills...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Skills</h1>
      <SkillForm onCreateSkill={handleCreateSkill} />
      <SkillList
        skills={skills}
        onUpdateSkill={handleUpdateSkill}
        onDeleteSkill={handleDeleteSkill}
      />
    </div>
  );
}
