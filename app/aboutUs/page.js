import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="w-full md:w-4/5 leading-6 mb-4 mx-auto text-center text-lg min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        <div className="md:grid md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center items-center">
            <div className="relative bg-black h-[50rem] xs:h-[75rem] w-full mb-12">
              <Image
                src="/aboutUs/aboutUs2.jpg"
                alt="Body mirror by Sema"
                fill
                quality={20}
                className="rounded-md object-cover"
              />
            </div>

            <h1 className="text-3xl font-bold mb-4">
              Bodymirror und Pilates! How?
            </h1>

            <div className="w-4/5 leading-7 mb-12 text-center text-lg flex flex-col gap-12">
              <blockquote>
                „Eine Reise von tausend Meilen beginnt mit einem kleinen
                Schritt“
              </blockquote>
              <h2 className="text-2xl font-semibold">
                Die Geschichte von Bodymirror
              </h2>
              <p>
                Okay, können wir schon von Geschichte sprechen? Denn so viele
                Jahre ist es noch gar nicht her, und ich hatte Probleme, mit dem
                Kinderwagen die Bordsteinkante hochzukommen. Ja, richtig
                gelesen! Den Kinderwagen eine Bordsteinkante hochzuheben, war
                einfach ein viel zu großer Kraftaufwand für mich. Vor allem im
                Beckenboden habe ich es gespürt. Gewichte und Geräte, die früher
                zu meinen Routinen gehörten, kamen nicht mehr infrage.
              </p>
              <p>
                Wenn ich hier alle Baustellen in meinem Körper aufzählen würde,
                wäre der Text vielleicht zu langweilig, aber drei von den
                Schmerzen hatten es so ziemlich in sich und waren besonders übel
                im Alltag: mein Becken, meine Symphyse und meine Knie. Daher war
                mein größtes Ziel nach der Schwangerschaft, mich wieder
                schmerzfrei zu bewegen. Es war mein größter Wunsch, meinen
                Körper schmerzfrei zu bewegen und zu mir selbst wiederzufinden.
                Verrückterweise hatte ich nämlich dieses Urvertrauen in mir und
                auch zu mir, dass, wenn ich erstmal schmerzfrei meinen Körper
                bewegen kann, ich auch eine optische Veränderung durchmachen und
                mein Spiegelbild wieder mehr mögen würde.
              </p>
              <p>
                So entdeckte ich Pilates, und Pilates hat nicht nur mein Leben
                verändert, sondern auch meinen Beruf :). Das mag jetzt ziemlich
                wie eine Telenovela-Soap-Liebesgeschichte klingen, aber Pilates
                hat mir gezeigt, dass ich mich mit mir selbst beschäftigen muss,
                auf meinen Körper hören und entsprechend reagieren darf. Es geht
                im Pilates quasi nicht anders. Ansonsten hast du nicht richtig
                Pilates gemacht. Vor allem lehrte es mich, wie wichtig
                Präzision, Kontrolle und Aufmerksamkeit sind – alles
                Grundprinzipien von Pilates. In meiner Ausbildung zur staatlich
                anerkannten Pilates-Trainerin habe ich alle Theorien im Pilates
                aufgesaugt, um sie in der Praxis bestmöglich umzusetzen. Danach
                merkte ich aber schnell, dass klassisches Pilates mir nicht
                ausreicht. Wie, was, warum? Keine Sorge, es wird nur besser.
              </p>
              <p>
                Ich habe viele Bewegungen aus dem Functional Training, Mobility
                Training und Strength Training mit klassischem Pilates
                verbunden. Und was soll ich sagen? Diese Methode hat sich gleich
                zweimal bewährt. In zwei Jahren, zwei Schwangerschaften. Bei der
                letzten Schwangerschaft dann mit absoluter Bettruhe in den
                ersten fünf Monaten. Mit der Geburt meiner Tochter war aber ganz
                klar: Das hier ist mein Weg, und den gehe ich.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:self-start">
            <div className="relative bg-black h-[50rem] xs:h-[75rem] w-full mb-12">
              <Image
                src="/aboutUs/aboutUs1.jpg"
                alt="Body mirror by Sema"
                fill
                quality={20}
                className="rounded-md object-cover"
              />
            </div>

            <h1 className="text-3xl font-bold mb-4">
              Was dich bei Bodymirror erwartet
            </h1>

            <div className="w-4/5 leading-7 mb-4 text-center text-lg flex flex-col gap-12">
              <blockquote>
                „Eine Reise von tausend Meilen beginnt mit einem kleinen
                Schritt“
              </blockquote>
              <h2 className="text-2xl font-semibold">
                Die Geschichte von Bodymirror
              </h2>
              <p>
                Klassisches Pilates ist mir nicht genug. Das klingt jetzt
                ziemlich hart, ist es aber nicht, wenn ich dir erkläre, warum.
                Hey, es gibt so viele tolle Sporttechniken, die in Verbindung
                mit Pilates noch effektiver sind als allein.
              </p>
              <p>
                Im klassischen Pilates gibt es klar definierte Regeln, wie zum
                Beispiel den Übergang von einer Übung zur nächsten. Dabei
                entsteht ein gewisser Flow, der nicht unterbrochen oder gestört
                werden darf. Jetzt stell dir aber mal vor, du würdest 60 Minuten
                lang durchpowern – und „durchpowern“ bedeutet nicht unbedingt
                Tempo. Du könntest 60 Minuten lang im Schneckentempo mit mir
                zusammen trainieren und den krassesten Burn spüren, weil du die
                Disziplinen des Pilates mit Strength-Übungen, einem
                HIIT-Workout, Mobilitätstraining, einer Ballerina-Class oder
                anderen Techniken verbindest – the list goes on and on.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
