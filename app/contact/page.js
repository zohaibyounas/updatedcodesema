"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
    const response = await fetch("/api/contactUs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Your message has been sent!");
      router.push("/");
      router;
    } else {
      alert("There was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="p-8 sm:p-20 bg-white" id="Kontakt">
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
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded"
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
              className="w-full p-2 border border-gray-300 rounded resize-none"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-lg sm:text-xl lg:text-2xl font-medium mb-2">
              Ich möchte:
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              name="option"
              value={formData.option}
              onChange={handleChange}
              required
            >
              <option value="">Bitte auswählen</option>
              <option value="question">
                Eine Frage zu einem bestehenden Kurs stellen
              </option>
              <option value="feedback">Feedback oder Anregungen geben</option>
              <option value="other">
                Etwas anderes (bitte im Nachrichtenfeld angeben)
              </option>
              <option value="privateClass">
                Einen individuellen Termin für eine Privat Class
              </option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded text-lg sm:text-xl lg:text-2xl"
            >
              Senden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
