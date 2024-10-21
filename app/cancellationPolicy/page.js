"use client";

import Link from "next/link";

export default function Widerrufsbelehrung() {
  return (
    <div className="p-8 sm:p-20 bg-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Widerrufsbelehrung</h1>
        <div className="text-lg leading-relaxed">
          <h2 className="font-semibold mb-4">Widerrufsrecht</h2>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
            diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn
            Tage ab dem Tag des Vertragsabschlusses.
          </p>
          <p>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (ST, [deine
            Adresse],{" "}
            <a href="mailto:sema@body-mirror.com" className="text-blue-600">
              sema@body-mirror.com
            </a>
            ) mittels einer eindeutigen Erklärung (z.B. ein mit der Post
            versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen
            Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte
            Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
          </p>

          <h2 className="font-semibold mb-4 mt-6">Widerrufsfolgen</h2>
          <p>
            Wenn Sie diesen Vertrag widerrufen, erstatten wir Ihnen alle
            Zahlungen, die wir von Ihnen erhalten haben, einschließlich der
            Kursgebühren, spätestens binnen vierzehn Tagen ab dem Tag, an dem
            wir Ihre Mitteilung über den Widerruf dieses Vertrages erhalten
            haben. Die Rückzahlung erfolgt auf demselben Zahlungsmittel, das Sie
            bei der ursprünglichen Buchung verwendet haben, es sei denn, es
            wurde ausdrücklich etwas anderes vereinbart.
          </p>
          <p>
            <strong>Besonderer Hinweis</strong>
            <br />
            Das Widerrufsrecht besteht nicht, wenn der Kurs bereits begonnen hat
            und Sie ausdrücklich zugestimmt haben, dass der Kurs vor Ablauf der
            Widerrufsfrist beginnt.
          </p>

          <p className="mt-6">
            <strong>Ende der Widerrufsbelehrung</strong>
          </p>

          <Link href="/sampleFormula" className="underline">
            Sample Formula
          </Link>
        </div>
      </div>
    </div>
  );
}
