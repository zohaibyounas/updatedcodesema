export default function Benefits() {
  return (
    <div
      className="mx-auto flex min-h-[60vh] w-full flex-col items-center justify-center py-32 bg-white"
      id="Vorteile"
    >
      <h3 className="mb-4 text-center text-3xl text-black sm:text-4xl">
        Warum Online-Training über Zoom mit mir?
      </h3>
      <h1 className="mb-10 text-center text-4xl font-bold text-black sm:text-5xl lg:text-6xl">
        Deine Benefits
      </h1>

      <div className="grid w-11/12 grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col items-center">
          <div className="text-5xl text-teal-500 mb-2">
            <ion-icon name="barbell-outline"></ion-icon>
          </div>
          <h3 className="mb-2 text-2xl font-bold text-black sm:text-3xl text-center">
            Stabilität und Kraftaufbau
          </h3>
          <p className="text-base text-black sm:text-lg lg:text-xl text-center">
            Mit gezielten Übungen verbessern wir deine Stabilität und stärken
            deine Muskulatur. Besonders die Körpermitte steht bei mir im Fokus.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col items-center">
          <div className="text-5xl text-teal-500 mb-2">
            <ion-icon name="heart-outline"></ion-icon>
          </div>
          <h3 className="mb-2 text-2xl font-bold text-black sm:text-3xl text-center">
            Gezieltes Training nach der Geburt
          </h3>
          <p className="text-base text-black sm:text-lg lg:text-xl text-center">
            Als zweifache Mama weiß ich genau, wie wichtig eine starke
            Körpermitte ist – besonders nach einer Schwangerschaft.
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col items-center">
          <div className="text-5xl text-teal-500 mb-2">
            <ion-icon name="happy-outline"></ion-icon>
          </div>
          <h3 className="mb-2 text-2xl font-bold text-black sm:text-3xl text-center">
            Vielfalt und Spaß
          </h3>
          <p className="text-base text-black sm:text-lg lg:text-xl text-center">
            Keine Routine ist wie die andere! Ich mixe Elemente aus Fitness und
            klassischem Pilates, sodass jeder Kurs neu und dynamisch bleibt.
          </p>
        </div>
      </div>
    </div>
  );
}
