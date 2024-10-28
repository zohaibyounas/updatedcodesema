// "use client";

// import { checkout } from "../api/webhook/checkout";

// const classDetails = [
//   {
//     id: 1,
//     title: "Einzelkarte: 22€ für ca. 1 Stunde Pilates",
//     description:
//       "Wie schön, dass du Interesse hast, bei einer Stunde reinzuschnuppern. Naja, beimReinschnuppern wird es definitiv nicht bleiben. Du wirst den Geschmack von einer Stundeintensiven Trainings kennenlernen, und da diese Art von Training oft mit Schweiß verbunden ist,vergiss bitte nicht, dein Wasser mit auf die Matte zu bringen. We need to stay hydrated. Ich freuemich mega auf dich.",
//     priceId: "price_1Pltq5KP97Udb3XZbNTFMowb",
//     options: [
//       {
//         day: "Montag",
//         time: "18:55-19:55",
//         buttonText: "Buche deine Klasse für Montag (18:55-19:55)",
//       },
//       {
//         day: "Mittwoch",
//         time: "10:00-11:00",
//         buttonText: "Buche deine Klasse für Mittwoch (10:00-11:00)",
//       },
//       {
//         day: "Freitag",
//         time: "09:15-10:15",
//         buttonText: "Buche deine Klasse für Freitag (09:15-10:15)",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "5er Karte: 100€ für 5x ca. 1 Stunde Pilates",
//     description:
//       "Alles klar, du willst trainieren! Du hast Blut geleckt. Jetzt wird es interessant, und wir werden unsöfter sehen. Ich bin gespannt, welche Kurse dich am meisten begeistern, zum Schwitzen bringenoder die du vielleicht versuchst zu vermeiden – haha, kleiner Spaß am Rande. Viel Spaß mit deinerKarte. Suche dir aus, wann welcher Kurs für dich in Frage kommt. Ich freue mich mega auf dich.",
//     priceId: "price_1Pm7jKKP97Udb3XZI5FwdQIL",
//     options: [
//       {
//         day: "Montag",
//         time: "18:55-19:55",
//         buttonText: "Buche deine Klasse für Montag (18:55-19:55)",
//       },
//       {
//         day: "Mittwoch",
//         time: "10:00-11:00",
//         buttonText: "Buche deine Klasse für Mittwoch (10:00-11:00)",
//       },
//       {
//         day: "Freitag",
//         time: "09:15-10:15",
//         buttonText: "Buche deine Klasse für Freitag (09:15-10:15)",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title:
//       "10er Karte: 200€ für 10x ca. 1 Stunde Pilates + die 11. Stunde von mir gratis als Geschenk",
//     description:
//       "Okay, du willst es wissen! Das soll belohnt werden, und ich schenke dir die 11. Stunde Pilatesplus Trommelwirbel: 1x ein Core-Workout für 30 Minuten. Falls du denkst, du hast bis jetzt dieschwierigste Dschungelprüfung von allen bewältigt, möchte ich dich mit deinem Core bekanntmachen. Mit dem Erwerb deiner 10er Karte wirst du mit Sicherheit mehr als nur einmal die Wochemit mir trainieren. Daher freue ich mich ganz besonders auf dich und darauf, dass wir uns nunregelmäßiger sehen. Bis ganz bald.",
//     priceId: "price_1Pm7ktKP97Udb3XZDCYBEcES",
//     options: [
//       {
//         day: "Montag",
//         time: "18:55-19:55",
//         buttonText: "Buche deine Klasse für Montag (18:55-19:55)",
//       },
//       {
//         day: "Mittwoch",
//         time: "10:00-11:00",
//         buttonText: "Buche deine Klasse für Mittwoch (10:00-11:00)",
//       },
//       {
//         day: "Freitag",
//         time: "09:15-10:15",
//         buttonText: "Buche deine Klasse für Freitag (09:15-10:15)",
//       },
//     ],
//   },
//   {
//     id: 4,
//     title: "Privat Class: 100€ für ca. 60-90 Minuten",
//     description:
//       "Diese Privat-Session stellt das höchste Maß an individueller Betreuung dar. In deiner Privat-Class bin ich intensiv mit dir und deinem Körper im Dialog. Du kannst dich vertrauensvoll in meine Hände begeben, und wir arbeiten gemeinsam an deinen persönlichen Zielen. Diese können ziemlich unterschiedlich sein. Vielleicht möchtest du an deiner Technik arbeiten und mehr Sicherheit gewinnen, oder vielleicht legst du einfach nur Wert darauf, in einem sehr privaten Umfeld gezielt an deinen Zielen zu arbeiten.",
//     priceId: "price_1Pm7m8KP97Udb3XZEEvF5Vni",
//     options: [
//       {
//         day: "Instructor will email you.",
//         time: "Instructor will email you.",
//         buttonText: "Buche deine Privat Class",
//       },
//     ],
//   },
//   {
//     id: 5,
//     title: "Core-Kurs: 10€ für ca. 30 Minuten intensives Core-Workout",
//     description:
//       "Dieser Kurs ist anders! Wenn du deine Körpermitte, deinen Bauch in seiner Tiefenmuskulatur –und ja, dazu zählt auch der untere Bauch –, deinen Beckenboden und deinen Rücken stärken willst, dann ist dieser Kurs absolut das Richtige für dich. Dein Bindeglied zwischen Oberkörper und Unterkörper wird aufgepäppelt und hergerichtet. Du wirst schnell merken, dass dir andere Übungen, die beispielsweise auf Beine oder Koordination und Balance abzielen, nun viel leichter fallen. Viel Spaß dabei, ich freue mich mega auf dich.",
//     priceId: "price_1Pm7nkKP97Udb3XZsTnhcHwc",
//     options: [
//       {
//         day: "Montag",
//         time: "20:00-21:00",
//         buttonText: "Buche deine Klasse für Montag (20:00-21:00)",
//       },
//       {
//         day: "Dienstag",
//         time: "9:15-9:45",
//         buttonText: "Buche deine Klasse für Dienstag (9:15-9:45)",
//       },
//     ],
//   },
//   {
//     id: 6,
//     title: "Bring a Friend on Board",
//     description: `
//     Einige der Powerfrauen haben mich tatsächlich über ihre Powerfrau-Freundinnen gefunden. Diese
//     Powerfrauen haben wiederum andere Powerfrauen mit an Bord geholt. Als Belohnung erhält die
//     Powerfrau, die die Vermittlung gemacht hat, bei einem Kaufabschluss einer 5er-Karte 1 Stunde
//     Pilates-Training gratis.

