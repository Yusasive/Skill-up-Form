import { useState } from "react";

type SkillFormProps = {
  onCreateSkill: (name: string, price: number, description: string) => void;
};

const SkillForm = ({ onCreateSkill }: SkillFormProps) => {
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillPrice, setNewSkillPrice] = useState(0);
  const [newSkillDescription, setNewSkillDescription] = useState("");

  const handleSubmit = () => {
    if (!newSkillName || !newSkillPrice || !newSkillDescription) return;
    onCreateSkill(newSkillName, newSkillPrice, newSkillDescription);
    setNewSkillName("");
    setNewSkillPrice(0);
    setNewSkillDescription("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Skill Name Input */}
        <div>
          <label
            htmlFor="skillName"
            className="block text-sm font-medium text-gray-700"
          >
            Skill Name
          </label>
          <input
            type="text"
            id="skillName"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white"
            placeholder="Enter skill name"
          />
        </div>

        {/* Skill Price Input */}
        <div>
          <label
            htmlFor="skillPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="skillPrice"
            value={newSkillPrice}
            onChange={(e) => setNewSkillPrice(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white"
            placeholder="Enter price"
            min={0}
          />
        </div>

        {/* Skill Description Input */}
        <div>
          <label
            htmlFor="skillDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="skillDescription"
            value={newSkillDescription}
            onChange={(e) => setNewSkillDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white resize-none"
            placeholder="Enter description"
            rows={3}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-transform transform hover:scale-105"
          >
            Add Skill
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillForm;
