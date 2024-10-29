"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div
      className="bg-gray-100 min-h-[60vh] flex flex-col justify-center pt-6 md:pt-0 md:grid md:grid-cols-2 md:items-center md:justify-items-center"
      id="Über"
    >
      {/* Image component for larger screens */}
      <div className="relative hidden md:block bg-black mb-6 w-full h-[40vh] md:h-[50vh] lg:h-4/5 xl:h-full xl:mt-6">
        <Image
          src="/about.jpg"
          alt="Body mirror by Sema"
          fill
          quality={10}
          className="rounded-md object-cover"
        />
      </div>

      {/* Content section */}
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold mb-3">
          Bodymirror und Pilates! How?
        </h1>

        <div className="w-11/12 leading-7 mb-6 text-center text-lg lg:text-2xl lg:w-4/5">
          <blockquote className="italic mb-2">
            „Eine Reise von tausend Meilen beginnt mit einem kleinen Schritt“
          </blockquote>
          <h2 className="font-semibold mb-2">Die Geschichte von Bodymirror</h2>
          <p className="mb-2">
            Okay, können wir schon von Geschichte sprechen?
          </p>
          <p className="mb-2">
            Denn so viele Jahre ist es noch gar nicht her, und ich hatte
            Probleme, mit dem Kinderwagen die Bordsteinkante hochzukommen...
          </p>
          <Link className="bg-gray-200 text-black p-1" href="/aboutUs">
            Read more
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-3">
          Was dich bei Bodymirror erwartet
        </h1>
        <div className="w-11/12 leading-7 mb-2 text-center text-lg lg:text-2xl lg:w-4/5">
          <p className="mb-2">
            Klassisches Pilates ist mir nicht genug. Das klingt jetzt ziemlich
            hart, ist es aber nicht, wenn ich dir erkläre, warum...
          </p>
          <Link className="bg-gray-200 text-black p-1" href="/aboutUs">
            Read more
          </Link>
        </div>
      </div>

      {/* Image component for smaller screens */}
      <div className="relative bg-black h-[40vh] xs:h-[60vh] w-full md:hidden">
        <Image
          src="/about.jpg"
          alt="Body mirror by Sema"
          fill
          className="rounded-md object-cover"
        />
      </div>
    </div>
  );
}
