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
    description: `
      <b>🌶 Pilates HIIT</b> – Hier kommt deine Ausdauer auf Touren! Im Pilates HIIT verbinde ich schnelles Tempo mit gezielten Bewegungsabfolgen. Perfekt, um deine Koordination und deine Kondition auf das nächste Level zu bringen.<br /><br />
      <b>🌶 Pilates Mobility</b> – Deine Wirbelsäule und Beweglichkeit stehen im Fokus. Diese Stunde widmet sich der funktionellen Mobilität, damit du dich im Alltag freier und geschmeidiger bewegen kannst.<br /><br />
      <b>🌶 Pilates Strength</b> – Wir trainieren die größeren Muskelgruppen und bauen gezielt Kraft auf. Ein perfekter Mix für mehr Stabilität und Stärke.<br /><br />
      <b>🌶 Pilates Burn</b> – Der Name sagt es: Ein Ganzkörper-Burn! In dieser Stunde fokussieren wir uns oft auf spezielle Körperbereiche für ein intensives Trainingserlebnis.
    `,
  },
];

export default function Courses() {
  return (
    <div
      className="mx-auto flex h-auto min-h-screen w-11/12 lg:w-8/12 flex-col items-center justify-center gap-12 py-20"
      id="Kurse"
    >
      <div className="flex w-full flex-col items-center gap-12">
        {classDetails.map((cls) => (
          <div
            key={cls.id}
            className="w-full bg-white p-8 rounded-lg shadow-md shadow-gray-300 text-center border border-gray-200"
          >
            <h2 className="mb-6 text-2xl md:text-3xl font-semibold text-black tracking-wide uppercase">
              {cls.title}
            </h2>
            <p
              className="text-lg leading-relaxed text-black lg:text-2xl text-center whitespace-pre-line"
              style={{
                fontWeight: 300,
                lineHeight: "1.8",
                maxWidth: "90%",
                margin: "0 auto",
              }}
              dangerouslySetInnerHTML={{ __html: cls.description }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
}
