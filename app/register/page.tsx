"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  gender: z
    .enum(["Male", "Female", "Other"])
    .refine((val) => val, { message: "Gender is required" }),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  skills: z.string().min(1, "Preferred skill is required"),
  faculty: z.string().min(1, "Faculty is required"),
  department: z.string().min(1, "Department is required"),
  age: z
    .enum(["18-25", "26-35", "36-45", "46+"])
    .refine((val) => val, { message: "Age range is required" }),
  weeklyCommitment: z
    .enum(["Yes", "No"])
    .refine((val) => val, { message: "This field is required" }),
  interestReason: z.string().min(1, "Reason is required"),
  comments: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function UserDetailsForm() {
  const router = useRouter();
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    sessionStorage.setItem("userData", JSON.stringify(data));
    router.push("/register/pricing");
  };

  const skills = [
    "Frontend Development",
    "Backend Development",
    "UI/UX Design",
  ];
  const ageRanges = ["18-25", "26-35", "36-45", "46+"];
  const weeklyCommitmentOptions = ["Yes", "No"];
  const genders = ["Male", "Female", "Other"];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register for a Skill</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            {...register("name")}
            className="w-full mt-1 border rounded-md p-2"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            {...register("email")}
            className="w-full mt-1 border rounded-md p-2"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select
            {...register("gender")}
            className="w-full mt-1 border rounded-md p-2">
            <option value="">Select your gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            {...register("phone")}
            className="w-full mt-1 border rounded-md p-2"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium">Preferred Skills</label>
          <select
            {...register("skills")}
            className="w-full mt-1 border rounded-md p-2"
            onChange={(e) => setSelectedSkill(e.target.value)}>
            <option value="">Select a skill</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          {errors.skills && (
            <p className="text-red-500 text-sm">{errors.skills.message}</p>
          )}
        </div>

        {/* Faculty */}
        <div>
          <label className="block text-sm font-medium">Faculty</label>
          <input
            {...register("faculty")}
            className="w-full mt-1 border rounded-md p-2"
            placeholder="Enter your faculty"
          />
          {errors.faculty && (
            <p className="text-red-500 text-sm">{errors.faculty.message}</p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium">Department</label>
          <input
            {...register("department")}
            className="w-full mt-1 border rounded-md p-2"
            placeholder="Enter your department"
          />
          {errors.department && (
            <p className="text-red-500 text-sm">{errors.department.message}</p>
          )}
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium">Age</label>
          <div className="flex space-x-4">
            {ageRanges.map((age) => (
              <label key={age} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={age}
                  {...register("age")}
                  className="form-radio"
                />
                <span>{age}</span>
              </label>
            ))}
          </div>
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Weekly Commitment */}
        <div>
          <label className="block text-sm font-medium">
            Can you commit 10 hours per week?
          </label>
          <div className="flex space-x-4">
            {weeklyCommitmentOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={option}
                  {...register("weeklyCommitment")}
                  className="form-radio"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.weeklyCommitment && (
            <p className="text-red-500 text-sm">
              {errors.weeklyCommitment.message}
            </p>
          )}
        </div>

        {/* Interest Reason */}
        <div>
          <label className="block text-sm font-medium">
            Why are you interested in this skill?
          </label>
          <textarea
            {...register("interestReason")}
            className="w-full mt-1 border rounded-md p-2"
            placeholder="Describe your interest"
          />
          {errors.interestReason && (
            <p className="text-red-500 text-sm">
              {errors.interestReason.message}
            </p>
          )}
        </div>

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium">Any comments?</label>
          <textarea
            {...register("comments")}
            className="w-full mt-1 border rounded-md p-2"
            placeholder="Additional comments (optional)"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
          Next
        </button>
      </form>
    </div>
  );
}