//     Für diese Rubrik bitte ich dich, mich über sema@body-mirror.com zu kontaktieren. In der E-Mail
//     kannst du mir den Namen sowie die E-Mail-Adresse der Vermittlungs-Powerfrau nennen, und wir
//     sehen uns dann schon ganz bald auf der Matte.

//     Meine Erwartungen an dich: Wichtig ist, dass du dich gesund und fit fühlst, um die Stunde
//     anzutreten. Falls du gesundheitliche Einschränkungen hast oder eine Schwangerschaft vorliegt,
//     kontaktiere mich bitte vorher per E-Mail über sema@body-mirror.com. So haben wir genug Zeit,
//     im Voraus in Austausch zu gehen und alles zu besprechen.
//     `,
//   },
// ];

// export default function Courses() {
//   const handleBooking = (cls, selectedOption = null) => {
//     console.log(cls);
//     const bookingTime = new Date().toLocaleTimeString();
//     const course = {
//       id: cls.id,
//       title: cls.title,
//       priceId: cls.priceId,
//       bookingTime,
//       day: selectedOption?.day || "Mittwoch",
//       courseTime: selectedOption?.time || "13:00-14:00",
//     };

//     localStorage.setItem("course", JSON.stringify(course));
//     if (cls.id !== 6) {
//       console.log("Hello");
//       checkout({ lineItems: [{ price: cls.priceId, quantity: 1 }] });
//     } else {
//       window.location.href = "mailto:sema@body-mirror.com";
//     }
//   };

//   return (
//     <div
//       className="mx-auto flex h-auto min-h-screen w-11/12 lg:w-9/12 flex-col items-center justify-center gap-8 py-20 relative z-10 pointer-events-auto"
//       id="Kurse"
//     >
//       <div className="flex w-full flex-col items-center justify-between gap-12">
//         {classDetails.map((cls) => (
//           <div
//             key={cls.id}
//             className="flex-1 rounded-lg p-16 2xl:p-20 border border-black bg-gray-100"
//           >
//             <h1 className="mb-4 text-3xl font-semibold tracking-wide text-black lg:text-4xl">
//               {cls.title}
//             </h1>
//             <p className="mb-8 text-lg leading-relaxed text-black lg:text-2xl">
//               {cls.description}
//             </p>
//             {cls.options ? (
//               cls.options.map((option, index) => (
//                 <button
//                   key={index}
//                   className="w-full bg-transparent border transition-all duration-300 border-black px-4 py-3 text-lg font-semibold bg-white text-black hover:bg-stone-400 lg:text-2xl"
//                   onClick={() => handleBooking(cls, option)}
//                   // onTouchStart={() => handleBooking(cls, option)}
//                 >
//                   {option.buttonText}
//                 </button>
//               ))
//             ) : (
//               <button
//                 className="w-full bg-stone-300 text-black text-lg md:text-xl py-2 px-6 rounded-lg hover:bg-stone-200 transition"
//                 onClick={() => handleBooking(cls)}
//                 // onTouchStart={() => handleBooking(cls)}
//               >
//                 Schreibe mir jetzt eine E-Mail
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

