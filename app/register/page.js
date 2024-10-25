"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// Supabase initialization
const supabaseUrl = "https://wxgmvazvvqyxzbtpkxld.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z212YXp2dnF5eHpidHBreGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0NTM0MTgsImV4cCI6MjA0NDAyOTQxOH0.N-YacRbhIeCwT53qWG1BfCymRCyCtyTBkRetRe5QTBU"; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);
export default function RegisterPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    // Check if the email is already registered in the Users table
    const { data: existingUser, error: checkError } = await supabase
      .from("Users")
      .select("*")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      setError("Error checking existing users in the database.");
      return;
    }

    if (existingUser) {
      setError("Email already registered.");
      return;
    }

    // Proceed with sign-up if email is not registered
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // Insert user data into Users table after successful authentication sign-up
    if (signUpData?.user) {
      const { error: insertError } = await supabase.from("Users").insert([
        {
          email,
          name,
          password,
          role: "user",
        },
      ]);

      if (insertError) {
        setError("Failed to save user data.");
        return;
      }

      // Redirect to login page after successful registration
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500 p-6">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-3xl">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-32 rounded-full flex items-center justify-center">
            <Image src="/logo/logo.tif" alt="Logo" width={100} height={80} />
          </div>
        </div>
        <h1 className="text-center text-5xl font-bold text-gray-800 mb-12 mt-16">
          Create an Account
        </h1>
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label
              className="block text-2xl font-bold text-gray-700 mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="w-full p-6 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-2xl placeholder:text-xl"
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-2xl font-bold text-gray-700 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full p-6 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-2xl placeholder:text-xl"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-2xl font-bold text-gray-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full p-6 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-2xl placeholder:text-xl"
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-4 mt-5 text-3xl top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            className="w-full py-4 bg-teal-600 text-white text-2xl font-semibold rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500 transition duration-300"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-2xl font-semibold mt-6 text-gray-800">
          Already have an account?{" "}
          <a href="/login" className="text-teal-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
