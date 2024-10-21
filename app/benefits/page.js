export default function Benefits() {
  return (
    <div
      className="mx-auto flex min-h-screen w-full flex-col items-center justify-center py-32 text-white bg-gray-100"
      id="Vorteile"
    >
      <h3 className="mb-6 text-center text-3xl text-black sm:text-4xl">
        Warum Online-Training über Zoom mit mir?
      </h3>
      <h1 className="mb-16 text-center text-4xl font-bold text-black sm:text-5xl lg:text-7xl">
        Deine Benefits
      </h1>

      <div className="grid w-11/12 grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
        <div className="mb-8 flex items-start lg:mb-0">
          <div className="text-4xl text-stone-400 sm:text-5xl lg:text-7xl">
            <ion-icon name="navigate"></ion-icon>
          </div>
          <div className="ml-4 sm:ml-6">
            <h3 className="mb-4 text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
              Training Anywhere
            </h3>
            <p className="text-base text-black sm:text-lg lg:text-xl">
              Du trainierst nicht nur <strong>online ortsunabhängig</strong>,
              sondern auch <strong>live mit mir</strong> zusammen. Das bietet
              dir <strong>Flexibilität</strong> und eine effektive Möglichkeit,
              regelmäßig zu trainieren. Ein absoluter Game- Changer ist wohl die
              gewonnene Zeit. Du musst dir{" "}
              <strong>
                {" "}
                keine Gedanken über Fahrtwege, knappe Zeitfenster oder
                Kinderbetreuung machen.{" "}
              </strong>
            </p>
          </div>
        </div>

        <div className="mb-8 flex items-start lg:mb-0">
          <div className="text-4xl text-stone-400 sm:text-5xl lg:text-7xl">
            <ion-icon name="heart"></ion-icon>
          </div>
          <div className="ml-4 sm:ml-6">
            <h3 className="mb-4 text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
              Community-Love
            </h3>
            <p className="text-base text-black sm:text-lg lg:text-xl">
              Dieses verrückte Internet! Wer hätte gedacht, dass hier sogar
              richtige Freundschaften entstehen können? Auch wenn wir alle
              fokussiert sind und das Training selbstverständlich im Vordergrund
              steht, liebe ich die kleinen Gespräche am Rande. Ich würde am
              liebsten nach einer Stunde Training mein Käffchen holen und weiter
              plaudern. Die <strong> Motivation </strong> und{" "}
              <strong>Dynamik</strong> in den Kursen sind einfach besonders
              schön.
            </p>
          </div>
        </div>

        <div className="mb-8 flex items-start lg:mb-0">
          <div className="text-4xl text-stone-400 sm:text-5xl lg:text-7xl">
            <ion-icon name="fitness"></ion-icon>
          </div>
          <div className="ml-4 sm:ml-6">
            <h3 className="mb-4 text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
              Fitnessziele
            </h3>
            <p className="text-base text-black sm:text-lg lg:text-xl">
              Stell dir vor, wie sich dein{" "}
              <strong> Körper transformiert </strong>: Deine{" "}
              <strong> Haltung </strong> verbessert sich, und deine{" "}
              <strong> Wirbelsäule wird entlastet </strong>, was dir ein neues
              Gefühl von <strong> Leichtigkeit </strong> und Aufrichtung
              verleiht. Du erlebst eine{" "}
              <strong> Steigerung deiner Flexibilität </strong> und
              <strong> Beweglichkeit. Sichtbare Ergebnisse </strong> wie
              <strong> straffere Haut </strong> und eine{" "}
              <strong> schlankere </strong> Taille werden dich begeistern. Und
              am wichtigsten ist, dass du dich{" "}
              <strong> mental gestärkt </strong> und insgesamt fitter fühlst.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="text-4xl text-stone-400 sm:text-5xl lg:text-7xl">
            <ion-icon name="ribbon"></ion-icon>
          </div>
          <div className="ml-4 sm:ml-6">
            <h3 className="mb-4 text-2xl font-bold text-black sm:text-3xl lg:text-4xl">
              Zusätzlicher Bonus
            </h3>
            <p className="text-base text-black sm:text-lg lg:text-xl">
              Online-Training ermöglicht es dir, in deinem{" "}
              <strong> eigenen Tempo Fortschritte </strong> zu machen und dich
              auf deine <strong> individuellen Bedürfnisse </strong> zu
              konzentrieren. Du kannst deine Übungen direkt an dein Zuhause
              anpassen, <strong> ohne </strong> die Notwendigkeit für
              <strong>zusätzliche Anfahrtswege </strong> oder die{" "}
              <strong> Nutzung </strong> eines <strong>Fitnessstudios</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
