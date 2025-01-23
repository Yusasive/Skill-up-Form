"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false, 
      email,
      password,
    });


    setLoading(false);

    console.log("Login Result:", result);

    if (result?.error) {
      setError(result.error); 
    } else if (result?.ok) {
      if (session?.user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        setError("Access denied: You are not an admin.");
      }
    } else {
      setError("Unknown error occurred.");
    }
  };

  useEffect(() => {
    if (status === "loading") return; 

    if (session) {
      console.log("Session Data:", session);
      if (session.user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/not-authorized");
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-green-600 text-lg font-semibold">Loading ...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white shadow-md rounded-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 rounded-md ${loading ? "bg-gray-500" : "bg-blue-600"} text-white hover:bg-blue-700`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
