"use client";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ContectUs from "../_components/ContectUs";
import Logo from "../_components/Logo";
import Navbar from "../_components/Navbar";
import AboutUs from "../about/page";
import Benefits from "../benefits/page";
import { useUser } from "../context/UserContex";
import Courses from "../courses/page";
import Footer from "../footer/page";
import Testimonials from "../testimonials/page";
import TimeTable from "../timetable/page";

const supabaseUrl = "https://wxgmvazvvqyxzbtpkxld.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z212YXp2dnF5eHpidHBreGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0NTM0MTgsImV4cCI6MjA0NDAyOTQxOH0.N-YacRbhIeCwT53qWG1BfCymRCyCtyTBkRetRe5QTBU";
const supabase = createClient(supabaseUrl, supabaseKey);

const images = [
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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const counter = useRef(0);
  const intervalId = useRef(null);
  const { user, isAdmin, setUser, setIsAdmin } = useUser();
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const menuRef = useRef(null); // Ref for the dropdown menu

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedRole) setIsAdmin(storedRole === "admin");

    setIsMounted(true);
    startAutoSlide();
    return () => stopAutoSlide();
  }, [setIsAdmin, setUser]);

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalId.current = setInterval(slideToNextImage, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalId.current) clearInterval(intervalId.current);
  };

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

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
    counter.current = index;
    startAutoSlide();
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setIsAdmin(false);
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      router.push("/");
    }
  };

  const handleScrollTo = (section) => {
    const sectionIdMap = {
      Home: "Home",
      Über: "Über",
      Kurse: "Kurse",
      Vorteile: "Vorteile",
      Kalender: "Kalender",
      Kontakt: "Kontakt",
    };
    const sectionId = sectionIdMap[section];
    if (sectionId) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close menu after selection
    }
  };

  if (!isMounted) return null;

  return (
    <div id="Home" className="overflow-hidden">
      {/* Carousel */}
      {/* Carousel */}
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <Image
                src={src}
                width={1000}
                height={500}
                quality={100}
                alt={`Slide ${index + 1}`}
                className="w-full h-[35rem] md:h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Text and Button Over Image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 mt-40 lg:mt-52 ">
          <h1 className="text-4xl md:text-5xl font-semibold">
            Transformiere dich
          </h1>
          <button
            className="duration-400 cursor-pointer border-2 border-white bg-transparent px-8 py-2 mt-6 text-lg sm:px-12 sm:py-3 sm:text-xl text-white shadow-lg transition-all hover:bg-stone-400 hover:text-white"
            onClick={() => handleScrollTo("Kontakt")}
          >
            Kontaktiere mich
          </button>
        </div>

        {/* Slider indicators */}
        <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full object-cover ${
                index === currentImageIndex ? "bg-white" : "bg-gray-500"
              }`}
              aria-current={index === currentImageIndex}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleDotClick(index)}
            ></button>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group hidden md:block"
          onClick={slideToPreviousImage}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group hidden md:block"
          onClick={slideToNextImage}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 9l4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

      {/* Header with navigation */}
      <div className="fixed top-0 z-50 left-0 w-full shadow-lg bg-white">
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
          <div className="flex gap-4 items-center">
            {user && isAdmin && (
              <>
                <span className="lg:block hidden text-xl font-bold mr-6">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm sm:text-lg"
                >
                  Abmelden
                </button>
              </>
            )}
          </div>
        </div>

        {/* Small screen navigation with Hamburger Menu */}
        <div className="relative flex h-20 items-center justify-between bg-white p-4 md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Logo className="h-16" onClick={() => router.push("/")} />
          </div>
          {user && isAdmin && (
            <button
              onClick={handleLogout}
              className="absolute right-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 text-sm rounded-lg"
            >
              Abmelden
            </button>
          )}
        </div>

        {/* Styled Dropdown Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef} // Add ref to dropdown menu
            className="bg-white shadow-lg rounded-lg absolute left-0 w-52 -mt-2 z-40"
          >
            <ul className="flex flex-col p-4 space-y-2">
              <li>
                <button
                  onClick={() => {
                    setSelectedMenuItem("Home");
                    handleScrollTo("Home");
                  }}
                  className={`text-black w-full text-left px-4 py-2 rounded-md ${
                    selectedMenuItem === "Home"
                      ? "bg-gray-200"
                      : "hover:bg-blue-300"
                  }`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedMenuItem("Vorteile");
                    handleScrollTo("Vorteile");
                  }}
                  className={`text-black w-full text-left px-4 py-2 rounded-md ${
                    selectedMenuItem === "Vorteile"
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Dein Warum
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedMenuItem("Kurse");
                    handleScrollTo("Kurse");
                  }}
                  className={`text-black w-full text-left px-4 py-2 rounded-md ${
                    selectedMenuItem === "Kurse"
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Kurse
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedMenuItem("Kontakt");
                    handleScrollTo("Kontakt");
                  }}
                  className={`text-black w-full text-left px-4 py-2 rounded-md ${
                    selectedMenuItem === "Kontakt"
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Kontakt
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedMenuItem("Kalender");
                    handleScrollTo("Kalender");
                  }}
                  className={`text-black w-full text-left px-4 py-2 rounded-md ${
                    selectedMenuItem === "Kalender"
                      ? "bg-gray-200"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Kalender
                </button>
              </li>
              {!user && (
                <li>
                  {/* <button
                    onClick={() => {
                      setSelectedMenuItem("Kontakt");
                      handleScrollTo("Kontakt");
                    }}
                    className={`text-black w-full text-left px-4 py-2 rounded-md ${
                      selectedMenuItem === "Kontakt"
                        ? "bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Kontakt
                  </button> */}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Components */}
      <Courses id="Courses" />
      <Benefits id="Benefits" />
      <AboutUs id="Über" />
      <TimeTable id="Kalender" />
      <Testimonials />
      <ContectUs id="Kontakt" />
      <Footer />
    </div>
  );
}
