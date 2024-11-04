"use client";

const classDetails = [
  {
    id: 1,
    title: "Dein Pilates-Erlebnis – Flexibel, effizient und ortsunabhängig",
    description:
      "Ich biete wöchentliche Pilates-Livekurse via Zoom an – das bedeutet für dich: kein Fahrstress, volle Flexibilität und maximaler Zeitgewinn. Pilates direkt von zu Hause aus, mit persönlicher Anleitung und live gestreamt. Du kannst jederzeit einsteigen, und keine Woche ist wie die andere – ich variiere die Kursarten, damit es nie langweilig wird.",
  },
  {
    id: 2,
    title: "Rotierende Kurse – Dein Pilates, wie du es brauchst",
    description:
      "<b>🌶 Pilates HIIT</b> – Hier kommt deine Ausdauer auf Touren! Im Pilates HIIT verbinde ich schnelles Tempo mit gezielten Bewegungsabfolgen. Perfekt, um deine Koordination und deine Kondition auf das nächste Level zu bringen.\n\n" +
      "<b>🌶 Pilates Mobility</b> – Deine Wirbelsäule und Beweglichkeit stehen im Fokus. Diese Stunde widmet sich der funktionellen Mobilität, damit du dich im Alltag freier und geschmeidiger bewegen kannst.\n\n" +
      "<b>🌶 Pilates Strength</b> – Wir trainieren die größeren Muskelgruppen und bauen gezielt Kraft auf. Ein perfekter Mix für mehr Stabilität und Stärke.\n\n" +
      "<b>🌶 Pilates Burn</b> – Der Name sagt es: Ein Ganzkörper-Burn! In dieser Stunde fokussieren wir uns oft auf spezielle Körperbereiche für ein intensives Trainingserlebnis.",
  },
];

export default function Courses() {
  const handleBooking = (cls) => {
    const course = {
      id: cls.id,
      title: cls.title,
      bookingTime: new Date().toLocaleTimeString(),
    };
    localStorage.setItem("course", JSON.stringify(course));
    alert("Thank you for your interest! We'll provide more details soon.");
  };

  return (
    <div
      className="mx-auto flex h-auto min-h-screen w-11/12 lg:w-9/12 flex-col items-center justify-center gap-8 py-20"
      id="Kurse"
    >
      <div className="flex w-full flex-col items-center gap-12">
        {classDetails.map((cls) => (
          <div
            key={cls.id}
            className="flex-1 rounded-lg p-8 md:p-16 2xl:p-20 border border-gray-100 bg-gray-100 shadow-xl shadow-gray-300"
          >
            <h1 className="mb-4 text-2xl md:text-3xl font-semibold text-center tracking-wide text-black lg:text-4xl">
              {cls.title}
            </h1>
            <p
              className="mb-8 text-lg leading-relaxed text-black lg:text-2xl whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: cls.description }}
            ></p>
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