const classDetails = [
  {
    id: 1,
    title: "Dein Pilates-Erlebnis – Flexibel, Effizient und Ortsunabhängig",
    description:
      "Ich biete wöchentliche Pilates-Livekurse via Zoom an – das bedeutet für dich: kein Fahrstress, volle Flexibilität und maximaler Zeitgewinn. Pilates direkt von zu Hause aus, mit persönlicher Anleitung und live gestreamt. Du kannst jederzeit einsteigen, und keine Woche ist wie die andere – ich rotiere die Kursarten, damit es nie langweilig wird.",
    options: [
      {
        buttonText: "Jetzt mehr erfahren",
      },
    ],
  },
  {
    id: 2,
    title: "Rotierende Kurse – Dein Pilates, wie du es brauchst",
    description:
      "🌶 Pilates HIIT – Hier kommt deine Ausdauer auf Touren! Im Pilates HIIT verbinde ich schnelles Tempo mit gezielten Bewegungsabfolgen. Perfekt, um deine Koordination und deine Kondition auf das nächste Level zu bringen.\n\n" +
      "🌶 Pilates Mobility – Deine Wirbelsäule und Beweglichkeit stehen im Fokus. Diese Stunde widmet sich der funktionellen Mobilität, damit du dich im Alltag freier und geschmeidiger bewegen kannst.\n\n" +
      "🌶 Pilates Strength – Wir trainieren die größeren Muskelgruppen und bauen gezielt Kraft auf. Ein perfekter Mix für mehr Stabilität und Stärke.\n\n" +
      "🌶 Pilates Burn – Der Name sagt es: Ein Ganzkörper-Burn! In dieser Stunde fokussieren wir uns oft auf spezielle Körperbereiche für ein intensives Trainingserlebnis.",
    options: [
      {
        buttonText: "Jetzt Kurse entdecken",
      },
    ],
  },
  {
    id: 3,
    title: "Warum Live-Kurse?",
    description:
      "Ach ja, und mich kannst du dabei nicht einfach auf Pause drücken. Die Live-Atmosphäre bringt nicht nur mehr Motivation, sondern auch eine persönliche Betreuung. Du bist live dabei, kannst direkt Fragen stellen und deine Technik verbessern. Gemeinsam holen wir das Beste aus dir heraus!",
    options: [
      {
        buttonText: "Live-Kurse ansehen",
      },
    ],
  },
];

export default function Courses() {
  const handleBooking = (cls, selectedOption = null) => {
    console.log(cls);
    const bookingTime = new Date().toLocaleTimeString();
    const course = {
      id: cls.id,
      title: cls.title,
      bookingTime,
    };

    localStorage.setItem("course", JSON.stringify(course));
    alert("Thank you for your interest! We'll provide more details soon.");
  };

  return (
    <div
      className="mx-auto flex h-auto min-h-screen w-11/12 lg:w-9/12 flex-col items-center justify-center gap-8 py-20 relative z-10 pointer-events-auto"
      id="Kurse"
    >
      <div className="flex w-full flex-col items-center justify-between gap-12">
        {classDetails.map((cls) => (
          <div
            key={cls.id}
            className="flex-1 rounded-lg p-8 md:p-16 2xl:p-20 border border-black bg-gray-100 shadow-lg"
          >
            <h1 className="mb-4 text-2xl md:text-3xl font-semibold tracking-wide text-black lg:text-4xl">
              {cls.title}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-black lg:text-2xl whitespace-pre-line">
              {cls.description}
            </p>
            {cls.options &&
              cls.options.map((option, index) => (
                <button
                  key={index}
                  className="w-full bg-transparent border transition-all duration-300 border-black px-4 py-3 text-lg font-semibold bg-white text-black hover:bg-stone-400 lg:text-2xl"
                  onClick={() => handleBooking(cls, option)}
                >
                  {option.buttonText}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
