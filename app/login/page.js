"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    // Log in the user with Supabase
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("Please enter the correct password or check your email.");
      return;
    }

    // If login is successful, check user role
    if (data) {
      const userEmail = data.user?.email;
      setUser(data.user);

      // Check if the user exists in the "Users" table with a role
      const { data: userRoleData, error: roleError } = await supabase
        .from("Users")
        .select("role")
        .eq("email", userEmail)
        .single();

      if (roleError || !userRoleData) {
        setError("Role not found or failed to fetch user role.");
        return;
      }

      // Check if the user is an admin or a regular user
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

      // Redirect after showing the toast
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="relative w-full max-w-3xl md:max-w-4xl lg:max-w-6xl bg-white rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black ">
        {/* Right Side - Welcome Back Message */}
        <div className="w-full md:w-1/2 bg-black text-white flex items-center justify-center p-8 md:p-10 lg:p-16 order-first md:order-last">
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              WELCOME! SEMA
            </h2>
          </div>
        </div>

        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 lg:p-16 flex flex-col justify-center mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Logo />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6 relative">
            Login
            <span className="block w-10 h-1 bg-black mt-2 mx-auto"></span>
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <label
                className="block text-lg font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border-b-2 border-black focus:border-blue-500 outline-none"
              />
              <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative">
              <label
                className="block text-lg font-semibold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-b-2 border-black focus:border-blue-500 outline-none"
              />
              <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <span
                className="absolute right-10 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full  py-5  mt-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition "
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 font-semibold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
