"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <div
      className="bg-gray-100 min-h-[80vh] flex flex-col justify-center items-center md:min-h-screen md:hidden"
      id="Über"
    >
      {/* Centered Image component for smaller screens */}
      <div className="relative bg-black h-[100vh] xs:h-[50vh] w-full">
        <Image
          src="/about.jpg"
          alt="Body mirror by Sema"
          layout="fill"
          objectFit="cover" // Covers the space on smaller screens
          className="rounded-md"
        />
      </div>
    </div>
  );
}
