import React from "react";

type Skill = {
  name: string;
  count: number;
};

type SkillsOverviewProps = {
  skills: Skill[];
  setSelectedSkill: (skill: string) => void;
};

const SkillsOverview: React.FC<SkillsOverviewProps> = ({
  skills,
  setSelectedSkill,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Skills Overview</h2>
      <ul className="mb-4">
        {skills.map((skill) => (
          <li key={skill.name} className="mb-2">
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setSelectedSkill(skill.name)}
            >
              {skill.name} ({skill.count})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsOverview;
