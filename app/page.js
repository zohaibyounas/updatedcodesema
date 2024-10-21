"use client";
import { UserProvider } from "./context/UserContex"; // Adjust the import path as necessary
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HomePage from "./home/page";
// import supabase from "./_database/Supabase";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wxgmvazvvqyxzbtpkxld.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4Z212YXp2dnF5eHpidHBreGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0NTM0MTgsImV4cCI6MjA0NDAyOTQxOH0.N-YacRbhIeCwT53qWG1BfCymRCyCtyTBkRetRe5QTBU";
const supabase = createClient(supabaseUrl, supabaseKey);
// export default supabase;
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
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
        // Ensure the request is only made once
        try {
          const response = await fetch(
            `/api/retrievePayment?session_id=${session_id}`
          );
          if (!response.ok) throw new Error("Network response was not ok");

          const paymentIntent = await response.json();
          const { customer_details } = paymentIntent;

          // Retrieve stored course details
          const course = JSON.parse(localStorage.getItem("course"));

          // Combine course details with customer details
          const purchaseDetails = {
            ...course,
            customerEmail: customer_details.email,
            customerName: customer_details.name,
          };

          // Store the combined details (you can later send it to a server or email)
          localStorage.setItem(
            "purchaseDetails",
            JSON.stringify(purchaseDetails)
          );

          // Send an email to the customer
          const emailResponse = await fetch("/api/sendEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(purchaseDetails),
          });

          // Optionally, send purchase details to your server
          const purchaseResponse = await fetch("/api/purchase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(purchaseDetails),
          });

          // Only set session data once everything is complete to avoid re-triggers
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

export default function WrappedPaymentHandler() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <PaymentHandler /> : <div>Loading...</div>;
}
