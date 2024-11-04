"use client";

import { UserProvider } from "./context/UserContex"; // Adjust the import path as necessary
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HomePage from "./home/page";
import { createClient } from "@supabase/supabase-js";
import { Poppins } from "next/font/google";

const supabaseUrl = "https://wxgmvazvvqyxzbtpkxld.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z212YXp2dnF5eHpidHBreGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0NTM0MTgsImV4cCI6MjA0NDAyOTQxOH0.N-YacRbhIeCwT53qWG1BfCymRCyCtyTBkRetRe5QTBU";
const supabase = createClient(supabaseUrl, supabaseKey);

// Import Poppins font from Google Fonts using next/font
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Define weights as needed
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </UserProvider>
  );
}

function PaymentHandler() {
  const searchParams = useSearchParams();
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    async function getUsers() {
      let { data: users, error } = await supabase.from("Users").select("*");
      if (error) {
        throw new Error(error.message);
      }
      console.log(users);
    }

    getUsers();
  }, []);

  useEffect(() => {
    async function getSessionId() {
      const session_id = searchParams.get("session_id");
      if (session_id && !sessionData) {
        try {
          const response = await fetch(
            `/api/retrievePayment?session_id=${session_id}`
          );
          if (!response.ok) throw new Error("Network response was not ok");

          const paymentIntent = await response.json();
          const { customer_details } = paymentIntent;

          const course = JSON.parse(localStorage.getItem("course"));
          const purchaseDetails = {
            ...course,
            customerEmail: customer_details.email,
            customerName: customer_details.name,
          };

          localStorage.setItem(
            "purchaseDetails",
            JSON.stringify(purchaseDetails)
          );

          const emailResponse = await fetch("/api/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(purchaseDetails),
          });

          const purchaseResponse = await fetch("/api/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(purchaseDetails),
          });

          if (emailResponse.ok && purchaseResponse.ok) {
            setSessionData(purchaseDetails);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }

    getSessionId();
  }, [searchParams, sessionData]);

  return <HomePage />;
}

function WrappedPaymentHandler() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <PaymentHandler /> : <div>Loading...</div>;
}

// The main app component with the Poppins font applied globally
export default function WrappedApp() {
  return (
    <UserProvider>
      <main className={poppins.className}>
        <WrappedPaymentHandler />
      </main>
    </UserProvider>
  );
}
