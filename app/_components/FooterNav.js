"use client";

import { useRouter } from "next/navigation";
import { handleScrollTo } from "../_helpers/scroll";
import Link from "next/link";

function FooterNav() {
  const router = useRouter();

  return (
    <>
      <div
        className="flex gap-3 text-xl text-black cursor-pointer"
        onClick={() => handleScrollTo("Home")}
      >
        <span>
          <ion-icon name="caret-forward-outline"></ion-icon>
        </span>
        <span>Home</span>
      </div>
      <div
        className="flex gap-3 text-xl text-black cursor-pointer"
        onClick={() => handleScrollTo("Kurse")}
      >
        <span>
          <ion-icon name="caret-forward-outline"></ion-icon>
        </span>
        <span>Courses</span>
      </div>
      <div
        className="flex gap-3 text-xl text-black cursor-pointer"
        onClick={() => handleScrollTo("Über")}
      >
        <span>
          <ion-icon name="caret-forward-outline"></ion-icon>
        </span>
        <span>About Us</span>
      </div>
      <div
        className="flex gap-3 text-xl text-black cursor-pointer"
        onClick={() => handleScrollTo("Kalender")}
      >
        <span>
          <ion-icon name="caret-forward-outline"></ion-icon>
        </span>
        <span>Calendar</span>
      </div>
      <div
        className="flex gap-3 text-xl text-black cursor-pointer"
        onClick={() => router.push("/agb")}
      >
        <span>
          <ion-icon name="caret-forward-outline"></ion-icon>
        </span>
        <span>AGB</span>
      </div>
      <div
        className="flex gap-3 text-xl text-black cursor-pointer"
        onClick={() => router.push("/dataProtection")}
      >
        <span>
          <ion-icon name="caret-forward-outline"></ion-icon>
        </span>
        <span>Datenschutz</span>
      </div>
      <div
        className="flex gap-3 text-xl text-black cursor-pointer"
        onClick={() => router.push("/cancellationPolicy")}
      >
        <span>
          <ion-icon name="caret-forward-outline"></ion-icon>
        </span>
        <span>Widerrufsbelehrung</span>
      </div>
      <div className="flex gap-3 text-xl text-black cursor-pointer">
        <span>
          <ion-icon name="caret-forward-outline"></ion-icon>
        </span>
        <Link href="/contact">Contact Us</Link>
      </div>
    </>
  );
}

export default FooterNav;
