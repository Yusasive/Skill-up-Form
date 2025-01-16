import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi"; // Import icons

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
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editableSkill, setEditableSkill] = useState<Skill | null>(null);

  const handleEditClick = (skill: Skill) => {
    setEditMode(skill._id);
    setEditableSkill(skill);
  };
  const handleSaveClick = () => {
    if (editableSkill) {
      onUpdateSkill(
        editableSkill._id,
        editableSkill.name,
        editableSkill.price,
        editableSkill.description
      );
      setEditMode(null);
      setEditableSkill(null);
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border-collapse shadow rounded-lg overflow-hidden">
        {/* Table Header */}
        <thead className="bg-green-600 text-white text-left font-semibold text-sm">
          <tr>
            <th className="px-6 py-4">Skill Name</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Description</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody className="divide-y divide-gray-200">
          {skills.map((skill, index) => (
            <tr
              key={skill._id}
              className={`hover:bg-green-50 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } transition-colors`}
            >
              {/* Skill Name */}
              <td className="px-6 py-4 text-sm text-gray-800">
                {editMode === skill._id ? (
                  <input
                    type="text"
                    value={editableSkill?.name || ""}
                    onChange={(e) =>
                      setEditableSkill({
                        ...editableSkill!,
                        name: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                ) : (
                  <span>{skill.name}</span>
                )}
              </td>
              {/* Skill Price */}
              <td className="px-6 py-4 text-sm text-gray-800">
                {editMode === skill._id ? (
                  <input
                    type="number"
                    value={editableSkill?.price || ""}
                    onChange={(e) =>
                      setEditableSkill({
                        ...editableSkill!,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    min={0}
                  />
                ) : (
                  <span>#{skill.price.toFixed(2)}</span>
                )}
              </td>
              {/* Skill Description */}
              <td className="px-6 py-4 text-sm text-gray-800">
                {editMode === skill._id ? (
                  <textarea
                    value={editableSkill?.description || ""}
                    onChange={(e) =>
                      setEditableSkill({
                        ...editableSkill!,
                        description: e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                    rows={2}
                  />
                ) : (
                  <span>{skill.description}</span>
                )}
              </td>
              {/* Actions */}
              <td className="px-6 py-4 text-center space-x-2">
                {editMode === skill._id ? (
                  <>
                    <button
                      onClick={handleSaveClick}
                      className="bg-green-500 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(null)}
                      className="bg-gray-500 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(skill)}
                      className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                    >
                      <FiEdit className="inline-block mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => onDeleteSkill(skill._id)}
                      className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-105"
                    >
                      <FiTrash className="inline-block mr-2" /> Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillList;
