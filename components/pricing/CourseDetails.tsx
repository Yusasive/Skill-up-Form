import React from "react";

interface CourseDetailsProps {
  skills: any[];
  selectedSkill: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({
  skills,
  selectedSkill,
}) => {
  const skill = skills.find((s) => s.name === selectedSkill);

  if (!skill) return <p>Course details not available.</p>;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold">{skill.name}</h2>
      <p className="text-gray-700">{skill.description}</p>
    </div>
  );
};

export default CourseDetails;
