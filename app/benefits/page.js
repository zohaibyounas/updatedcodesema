export default function Benefits() {
  return (
    <div
      className="mx-auto flex min-h-screen w-full flex-col items-center justify-center py-32  bg-white"
      id="Vorteile"
    >
      {/* <h3 className="mb-6 text-center text-3xl text-black sm:text-4xl">
        Warum Online-Training über Zoom mit mir?
      </h3> */}
      <h1 className="mb-16 text-center text-4xl font-bold text-black sm:text-5xl lg:text-7xl">
        Deine Warum
      </h1>

      <div className="grid w-11/12 grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-3">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg min-h-80 flex flex-col items-center">
          <div className="text-7xl text-teal-500 mb-4">
            <ion-icon name="barbell-outline"></ion-icon>
          </div>
          <h3 className="mb-4 text-2xl font-bold text-black sm:text-3xl lg:text-4xl text-center">
            Stabilität und Kraftaufbau
          </h3>
          <p className="text-base text-black sm:text-lg lg:text-2xl text-center">
            Mit gezielten Übungen verbessern wir deine Stabilität und stärken
            deine Muskulatur. Besonders die Körpermitte steht bei mir im Fokus.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg min-h-80 flex flex-col items-center">
          <div className="text-7xl text-teal-500 mb-4">
            <ion-icon name="heart-outline"></ion-icon>
          </div>
          <h3 className="mb-4 text-2xl font-bold text-black sm:text-3xl lg:text-4xl text-center">
            Gezieltes Training nach der Geburt
          </h3>
          <p className="text-base text-black sm:text-lg lg:text-2xl text-center">
            Als zweifache Mama weiß ich genau, wie wichtig eine starke
            Körpermitte ist – besonders nach einer Schwangerschaft. Ein stabiler
            Core ist der Schlüssel für mehr Wohlbefinden.
          </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg min-h-80 flex flex-col items-center">
          <div className="text-7xl text-teal-500 mb-4">
            <ion-icon name="people-outline"></ion-icon> {/* Updated icon */}
          </div>
          <h3 className="mb-4 text-2xl font-bold text-black sm:text-3xl lg:text-4xl text-center">
            Vielfalt
          </h3>
          <p className="text-base text-black sm:text-lg lg:text-2xl text-center">
            Für alle, die bisher wenig Begeisterung für Sport hatten: Ich zeige
            dir, dass auch Muskelaufbau und Bewegung richtig Spaß machen können
            – und irgendwann sogar zur Motivation werden. Du kannst mich nicht
            einfach auf Pause legen. Sobald du die ersten Erfolge siehst, wird
            es erst richtig spannend!
          </p>
        </div>
      </div>
    </div>
  );
}
