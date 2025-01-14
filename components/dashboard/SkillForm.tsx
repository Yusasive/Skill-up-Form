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
    <div className="mb-4">
      <input
        type="text"
        value={newSkillName}
        onChange={(e) => setNewSkillName(e.target.value)}
        className="border p-2"
        placeholder="Skill name"
      />
      <input
        type="number"
        value={newSkillPrice}
        onChange={(e) => setNewSkillPrice(Number(e.target.value))}
        className="border p-2 ml-2"
        placeholder="Price"
      />
      <input
        type="text"
        value={newSkillDescription}
        onChange={(e) => setNewSkillDescription(e.target.value)}
        className="border p-2 ml-2"
        placeholder="Description"
      />
      <button
        onClick={handleSubmit}
        className="ml-2 bg-blue-500 text-white p-2"
      >
        Add Skill
      </button>
    </div>
  );
};

export default SkillForm;
