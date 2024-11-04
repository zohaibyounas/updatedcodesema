"use client";
import { Poppins } from "next/font/google"; // Keep Poppins as a fallback font if needed

const poppins = Poppins({
  weight: ["400", "700"], // Regular and bold weights
  subsets: ["latin"],
});

export default function Benefits() {
  return (
    <div
      className={`mx-auto flex min-h-screen w-full flex-col items-center justify-center py-32 bg-white ${poppins.className}`}
      id="Vorteile"
      style={{
        fontFamily: '"Helvetica Neue", Helvetica,  sans-serif', // Helvetica Neue for a closer match
        color: "#333333", // Adjusted to a dark gray close to black for readability
      }}
    >
      <h1
        className="mb-16 text-center text-4xl font-bold sm:text-5xl lg:text-7xl"
        style={{ color: "#1a1a1a" }} // Dark color similar to the text in the image
      >
        Dein Warum
      </h1>

      <div className="grid w-11/12 grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3">
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg min-h-80 flex flex-col items-center">
          <div className="text-7xl text-teal-500 mb-4">
            <ion-icon name="barbell-outline"></ion-icon>
          </div>
          <h3
            className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl text-center"
            style={{ color: "#1a1a1a" }}
          >
            Stabilität und Kraftaufbau
          </h3>
          <p
            className="text-lg sm:text-lg lg:text-3xl text-center leading-relaxed"
            style={{
              color: "#555555", // Lighter gray for paragraph text
              fontWeight: 300,
              lineHeight: "1.6",
              maxWidth: "80%",
              margin: "0 auto",
            }}
          >
            Mit gezielten Übungen verbessern wir deine Stabilität und stärken
            deine Muskulatur. Besonders die Körpermitte steht bei mir im Fokus.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-lg min-h-80 flex flex-col items-center">
          <div className="text-7xl text-teal-500 mb-4">
            <ion-icon name="heart-outline"></ion-icon>
          </div>
          <h3
            className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl text-center"
            style={{ color: "#1a1a1a" }}
          >
            Gezieltes Training nach der Geburt
          </h3>
          <p
            className="text-lg lg:text-3xl text-center whitespace-pre-line"
            style={{
              color: "#555555",
              fontWeight: 300,
              lineHeight: "1.6",
              maxWidth: "80%",
              margin: "0 auto",
            }}
          >
            Als zweifache Mama weiß ich genau, wie wichtig eine starke
            Körpermitte ist – besonders nach einer Schwangerschaft. Ein stabiler
            Core ist der Schlüssel für mehr Wohlbefinden.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-lg min-h-80 flex flex-col items-center">
          <div className="text-7xl text-teal-500 mb-4">
            <ion-icon name="people-outline"></ion-icon>
          </div>
          <h3
            className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl text-center"
            style={{ color: "#1a1a1a" }}
          >
            Vielfalt
          </h3>
          <p
            className="text-lg sm:text-lg lg:text-3xl text-center leading-relaxed"
            style={{
              color: "#555555",
              fontWeight: 300,
              lineHeight: "1.6",
              maxWidth: "80%",
              margin: "0 auto",
            }}
          >
            Für alle, die bisher wenig Begeisterung für Sport hatten: Ich zeige
            dir, dass auch Muskelaufbau und Bewegung richtig Spaß machen können
            – und irgendwann sogar zur Motivation werden. Du kannst mich nicht
            einfach auf Pause legen. Sobald du die ersten Erfolge siehst, wird
            es erst richtig spannend!
          </p>
        </div>
      </div>
    </div>
  );
}
