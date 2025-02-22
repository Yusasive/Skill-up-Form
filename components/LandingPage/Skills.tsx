"use client";

import { motion } from "framer-motion";
import {
  FaCode,
  FaMobileAlt,
  FaPencilAlt,
  FaAssistiveListeningSystems,
  FaPython,
} from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";

const skills = [
  {
    id: 1,
    title: "Mobile Application Development (Flutter)",
    description:
      "Flutter is a powerful framework for building cross-platform mobile applications with a single codebase. Key skills include proficiency in Dart programming language and understanding Flutter’s widget-based architecture for creating responsive and visually appealing UIs. ",
    color: "bg-green-300",
    icon: <FaMobileAlt className="text-xl" />,
  },
  {
    id: 2,
    title: "Frontend Development",
    description:
      "Frontend development involves building the user interface (UI) and user experience (UX) of web applications. Key skills include proficiency in HTML, CSS, and JavaScript for structuring, styling, adding interactivity to web pages and modern framework like React.",
    color: "bg-purple-300",
    icon: <FaCode className="text-xl" />,
  },
  {
    id: 3,
    title: "UI/UX Designing",
    description:
      "UI/UX design focuses on creating visually appealing and user-friendly digital experiences. Key skills include user research, wireframing, and prototyping using tools like Figma, Adobe XD, and Sketch to craft intuitive interfaces.",
    color: "bg-blue-300",
    icon: <FaPencilAlt className="text-xl" />,
  },
  {
    id: 4,
    title: "Virtual Assistant (VA)",
    description:
      "A skilled Virtual Assistant (VA) provides remote administrative, technical, and customer support services. Key skills include strong communication, time management, and organization to handle tasks efficiently. Proficiency in email management, scheduling, and calendar coordination ensures smooth operations.",
    color: "bg-orange-300",
    icon: <FaAssistiveListeningSystems className="text-xl" />,
  },
  {
    id: 5,
    title: "Data Sceince",
    description:
      "Data Science involves extracting insights from data using statistical, analytical, and machine learning techniques. Key skills include proficiency in programming languages like Python, R, and SQL for data manipulation and analysis. Strong knowledge of data wrangling, cleaning, and preprocessing ensures high-quality datasets.",
    color: "bg-teal-300",
    icon: <FaPython className="text-xl" />,
  },
  {
    id: 6,
    title: "Data Analysis",
    description:
      "Data analysis involves collecting, processing, and interpreting data to extract meaningful insights. Key skills include proficiency in Excel, SQL, Python, or R for data manipulation and querying. Strong knowledge of data cleaning, transformation, and exploratory data analysis (EDA) ensures accurate and reliable insights.",
    color: "bg-yellow-300",
    icon: <FaComputer className="text-xl" />,
  },
];

export default function SkillsSection() {
  return (
    <section className="py-12 px-7 md:px-12 lg:px-32 bg-[#FFFFFF]">
      <h2 className="text-center text-[#252525] text-2xl font-semibold py-10">
        Skills You Will Gain
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            className={`rounded-lg p-6 ${skill.color} shadow-lg flex flex-col space-y-32`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: skill.id * 0.2 }}
          >
            <div className="flex flex-row items-center">
              <span className="bg-white text-[#252525] rounded-full p-3 mb-4 flex items-center justify-center w-12 h-12">
                {skill.icon}
              </span>
              <h3 className="items-center align-middle text-xl lg:text-[22px] font-semibold text-[#252525] ml-3">
                {skill.title}
              </h3>
            </div>

            <p className="text-base font-normal text-[#252525] mt-2">
              {skill.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
