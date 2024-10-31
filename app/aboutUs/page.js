"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "../_components/Logo";

export default function Page() {
  const router = useRouter();

  // Define navigation items with paths
  const navItemsLeft = [
    { name: "Home", path: "/" },
    { name: "Über", path: "/about" },
    { name: "Kurse", path: "/courses" },
  ];
  const navItemsRight = [
    { name: "Vorteile", path: "/benefits" },
    { name: "Kalender", path: "/#Kalender" }, // Use #Kalender to indicate section on home page
  ];

  const handleScrollToSection = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      // If the section is not found, navigate to the home page and scroll on load
      router.push(`/#Kalender`);
    }
  };

  return (
    <>
      {/* Navbar Component */}
      <div className="fixed top-0 z-50 w-full h-[6rem] shadow-lg bg-white flex items-center justify-between px-8">
        {/* Left Navbar items */}
        <div className="flex space-x-6">
          {navItemsLeft.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-lg lg:text-2xl font-medium text-black hover:text-gray-500"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Center Logo */}
        <div className="flex justify-center">
          <Logo className="h-12 cursor-pointer" />
        </div>

        {/* Right Navbar items */}
        <div className="flex space-x-6">
          {navItemsRight.map((item, index) =>
            item.name === "Kalender" ? (
              <a
                key={index}
                href={item.path}
                onClick={(event) => handleScrollToSection(event, "Kalender")}
                className="text-lg lg:text-2xl font-medium text-black hover:text-gray-500"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={index}
                href={item.path}
                className="text-lg lg:text-2xl font-medium text-black hover:text-gray-500"
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Content section with padding to avoid overlap */}
      <div className="w-full md:w-4/5 leading-6 mb-4 mx-auto text-center text-lg min-h-screen flex justify-center items-center pt-20">
        <div className="flex flex-col items-center justify-center">
          <div className="md:grid md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center items-center">
              <div className="relative bg-black h-[50rem] xs:h-[75rem] w-full mb-12">
                <Image
                  src="/aboutUs/aboutUs2.jpg"
                  alt="Body mirror by Sema"
                  fill
                  quality={20}
                  className="rounded-md object-cover"
                />
              </div>

              <h1 className="text-3xl font-bold mb-4">
                Bodymirror und Pilates! How?
              </h1>

              <div className="w-4/5 leading-7 mb-12 text-center text-lg flex flex-col gap-12">
                <blockquote>
                  „Eine Reise von tausend Meilen beginnt mit einem kleinen
                  Schritt“
                </blockquote>
                <h2 className="text-2xl font-semibold">
                  Die Geschichte von Bodymirror
                </h2>
                <p>
                  Okay, können wir schon von Geschichte sprechen? Denn so viele
                  Jahre ist es noch gar nicht her, und ich hatte Probleme, mit
                  dem Kinderwagen die Bordsteinkante hochzukommen. Ja, richtig
                  gelesen! Den Kinderwagen eine Bordsteinkante hochzuheben, war
                  einfach ein viel zu großer Kraftaufwand für mich. Vor allem im
                  Beckenboden habe ich es gespürt. Gewichte und Geräte, die
                  früher zu meinen Routinen gehörten, kamen nicht mehr infrage.
                </p>
                {/* Additional content */}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center md:self-start">
              <div className="relative bg-black h-[50rem] xs:h-[75rem] w-full mb-12">
                <Image
                  src="/aboutUs/aboutUs1.jpg"
                  alt="Body mirror by Sema"
                  fill
                  quality={20}
                  className="rounded-md object-cover"
                />
              </div>

              <h1 className="text-3xl font-bold mb-4">
                Was dich bei Bodymirror erwartet
              </h1>

              <div className="w-4/5 leading-7 mb-4 text-center text-lg flex flex-col gap-12">
                <blockquote>
                  „Eine Reise von tausend Meilen beginnt mit einem kleinen
                  Schritt“
                </blockquote>
                <h2 className="text-2xl font-semibold">
                  Die Geschichte von Bodymirror
                </h2>
                <p>
                  Klassisches Pilates ist mir nicht genug. Das klingt jetzt
                  ziemlich hart, ist es aber nicht, wenn ich dir erkläre, warum.
                  Hey, es gibt so viele tolle Sporttechniken, die in Verbindung
                  mit Pilates noch effektiver sind als allein.
                </p>
                {/* Additional content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
