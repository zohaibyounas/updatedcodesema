"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContex";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      // Set user in the context
      setUser(data.user);

      // Store user data to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

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

      // Store the role in localStorage
      localStorage.setItem("role", userRoleData.role);

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
        router.push("/"); // Redirect to home or the desired page
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
    <div className="h-screen flex items-center justify-center bg-gray-400 p-4">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="flex justify-center mb-4">
          <div className="h-12 rounded-full flex items-center w-full justify-center mt-4 md:mt-6 lg:mt-10">
            <Image src="/logo/logo.tif" alt="Logo" width="70" height="70" />
          </div>
        </div>
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-black">
          {isForgotPassword ? "Forgot Password" : "Login"}
        </h1>

        {!isForgotPassword ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-xl md:text-2xl lg:text-3xl font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded py-3 px-4 text-gray-700 focus:shadow-outline w-full placeholder:text-xl lg:placeholder:text-2xl text-xl lg:text-3xl"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative mt-4">
              <label
                className="block text-gray-700 text-xl md:text-2xl lg:text-3xl font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded py-3 px-4 text-gray-700 mb-3 focus:outline-none focus:shadow-outline w-full placeholder:text-xl lg:placeholder:text-2xl text-xl lg:text-3xl"
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl lg:text-2xl text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="flex items-center justify-center mt-8">
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 md:py-3 lg:py-4 px-4 text-xl lg:text-2xl rounded-lg focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Login
              </button>
            </div>
            <p
              className="text-center text-lg md:text-xl lg:text-2xl font-semibold mt-6 text-teal-500 cursor-pointer"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </p>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-xl md:text-2xl lg:text-3xl font-bold mb-2"
                htmlFor="forgotEmail"
              >
                Enter your email to reset password
              </label>
              <input
                className="shadow appearance-none border rounded py-3 px-4 text-gray-700 focus:shadow-outline w-full placeholder:text-xl lg:placeholder:text-2xl text-xl lg:text-3xl"
                id="forgotEmail"
                type="email"
                placeholder="Email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="flex items-center justify-center mt-8">
              <button
                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 md:py-3 lg:py-4 px-4 text-xl lg:text-2xl rounded-lg focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Send Reset Link
              </button>
            </div>
            <p
              className="text-center text-lg md:text-xl lg:text-2xl font-semibold mt-6 text-teal-500 cursor-pointer"
              onClick={() => setIsForgotPassword(false)}
            >
              Back to Login
            </p>
          </form>
        )}
        <p className="text-center text-lg md:text-xl lg:text-2xl font-semibold mt-6">
          Not a member yet?{" "}
          <a href="register" className="text-teal-500">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
