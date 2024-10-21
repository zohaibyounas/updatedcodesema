"use client";

import Link from "next/link";
import { handleScrollTo } from "../_helpers/scroll";

export default function Navbar({ navItems }) {
  return (
    <ul className="flex items-center gap-12 text-xl xl:text-3xl text-black">
      {navItems.map((item) => (
        <li
          key={item}
          className="cursor-pointer transition-all hover:text-stone-400"
          onClick={() => {
            if (item === "Kontakt") {
              return; // Prevent the default scroll behavior for "Kontakt"
            } else {
              handleScrollTo(item);
            }
          }}
        >
          {item === "Kontakt" ? <Link href="/contact">{item}</Link> : item}
        </li>
      ))}
    </ul>
  );
}
