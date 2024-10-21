"use client";

import FooterNav from "../_components/FooterNav";

function Footer() {
  return (
    <div className="relative bg-stone-300 p-8 sm:p-20">
      {/* Instagram Logo */}
      <div className="absolute top-0 right-0 m-8">
        <a
          href="https://www.instagram.com/bodymirror_bysema?igsh=cmw2ZXIwamllY2Fj&utm_source=qr"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center rounded-full border-2 border-black bg-[#fecdd3] p-4 text-lg text-black"
          style={{ width: "4rem", height: "4rem" }}
        >
          <ion-icon
            name="logo-instagram"
            style={{ fontSize: "1.5rem" }}
          ></ion-icon>
        </a>
      </div>

      {/* Footer Content */}
      <div className="grid grid-cols-1 gap-10 p-10 sm:grid-cols-2 sm:gap-24 sm:p-24 lg:grid-cols-3">
        <div>
          <h1 className="mb-4 text-2xl text-black">Quick Links</h1>
          <FooterNav />
        </div>

        <div>
          <h1 className="mb-4 text-2xl text-black">Opening Hours</h1>
          <div className="mb-4 flex flex-col text-xl text-black">
            <strong className="mb-2">Monday - Friday</strong>
            <time>8.00 AM - 8.00 PM</time>
          </div>
          <div className="mb-4 flex flex-col text-xl text-black">
            <strong className="mb-2">Saturday - Sunday</strong>
            <time>2.00 PM - 8.00 PM</time>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-black">
        <hr className="mx-auto mb-8 w-[70%]" />
        <p className="text-lg">
          &copy; 2024 Body mirror by Sema. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
