import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo/logo.tif" alt="Logo" width="70" height="70" />
    </Link>
  );
}
