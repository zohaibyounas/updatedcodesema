import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { UserProvider } from "./context/UserContex";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Body mirror by sema | Get your training",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-new.jpg" />
        <Script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
        ></Script>
        <Script
          nomodule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
        ></Script>
      </head>
      <body className={montserrat.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
