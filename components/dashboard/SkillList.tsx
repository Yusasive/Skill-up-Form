import React from "react";

type Skill = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

type SkillListProps = {
  skills: Skill[];
  onUpdateSkill: (
    id: string,
    newName: string,
    newPrice: number,
    newDescription: string
  ) => void;
  onDeleteSkill: (id: string) => void;
};

const SkillList = ({
  skills,
  onUpdateSkill,
  onDeleteSkill,
}: SkillListProps) => {
  if (!Array.isArray(skills)) {
    console.error("Skills is not an array:", skills);
    return <p>Error: Skills data is not available.</p>;
  }

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2">Skill Name</th>
          <th className="border border-gray-300 px-4 py-2">Price</th>
          <th className="border border-gray-300 px-4 py-2">Description</th>
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill) => (
          <tr key={skill._id}>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="text"
                defaultValue={skill.name}
                onBlur={(e) =>
                  onUpdateSkill(
                    skill._id,
                    e.target.value,
                    skill.price,
                    skill.description
                  )
                }
                className="border p-2"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="number"
                defaultValue={skill.price}
                onBlur={(e) =>
                  onUpdateSkill(
                    skill._id,
                    skill.name,
                    Number(e.target.value),
                    skill.description
                  )
                }
                className="border p-2"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <input
                type="text"
                defaultValue={skill.description}
                onBlur={(e) =>
                  onUpdateSkill(
                    skill._id,
                    skill.name,
                    skill.price,
                    e.target.value
                  )
                }
                className="border p-2"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => onDeleteSkill(skill._id)}
                className="bg-red-500 text-white p-2"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkillList;
