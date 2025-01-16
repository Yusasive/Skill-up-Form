import React, { useState, useEffect } from "react";

type SkillsOverviewProps = {
  skills: { name: string; count: number }[];
  onSkillClick: (skillName: string) => void;
};

export default function SkillsOverview({
  skills,
  onSkillClick,
}: SkillsOverviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to mimic loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-green-600 text-lg font-semibold">
          Loading skills...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 bg-white hover:bg-green-50"
          onClick={() => onSkillClick(skill.name)}
        >
          <h2 className="text-xl font-bold text-green-600 mb-2">
            {skill.name}
          </h2>
          <p className="text-gray-700">
            <span className="font-medium text-gray-800">Registered Users:</span>{" "}
            {skill.count}
          </p>
        </div>
      ))}
    </div>
  );
}
