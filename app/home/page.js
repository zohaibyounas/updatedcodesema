"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "../_components/Logo";
import Navbar from "../_components/Navbar";
import AboutUs from "../about/page";
import Benefits from "../benefits/page";
import Courses from "../courses/page";
import Footer from "../footer/page";
import { createClient } from "@supabase/supabase-js";
import Testimonials from "../testimonials/page";
import ContectUs from "../_components/ContectUs";
import TimeTable from "../timetable/page";
import Link from "next/link";
import { useUser } from "../context/UserContex"; // Using the user context

const supabaseUrl = "https://wxgmvazvvqyxzbtpkxld.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z212YXp2dnF5eHpidHBreGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0NTM0MTgsImV4cCI6MjA0NDAyOTQxOH0.N-YacRbhIeCwT53qWG1BfCymRCyCtyTBkRetRe5QTBU"; // Replace with your Supabase key
const supabase = createClient(supabaseUrl, supabaseKey);

const images = [
  "/hero-1.jpeg",
  "/hero-2.jpeg",
  "/hero-3.jpeg",
  "/hero-4.jpeg",
  "/hero-5.jpeg",
  "/hero-6.jpeg",
];

const navItemsLeft = ["Home", "Über", "Kurse"];
const navItemsRight = ["Vorteile", "Kalender"];

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const counter = useRef(0);
  const { user, isAdmin, setUser, setIsAdmin } = useUser(); // Get user and admin status from context
  const router = useRouter();

  useEffect(() => {
    // On page load, retrieve user and role from localStorage
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user in the context
    }

    if (storedRole) {
      setIsAdmin(storedRole === "admin"); // Set admin flag based on role
    }

    setIsMounted(true);

    const intervalId = setInterval(() => {
      slideToNextImage();
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const slideToPreviousImage = () => {
    counter.current =
      counter.current <= 0 ? images.length - 1 : counter.current - 1;
    setCurrentImageIndex(counter.current);
  };

  const slideToNextImage = () => {
    counter.current =
      counter.current >= images.length - 1 ? 0 : counter.current + 1;
    setCurrentImageIndex(counter.current);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut(); // Supabase sign out
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      setUser(null); // Clear user state in context
      setIsAdmin(false); // Reset isAdmin flag
      localStorage.removeItem("user"); // Clear user from localStorage
      localStorage.removeItem("role"); // Clear role from localStorage
      router.push("/"); // Redirect to login page
    }
  };

  if (!isMounted) return null; // Return null if the component is not mounted yet

  return (
    <div id="Home">
      <div className="relative h-full overflow-hidden overflow-x-hidden ">
        <Image
          src={images[currentImageIndex]}
          width={1000}
          height={500}
          quality={100}
          alt="Lady telling about fitness"
          className="duration-500 ease-in-out transform w-full h-[35rem] md:h-full object-center transition-transform object-cover"
          style={{ transition: "transform 1s ease-in-out" }}
        />

        {/* Navigation Arrows */}
        <div
          className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 cursor-pointer z-10 hidden lg:block"
          onClick={slideToPreviousImage}
        >
          <Image src="/left.png" alt="Previous" width={50} height={50} />
        </div>
        <div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 cursor-pointer z-10 hidden lg:block"
          onClick={slideToNextImage}
        >
          <Image src="/right.png" alt="Next" width={50} height={50} />
        </div>
      </div>

      {/* Header with navigation */}
      <div className="absolute left-0 top-0 w-full shadow-lg">
        {/* Large screen navigation */}
        <div className="hidden bg-white px-4 py-2 md:flex md:items-center md:justify-between">
          <div className="flex-1">
            <Navbar navItems={navItemsLeft} />
          </div>
          <div className="hidden md:block justify-center lg:ml-[400px] flex-1">
            <Logo
              className="h-32 cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
          <div className="flex-1 flex justify-end mr-24">
            <Navbar navItems={navItemsRight} />
          </div>
          <div className="flex gap-4">
            {user ? (
              <>
                <span className="lg:text-2xl text-xs font-bold mr-6 mt-5">
                  wellcome, {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-5 text-2xl rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-4 px-8 text-2xl rounded-lg">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 text-2xl rounded-lg">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Hamburger menu and icon for small screens */}
        <div className="relative flex h-20 items-center justify-between bg-white p-4 md:hidden">
          <select
            className="text-black bg-white border-none cursor-pointer"
            onChange={(e) => handleScrollTo(e.target.value)}
          >
            <option value="">Where to Go?</option>
            <option value="Vorteile">deine Benefits</option>
            <option value="Über">⁠über bodymirror und Pilates</option>
            <option value="Kalender">Wochenplan</option>
            <option value="Kurse">Angebote</option>
          </select>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            {/* Hidden on small screens */}
          </div>

          {/* Show Welcome message and Logout on small screens */}
          <div className="absolute left-[75%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-4">
            {user ? (
              <>
                <span className="sm:text-xs mt-2 mr-6 font-bold">
                  welcome,{user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 text-sm rounded-lg mr-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 text-sm rounded-lg">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm rounded-lg">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>

          <Image
            src="/shopping-bag.png"
            alt="Shopping Bag"
            width="16"
            height="16"
            className="cursor-pointer ml-4"
          />
        </div>
      </div>

      {/* Text box */}
      <div className="absolute left-1/2 top-[15%] md:top-[40%] lg:top-1/2 w-full -translate-x-1/2 md:-translate-y-1/2 text-center text-white px-4">
        <span className="mb-8 block text-2xl md:text-3xl font-bold text-stone-100 max-w-3xl md:max-w-6xl lg:max-w-[90rem] mx-auto">
          Dieser Augenblick des inneren Friedens, wenn man den Kopf verlässt und
          endlich ganz im Körper ankommt.
        </span>
        <h1 className="mb-12 text-4xl md:text-5xl font-semibold tracking-tighter">
          Transformiere dich
        </h1>
        <button
          className="duration-400 cursor-pointer border-2 border-white bg-transparent px-8 py-2 text-lg sm:px-12 sm:py-3 sm:text-xl text-white shadow-lg transition-all hover:bg-stone-400 hover:text-white"
          onClick={() => router.push("/courses")}
        >
          buche jetzt deine Class
        </button>
      </div>

      {/* Components */}
      <Benefits />
      <Courses />
      <AboutUs />
      <TimeTable />
      <Testimonials />
      <ContectUs />
      <Footer />
    </div>
  );
}
