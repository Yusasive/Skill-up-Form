"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import TextField from "@/components/application/TextField";
import SelectField from "@/components/application/SelectField";
import RadioField from "@/components/application/RadioField";
import TextAreaField from "@/components/application/TextAreaField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  skills: z.string().min(1, "Preferred skill is required"),
  faculty: z.string().min(1, "Faculty is required"),
  department: z.string().min(1, "Department is required"),
  age: z.enum(["15-17", "18-21", "22-25", "26-30", "31-35", "36+"], {
    required_error: "Age range is required",
  }),
  weeklyCommitment: z.enum(["Yes", "No"], {
    required_error: "This field is required",
  }),
  interestReason: z.string().min(1, "Reason is required"),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function UserDetailsForm() {
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>([]);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        const data = await response.json();
        setSkills(data.map((skill: { name: string }) => skill.name));
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    fetchSkills();
  }, []);

  const registrationDeadline = new Date("2025-04-11T23:59:59").getTime();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = registrationDeadline - now;

      if (difference <= 0) {
        setIsDeadlinePassed(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [registrationDeadline]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isDeadlinePassed) {
      toast.error("The registration deadline has passed.");
      return;
    }
    sessionStorage.setItem("userData", JSON.stringify(data));
    router.push("/register/pricing");
  };

  const ageRanges = ["15-17", "18-21", "22-25", "26-30", "31-35", "36+"];
  const weeklyCommitmentOptions = ["Yes", "No"];
  const genders = ["Male", "Female", "Other"];

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white shadow-2xl rounded-2xl border border-gray-100">
      <header className="sticky top-0 bg-white p-6 mb-8 shadow-lg rounded-lg z-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Register for a Skill
        </h1>

        <p className="text-center text-xl py-4 font-medium text-gray-600">
          Registration closes in: {timeLeft.days}d {timeLeft.hours}h{" "}
          {timeLeft.minutes}m {timeLeft.seconds}s
        </p>
      </header>

      <div className="mt-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 z-0 border-2 rounded-lg border-gray-300 p-6"
        >
          <TextField
            label="Full Name"
            placeholder="Enter your name"
            register={register("name")}
            error={errors.name?.message}
          />
          <TextField
            label="Email"
            placeholder="Enter your email"
            register={register("email")}
            error={errors.email?.message}
          />
          <SelectField
            label="Gender"
            options={genders}
            register={register("gender")}
            error={errors.gender?.message}
          />
          <TextField
            label="Phone"
            placeholder="Enter your phone number"
            register={register("phone")}
            error={errors.phone?.message}
          />
          <SelectField
            label="Preferred Skill"
            options={skills}
            register={register("skills")}
            error={errors.skills?.message}
          />
          <TextField
            label="Faculty"
            placeholder="Enter your faculty"
            register={register("faculty")}
            error={errors.faculty?.message}
          />
          <TextField
            label="Department"
            placeholder="Enter your department"
            register={register("department")}
            error={errors.department?.message}
          />
          <RadioField
            label="Age"
            options={ageRanges}
            register={register("age")}
            error={errors.age?.message}
          />
          <RadioField
            label="Can you commit 10 hours per week?"
            options={weeklyCommitmentOptions}
            register={register("weeklyCommitment")}
            error={errors.weeklyCommitment?.message}
          />
          <TextAreaField
            label="Why are you interested in this skill?"
            placeholder="Describe your interest"
            register={register("interestReason")}
            error={errors.interestReason?.message}
          />
          <TextAreaField
            label="Any comments?"
            placeholder="Additional comments (optional)"
            register={register("comments")}
          />

          <button
            type="submit"
            disabled={isDeadlinePassed}
            className={`w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-lg 
  hover:from-gray-700 hover:to-gray-800 transition-all duration-300 ${
    isDeadlinePassed ? "bg-gray-400 cursor-not-allowed" : ""
  }`}
          >
            Next
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
