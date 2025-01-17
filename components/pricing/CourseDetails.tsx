import React from "react";

interface Skill {
  name: string;
  description: string;
  prerequisites?: string[];
  duration?: string;
}

interface CourseDetailsProps {
  skills: Skill[];
  selectedSkill: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({
  skills,
  selectedSkill,
}) => {
  const skill = skills.find((s) => s.name === selectedSkill);

  if (!skill)
    return (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md max-w-lg mx-auto">
        <h3 className="text-lg font-semibold">No Course Details Found</h3>
        <p className="text-sm">
          We couldn't find details for the selected skill. Please try selecting
          another skill.
        </p>
      </div>
    );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-xl mx-auto border-t-4 border-green-500">
      <h2 className="text-2xl font-bold text-green-700 mb-4">{skill.name}</h2>

      <p className="text-gray-800 text-base leading-relaxed mb-4">
        {skill.description}
      </p>
      {skill.prerequisites && skill.prerequisites.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Prerequisites
          </h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm">
            {skill.prerequisites.map((prerequisite, index) => (
              <li key={index}>{prerequisite}</li>
            ))}
          </ul>
        </div>
      )}

      {skill.duration && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Duration
          </h3>
          <p className="text-gray-700 text-sm">{skill.duration}</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
