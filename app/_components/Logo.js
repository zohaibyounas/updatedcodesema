import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo/logo.tif" alt="Logo" width="50" height="50" />
    </Link>
  );
}
