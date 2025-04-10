"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const registrationDeadline = new Date("2025-04-11T23:59:59").getTime();
const trainingStartDate = new Date("2025-04-08T09:00:00").getTime();

const timeline = [
  {
    id: 1,
    icon: <Calendar size={24} />,
    text: "Registration Opens: 20/2/2025",
  },
  { id: 2, icon: <Calendar size={24} />, text: "Training Starts: 8/4/2025" },
  { id: 3, icon: <Calendar size={24} />, text: "Duration: 3 weeks" },
  {
    id: 4,
    icon: <MapPin size={24} />,
    text: "Venue: Online & Physical (if applicable)",
  },
];

export default function ProgramTimeline() {
  const [registrationTimeLeft, setRegistrationTimeLeft] = useState(
    calculateTimeLeft(registrationDeadline)
  );
  const [trainingTimeLeft, setTrainingTimeLeft] = useState(
    calculateTimeLeft(trainingStartDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRegistrationTimeLeft(calculateTimeLeft(registrationDeadline));
      setTrainingTimeLeft(calculateTimeLeft(trainingStartDate));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function calculateTimeLeft(deadline: number) {
    const now = new Date().getTime();
    const difference = deadline - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      ),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  return (
    <section className="bg-white text-black py-12 px-6 md:px-16 lg:px-24">
      <h2 className="text-center text-base lg:text-[22px] font-semibold mb-6">
        Program Timeline
      </h2>

      <motion.div
        className="flex flex-col gap-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
      >
        {timeline.map((item) => (
          <motion.div
            key={item.id}
            className="flex items-center gap-4 bg-[#F7F7F7] p-4 rounded-lg shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: item.id * 0.2 }}
          >
            <div className="bg-gray-200 p-3 rounded-full">{item.icon}</div>

            <p className="text-lg lg:text-[28px] font-semibold">
              {/* {item.id === 1 && `Registration opens on: 20/2/2025`}{" "} */}
              {/* Static text for opening */}
              {item.id === 2 &&
                `Training starts in: ${trainingTimeLeft.days}d ${trainingTimeLeft.hours}h ${trainingTimeLeft.minutes}m ${trainingTimeLeft.seconds}s`}
              {item.id === 3 && `Program Duration: 3 weeks`}
              {item.id === 4 && `Venue: Online & Physical`}
              {item.id === 1 &&
                `Registration closes in: ${registrationTimeLeft.days}d ${registrationTimeLeft.hours}h ${registrationTimeLeft.minutes}m ${registrationTimeLeft.seconds}s`}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
