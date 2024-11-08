"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContex";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../_components/Logo";

const supabaseUrl = "https://wxgmvazvvqyxzbtpkxld.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z212YXp2dnF5eHpidHBreGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0NTM0MTgsImV4cCI6MjA0NDAyOTQxOH0.N-YacRbhIeCwT53qWG1BfCymRCyCtyTBkRetRe5QTBU"; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page() {
  const { setIsAdmin, setUser } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const router = useRouter();
  const [isThrottled, setIsThrottled] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("Please enter the correct password or check your email.");
      return;
    }

    if (data) {
      const userEmail = data.user?.email;
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      const { data: userRoleData, error: roleError } = await supabase
        .from("Users")
        .select("role")
        .eq("email", userEmail)
        .single();

      if (roleError || !userRoleData) {
        setError("Role not found or failed to fetch user role.");
        return;
      }

      localStorage.setItem("role", userRoleData.role);

      if (userRoleData.role === "admin") {
        setIsAdmin(true);
        toast.success(`Login successful! Welcome, Admin ${userEmail}`, {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        setIsAdmin(false);
        toast.success(`Login successful! Welcome, ${userEmail}`, {
          position: "top-center",
          autoClose: 3000,
        });
      }

      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setError("");

    if (isThrottled) {
      setError("Please wait a moment before trying again.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(
      forgotPasswordEmail
    );

    if (error) {
      if (error.message.includes("rate limit exceeded")) {
        setError("Too many requests. Please wait a while before trying again.");
        setIsThrottled(true);
        setTimeout(() => setIsThrottled(false), 60000);
      } else {
        setError(error.message);
      }
    } else {
      toast.success(`Password reset email sent to ${forgotPasswordEmail}`, {
        position: "top-center",
        autoClose: 3000,
      });
      setIsForgotPassword(false);
      setIsThrottled(true);
      setTimeout(() => setIsThrottled(false), 60000);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white p-4">
      <ToastContainer />
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl shadow-black">
        {/* Top Section - Welcome Message for Small Screens */}
        <div className="w-full md:hidden bg-black text-white text-center p-4">
          <h2 className="text-4xl font-bold">WELCOME SEMA!</h2>
        </div>

        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 lg:p-16 flex flex-col justify-center mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <label
                className="block text-lg font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full p-2 border-b-2 border-gray-300 focus:border-black outline-none"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label
                className="block text-lg font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full p-2 border-b-2 border-gray-300 focus:border-black outline-none"
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-2 top-8 cursor-pointer text-gray-500 mt-2"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition duration-200"
            >
              Login
            </button>
            <p
              className="text-center text-gray-600 cursor-pointer"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </p>
          </form>
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 font-semibold">
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Side - Welcome Back Message */}
        <div className="hidden md:flex w-1/2 bg-black text-white flex-col items-center justify-center p-10">
          <h2 className="text-4xl font-bold mb-4">WELCOME SEMA!</h2>
          <p className="text-center text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>
  );
}
