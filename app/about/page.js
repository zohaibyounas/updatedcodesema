"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <div
      className="bg-gray-100 min-h-[80vh] flex flex-col justify-center items-center md:min-h-screen"
      id="Über"
    >
      {/* Centered Image component for larger screens */}
      <div className="relative hidden md:flex justify-center items-center w-full h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
        <div className="w-4/5 md:w-4/5 lg:w-4/5 xl:w-full h-full relative">
          <Image
            src="/about.jpg"
            alt="Body mirror by Sema"
            layout="fill"
            objectFit="contain" // Ensures the whole image is visible
            quality={100}
            className="rounded-md"
          />
        </div>
      </div>

      {/* Image component for smaller screens */}
      <div className="relative bg-black h-[100vh] xs:h-[50vh] w-full md:hidden">
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
