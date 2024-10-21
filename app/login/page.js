"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For eye icons
import { createClient } from "@supabase/supabase-js"; // Import Supabase client
import { useRouter } from "next/navigation"; // For navigation after login
import { useUser } from "../context/UserContex";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const supabaseUrl = "https://wxgmvazvvqyxzbtpkxld.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z212YXp2dnF5eHpidHBreGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0NTM0MTgsImV4cCI6MjA0NDAyOTQxOH0.N-YacRbhIeCwT53qWG1BfCymRCyCtyTBkRetRe5QTBU"; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page() {
  let { setIsAdmin } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("sema321@gmail.com"); // State for email input
  const [password, setPassword] = useState("4321"); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const router = useRouter(); // Initialize the router

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle login
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError(""); // Clear previous errors

    // Log in the user with Supabase
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message); // Set error message if login fails
      return; // Stop further execution if login fails
    }

    // If login is successful, check user role
    if (data) {
      const { data: user, error: roleError } = await supabase
        .from("Users")
        .select("role")
        .eq("email", data.user?.email);

      if (roleError) {
        setError("Failed to fetch user role.");
        return;
      }

      // Check if the user is an admin
      if (user[0]?.role === "admin") {
        setIsAdmin(true);

        // Show success toast with admin's email
        toast.success(`Login successful! Welcome, ${email}`, {
          position: "top-center",
          autoClose: 1000, // Show the toast for 2 seconds
        });

        // Delay the redirection to allow the toast to display
        setTimeout(() => {
          router.push("/"); // Replace with your calendar route
        }, 1000); // 2 seconds delay for toast to show
      } else {
        setError("You do not have permission to edit the calendar.");
        router.push("/");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-400 p-4">
      <ToastContainer />{" "}
      {/* Add ToastContainer to render toast notifications */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="flex justify-center mb-4">
          <div className="h-12 rounded-full flex items-center w-full justify-center mt-4 md:mt-6 lg:mt-10">
            <Image src="/logo/logo.tif" alt="Logo" width="70" height="70" />
          </div>
        </div>
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-black">
          Login
        </h1>
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
              onChange={(e) => setEmail(e.target.value)} // Update email state
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
              type={passwordVisible ? "text" : "password"} // Toggles type
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
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
        </form>
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
