"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "../_components/Navbar";
export default function AboutUs() {
  return (
    <div
      className="bg-gray-100 min-h-[80vh] flex flex-col justify-center pt-20 md:pt-0 md:grid md:grid-cols-2 md:items-center md:justify-items-center md:min-h-screen"
      id="Über"
    >
      {/* Image component for larger screens */}
      <div className="relative hidden md:block bg-black mb-12 w-full h-[50vh] md:h-[60vh] lg:h-4/5 xl:h-full xl:mt-12">
        <Image
          src="/about.jpg"
          alt="Body mirror by Sema"
          fill
          quality={10}
          className="rounded-md object-cover"
        />
      </div>

      {/* Content section */}
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Bodymirror und Pilates! How?
        </h1>

        <div className="w-11/12 leading-8 mb-12 text-center text-lg lg:text-2xl lg:w-4/5">
          <blockquote className="italic mb-4">
            „Eine Reise von tausend Meilen beginnt mit einem kleinen Schritt“
          </blockquote>
          <h2 className="font-semibold mb-2">Die Geschichte von Bodymirror</h2>
          <p className="mb-4">
            Okay, können wir schon von Geschichte sprechen?
          </p>
          <p className="mb-4">
            Denn so viele Jahre ist es noch gar nicht her, und ich hatte
            Probleme, mit dem Kinderwagen die Bordsteinkante hochzukommen. Ja,
            richtig gelesen! Den Kinderwagen eine Bordsteinkante hochzuheben,
            war einfach ein viel zu großer Kraftaufwand für mich. Vor allem im
            Beckenboden habe ich es gespürt. Gewichte und Geräte, die früher zu
            meinen Routinen gehörten, kamen nicht mehr infrage.
          </p>
          <Link className="bg-gray-200 text-black p-1" href="/aboutUs">
            Read more
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">
          Was dich bei Bodymirror erwartet
        </h1>
        <div className="w-11/12 leading-8 mb-4 text-center text-lg lg:text-2xl lg:w-4/5">
          <p className="mb-4">
            Klassisches Pilates ist mir nicht genug. Das klingt jetzt ziemlich
            hart, ist es aber nicht, wenn ich dir erkläre, warum. Hey, es gibt
            so viele tolle Sporttechniken, die in Verbindung mit Pilates noch
            effektiver sind als allein.
          </p>
          <p className="mb-4">
            Im klassischen Pilates gibt es klar definierte Regeln, wie zum
            Beispiel den Übergang von einer Übung zur nächsten...
          </p>
          <Link className="bg-gray-200 text-black p-1" href="/aboutUs">
            Read more
          </Link>
        </div>
      </div>

      {/* Image component for smaller screens */}
      <div className="relative bg-black h-[50rem] xs:h-[75rem] w-full md:hidden">
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
