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
  age: z.enum(["18-25", "26-35", "36-45", "46+"], {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // Fetch skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      const response = await fetch("/api/skills");
      const data = await response.json();
      setSkills(data.map((skill: { name: string }) => skill.name));
    };
    fetchSkills();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    sessionStorage.setItem("userData", JSON.stringify(data));
    router.push("/register/pricing");
  };

  const ageRanges = ["18-25", "26-35", "36-45", "46+"];
  const weeklyCommitmentOptions = ["Yes", "No"];
  const genders = ["Male", "Female", "Other"];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <header className="sticky top-0 bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-4xl font-extrabold text-green-700 text-center">
          Register for a Skill
        </h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <TextField
          label="Name"
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
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
        >
          Next
        </button>
      </form>
    </div>
  );
}
