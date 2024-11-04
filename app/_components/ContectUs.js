"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    option: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Your message has been sent!", {
          duration: 3000,
          style: {
            padding: "16px",
            fontSize: "18px",
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          option: "",
        });
        // setTimeout(() => {
        //   router.push("/"); // Redirect after a short delay
        // }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(`There was an error: ${errorData.message}`, {
          style: {
            padding: "16px",
            fontSize: "18px",
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(
        "There was an error sending your message. Please try again.",
        {
          style: {
            padding: "16px",
            fontSize: "18px",
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
  };

  return (
    <div className="p-8 sm:p-20 bg-white" id="Kontakt">
      {/* Centered Toaster */}
      <Toaster position="top-center" reverseOrder={false} />{" "}
      {/* Toast provider */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6">
          Kontakt
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8">
          Ich freue mich über deine Nachricht! Bitte fülle das folgende Formular
          aus, um mit mir in Kontakt zu treten. Ich werde mich so schnell wie
          möglich bei dir melden.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-lg sm:text-xl lg:text-2xl font-medium mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="w-full p-6 border border-gray-300 rounded"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-lg sm:text-xl lg:text-2xl font-medium mb-2"
              htmlFor="email"
            >
              E-Mail-Adresse:
            </label>
            <input
              className="w-full p-6 border border-gray-300 rounded"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-lg sm:text-xl lg:text-2xl font-medium mb-2"
              htmlFor="subject"
            >
              Betreff:
            </label>
            <input
              className="w-full p-6 border border-gray-300 rounded"
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              className="block text-lg sm:text-xl lg:text-2xl font-medium mb-2"
              htmlFor="message"
            >
              Nachricht:
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded resize-none"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-stone-500 text-white p-3 rounded text-lg sm:text-xl lg:text-2xl"
            >
              Senden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
